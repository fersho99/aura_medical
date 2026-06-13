'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

type Testimonio = {
  id: string
  nombre: string
  cargo: string | null
  calificacion: number
  color: string
  activo: boolean
  orden: number
}

const COLOR_LABELS: Record<string, string> = {
  primary:   'Teal',
  secondary: 'Azul',
  tertiary:  'Gris',
}

export default function TestimoniosPage() {
  const [items,    setItems]    = useState<Testimonio[]>([])
  const [loading,  setLoading]  = useState(true)
  const [toggling, setToggling] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('testimonios')
      .select('id, nombre, cargo, calificacion, color, activo, orden')
      .order('orden')
    setItems(data ?? [])
    setLoading(false)
  }

  const toggleActivo = async (id: string, activo: boolean) => {
    setToggling(id)
    await supabase.from('testimonios').update({ activo: !activo }).eq('id', id)
    setItems(prev => prev.map(t => t.id === id ? { ...t, activo: !activo } : t))
    await fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    setToggling(null)
  }

  const eliminar = async (id: string, nombre: string) => {
    if (!window.confirm(`¿Eliminar testimonio de "${nombre}"? Esta acción no se puede deshacer.`)) return
    await supabase.from('testimonios').delete().eq('id', id)
    setItems(prev => prev.filter(t => t.id !== id))
    await fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-gray-400">
      <span className="material-symbols-outlined text-[24px] animate-spin">progress_activity</span>
      Cargando testimonios…
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonios</h1>
          <p className="text-gray-400 mt-1 text-sm">{items.length} testimonio{items.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/testimonios/nuevo"
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nuevo testimonio
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-teal-400 text-[32px]">format_quote</span>
          </div>
          <p className="text-gray-400 mb-4">No hay testimonios registrados</p>
          <Link href="/admin/testimonios/nuevo"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Agregar el primero
          </Link>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Paciente</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Calificación</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Color</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Estado</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {items.map(t => (
                <tr key={t.id} className="hover:bg-gray-800/40 transition">
                  <td className="px-6 py-4">
                    <p className="text-white text-sm font-medium">{t.nombre}</p>
                    {t.cargo && <p className="text-gray-500 text-xs mt-0.5">{t.cargo}</p>}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.floor(t.calificacion) }).map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-amber-400 text-[14px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                      {t.calificacion % 1 > 0 && (
                        <span className="material-symbols-outlined text-amber-400 text-[14px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                      )}
                      <span className="text-gray-400 text-xs ml-1">{t.calificacion}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-gray-400 text-xs">{COLOR_LABELS[t.color] ?? t.color}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActivo(t.id, t.activo)}
                      disabled={toggling === t.id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition border disabled:opacity-50 ${
                        t.activo
                          ? 'bg-teal-500/10 text-teal-400 border-teal-500/20 hover:bg-teal-500/20'
                          : 'bg-gray-700/50 text-gray-400 border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${t.activo ? 'bg-teal-400' : 'bg-gray-500'}`} />
                      {t.activo ? 'Visible' : 'Oculto'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/testimonios/${t.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition border border-gray-700">
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                        Editar
                      </Link>
                      <button onClick={() => eliminar(t.id, t.nombre)}
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
