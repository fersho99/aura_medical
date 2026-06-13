'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

type Contenido = {
  id: string
  seccion: string
  clave: string
  valor: string
  tipo: string
}

const SECCIONES = [
  { key: 'hero',     label: 'Hero',       icon: 'image',          url: '/' },
  { key: 'nosotros', label: 'Nosotros',   icon: 'groups',         url: '/nosotros' },
  { key: 'contacto', label: 'Contacto',   icon: 'call',           url: '/contacto' },
  { key: 'redes',    label: 'Redes',      icon: 'share',          url: '/' },
  { key: 'footer',   label: 'Footer',     icon: 'article',        url: '/' },
]

const LABELS: Record<string, string> = {
  titulo: 'Título', subtitulo: 'Subtítulo',
  boton_principal: 'Botón Principal', boton_secundario: 'Botón Secundario',
  imagen: 'Imagen (URL)', telefono: 'Teléfono', email: 'Email',
  direccion: 'Dirección', whatsapp: 'WhatsApp', urgencias: 'Urgencias',
  horario: 'Horario de atención', facebook: 'Facebook (URL)',
  instagram: 'Instagram (URL)', youtube: 'YouTube (URL)', linkedin: 'LinkedIn (URL)',
  años_trayectoria: 'Años de trayectoria', especialistas: 'Especialistas',
  pacientes: 'Pacientes atendidos', satisfaccion: 'Satisfacción',
  descripcion: 'Descripción', copyright: 'Copyright',
}

const inputCls = 'w-full px-4 py-2.5 bg-gray-800 text-white text-sm rounded-xl border border-gray-700 focus:outline-none focus:border-teal-500 transition'

