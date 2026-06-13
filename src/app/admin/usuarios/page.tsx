'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { ROL_LABELS, ROL_COLORS, type Rol } from '@/lib/roles'

type Perfil = {
  id: string
  nombre: string | null
  rol: Rol
  activo: boolean
  created_at: string
  email?: string
}

const ROLES: Rol[] = ['super_admin', 'admin', 'editor', 'recepcionista']

export default function UsuariosPage() {
  const [perfiles,  setPerfiles]  = useState<Perfil[]>([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState('')
  const [saving,    setSaving]    = useState<string | null>(null)
  const [selfId,    setSelfId]    = useState<string>('')
  const supabase = createClient()

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setSelfId(user?.id ?? '')

      setLoading(true)
      const { data, error: dbErr } = await supabase
        .from('perfiles')
        .select('*')
        .order('created_at')
      if (dbErr) { console.error('[Usuarios] db.select:', dbErr); setError('No se pudieron cargar los usuarios.') }
      else setPerfiles(data ?? [])
      setLoading(false)
    }
    init()
  }, [])

  const cambiarRol = async (id: string, nuevoRol: Rol) => {
    setSaving(id)
    const { error } = await supabase.from('perfiles').update({ rol: nuevoRol }).eq('id', id)
    if (error) { console.error('[Usuarios] update rol:', error); setError('No se pudo cambiar el rol.') }
    else {
      setPerfiles(prev => prev.map(p => p.id === id ? { ...p, rol: nuevoRol } : p))
      // Forzar revalidación de la cookie de rol en el middleware
      await fetch('/api/admin/invalidar-rol', { method: 'POST' }).catch(() => {})
    }
    setSaving(null)
  }

  const toggleActivo = async (id: string, activo: boolean) => {
    if (id === selfId) { setError('No puedes desactivar tu propia cuenta.'); return }
    setSaving(id)
    const { error } = await supabase.from('perfiles').update({ activo: !activo }).eq('id', id)
    if (error) { console.error('[Usuarios] update activo:', error); setError('No se pudo cambiar el estado.') }
    else setPerfiles(prev => prev.map(p => p.id === id ? { ...p, activo: !activo } : p))
    setSaving(null)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-gray-400">
      <span className="material-symbols-outlined text-[24px] animate-spin">progress_activity</span>
      Cargando usuarios…
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Usuarios del panel</h1>
          <p className="text-gray-400 mt-1 text-sm">{perfiles.length} usuario{perfiles.length !== 1 ? 's' : ''} registrado{perfiles.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/usuarios/nuevo"
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition">
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Nuevo usuario
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">
          <span className="material-symbols-outlined text-red-400 text-[18px] shrink-0">error</span>
          <p className="text-red-400 text-sm">{error}</p>
          <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-300">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Aviso sobre service key */}
      <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 mb-6">
        <span className="material-symbols-outlined text-blue-400 text-[18px] shrink-0 mt-0.5">info</span>
        <div className="text-blue-300 text-xs leading-relaxed">
          <p className="font-medium mb-0.5">Para crear usuarios desde el panel</p>
          <p className="text-blue-400">Añade <code className="bg-blue-500/20 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> en tu <code className="bg-blue-500/20 px-1 rounded">.env.local</code>. También puedes crear usuarios directamente desde el dashboard de Supabase (Authentication → Users) y luego el perfil aparece aquí automáticamente.</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Usuario</th>
              <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Rol</th>
              <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Estado</th>
              <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {perfiles.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-12 text-gray-500 text-sm">
                  No hay usuarios con perfil asignado. Crea el primero con el botón de arriba.
                </td>
              </tr>
            )}
            {perfiles.map(p => (
              <tr key={p.id} className={`hover:bg-gray-800/40 transition ${p.id === selfId ? 'ring-inset ring-1 ring-teal-500/20' : ''}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 text-xs font-bold shrink-0">
                      {(p.nombre || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {p.nombre || 'Sin nombre'}
                        {p.id === selfId && <span className="ml-2 text-xs text-teal-400">(tú)</span>}
                      </p>
                      <p className="text-gray-500 text-xs font-mono truncate max-w-xs">{p.id.slice(0, 8)}…</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={p.rol}
                    disabled={saving === p.id || p.id === selfId}
                    onChange={e => cambiarRol(p.id, e.target.value as Rol)}
                    className="px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg border border-gray-700 focus:outline-none focus:border-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {ROLES.map(r => <option key={r} value={r}>{ROL_LABELS[r]}</option>)}
                  </select>
                  <div className="mt-1.5">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-medium rounded border ${ROL_COLORS[p.rol]}`}>
                      {ROL_LABELS[p.rol]}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleActivo(p.id, p.activo)}
                    disabled={saving === p.id || p.id === selfId}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition border disabled:opacity-50 disabled:cursor-not-allowed ${
                      p.activo
                        ? 'bg-teal-500/10 text-teal-400 border-teal-500/20 hover:bg-teal-500/20'
                        : 'bg-gray-700/50 text-gray-400 border-gray-700 hover:bg-gray-700'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${p.activo ? 'bg-teal-400' : 'bg-gray-500'}`} />
                    {p.activo ? 'Activo' : 'Inactivo'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  {saving === p.id && (
                    <span className="material-symbols-outlined text-teal-400 text-[18px] animate-spin">progress_activity</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
