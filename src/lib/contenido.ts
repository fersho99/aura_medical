import { unstable_cache } from 'next/cache'
import { createClient } from '@supabase/supabase-js'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export type ContenidoMap = Record<string, Record<string, string>>

export const getContenido = unstable_cache(
  async (): Promise<ContenidoMap> => {
    const { data, error } = await db()
      .from('contenido')
      .select('seccion, clave, valor')
    if (error) { console.error('[getContenido]', error.message); return {} }
    const map: ContenidoMap = {}
    for (const row of data ?? []) {
      if (!map[row.seccion]) map[row.seccion] = {}
      map[row.seccion][row.clave] = row.valor ?? ''
    }
    return map
  },
  ['contenido'],
  { tags: ['contenido'], revalidate: 86400 }
)

export type Especialidad = {
  id: string
  slug: string
  nombre: string
  descripcion_corta: string | null
  imagen_url: string | null
  icono: string | null
  servicios: string[]
  activo: boolean
  orden: number
}

export const getEspecialidades = unstable_cache(
  async (): Promise<Especialidad[]> => {
    try {
      const supabase = db()
      const { data } = await supabase
        .from('especialidades')
        .select('id, slug, nombre, descripcion_corta, imagen_url, icono, servicios, activo, orden')
        .eq('activo', true)
        .order('orden')
      return (data ?? []) as Especialidad[]
    } catch {
      return []
    }
  },
  ['especialidades'],
  { tags: ['contenido'], revalidate: 86400 }
)

export type Unidad = {
  id: string
  slug: string
  nombre: string
  descripcion: string | null
  imagen_url: string | null
  icono: string | null
  activo: boolean
  orden: number
}

export type NoticiaPublica = {
  id: string
  slug: string
  titulo: string
  contenido: string
  imagen_url: string | null
  categoria: string | null
  autor: string | null
  publicado: boolean
  fecha_publicacion: string | null
  created_at: string
}

export const getNoticias = unstable_cache(
  async (): Promise<NoticiaPublica[]> => {
    try {
      const supabase = db()
      const { data } = await supabase
        .from('noticias')
        .select('id, slug, titulo, imagen_url, categoria, autor, publicado, fecha_publicacion, created_at')
        .eq('publicado', true)
        .order('fecha_publicacion', { ascending: false })
      return (data ?? []) as NoticiaPublica[]
    } catch {
      return []
    }
  },
  ['noticias-list'],
  { tags: ['contenido'], revalidate: 86400 }
)

export type Testimonio = {
  id: string
  nombre: string
  cargo: string | null
  testimonio: string
  calificacion: number
  iniciales: string
  color: string
  activo: boolean
  orden: number
}

export const getTestimonios = unstable_cache(
  async (): Promise<Testimonio[]> => {
    try {
      const supabase = db()
      const { data } = await supabase
        .from('testimonios')
        .select('id, nombre, cargo, testimonio, calificacion, iniciales, color, activo, orden')
        .eq('activo', true)
        .order('orden')
      return (data ?? []) as Testimonio[]
    } catch {
      return []
    }
  },
  ['testimonios'],
  { tags: ['contenido'], revalidate: 86400 }
)

export type Hito = {
  id:          string
  año:         string
  titulo:      string
  descripcion: string
  orden:       number
  activo:      boolean
}

export const getHitos = unstable_cache(
  async (): Promise<Hito[]> => {
    try {
      const { data, error } = await db()
        .from('hitos')
        .select('*')
        .eq('activo', true)
        .order('orden', { ascending: true })
      if (error) { console.error('[getHitos]', error.message); return [] }
      return (data as unknown as Hito[]) ?? []
    } catch {
      return []
    }
  },
  ['hitos'],
  { tags: ['contenido'], revalidate: 86400 }
)

export async function getNoticiaBySlug(slug: string): Promise<NoticiaPublica | null> {
  try {
    const supabase = db()
    const { data } = await supabase
      .from('noticias')
      .select('*')
      .eq('slug', slug)
      .eq('publicado', true)
      .single()
    return data as NoticiaPublica | null
  } catch {
    return null
  }
}

export const getUnidades = unstable_cache(
  async (): Promise<Unidad[]> => {
    try {
      const supabase = db()
      const { data } = await supabase
        .from('unidades')
        .select('id, slug, nombre, descripcion, imagen_url, icono, activo, orden')
        .eq('activo', true)
        .order('orden')
      return (data ?? []) as Unidad[]
    } catch {
      return []
    }
  },
  ['unidades'],
  { tags: ['contenido'], revalidate: 86400 }
)
