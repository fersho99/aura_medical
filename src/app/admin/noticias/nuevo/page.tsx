'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { sanitizeText } from '@/lib/validators'

const TipTapEditor = dynamic(() => import('@/components/admin/TipTapEditor'), { ssr: false })

const inputCls = 'w-full mt-1 px-4 py-2.5 bg-gray-800 text-white text-sm rounded-xl border border-gray-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition placeholder:text-gray-600 disabled:opacity-50'
const labelCls = 'text-xs font-medium text-gray-400 uppercase tracking-wider'

const CATEGORIAS = ['Innovación', 'Salud', 'Tecnología', 'Investigación', 'Comunidad', 'Institucional']

export default function NuevaNoticiaPage() {
  const router   = useRouter()
  const supabase = createClient()

  const [saving,    setSaving]    = useState(false)
  const [error,     setError]     = useState('')
  const [contenido, setContenido] = useState('')

  const [form, setForm] = useState({
    titulo: '', slug: '', imagen_url: '', categoria: '',
    autor: '', fecha_publicacion: '', publicado: false,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(p => ({
      ...p,
      [name]: value,
      ...(name === 'titulo' ? {
        slug: value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 80),
      } : {}),
    }))
    setError('')
  }

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    setError('')

    const titulo    = sanitizeText(form.titulo, 200)
    const slug      = sanitizeText(form.slug, 80).replace(/[^a-z0-9-]/g, '')
    const imagen_url= sanitizeText(form.imagen_url, 500)
    const categoria = sanitizeText(form.categoria, 60)
    const autor     = sanitizeText(form.autor, 100)

    if (!titulo)    return setError('El título es obligatorio.')
    if (!slug)      return setError('El slug no puede estar vacío.')
    if (!contenido || contenido === '<p></p>') return setError('El contenido no puede estar vacío.')

    setSaving(true)

    const { error: dbErr } = await supabase.from('noticias').insert([{
      titulo, slug, contenido, imagen_url, categoria, autor,
      publicado: form.publicado,
      fecha_publicacion: form.fecha_publicacion || new Date().toISOString(),
    }])

    if (dbErr) {
      console.error('[Noticias] db.insert:', dbErr)
      setError(dbErr.code === '23505' ? 'Ya existe una noticia con ese slug.' : 'No se pudo guardar. Inténtalo de nuevo.')
      setSaving(false)
      return
    }

    await fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    router.push('/admin/noticias')
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/noticias"
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">Nueva noticia</h1>
          <p className="text-gray-400 text-sm">Redacta y publica un artículo</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Metadatos */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-4">
          <h2 className="text-white font-semibold text-sm">Información del artículo</h2>

          <div>
            <label className={labelCls}>Título *</label>
            <input name="titulo" value={form.titulo} onChange={onChange}
              required maxLength={200} disabled={saving} className={inputCls}
              placeholder="Avances en Cardiología Intervencionista" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Slug (URL)</label>
              <input name="slug" value={form.slug} onChange={onChange}
                required maxLength={80} disabled={saving} className={inputCls}
                placeholder="avances-cardiologia" />
            </div>
            <div>
              <label className={labelCls}>Categoría</label>
              <select name="categoria" value={form.categoria} onChange={onChange}
                disabled={saving} className={`${inputCls} appearance-none`}>
                <option value="">Sin categoría</option>
                {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Autor</label>
              <input name="autor" value={form.autor} onChange={onChange}
                maxLength={100} disabled={saving} className={inputCls}
                placeholder="Dr. Juan Pérez García" />
            </div>
            <div>
              <label className={labelCls}>Fecha de publicación</label>
              <input name="fecha_publicacion" type="date" value={form.fecha_publicacion} onChange={onChange}
                disabled={saving} className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Imagen destacada (URL)</label>
            <input name="imagen_url" value={form.imagen_url} onChange={onChange}
              maxLength={500} disabled={saving} className={inputCls}
              placeholder="https://…/imagen.jpg" />
            {form.imagen_url && (
              <img src={form.imagen_url} alt="preview"
                className="mt-2 h-32 w-full object-cover rounded-xl border border-gray-700"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-800">
            <span className={labelCls}>Estado</span>
            <button type="button" disabled={saving}
              onClick={() => setForm(p => ({ ...p, publicado: !p.publicado }))}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition border ${
                form.publicado
                  ? 'bg-teal-500/10 text-teal-400 border-teal-500/20'
                  : 'bg-gray-700/50 text-gray-400 border-gray-700'
              }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${form.publicado ? 'bg-teal-400' : 'bg-gray-500'}`} />
              {form.publicado ? 'Publicada' : 'Borrador'}
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-3">
          <h2 className="text-white font-semibold text-sm">Contenido del artículo *</h2>
          <TipTapEditor
            content={contenido}
            onChange={setContenido}
            disabled={saving}
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            <span className="material-symbols-outlined text-red-400 text-[18px] shrink-0">error</span>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:bg-teal-500/40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition">
            {saving
              ? <><span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>Guardando…</>
              : <><span className="material-symbols-outlined text-[18px]">save</span>Guardar noticia</>
            }
          </button>
          <Link href="/admin/noticias"
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm rounded-xl transition border border-gray-700">
            Cancelar
          </Link>
        </div>

      </form>
    </div>
  )
}
