'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// ─── Tipos ────────────────────────────────────────────────────────────────────

// La tabla citas puede tener dos esquemas distintos dependiendo de cuándo fue creada.
// Normalizamos ambos en CitaNorm para que el Kanban funcione siempre.
type CitaRaw = Record<string, any>

type CitaNorm = {
  id: string
  nombre: string
  telefono: string
  email: string
  especialidad: string
  horario: string
  detalles: string
  estado: string
  fecha: string
  created_at: string
  notas_admin: string
}

function normalize(raw: CitaRaw): CitaNorm {
  return {
    id:           raw.id,
    nombre:       raw.nombre_paciente || raw.nombre       || '—',
    telefono:     raw.telefono                            || '',
    email:        raw.email           || raw.correo       || '',
    especialidad: raw.especialidad    || raw.area         || '',
    horario:      raw.horario                             || '',
    detalles:     raw.notas           || raw.motivo       || raw.detalles || '',
    estado:       raw.estado                              || 'pendiente',
    fecha:        raw.fecha_preferida || raw.created_at   || '',
    created_at:   raw.created_at                          || '',
    notas_admin:  raw.notas_admin                         || '',
  }
}

// ─── Constantes ───────────────────────────────────────────────────────────────

type Estado = 'pendiente' | 'confirmada' | 'completada' | 'cancelada'

const COLUMNAS: { id: Estado; label: string; color: string; dot: string }[] = [
  { id: 'pendiente',  label: 'Pendiente',  color: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400', dot: 'bg-yellow-400' },
  { id: 'confirmada', label: 'Confirmada', color: 'bg-teal-500/10 border-teal-500/20 text-teal-400',       dot: 'bg-teal-400' },
  { id: 'completada', label: 'Completada', color: 'bg-green-500/10 border-green-500/20 text-green-400',    dot: 'bg-green-400' },
]

const HORARIO_LABEL: Record<string, string> = {
  manana: 'Mañana', tarde: 'Tarde', flexible: 'Flexible',
}

function formatFecha(iso: string) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
}

