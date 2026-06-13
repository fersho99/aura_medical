import { NextResponse } from 'next/server'

// Elimina la cookie de caché de rol para que el middleware re-consulte la BD
export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete('am-rol')
  return res
}
