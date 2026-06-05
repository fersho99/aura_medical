import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { validateCita } from '@/lib/validators'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  // ── Rate limit: 5 citas por IP por hora ────────────────────────────────────
  const ip = getClientIp(request)
  const rl = checkRateLimit(ip, 5, 60 * 60 * 1000)

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
  const result = validateCita(body)

  if (!result.ok) {
    return NextResponse.json({ error: 'Datos inválidos.', fields: result.errors }, { status: 422 })
  }

  // ── Persistir en Supabase ─────────────────────────────────────────────────
  try {
    const supabase = await createServerSupabaseClient()
    const { error: dbError } = await supabase.from('citas').insert([
      {
        nombre:   result.data!.nombre,
        telefono: result.data!.telefono,
        correo:   result.data!.correo   || null,
        area:     result.data!.area,
        horario:  result.data!.horario,
        detalles: result.data!.detalles || null,
        estado:   'pendiente',
      },
    ])

    if (dbError) {
      // No exponemos el error interno al cliente
      console.error('[API /citas] Supabase error:', dbError.message)
      return NextResponse.json(
        { error: 'No se pudo registrar la cita. Intenta más tarde.' },
        { status: 500 },
      )
    }
  } catch (err) {
    console.error('[API /citas] Unexpected error:', err)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
