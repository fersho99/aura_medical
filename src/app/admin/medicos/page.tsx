'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

type Medico = {
  id: string
  nombre: string
  especialidad: string
  cedula: string
  consultorio: string
  telefono: string
  email: string
  foto_url: string
  descripcion: string
  activo: boolean
}

export default function MedicosPage() {
  const [medicos,  setMedicos]  = useState<Medico[]>([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => { fetchMedicos() }, [])

  const fetchMedicos = async () => {
    setLoading(true)
    setError('')
    const { data, error } = await supabase
      .from('medicos')
      .select('*')
      .order('nombre')

    if (error) { console.error('[Medicos] db.select — code:', error.code, '| msg:', error.message, '| hint:', error.hint); setError('No se pudieron cargar los médicos.') }
    else setMedicos(data ?? [])
    setLoading(false)
  }

  const toggleActivo = async (id: string, activo: boolean) => {
    const { error } = await supabase
      .from('medicos')
      .update({ activo: !activo })
      .eq('id', id)
    if (!error) fetchMedicos()
  }

  const eliminar = async (id: string, nombre: string, foto_url: string) => {
    if (!window.confirm(`¿Eliminar a ${nombre}? Esta acción no se puede deshacer.`)) return
    setDeleting(id)

    const fileName = foto_url?.split('/medicos/').pop()
    if (fileName) {
      await supabase.storage.from('medicos').remove([fileName])
    }

    const { error } = await supabase.from('medicos').delete().eq('id', id)
    if (error) { console.error('[Medicos] db.delete:', error); setError('No se pudo eliminar el médico.') }
    else fetchMedicos()
    setDeleting(null)
  }

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-gray-400">
      <span className="material-symbols-outlined text-[24px] animate-spin">progress_activity</span>
      Cargando médicos…
    </div>
  )

  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Médicos</h1>
          <p className="text-gray-400 mt-1 text-sm">{medicos.length} médico{medicos.length !== 1 ? 's' : ''} registrado{medicos.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/medicos/nuevo"
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Agregar médico
        </Link>
      </div>

      {/* Error global */}
      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">
          <span className="material-symbols-outlined text-red-400 text-[18px] shrink-0">error</span>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Lista vacía */}
      {medicos.length === 0 && !error ? (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-teal-400 text-[32px]">medical_services</span>
          </div>
          <p className="text-gray-400 mb-4">No hay médicos registrados aún</p>
          <Link
            href="/admin/medicos/nuevo"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Agregar el primero
          </Link>
        </div>
      ) : (

        /* Tabla */
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Médico</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Especialidad</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Contacto</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Estado</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {medicos.map((medico) => (
                <tr key={medico.id} className="hover:bg-gray-800/40 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {medico.foto_url ? (
                        <img
                          src={medico.foto_url}
                          alt={medico.nombre}
                          className="w-9 h-9 rounded-full object-cover shrink-0"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 text-sm font-bold shrink-0">
                          {medico.nombre.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-white text-sm font-medium">{medico.nombre}</p>
                        {medico.cedula && <p className="text-gray-500 text-xs">Céd. {medico.cedula}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-sm">{medico.especialidad}</td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {medico.email && <p className="text-gray-300 text-sm">{medico.email}</p>}
                    {medico.telefono && <p className="text-gray-500 text-xs mt-0.5">{medico.telefono}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActivo(medico.id, medico.activo)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition border ${
                        medico.activo
                          ? 'bg-teal-500/10 text-teal-400 border-teal-500/20 hover:bg-teal-500/20'
                          : 'bg-gray-700/50 text-gray-400 border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${medico.activo ? 'bg-teal-400' : 'bg-gray-500'}`} />
                      {medico.activo ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/medicos/${medico.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition border border-gray-700"
                      >
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                        Editar
                      </Link>
                      <button
                        onClick={() => eliminar(medico.id, medico.nombre, medico.foto_url)}
                        disabled={deleting === medico.id}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition border border-red-500/20 disabled:opacity-50"
                      >
                        {deleting === medico.id
                          ? <span className="material-symbols-outlined text-[14px] animate-spin">progress_activity</span>
                          : <span className="material-symbols-outlined text-[14px]">delete</span>
                        }
                        Eliminar
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
