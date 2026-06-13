'use client'

import { useEffect, useRef, useState } from 'react'

const ICONS = [
  // Medicina & salud
  'favorite', 'medical_services', 'local_hospital', 'emergency', 'health_and_safety',
  'medication', 'vaccines', 'monitor_heart', 'stethoscope', 'biotech',
  'science', 'psychology', 'precision_manufacturing', 'devices', 'bloodtype',
  'healing', 'local_pharmacy', 'spa', 'fitness_center', 'self_improvement',
  // Personas & servicio
  'person', 'groups', 'group', 'family_restroom', 'support_agent',
  'verified_user', 'badge', 'supervisor_account', 'manage_accounts', 'contacts',
  // Tecnología
  'computer', 'memory', 'hub', 'device_hub', 'camera',
  'videocam', 'mic', 'sensors', 'smart_display', 'wifi',
  // Edificio & instalaciones
  'domain', 'apartment', 'home', 'corporate_fare', 'store',
  'meeting_room', 'bed', 'elevator', 'accessible', 'wheelchair_pickup',
  // Comunicación
  'call', 'mail', 'message', 'chat', 'forum',
  'smartphone', 'phone_in_talk', 'headset_mic', 'notifications', 'share',
  // Calidad & logros
  'check_circle', 'task_alt', 'done_all', 'verified', 'new_releases',
  'star', 'workspace_premium', 'emoji_events', 'award_star', 'military_tech',
  'shield', 'lock', 'security', 'privacy_tip', 'gpp_good',
  // Navegación & UI
  'arrow_forward', 'open_in_new', 'launch', 'link', 'search',
  'info', 'help', 'warning', 'settings', 'tune',
  'edit', 'add_circle', 'remove_circle', 'close', 'menu',
  // Tiempo & calendario
  'calendar_month', 'schedule', 'timer', 'hourglass_empty', 'alarm',
  'event', 'today', 'date_range', 'history', 'update',
  // Global & ubicación
  'public', 'language', 'location_on', 'map', 'near_me',
  'directions', 'navigation', 'travel_explore', 'globe_uk', 'explore',
  // Contenido & documentos
  'article', 'description', 'assignment', 'content_paste', 'list_alt',
  'lightbulb', 'bolt', 'flash_on', 'image', 'photo',
  // Bienestar & estilo de vida
  'water_drop', 'air', 'light_mode', 'directions_run', 'directions_walk',
  'restaurant', 'nightlight', 'volunteer_activism', 'cardiology', 'ecg',
] as const

export default function IconPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [open,   setOpen]   = useState(false)
  const [search, setSearch] = useState('')
  const popRef = useRef<HTMLDivElement>(null)

  const filtered = search.trim()
    ? ICONS.filter(i => i.includes(search.toLowerCase().replace(/\s+/g, '_')))
    : ICONS

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="relative" ref={popRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => { setOpen(o => !o); setSearch('') }}
        className="w-full flex items-center gap-3 px-4 py-2.5 bg-gray-800 text-white text-sm rounded-xl border border-gray-700 hover:border-teal-500 transition"
      >
        {value ? (
          <>
            <span className="material-symbols-outlined text-teal-400 text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}>
              {value}
            </span>
            <span className="flex-1 text-left text-gray-300">{value}</span>
          </>
        ) : (
          <span className="flex-1 text-left text-gray-600">Seleccionar ícono…</span>
        )}
        <span className="material-symbols-outlined text-gray-500 text-[18px]">
          {open ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute z-50 top-full mt-1 left-0 right-0 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-gray-800">
            <input
              autoFocus
              type="text"
              placeholder="Buscar ícono…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white text-sm rounded-xl border border-gray-700 focus:outline-none focus:border-teal-500 placeholder-gray-600"
            />
          </div>

          {/* Grid */}
          <div className="overflow-y-auto max-h-64 p-3 grid grid-cols-7 gap-1">
            {filtered.length === 0 ? (
              <p className="col-span-6 text-center text-gray-600 text-xs py-4">Sin resultados</p>
            ) : (
              filtered.map(icon => (
                <button
                  key={icon}
                  type="button"
                  title={icon}
                  onClick={() => { onChange(icon); setOpen(false); setSearch('') }}
                  className={`flex items-center justify-center p-2 rounded-xl transition ${
                    value === icon
                      ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]"
                    style={{ fontVariationSettings: value === icon ? "'FILL' 1" : "'FILL' 0" }}>
                    {icon}
                  </span>
                </button>
              ))
            )}
          </div>

          {/* Selected name footer */}
          {value && (
            <div className="px-4 py-2 border-t border-gray-800 flex items-center justify-between">
              <span className="text-xs text-gray-500">{value}</span>
              <button
                type="button"
                onClick={() => { onChange(''); setOpen(false) }}
                className="text-xs text-red-400 hover:text-red-300 transition"
              >
                Quitar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
