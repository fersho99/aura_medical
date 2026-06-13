import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export function POST() {
  revalidateTag('contenido', {})
  revalidatePath('/', 'layout')
  return NextResponse.json({ revalidated: true })
}
