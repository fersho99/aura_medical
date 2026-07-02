'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase'

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Mensaje = {
  id: string
  nombre: string
  email: string | null
  telefono: string | null
  mensaje: string
  leido: boolean
  created_at: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatFecha(iso: string) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-MX', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function waURL(telefono: string, nombre: string) {
  const num = telefono.replace(/\D/g, '')
  const msg = encodeURIComponent(`Hola ${nombre}, gracias por contactarnos en Aura Medical. ¿En qué le podemos ayudar?`)
  return `https://wa.me/${num}?text=${msg}`
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function MensajesPage() {
  const [mensajes,   setMensajes]   = useState<Mensaje[]>([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState('')
  const [expanded,   setExpanded]   = useState<string | null>(null)
  const [updating,   setUpdating]   = useState<string | null>(null)
  const [busqueda,   setBusqueda]   = useState('')
  const [filtroLeido, setFiltroLeido] = useState<'todos' | 'no_leido' | 'leido'>('todos')

  const supabase = createClient()

  const fetchMensajes = useCallback(async () => {
    setLoading(true)
    setError('')
    const { data, error: dbErr } = await supabase
      .from('mensajes_contacto')
      .select('*')
      .order('created_at', { ascending: false })
    if (dbErr) {
      console.error('[Mensajes] db.select:', dbErr)
      setError('No se pudieron cargar los mensajes.')
    } else {
      setMensajes(data ?? [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchMensajes()

    const channel = supabase
      .channel('mensajes-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mensajes_contacto' }, () => {
        fetchMensajes()
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [fetchMensajes])

  const marcarLeido = async (id: string, leido: boolean) => {
    setUpdating(id)
    const { error } = await supabase
      .from('mensajes_contacto')
      .update({ leido })
      .eq('id', id)
    if (!error) setMensajes(prev => prev.map(m => m.id === id ? { ...m, leido } : m))
    setUpdating(null)
  }

  const mensajesFiltrados = mensajes.filter(m => {
    if (filtroLeido === 'leido'    && !m.leido)  return false
    if (filtroLeido === 'no_leido' &&  m.leido)  return false
    if (busqueda) {
      const q = busqueda.toLowerCase()
      return (
        m.nombre.toLowerCase().includes(q) ||
        (m.email    ?? '').toLowerCase().includes(q) ||
        (m.telefono ?? '').includes(q)
      )
    }
    return true
  })

  const noLeidos = mensajes.filter(m => !m.leido).length

  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-gray-400">
      <span className="material-symbols-outlined text-[24px] animate-spin">progress_activity</span>
      Cargando mensajes…
    </div>
  )

  return (
    <div className="flex flex-col gap-6">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Mensajes de Contacto</h1>
          <p className="text-gray-400 mt-1 text-sm">
            {mensajes.length} mensaje{mensajes.length !== 1 ? 's' : ''} totales ·{' '}
            <span className="text-orange-400">{noLeidos} sin leer</span>
          </p>
        </div>
        <button
          onClick={fetchMensajes}
          className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm rounded-xl transition border border-gray-700"
        >
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
        <div className="relative flex-1 min-w-48">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 text-[16px]">search</span>
          <input
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, correo o teléfono…"
            className="w-full pl-9 pr-3 py-2 bg-gray-800 text-white text-sm rounded-xl border border-gray-700 focus:outline-none focus:border-teal-500 placeholder:text-gray-600"
          />
        </div>

        <select
          value={filtroLeido}
          onChange={e => setFiltroLeido(e.target.value as typeof filtroLeido)}
          className="px-3 py-2 bg-gray-800 text-white text-sm rounded-xl border border-gray-700 focus:outline-none focus:border-teal-500"
        >
          <option value="todos">Todos</option>
          <option value="no_leido">Sin leer</option>
          <option value="leido">Leídos</option>
        </select>

        {(busqueda || filtroLeido !== 'todos') && (
          <button
            onClick={() => { setBusqueda(''); setFiltroLeido('todos') }}
            className="px-3 py-2 text-sm text-gray-400 hover:text-white transition flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
            Limpiar
          </button>
        )}
      </div>

      {/* ── Lista ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        {mensajesFiltrados.length === 0 && (
          <div className="text-center py-16 text-gray-600">
            <span className="material-symbols-outlined text-[48px] block mb-3">inbox</span>
            No hay mensajes{filtroLeido !== 'todos' ? ' con ese filtro' : ''}
          </div>
        )}

        {mensajesFiltrados.map(m => (
          <MensajeCard
            key={m.id}
            mensaje={m}
            expanded={expanded === m.id}
            onToggle={() => {
              const abriendo = expanded !== m.id
              setExpanded(abriendo ? m.id : null)
              if (abriendo && !m.leido) marcarLeido(m.id, true)
            }}
            onMarcarLeido={marcarLeido}
            updating={updating === m.id}
          />
        ))}
      </div>

    </div>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function MensajeCard({ mensaje, expanded, onToggle, onMarcarLeido, updating }: {
  mensaje: Mensaje
  expanded: boolean
  onToggle: () => void
  onMarcarLeido: (id: string, leido: boolean) => void
  updating: boolean
}) {
  return (
    <div className={`bg-gray-900 border rounded-xl overflow-hidden transition ${
      !mensaje.leido ? 'border-teal-500/30' : 'border-gray-800 hover:border-gray-700'
    }`}>

      {/* Cabecera */}
      <button type="button" onClick={onToggle} className="w-full text-left px-4 py-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {!mensaje.leido && (
            <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0 mt-2" />
          )}
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className={`text-sm font-medium truncate ${mensaje.leido ? 'text-gray-300' : 'text-white'}`}>
                {mensaje.nombre}
              </p>
              {!mensaje.leido && (
                <span className="text-[10px] bg-teal-500/10 text-teal-400 border border-teal-500/20 px-1.5 py-0.5 rounded-full shrink-0">
                  Nuevo
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 truncate">{mensaje.mensaje}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <p className="text-xs text-gray-600 hidden sm:block">{formatFecha(mensaje.created_at)}</p>
          <span className={`material-symbols-outlined text-gray-500 text-[18px] transition-transform ${expanded ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </div>
      </button>

      {/* Detalle */}
      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-3 border-t border-gray-800 pt-3">

          {/* Fecha en móvil */}
          <p className="text-xs text-gray-600 sm:hidden">{formatFecha(mensaje.created_at)}</p>

          {/* Mensaje completo */}
          <div className="bg-gray-800/50 rounded-xl px-4 py-3">
            <p className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">{mensaje.mensaje}</p>
          </div>

          {/* Datos de contacto */}
          <div className="flex flex-col gap-1.5 text-xs text-gray-400">
            {mensaje.email && (
              <p className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">mail</span>
                {mensaje.email}
              </p>
            )}
            {mensaje.telefono && (
              <p className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">call</span>
                {mensaje.telefono}
              </p>
            )}
          </div>

          {/* Acciones */}
          <div className="flex flex-wrap gap-2">
            {mensaje.telefono && (
              <a
                href={waURL(mensaje.telefono, mensaje.nombre)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-lg hover:bg-[#25D366]/20 transition"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.532 5.854L.054 23.554a.75.75 0 0 0 .916.916l5.7-1.478A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.985 0-3.842-.58-5.407-1.582l-.385-.242-4 1.037 1.037-4-.242-.385A9.951 9.951 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Responder por WhatsApp
              </a>
            )}

            {mensaje.email && (
              <a
                href={`mailto:${mensaje.email}?subject=Re: Contacto Aura Medical`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition"
              >
                <span className="material-symbols-outlined text-[14px]">mail</span>
                Responder por correo
              </a>
            )}

            <button
              type="button"
              disabled={updating}
              onClick={() => onMarcarLeido(mensaje.id, !mensaje.leido)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-700/50 text-gray-400 border border-gray-700 rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[14px]">
                {mensaje.leido ? 'mark_email_unread' : 'mark_email_read'}
              </span>
              {updating ? 'Actualizando…' : mensaje.leido ? 'Marcar sin leer' : 'Marcar como leído'}
            </button>
          </div>

        </div>
      )}
    </div>
  )
}