function waURL(telefono: string, nombre: string) {
  const num = telefono.replace(/\D/g, '')
  const msg = encodeURIComponent(`Hola ${nombre}, le contactamos de Aura Medical para confirmar su cita médica. ¿Podría confirmarnos su disponibilidad?`)
  return `https://wa.me/${num}?text=${msg}`
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function CitasKanbanPage() {
  const [citas,     setCitas]     = useState<CitaNorm[]>([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState('')
  const [expanded,  setExpanded]  = useState<string | null>(null)
  const [updating,  setUpdating]  = useState<string | null>(null)
  const [notasEdit, setNotasEdit] = useState<Record<string, string>>({})

  // ── Filtros ────────────────────────────────────────────────────────────────
  const [filtroEstado,       setFiltroEstado]       = useState<Estado | 'todas'>('todas')
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('')
  const [filtroFechaDesde,   setFiltroFechaDesde]   = useState('')
  const [filtroFechaHasta,   setFiltroFechaHasta]   = useState('')
  const [busqueda,           setBusqueda]           = useState('')

  const supabase = createClient()

  // ── Fetch + suscripción en tiempo real ────────────────────────────────────
  const fetchCitas = useCallback(async () => {
    setLoading(true)
    setError('')
    const { data, error: dbErr } = await supabase
      .from('citas')
      .select('*')
      .order('created_at', { ascending: false })
    if (dbErr) {
      console.error('[Citas] db.select:', dbErr)
      setError('No se pudieron cargar las citas.')
    } else {
      setCitas((data ?? []).map(normalize))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchCitas()

    const channel = supabase
      .channel('citas-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'citas' }, () => {
        fetchCitas()
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [fetchCitas])

  // ── Cambiar estado ─────────────────────────────────────────────────────────
  const cambiarEstado = async (id: string, nuevoEstado: Estado) => {
    setUpdating(id)
    const { error } = await supabase
      .from('citas')
      .update({ estado: nuevoEstado })
      .eq('id', id)
    if (error) console.error('[Citas] update estado:', error)
    else setCitas(prev => prev.map(c => c.id === id ? { ...c, estado: nuevoEstado } : c))
    setUpdating(null)
  }

  // ── Guardar notas del admin ────────────────────────────────────────────────
  const guardarNotas = async (id: string) => {
    setUpdating(id)
    const notas = notasEdit[id] ?? ''
    const { error } = await supabase
      .from('citas')
      .update({ notas_admin: notas })
      .eq('id', id)
    if (error) console.error('[Citas] update notas:', error)
    else setCitas(prev => prev.map(c => c.id === id ? { ...c, notas_admin: notas } : c))
    setUpdating(null)
  }

  // ── Filtrar citas ─────────────────────────────────────────────────────────
  const citasFiltradas = citas.filter(c => {
    if (filtroEstado !== 'todas' && c.estado !== filtroEstado) return false
    if (filtroEspecialidad && !c.especialidad.toLowerCase().includes(filtroEspecialidad.toLowerCase())) return false
    if (busqueda && !c.nombre.toLowerCase().includes(busqueda.toLowerCase()) && !c.telefono.includes(busqueda)) return false
    if (filtroFechaDesde && c.fecha && c.fecha < filtroFechaDesde) return false
    if (filtroFechaHasta && c.fecha && c.fecha > filtroFechaHasta + 'T23:59:59') return false
    return true
  })

  const citasPorEstado = (estado: Estado) => citasFiltradas.filter(c => c.estado === estado)
  const canceladas     = citasFiltradas.filter(c => c.estado === 'cancelada')

  // ── Obtener especialidades únicas para el filtro ───────────────────────────
  const especialidades = Array.from(new Set(citas.map(c => c.especialidad).filter(Boolean))).sort()

  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-gray-400">
      <span className="material-symbols-outlined text-[24px] animate-spin">progress_activity</span>
      Cargando citas…
    </div>
  )

  return (
    <div className="flex flex-col gap-6">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Citas</h1>
          <p className="text-gray-400 mt-1 text-sm">
            {citas.length} cita{citas.length !== 1 ? 's' : ''} totales ·{' '}
            <span className="text-yellow-400">{citas.filter(c => c.estado === 'pendiente').length} pendientes</span>
          </p>
        </div>
        <button onClick={fetchCitas}
          className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm rounded-xl transition border border-gray-700">
          <span className="material-symbols-outlined text-[16px]">refresh</span>
          Actualizar
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <span className="material-symbols-outlined text-red-400 text-[18px] shrink-0">error</span>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* ── Filtros ─────────────────────────────────────────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-wrap gap-3">
        {/* Búsqueda */}
        <div className="relative flex-1 min-w-48">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 text-[16px]">search</span>
          <input
            value={busqueda} onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o teléfono…"
            className="w-full pl-9 pr-3 py-2 bg-gray-800 text-white text-sm rounded-xl border border-gray-700 focus:outline-none focus:border-teal-500 placeholder:text-gray-600"
          />
        </div>

        {/* Estado */}
        <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value as any)}
          className="px-3 py-2 bg-gray-800 text-white text-sm rounded-xl border border-gray-700 focus:outline-none focus:border-teal-500">
          <option value="todas">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </select>

        {/* Especialidad */}
        <select value={filtroEspecialidad} onChange={e => setFiltroEspecialidad(e.target.value)}
          className="px-3 py-2 bg-gray-800 text-white text-sm rounded-xl border border-gray-700 focus:outline-none focus:border-teal-500">
          <option value="">Todas las especialidades</option>
          {especialidades.map(e => <option key={e} value={e}>{e}</option>)}
        </select>

        {/* Fechas */}
        <input type="date" value={filtroFechaDesde} onChange={e => setFiltroFechaDesde(e.target.value)}
          className="px-3 py-2 bg-gray-800 text-gray-400 text-sm rounded-xl border border-gray-700 focus:outline-none focus:border-teal-500" />
        <input type="date" value={filtroFechaHasta} onChange={e => setFiltroFechaHasta(e.target.value)}
          className="px-3 py-2 bg-gray-800 text-gray-400 text-sm rounded-xl border border-gray-700 focus:outline-none focus:border-teal-500" />

        {/* Limpiar filtros */}
        {(busqueda || filtroEstado !== 'todas' || filtroEspecialidad || filtroFechaDesde || filtroFechaHasta) && (
          <button onClick={() => { setBusqueda(''); setFiltroEstado('todas'); setFiltroEspecialidad(''); setFiltroFechaDesde(''); setFiltroFechaHasta('') }}
            className="px-3 py-2 text-sm text-gray-400 hover:text-white transition flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">close</span>
            Limpiar
          </button>
        )}
      </div>

      {/* ── Kanban ──────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {COLUMNAS.map(col => {
          const items = citasPorEstado(col.id)
          return (
            <div key={col.id} className="flex flex-col gap-3">
              {/* Cabecera de columna */}
              <div className={`flex items-center justify-between px-4 py-2.5 rounded-xl border ${col.color}`}>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                  <span className="font-semibold text-sm">{col.label}</span>
                </div>
                <span className="text-xs font-mono opacity-70">{items.length}</span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2 min-h-24">
                {items.length === 0 && (
                  <div className="text-center py-8 text-gray-600 text-sm border-2 border-dashed border-gray-800 rounded-xl">
                    Sin citas {col.label.toLowerCase()}s
                  </div>
                )}

                {items.map(cita => (
                  <CitaCard
                    key={cita.id}
                    cita={cita}
                    columna={col.id}
                    expanded={expanded === cita.id}
                    onToggle={() => setExpanded(expanded === cita.id ? null : cita.id)}
                    onCambiarEstado={cambiarEstado}
                    updating={updating === cita.id}
                    notaEdit={notasEdit[cita.id] ?? cita.notas_admin}
                    onNotaChange={val => setNotasEdit(p => ({ ...p, [cita.id]: val }))}
                    onGuardarNotas={() => guardarNotas(cita.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Canceladas (sección al fondo) ─────────────────────────────────── */}
      {canceladas.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-4 py-2.5 rounded-xl border bg-red-500/10 border-red-500/20 text-red-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="font-semibold text-sm">Canceladas</span>
            </div>
            <span className="text-xs font-mono opacity-70">{canceladas.length}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {canceladas.map(cita => (
              <CitaCard
                key={cita.id}
                cita={cita}
                columna="cancelada"
                expanded={expanded === cita.id}
                onToggle={() => setExpanded(expanded === cita.id ? null : cita.id)}
                onCambiarEstado={cambiarEstado}
                updating={updating === cita.id}
                notaEdit={notasEdit[cita.id] ?? cita.notas_admin}
                onNotaChange={val => setNotasEdit(p => ({ ...p, [cita.id]: val }))}
                onGuardarNotas={() => guardarNotas(cita.id)}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

// ─── Componente CitaCard ──────────────────────────────────────────────────────

function CitaCard({
  cita, columna, expanded, onToggle,
  onCambiarEstado, updating,
  notaEdit, onNotaChange, onGuardarNotas,
}: {
  cita: CitaNorm
  columna: Estado | 'cancelada'
  expanded: boolean
  onToggle: () => void
  onCambiarEstado: (id: string, estado: Estado) => void
  updating: boolean
  notaEdit: string
  onNotaChange: (val: string) => void
  onGuardarNotas: () => void
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition">
      {/* Cabecera del card */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left px-4 py-3 flex items-start justify-between gap-3"
      >
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">{cita.nombre}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {cita.especialidad && (
              <span className="text-xs bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded-full">
                {cita.especialidad}
              </span>
            )}
            {cita.horario && (
              <span className="text-xs text-gray-500">{HORARIO_LABEL[cita.horario] ?? cita.horario}</span>
            )}
          </div>
          <p className="text-xs text-gray-500">{formatFecha(cita.fecha)}</p>
        </div>
        <span className={`material-symbols-outlined text-gray-500 text-[18px] shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {/* Detalle expandible */}
      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-3 border-t border-gray-800 pt-3">

          {/* Datos del paciente */}
          <div className="grid grid-cols-1 gap-1.5 text-xs text-gray-400">
            {cita.telefono && (
              <p className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">call</span>
                {cita.telefono}
              </p>
            )}
            {cita.email && (
              <p className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">mail</span>
                {cita.email}
              </p>
            )}
            {cita.detalles && (
              <p className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-[14px] mt-0.5">notes</span>
                <span className="text-gray-300">{cita.detalles}</span>
              </p>
            )}
          </div>

          {/* Notas del admin */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500 uppercase tracking-wider">Notas internas</label>
            <textarea
              value={notaEdit}
              onChange={e => onNotaChange(e.target.value)}
              rows={2}
              maxLength={500}
              placeholder="Observaciones para el equipo…"
              disabled={updating}
              className="w-full px-3 py-2 bg-gray-800 text-white text-xs rounded-lg border border-gray-700 focus:outline-none focus:border-teal-500 resize-none disabled:opacity-50"
            />
            <button
              type="button"
              onClick={onGuardarNotas}
              disabled={updating}
              className="self-end text-xs text-teal-400 hover:text-teal-300 transition disabled:opacity-50">
              {updating ? 'Guardando…' : 'Guardar nota'}
            </button>
          </div>

          {/* Acciones */}
          <div className="flex flex-wrap gap-2">
            {/* WhatsApp */}
            {cita.telefono && (
              <a href={waURL(cita.telefono, cita.nombre)} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-lg hover:bg-[#25D366]/20 transition">
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.532 5.854L.054 23.554a.75.75 0 0 0 .916.916l5.7-1.478A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.985 0-3.842-.58-5.407-1.582l-.385-.242-4 1.037 1.037-4-.242-.385A9.951 9.951 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Contactar
              </a>
            )}

            {/* Transiciones de estado */}
            {columna === 'pendiente' && (
              <>
                <button type="button" disabled={updating}
                  onClick={() => onCambiarEstado(cita.id, 'confirmada')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-lg hover:bg-teal-500/20 transition disabled:opacity-50">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  Confirmar
                </button>
                <button type="button" disabled={updating}
                  onClick={() => onCambiarEstado(cita.id, 'cancelada')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition disabled:opacity-50">
                  <span className="material-symbols-outlined text-[14px]">close</span>
                  Cancelar
                </button>
              </>
            )}

            {columna === 'confirmada' && (
              <>
                <button type="button" disabled={updating}
                  onClick={() => onCambiarEstado(cita.id, 'completada')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition disabled:opacity-50">
                  <span className="material-symbols-outlined text-[14px]">task_alt</span>
                  Completar
                </button>
                <button type="button" disabled={updating}
                  onClick={() => onCambiarEstado(cita.id, 'pendiente')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-700/50 text-gray-400 border border-gray-700 rounded-lg hover:bg-gray-700 transition disabled:opacity-50">
                  <span className="material-symbols-outlined text-[14px]">undo</span>
                  Volver a pendiente
                </button>
                <button type="button" disabled={updating}
                  onClick={() => onCambiarEstado(cita.id, 'cancelada')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition disabled:opacity-50">
                  <span className="material-symbols-outlined text-[14px]">close</span>
                  Cancelar
                </button>
              </>
            )}

            {columna === 'completada' && (
              <span className="text-xs text-gray-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Cita finalizada
              </span>
            )}

            {columna === 'cancelada' && (
              <button type="button" disabled={updating}
                onClick={() => onCambiarEstado(cita.id, 'pendiente')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-700/50 text-gray-400 border border-gray-700 rounded-lg hover:bg-gray-700 transition disabled:opacity-50">
                <span className="material-symbols-outlined text-[14px]">replay</span>
                Reactivar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
