import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST() {
  revalidateTag('contenido')
  // Invalida el route cache de todas las páginas públicas
  revalidatePath('/', 'layout')
  return NextResponse.json({ revalidated: true })
}