export default function ConfiguracionPage() {
  const [contenido,      setContenido]      = useState<Contenido[]>([])
  const [loading,        setLoading]        = useState(true)
  const [saving,         setSaving]         = useState<string | null>(null)
  const [saved,          setSaved]          = useState<string | null>(null)
  const [seccionActiva,  setSeccionActiva]  = useState('hero')
  const [previewKey,     setPreviewKey]     = useState(0)
  const [previewLoading, setPreviewLoading] = useState(true)
  const [origin,         setOrigin]         = useState('')
  const supabase = createClient()

  // origin solo disponible client-side
  useEffect(() => { setOrigin(window.location.origin) }, [])

  useEffect(() => { fetchContenido() }, [])

  const fetchContenido = async () => {
    const { data } = await supabase.from('contenido').select('*').order('seccion')
    setContenido(data || [])
    setLoading(false)
  }

  const handleChange = (id: string, valor: string) =>
    setContenido(prev => prev.map(item => item.id === id ? { ...item, valor } : item))

  const handleSave = async (item: Contenido) => {
    setSaving(item.id)
    await supabase
      .from('contenido')
      .update({ valor: item.valor, updated_at: new Date().toISOString() })
      .eq('id', item.id)
    await fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    setSaving(null)
    setSaved(item.id)
    // Refrescar preview ~1.5s después para que ISR revalide primero
    setTimeout(() => {
      setPreviewLoading(true)
      setPreviewKey(k => k + 1)
    }, 1500)
    setTimeout(() => setSaved(null), 2500)
  }

  const handleSeccion = (key: string) => {
    setSeccionActiva(key)
    setPreviewLoading(true)
    setPreviewKey(k => k + 1)
  }

  const seccionItems = contenido.filter(item => item.seccion === seccionActiva)
  const seccionInfo  = SECCIONES.find(s => s.key === seccionActiva)
  const previewUrl   = origin ? `${origin}${seccionInfo?.url ?? '/'}` : ''

  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-gray-400">
      <span className="material-symbols-outlined text-[24px] animate-spin">progress_activity</span>
      Cargando configuración…
    </div>
  )

  return (
    <div className="flex flex-col gap-5 h-full">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Configuración del sitio</h1>
        <p className="text-gray-400 mt-1 text-sm">Los cambios guardados se reflejan en el preview en ~1 segundo</p>
      </div>

      {/* Layout principal: editor + preview */}
      <div className="flex gap-5 flex-1 min-h-0">

        {/* ── Panel editor ──────────────────────────────────────────────── */}
        <div className="flex gap-4 w-[460px] shrink-0 flex-col overflow-y-auto pr-1">

          {/* Selector de sección */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-2 flex flex-col gap-0.5 shrink-0">
            {SECCIONES.map(s => (
              <button key={s.key} onClick={() => handleSeccion(s.key)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition flex items-center gap-3 ${
                  seccionActiva === s.key
                    ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent'
                }`}>
                <span className="material-symbols-outlined text-[18px] shrink-0"
                  style={{ fontVariationSettings: seccionActiva === s.key ? "'FILL' 1" : "'FILL' 0" }}>
                  {s.icon}
                </span>
                {s.label}
                {seccionActiva === s.key && (
                  <span className="ml-auto material-symbols-outlined text-[14px]">chevron_right</span>
                )}
              </button>
            ))}
          </div>

          {/* Campos de la sección activa */}
          {seccionItems.length === 0 ? (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center text-gray-500 text-sm">
              No hay campos configurados para esta sección.
              <p className="text-xs mt-1 text-gray-600">Asegúrate de haber ejecutado el SQL seed de la tabla <code className="bg-gray-800 px-1 rounded">contenido</code>.</p>
            </div>
          ) : (
            seccionItems.map(item => (
              <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 block">
                  {LABELS[item.clave] || item.clave}
                </label>

                {item.tipo === 'imagen' ? (
                  <div className="space-y-2">
                    <input value={item.valor || ''} onChange={e => handleChange(item.id, e.target.value)}
                      className={inputCls} placeholder="https://…" />
                    {item.valor && (
                      <img src={item.valor} alt="preview"
                        className="h-28 rounded-xl object-cover border border-gray-700" />
                    )}
                  </div>
                ) : item.clave === 'descripcion' || item.clave === 'subtitulo' || item.clave === 'horario' ? (
                  <textarea value={item.valor || ''} onChange={e => handleChange(item.id, e.target.value)}
                    rows={3} className={`${inputCls} resize-none`} />
                ) : (
                  <input value={item.valor || ''} onChange={e => handleChange(item.id, e.target.value)}
                    className={inputCls} />
                )}

                <div className="flex justify-end mt-3">
                  <button onClick={() => handleSave(item)} disabled={!!saving}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition flex items-center gap-1.5 disabled:opacity-50 ${
                      saved === item.id
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-teal-500 hover:bg-teal-400 text-white'
                    }`}>
                    {saving === item.id
                      ? <><span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>Guardando…</>
                      : saved === item.id
                        ? <><span className="material-symbols-outlined text-[16px]">check</span>Guardado</>
                        : <><span className="material-symbols-outlined text-[16px]">save</span>Guardar</>
                    }
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Panel preview ────────────────────────────────────────────── */}
        <div className="hidden xl:flex flex-col flex-1 min-w-0 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

          {/* Barra del "navegador" */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-800 bg-gray-900 shrink-0">
            {/* Dots decorativos */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-gray-700" />
              <span className="w-3 h-3 rounded-full bg-gray-700" />
              <span className="w-3 h-3 rounded-full bg-gray-700" />
            </div>

            {/* URL bar */}
            <div className="flex-1 bg-gray-800 rounded-lg px-3 py-1.5 text-xs text-gray-400 font-mono truncate border border-gray-700">
              {previewUrl || '…'}
            </div>

            {/* Actualizar */}
            <button
              onClick={() => { setPreviewLoading(true); setPreviewKey(k => k + 1) }}
              title="Actualizar preview"
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-800 hover:text-white transition shrink-0">
              <span className={`material-symbols-outlined text-[18px] ${previewLoading ? 'animate-spin' : ''}`}>
                refresh
              </span>
            </button>

            {/* Abrir en pestaña */}
            {previewUrl && (
              <a href={previewUrl} target="_blank" rel="noopener noreferrer"
                title="Abrir en nueva pestaña"
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-800 hover:text-white transition shrink-0">
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </a>
            )}
          </div>

          {/* iframe */}
          <div className="flex-1 relative bg-gray-950">
            {previewLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-950 z-10">
                <div className="flex flex-col items-center gap-3 text-gray-500">
                  <span className="material-symbols-outlined text-[36px] animate-spin">progress_activity</span>
                  <span className="text-sm">Cargando preview…</span>
                </div>
              </div>
            )}
            {previewUrl && (
              <iframe
                key={previewKey}
                src={previewUrl}
                className="w-full h-full border-0"
                style={{ minHeight: '500px' }}
                onLoad={() => setPreviewLoading(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
