'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

type Noticia = {
  id: string
  titulo: string
  slug: string
  categoria: string | null
  autor: string | null
  publicado: boolean
  fecha_publicacion: string | null
  created_at: string
}

export default function NoticiasAdminPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState('')
  const [toggling, setToggling] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => { fetchNoticias() }, [])

  const fetchNoticias = async () => {
    setLoading(true)
    setError('')
    const { data, error } = await supabase
      .from('noticias')
      .select('id, titulo, slug, categoria, autor, publicado, fecha_publicacion, created_at')
      .order('created_at', { ascending: false })
    if (error) { console.error('[Noticias] db.select:', error); setError('No se pudieron cargar las noticias.') }
    else setNoticias(data ?? [])
    setLoading(false)
  }

  const togglePublicado = async (id: string, publicado: boolean) => {
    setToggling(id)
    const { error } = await supabase
      .from('noticias')
      .update({ publicado: !publicado })
      .eq('id', id)
    if (!error) {
      setNoticias(prev => prev.map(n => n.id === id ? { ...n, publicado: !publicado } : n))
      await fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    }
    setToggling(null)
  }

  const eliminar = async (id: string, titulo: string) => {
    if (!window.confirm(`¿Eliminar "${titulo}"? Esta acción no se puede deshacer.`)) return
    const { error } = await supabase.from('noticias').delete().eq('id', id)
    if (error) { console.error('[Noticias] db.delete:', error); setError('No se pudo eliminar la noticia.') }
    else {
      setNoticias(prev => prev.filter(n => n.id !== id))
      await fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    }
  }

  const formatFecha = (iso: string | null) =>
    iso ? new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-gray-400">
      <span className="material-symbols-outlined text-[24px] animate-spin">progress_activity</span>
      Cargando noticias…
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Noticias</h1>
          <p className="text-gray-400 mt-1 text-sm">{noticias.length} artículo{noticias.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/noticias/nuevo"
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nueva noticia
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">
          <span className="material-symbols-outlined text-red-400 text-[18px] shrink-0">error</span>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {noticias.length === 0 && !error ? (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-teal-400 text-[32px]">newspaper</span>
          </div>
          <p className="text-gray-400 mb-4">No hay noticias publicadas</p>
          <Link href="/admin/noticias/nuevo"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Crear la primera
          </Link>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Título</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Categoría</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Fecha</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Estado</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {noticias.map(n => (
                <tr key={n.id} className="hover:bg-gray-800/40 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white text-sm font-medium line-clamp-1">{n.titulo}</p>
                      <p className="text-gray-500 text-xs font-mono mt-0.5">/noticias/{n.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {n.categoria && (
                      <span className="inline-block px-2 py-0.5 text-xs bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-full">
                        {n.categoria}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-gray-400 text-xs">{formatFecha(n.fecha_publicacion || n.created_at)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublicado(n.id, n.publicado)}
                      disabled={toggling === n.id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition border disabled:opacity-50 ${
                        n.publicado
                          ? 'bg-teal-500/10 text-teal-400 border-teal-500/20 hover:bg-teal-500/20'
                          : 'bg-gray-700/50 text-gray-400 border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${n.publicado ? 'bg-teal-400' : 'bg-gray-500'}`} />
                      {n.publicado ? 'Publicada' : 'Borrador'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/noticias/${n.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition border border-gray-700">
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                        Editar
                      </Link>
                      <button
                        onClick={() => eliminar(n.id, n.titulo)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition border border-red-500/20">
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
