'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { sanitizeText } from '@/lib/validators'

const inputCls = 'w-full mt-1 px-4 py-2.5 bg-gray-800 text-white text-sm rounded-xl border border-gray-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition placeholder:text-gray-600 disabled:opacity-50'
const labelCls = 'text-xs font-medium text-gray-400 uppercase tracking-wider'

const ESTADOS = ['pendiente', 'confirmada', 'completada', 'cancelada'] as const
type Estado = typeof ESTADOS[number]

const ESTADO_COLORS: Record<Estado, string> = {
  pendiente:  'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  confirmada: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  completada: 'bg-green-500/10 text-green-400 border-green-500/20',
  cancelada:  'bg-red-500/10 text-red-400 border-red-500/20',
}

export default function DetalleCitaPage() {
  const router   = useRouter()
  const params   = useParams()
  const id       = params.id as string
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [error,   setError]   = useState('')
  const [raw,     setRaw]     = useState<Record<string, any> | null>(null)

  const [form, setForm] = useState({
    estado: 'pendiente' as Estado,
    notas_admin: '',
  })

  useEffect(() => {
    const fetch = async () => {
      const { data, error: dbErr } = await supabase
        .from('citas')
        .select('*')
        .eq('id', id)
        .single()
      if (dbErr || !data) {
        console.error('[Citas] db.select:', dbErr)
        setError('No se encontró la cita.')
      } else {
        setRaw(data)
        setForm({
          estado:      (data.estado as Estado) ?? 'pendiente',
          notas_admin: data.notas_admin ?? '',
        })
      }
      setLoading(false)
    }
    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const onChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    setSaving(true)
    const { error: dbErr } = await supabase
      .from('citas')
      .update({
        estado:      form.estado,
        notas_admin: sanitizeText(form.notas_admin, 500),
      })
      .eq('id', id)
    if (dbErr) {
      console.error('[Citas] db.update:', dbErr)
      setError('No se pudo guardar. Inténtalo de nuevo.')
    } else {
      router.push('/admin/citas')
    }
    setSaving(false)
  }

  const getNombre = () => raw?.nombre_paciente || raw?.nombre || '—'
  const getTelefono = () => raw?.telefono || ''
  const getEmail   = () => raw?.email || raw?.correo || ''
  const getEsp     = () => raw?.especialidad || raw?.area || ''
  const getHorario = () => raw?.horario || ''
  const getDetalles= () => raw?.notas || raw?.motivo || raw?.detalles || ''
  const getFecha   = () => {
    const iso = raw?.fecha_preferida || raw?.created_at || ''
    return iso ? new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'
  }

  const waURL = () => {
    const num = getTelefono().replace(/\D/g, '')
    const msg = encodeURIComponent(`Hola ${getNombre()}, le contactamos de Aura Medical sobre su cita médica.`)
    return `https://wa.me/${num}?text=${msg}`
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-gray-400">
      <span className="material-symbols-outlined text-[24px] animate-spin">progress_activity</span>
      Cargando…
    </div>
  )

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/citas"
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">Detalle de cita</h1>
          <p className="text-gray-400 text-sm">{getNombre()}</p>
        </div>
      </div>

      {/* Datos del paciente (solo lectura) */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-4 mb-4">
        <h2 className="text-white font-semibold text-sm">Datos del paciente</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className={`${labelCls} mb-1`}>Nombre</p>
            <p className="text-white">{getNombre()}</p>
          </div>
          <div>
            <p className={`${labelCls} mb-1`}>Teléfono</p>
            <div className="flex items-center gap-2">
              <p className="text-white">{getTelefono() || '—'}</p>
              {getTelefono() && (
                <a href={waURL()} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-lg hover:bg-[#25D366]/20 transition">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.532 5.854L.054 23.554a.75.75 0 0 0 .916.916l5.7-1.478A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.985 0-3.842-.58-5.407-1.582l-.385-.242-4 1.037 1.037-4-.242-.385A9.951 9.951 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  WhatsApp
                </a>
              )}
            </div>
          </div>
          {getEmail() && (
            <div>
              <p className={`${labelCls} mb-1`}>Email</p>
              <p className="text-white">{getEmail()}</p>
            </div>
          )}
          <div>
            <p className={`${labelCls} mb-1`}>Especialidad / Área</p>
            <p className="text-white">{getEsp() || '—'}</p>
          </div>
          <div>
            <p className={`${labelCls} mb-1`}>Horario preferido</p>
            <p className="text-white capitalize">{getHorario() || '—'}</p>
          </div>
          <div>
            <p className={`${labelCls} mb-1`}>Fecha preferida</p>
            <p className="text-white">{getFecha()}</p>
          </div>
        </div>

        {getDetalles() && (
          <div>
            <p className={`${labelCls} mb-1`}>Motivo / Detalles</p>
            <p className="text-white text-sm bg-gray-800 rounded-xl p-3">{getDetalles()}</p>
          </div>
        )}
      </div>

      {/* Estado + notas admin (editable) */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-4">
          <h2 className="text-white font-semibold text-sm">Gestión de la cita</h2>

          <div>
            <label className={labelCls}>Estado</label>
            <select name="estado" value={form.estado} onChange={onChange}
              disabled={saving} className={`${inputCls} appearance-none`}>
              {ESTADOS.map(e => (
                <option key={e} value={e} className="capitalize">{e.charAt(0).toUpperCase() + e.slice(1)}</option>
              ))}
            </select>
            <div className="mt-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${ESTADO_COLORS[form.estado]}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {form.estado.charAt(0).toUpperCase() + form.estado.slice(1)}
              </span>
            </div>
          </div>

          <div>
            <label className={labelCls}>Notas internas del equipo</label>
            <textarea name="notas_admin" value={form.notas_admin} onChange={onChange}
              rows={3} maxLength={500} disabled={saving}
              placeholder="Observaciones, preferencias del paciente, instrucciones para el médico…"
              className={`${inputCls} resize-none`} />
            <p className="text-gray-600 text-xs text-right mt-1">{form.notas_admin.length}/500</p>
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
              : <><span className="material-symbols-outlined text-[18px]">save</span>Guardar cambios</>
            }
          </button>
          <Link href="/admin/citas"
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm rounded-xl transition border border-gray-700">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
