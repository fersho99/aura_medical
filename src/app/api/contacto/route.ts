import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { validateContacto } from '@/lib/validators'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  // ── Rate limit: 3 mensajes por IP por hora ─────────────────────────────────
  const ip = getClientIp(request)
  const rl = checkRateLimit(`ct_${ip}`, 3, 60 * 60 * 1000)

  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta de nuevo más tarde.' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((rl.retryAfterMs ?? 60000) / 1000)) },
      },
    )
  }

  // ── Parsear body ───────────────────────────────────────────────────────────
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Cuerpo de solicitud inválido.' }, { status: 400 })
  }

  // ── Validar y sanitizar ────────────────────────────────────────────────────
  const result = validateContacto(body)

  if (!result.ok) {
    return NextResponse.json({ error: 'Datos inválidos.', fields: result.errors }, { status: 422 })
  }

  // ── Persistir en Supabase ─────────────────────────────────────────────────
  try {
    const supabase = await createServerSupabaseClient()
    const { error: dbError } = await supabase.from('mensajes_contacto').insert([
      {
        nombre:       result.data!.nombre,
        telefono:     result.data!.telefono,
        correo:       result.data!.correo       || null,
        especialidad: result.data!.especialidad || null,
        mensaje:      result.data!.mensaje,
        leido:        false,
      },
    ])

    if (dbError) {
      console.error('[API /contacto] Supabase error:', dbError.message)
      return NextResponse.json(
        { error: 'No se pudo enviar el mensaje. Intenta más tarde.' },
        { status: 500 },
      )
    }
  } catch (err) {
    console.error('[API /contacto] Unexpected error:', err)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
