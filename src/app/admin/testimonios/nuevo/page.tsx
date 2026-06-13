'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { validateTestimonio } from '@/lib/validators'
import Link from 'next/link'

const inputCls = 'w-full px-4 py-2.5 bg-gray-800 text-white text-sm rounded-xl border border-gray-700 focus:outline-none focus:border-teal-500 transition'

export default function NuevoTestimonioPage() {
  const router  = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState({
    nombre:      '',
    cargo:       '',
    testimonio:  '',
    calificacion: '5',
    iniciales:   '',
    color:       'primary',
    activo:      true,
    orden:       '0',
  })
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState('')

  const set = (key: string, val: string | boolean) =>
    setForm(prev => ({ ...prev, [key]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = validateTestimonio({
      nombre:      form.nombre,
      cargo:       form.cargo,
      testimonio:  form.testimonio,
      calificacion: form.calificacion,
      iniciales:   form.iniciales,
      color:       form.color,
      activo:      form.activo,
      orden:       form.orden,
    })

    if (!result.ok || !result.data) {
      setError(result.errors[0]?.message ?? 'Datos no válidos.')
      return
    }

    setSaving(true)
    const { error } = await supabase.from('testimonios').insert(result.data)
    if (error) {
      setError('Error al guardar. Verifica los datos.')
      setSaving(false)
      return
    }
    await fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    router.push('/admin/testimonios')
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/testimonios"
          className="p-2 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Nuevo testimonio</h1>
          <p className="text-gray-400 mt-0.5 text-sm">Agrega la experiencia de un paciente</p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">
          <span className="material-symbols-outlined text-red-400 text-[18px] shrink-0">error</span>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-5">

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nombre *</label>
              <input value={form.nombre} onChange={e => set('nombre', e.target.value)}
                className={inputCls} placeholder="Carlos Mendoza" maxLength={60} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Iniciales</label>
              <input value={form.iniciales} onChange={e => set('iniciales', e.target.value.toUpperCase().slice(0, 2))}
                className={inputCls} placeholder="CM" maxLength={2} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Cargo / Especialidad</label>
            <input value={form.cargo} onChange={e => set('cargo', e.target.value)}
              className={inputCls} placeholder="Paciente de Cardiología" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Testimonio *</label>
            <textarea value={form.testimonio} onChange={e => set('testimonio', e.target.value)}
              rows={4} className={`${inputCls} resize-none`}
              placeholder="La atención fue excepcional…" maxLength={1000} required />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Calificación</label>
              <select value={form.calificacion} onChange={e => set('calificacion', e.target.value)}
                className={inputCls}>
                {['5', '4.5', '4', '3.5', '3'].map(v => (
                  <option key={v} value={v}>{v} ★</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Color</label>
              <select value={form.color} onChange={e => set('color', e.target.value)}
                className={inputCls}>
                <option value="primary">Teal</option>
                <option value="secondary">Azul</option>
                <option value="tertiary">Gris</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Orden</label>
              <input type="number" value={form.orden} onChange={e => set('orden', e.target.value)}
                className={inputCls} min="0" max="9999" />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div onClick={() => set('activo', !form.activo)}
              className={`w-10 h-6 rounded-full transition-colors relative ${form.activo ? 'bg-teal-500' : 'bg-gray-700'}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.activo ? 'translate-x-5' : 'translate-x-1'}`} />
            </div>
            <span className="text-sm text-gray-300">Visible en el sitio</span>
          </label>

        </div>

        <div className="flex gap-3">
          <Link href="/admin/testimonios"
            className="px-5 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition border border-gray-700">
            Cancelar
          </Link>
          <button type="submit" disabled={saving}
            className="px-5 py-2.5 text-sm font-semibold bg-teal-500 hover:bg-teal-400 text-white rounded-xl transition disabled:opacity-50 flex items-center gap-2">
            {saving
              ? <><span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>Guardando…</>
              : <><span className="material-symbols-outlined text-[16px]">save</span>Guardar testimonio</>
            }
          </button>
        </div>
      </form>
    </div>
  )
}
