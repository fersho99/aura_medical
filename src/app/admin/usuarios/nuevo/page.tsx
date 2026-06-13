'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ROL_LABELS, type Rol } from '@/lib/roles'

const inputCls = 'w-full mt-1 px-4 py-2.5 bg-gray-800 text-white text-sm rounded-xl border border-gray-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition placeholder:text-gray-600 disabled:opacity-50'
const labelCls = 'text-xs font-medium text-gray-400 uppercase tracking-wider'
const ROLES: Rol[] = ['recepcionista', 'editor', 'admin', 'super_admin']

export default function NuevoUsuarioPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState('')
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({
    nombre: '', email: '', password: '', rol: 'recepcionista' as Rol,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/admin/crear-usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Error al crear el usuario.')
        setSaving(false)
        return
      }
      router.push('/admin/usuarios')
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
      setSaving(false)
    }
  }

  return (
    <div className="max-w-md">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/usuarios"
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">Nuevo usuario</h1>
          <p className="text-gray-400 text-sm">Crear acceso al panel administrativo</p>
        </div>
      </div>

      {/* Aviso de requisito */}
      <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 mb-5">
        <span className="material-symbols-outlined text-yellow-400 text-[18px] shrink-0 mt-0.5">warning</span>
        <p className="text-yellow-300 text-xs leading-relaxed">
          Requiere <code className="bg-yellow-500/20 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> en <code className="bg-yellow-500/20 px-1 rounded">.env.local</code>. Sin ella, la creación fallará con un error 500.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-4">

          <div>
            <label className={labelCls}>Nombre completo *</label>
            <input name="nombre" value={form.nombre} onChange={onChange}
              required maxLength={100} disabled={saving} className={inputCls}
              placeholder="Dr. Ana García" />
          </div>

          <div>
            <label className={labelCls}>Email *</label>
            <input name="email" type="email" value={form.email} onChange={onChange}
              required maxLength={150} disabled={saving} className={inputCls}
              placeholder="ana@auramedical.com" />
          </div>

          <div>
            <label className={labelCls}>Contraseña *</label>
            <div className="relative">
              <input name="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={onChange}
                required minLength={8} disabled={saving}
                className={`${inputCls} pr-10`}
                placeholder="Mínimo 8 caracteres" />
              <button type="button" onClick={() => setShowPass(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-gray-500 hover:text-gray-300 transition">
                <span className="material-symbols-outlined text-[18px]">{showPass ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          <div>
            <label className={labelCls}>Rol</label>
            <select name="rol" value={form.rol} onChange={onChange}
              disabled={saving} className={`${inputCls} appearance-none`}>
              {ROLES.map(r => <option key={r} value={r}>{ROL_LABELS[r]}</option>)}
            </select>
            <p className="text-gray-600 text-xs mt-1.5">
              {form.rol === 'recepcionista' && 'Acceso solo a: Dashboard y Citas.'}
              {form.rol === 'editor' && 'Acceso a: Dashboard, Noticias y Configuración.'}
              {form.rol === 'admin' && 'Acceso completo excepto gestión de usuarios.'}
              {form.rol === 'super_admin' && 'Acceso total al panel, incluyendo gestión de usuarios.'}
            </p>
          </div>
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
              ? <><span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>Creando…</>
              : <><span className="material-symbols-outlined text-[18px]">person_add</span>Crear usuario</>
            }
          </button>
          <Link href="/admin/usuarios"
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm rounded-xl transition border border-gray-700">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
