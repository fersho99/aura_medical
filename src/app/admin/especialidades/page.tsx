'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

type Especialidad = {
  id: string
  slug: string
  nombre: string
  descripcion_corta: string | null
  imagen_url: string | null
  icono: string | null
  activo: boolean
  orden: number
}

export default function EspecialidadesAdminPage() {
  const [items,    setItems]    = useState<Especialidad[]>([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState('')
  const [toggling, setToggling] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    setLoading(true)
    setError('')
    const { data, error } = await supabase
      .from('especialidades')
      .select('*')
      .order('orden')
    if (error) { console.error('[Especialidades] db.select:', error); setError('No se pudieron cargar las especialidades.') }
    else setItems(data ?? [])
    setLoading(false)
  }

  const toggleActivo = async (id: string, activo: boolean) => {
    setToggling(id)
    const { error } = await supabase
      .from('especialidades')
      .update({ activo: !activo })
      .eq('id', id)
    if (!error) {
      setItems(prev => prev.map(i => i.id === id ? { ...i, activo: !activo } : i))
      await fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    }
    setToggling(null)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-gray-400">
      <span className="material-symbols-outlined text-[24px] animate-spin">progress_activity</span>
      Cargando especialidades…
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Especialidades</h1>
          <p className="text-gray-400 mt-1 text-sm">{items.length} especialidad{items.length !== 1 ? 'es' : ''} registrada{items.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/especialidades/nuevo"
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nueva especialidad
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">
          <span className="material-symbols-outlined text-red-400 text-[18px] shrink-0">error</span>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {items.length === 0 && !error ? (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-teal-400 text-[32px]">science</span>
          </div>
          <p className="text-gray-400 mb-4">No hay especialidades registradas</p>
          <Link href="/admin/especialidades/nuevo"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Agregar la primera
          </Link>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Especialidad</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Slug</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Estado</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-800/40 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.imagen_url ? (
                        <img src={item.imagen_url} alt={item.nombre}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                          <span className="material-symbols-outlined text-[18px]">{item.icono || 'medical_services'}</span>
                        </div>
                      )}
                      <div>
                        <p className="text-white text-sm font-medium">{item.nombre}</p>
                        {item.descripcion_corta && (
                          <p className="text-gray-500 text-xs truncate max-w-xs">{item.descripcion_corta}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-gray-500 text-xs font-mono">/especialidades/{item.slug}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActivo(item.id, item.activo)}
                      disabled={toggling === item.id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition border disabled:opacity-50 ${
                        item.activo
                          ? 'bg-teal-500/10 text-teal-400 border-teal-500/20 hover:bg-teal-500/20'
                          : 'bg-gray-700/50 text-gray-400 border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.activo ? 'bg-teal-400' : 'bg-gray-500'}`} />
                      {item.activo ? 'Activa' : 'Inactiva'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/especialidades/${item.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition border border-gray-700">
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                      Editar
                    </Link>
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
