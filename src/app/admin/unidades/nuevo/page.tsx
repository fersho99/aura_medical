'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { sanitizeText, isValidName } from '@/lib/validators'

const inputCls = 'w-full mt-1 px-4 py-2.5 bg-gray-800 text-white text-sm rounded-xl border border-gray-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition placeholder:text-gray-600 disabled:opacity-50'
const labelCls = 'text-xs font-medium text-gray-400 uppercase tracking-wider'

export default function NuevaUnidadPage() {
  const router   = useRouter()
  const supabase = createClient()

  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState('')
  const [form, setForm] = useState({
    nombre: '', slug: '', descripcion: '', imagen_url: '', icono: '', activo: true, orden: 0,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(p => ({
      ...p,
      [name]: value,
      ...(name === 'nombre' ? { slug: value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') } : {}),
    }))
    setError('')
  }

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    setError('')

    const nombre      = sanitizeText(form.nombre, 100)
    const slug        = sanitizeText(form.slug, 100).replace(/[^a-z0-9-]/g, '')
    const descripcion = sanitizeText(form.descripcion, 1000)
    const imagen_url  = sanitizeText(form.imagen_url, 500)
    const icono       = sanitizeText(form.icono, 100)

    if (!isValidName(nombre)) return setError('El nombre contiene caracteres no válidos.')
    if (!slug)                return setError('El slug no puede estar vacío.')

    setSaving(true)
    const { error: dbErr } = await supabase
      .from('unidades')
      .insert([{ nombre, slug, descripcion, imagen_url, icono, activo: form.activo, orden: Number(form.orden) }])

    if (dbErr) {
      console.error('[Unidades] db.insert:', dbErr)
      setError(dbErr.code === '23505' ? 'Ya existe una unidad con ese slug.' : 'No se pudo guardar. Inténtalo de nuevo.')
      setSaving(false)
      return
    }

    await fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    router.push('/admin/unidades')
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/unidades"
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">Nueva unidad médica</h1>
          <p className="text-gray-400 text-sm">Agrega una unidad al catálogo</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-4">

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Nombre *</label>
              <input name="nombre" value={form.nombre} onChange={onChange}
                required maxLength={100} disabled={saving} className={inputCls}
                placeholder="Baby Port" />
            </div>
            <div>
              <label className={labelCls}>Slug (URL)</label>
              <input name="slug" value={form.slug} onChange={onChange}
                required maxLength={100} disabled={saving} className={inputCls}
                placeholder="baby-port" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Descripción</label>
            <textarea name="descripcion" value={form.descripcion} onChange={onChange}
              rows={3} maxLength={1000} disabled={saving} className={`${inputCls} resize-none`} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>URL de imagen</label>
              <input name="imagen_url" value={form.imagen_url} onChange={onChange}
                maxLength={500} disabled={saving} className={inputCls}
                placeholder="/imagenes/uci.png" />
            </div>
            <div>
              <label className={labelCls}>Icono (Material)</label>
              <input name="icono" value={form.icono} onChange={onChange}
                maxLength={100} disabled={saving} className={inputCls}
                placeholder="local_hospital" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Orden</label>
              <input name="orden" type="number" value={form.orden} onChange={onChange}
                min={0} max={99} disabled={saving} className={inputCls} />
            </div>
            <div className="flex items-center justify-between bg-gray-800/50 rounded-xl px-4 py-3 mt-1">
              <span className={labelCls}>Estado</span>
              <button type="button" disabled={saving}
                onClick={() => setForm(p => ({ ...p, activo: !p.activo }))}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition border ${
                  form.activo
                    ? 'bg-teal-500/10 text-teal-400 border-teal-500/20'
                    : 'bg-gray-700/50 text-gray-400 border-gray-700'
                }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${form.activo ? 'bg-teal-400' : 'bg-gray-500'}`} />
                {form.activo ? 'Activa' : 'Inactiva'}
              </button>
            </div>
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
              ? <><span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>Guardando…</>
              : <><span className="material-symbols-outlined text-[18px]">save</span>Guardar unidad</>
            }
          </button>
          <Link href="/admin/unidades"
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm rounded-xl transition border border-gray-700">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
