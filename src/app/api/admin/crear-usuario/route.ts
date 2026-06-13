import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { sanitizeText, isValidEmail, isValidName } from '@/lib/validators'

const ROLES_VALIDOS = ['super_admin', 'admin', 'editor', 'recepcionista']

export async function POST(req: Request) {
  // ── 1. Verificar que quien llama es super_admin ──────────────────────────
  const cookieStore = await cookies()
  const supabaseAuth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  )

  const { data: { user } } = await supabaseAuth.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado.' }, { status: 401 })

  const { data: perfil } = await supabaseAuth
    .from('perfiles')
    .select('rol')
    .eq('id', user.id)
    .single()

  if (perfil?.rol !== 'super_admin') {
    return NextResponse.json({ error: 'Solo el super_admin puede crear usuarios.' }, { status: 403 })
  }

  // ── 2. Validar body ───────────────────────────────────────────────────────
  const body = await req.json().catch(() => ({}))
  const email  = sanitizeText(body.email,  150)
  const nombre = sanitizeText(body.nombre, 100)
  const rol    = sanitizeText(body.rol,     30)
  const pass   = (body.password ?? '').trim()

  if (!isValidEmail(email))          return NextResponse.json({ error: 'Email inválido.' }, { status: 400 })
  if (!isValidName(nombre))          return NextResponse.json({ error: 'Nombre inválido.' }, { status: 400 })
  if (!ROLES_VALIDOS.includes(rol))  return NextResponse.json({ error: 'Rol inválido.' },   { status: 400 })
  if (pass.length < 8)               return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres.' }, { status: 400 })

  // ── 3. Crear usuario con la service role key ─────────────────────────────
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY no configurada en el servidor.' }, { status: 500 })
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const { data: newUser, error: authErr } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: pass,
    email_confirm: true,
  })

  if (authErr) {
    console.error('[Usuarios] auth.admin.createUser:', authErr)
    return NextResponse.json({
      error: authErr.message.includes('already registered')
        ? 'Ya existe un usuario con ese email.'
        : 'No se pudo crear el usuario.',
    }, { status: 400 })
  }

  // ── 4. Crear perfil con el rol ────────────────────────────────────────────
  const { error: perfilErr } = await supabaseAdmin
    .from('perfiles')
    .insert([{ id: newUser.user.id, nombre, rol, activo: true }])

  if (perfilErr) {
    console.error('[Usuarios] perfiles.insert:', perfilErr)
    // Intentar limpiar al usuario creado si falla el perfil
    await supabaseAdmin.auth.admin.deleteUser(newUser.user.id).catch(() => {})
    return NextResponse.json({ error: 'Usuario creado pero no se pudo asignar el rol. Inténtalo de nuevo.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id: newUser.user.id })
}
