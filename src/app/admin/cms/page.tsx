'use client'

import { useEffect, useState } from 'react'
import { useCmsSection } from '@/hooks/use-cms-section'
import SitePreview           from './components/SitePreview'
import SeccionHero           from './components/SeccionHero'
import SeccionNosotros       from './components/SeccionNosotros'
import SeccionContacto       from './components/SeccionContacto'
import SeccionRedes          from './components/SeccionRedes'
import SeccionFooter         from './components/SeccionFooter'
import SeccionElegirnos      from './components/SeccionElegirnos'
import SeccionTecnologia     from './components/SeccionTecnologia'
import SeccionInfraestructura from './components/SeccionInfraestructura'
import SeccionPremium        from './components/SeccionPremium'
import SeccionAcciones       from './components/SeccionAcciones'
import SeccionEspHero        from './components/SeccionEspHero'
import SeccionUniHero        from './components/SeccionUniHero'
import SeccionNoticiasHero   from './components/SeccionNoticiasHero'
import SeccionNosotrosValores from './components/SeccionNosotrosValores'

type SeccionKey =
  | 'hero' | 'elegirnos' | 'tecnologia' | 'infraestructura' | 'premium' | 'acciones'
  | 'nosotros' | 'nosotros_valores' | 'contacto' | 'redes' | 'footer'
  | 'esp_hero' | 'uni_hero' | 'noticias_hero'

const ESTRUCTURA_CMS: {
  pagina: string
  icono:  string
  secciones: { key: SeccionKey; label: string; path: string; hash: string }[]
}[] = [
  { pagina: 'Home', icono: 'home', secciones: [
    { key: 'hero',            label: 'Hero principal',    path: '/',             hash: '#hero'      },
    { key: 'elegirnos',       label: 'Por qué Aura',      path: '/',             hash: '#elegirnos' },
    { key: 'acciones',        label: 'Acciones rápidas',  path: '/',             hash: ''           },
    { key: 'tecnologia',      label: 'Vanguardia Tec.',   path: '/',             hash: ''           },
    { key: 'infraestructura', label: 'Infraestructura',   path: '/',             hash: ''           },
    { key: 'premium',         label: 'Premium Club',      path: '/',             hash: ''           },
  ]},
  { pagina: 'Nosotros', icono: 'groups', secciones: [
    { key: 'nosotros',         label: 'Hero + Estadísticas', path: '/nosotros', hash: ''        },
    { key: 'nosotros_valores', label: 'Nuestros Valores',    path: '/nosotros', hash: '#valores' },
  ]},
  { pagina: 'Especialidades', icono: 'medical_services', secciones: [
    { key: 'esp_hero', label: 'Hero', path: '/especialidades', hash: '' },
  ]},
  { pagina: 'Unidades', icono: 'corporate_fare', secciones: [
    { key: 'uni_hero', label: 'Hero', path: '/unidades', hash: '' },
  ]},
  { pagina: 'Noticias', icono: 'newspaper', secciones: [
    { key: 'noticias_hero', label: 'Hero', path: '/noticias', hash: '' },
  ]},
  { pagina: 'Contacto', icono: 'call', secciones: [
    { key: 'contacto', label: 'Hero + Datos', path: '/contacto', hash: '' },
  ]},
  { pagina: 'Global', icono: 'settings', secciones: [
    { key: 'redes',  label: 'Redes sociales', path: '/', hash: '#footer' },
    { key: 'footer', label: 'Footer',          path: '/', hash: '#footer' },
  ]},
]

const TODAS_SECCIONES = ESTRUCTURA_CMS.flatMap(g => g.secciones)

function SkeletonForm() {
  return (
    <div className="flex flex-col gap-5 animate-pulse">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="h-3 w-28 bg-gray-800 rounded" />
          <div className={`bg-gray-800 rounded-xl ${i === 2 ? 'h-20' : 'h-10'}`} />
        </div>
      ))}
    </div>
  )
}

export default function CmsPage() {
  const [seccion,       setSeccion]       = useState<SeccionKey>('hero')
  const [pendingSec,    setPendingSec]    = useState<SeccionKey | null>(null)
  const [paginaAbierta, setPaginaAbierta] = useState<string>('Home')
  const [previewKey,    setPreviewKey]    = useState(0)
  const [previewLoad,   setPreviewLoad]   = useState(true)
  const [origin,        setOrigin]        = useState('')

  useEffect(() => { setOrigin(window.location.origin) }, [])

  const { fields, types, setField, save, saving, saved, isDirty, loading } =
    useCmsSection(seccion)

  const seccionInfo = TODAS_SECCIONES.find(s => s.key === seccion)!
  const previewUrl  = origin
    ? `${origin}${seccionInfo.path}${seccionInfo.hash}`
    : ''

  // ── Cambio de sección con guardia de cambios ─────────────────────────────
  const handleTabClick = (key: SeccionKey) => {
    if (key === seccion) return
    if (isDirty) {
      setPendingSec(key)
    } else {
      doSwitch(key)
    }
  }

  const doSwitch = (key: SeccionKey) => {
    setSeccion(key)
    setPendingSec(null)
    setPreviewLoad(true)
    setPreviewKey(k => k + 1)
    // Sincronizar el acordeón con la nueva sección
    const grupo = ESTRUCTURA_CMS.find(g => g.secciones.some(s => s.key === key))
    if (grupo) setPaginaAbierta(grupo.pagina)
  }

  // ── Click en cabecera de página (acordeón) ───────────────────────────────
  const handlePaginaClick = (pagina: string) => {
    if (paginaAbierta === pagina) {
      setPaginaAbierta('')
      return
    }
    setPaginaAbierta(pagina)
    // Auto-seleccionar primera sección al expandir
    const primeraSec = ESTRUCTURA_CMS.find(g => g.pagina === pagina)!.secciones[0].key
    if (primeraSec !== seccion) handleTabClick(primeraSec)
  }

  // ── Guardar + refrescar preview ──────────────────────────────────────────
  const handleSave = async () => {
    await save()
    setTimeout(() => {
      setPreviewLoad(true)
      setPreviewKey(k => k + 1)
    }, 2000)
  }

  const formProps = { fields, types, setField }

  return (
    <div className="flex flex-col gap-5 h-full">

      {/* Header */}
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-white">CMS Visual</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Edita el contenido del sitio y ve los cambios en vivo
        </p>
      </div>

      {/* Layout principal */}
      <div className="flex gap-5 flex-1 min-h-0">

        {/* ── Panel editor ──────────────────────────────────────────────── */}
        <div className="w-105 shrink-0 flex flex-col gap-3 min-h-0">

          {/* Acordeón de navegación jerárquica */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-2 flex flex-col gap-0.5 shrink-0 overflow-y-auto max-h-[45vh]">
            {ESTRUCTURA_CMS.map(grupo => {
              const abierto     = paginaAbierta === grupo.pagina
              const tieneActiva = grupo.secciones.some(s => s.key === seccion)
              return (
                <div key={grupo.pagina}>
                  {/* Nivel 1 — cabecera de página */}
                  <button
                    onClick={() => handlePaginaClick(grupo.pagina)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm transition border ${
                      abierto || tieneActiva
                        ? 'bg-teal-500/10 text-teal-400 border-teal-500/20'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="material-symbols-outlined text-[18px] shrink-0"
                        style={{ fontVariationSettings: (abierto || tieneActiva) ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {grupo.icono}
                      </span>
                      <span className="font-semibold">{grupo.pagina}</span>
                    </div>
                    <span className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${abierto ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>

                  {/* Nivel 2 — subsecciones */}
                  {abierto && (
                    <div className="ml-2 mt-0.5 mb-0.5 flex flex-col gap-0.5 border-l border-gray-700 pl-2">
                      {grupo.secciones.map(sec => {
                        const active = sec.key === seccion
                        return (
                          <button
                            key={sec.key}
                            onClick={() => handleTabClick(sec.key)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition border ${
                              active
                                ? 'bg-teal-500/10 text-teal-400 border-teal-500/20 font-medium'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white border-transparent'
                            } ${pendingSec === sec.key ? 'ring-1 ring-amber-500/40' : ''}`}
                          >
                            {sec.label}
                            {isDirty && active && (
                              <span className="ml-auto w-2 h-2 rounded-full bg-amber-400 shrink-0" title="Cambios sin guardar" />
                            )}
                            {active && !isDirty && (
                              <span className="ml-auto material-symbols-outlined text-[14px] opacity-40">chevron_right</span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Alerta de cambios sin guardar */}
          {pendingSec !== null && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-amber-400 text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}>
                  warning
                </span>
                <p className="text-amber-300 text-sm font-medium">Cambios sin guardar</p>
              </div>
              <p className="text-amber-400/70 text-xs mb-3 leading-relaxed">
                Tienes cambios en <strong className="text-amber-300">
                  {TODAS_SECCIONES.find(s => s.key === seccion)?.label}
                </strong> que no han sido guardados.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => doSwitch(pendingSec)}
                  className="flex-1 px-3 py-2 text-xs font-medium bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-xl transition border border-amber-500/30"
                >
                  Descartar y continuar
                </button>
                <button
                  onClick={() => setPendingSec(null)}
                  className="flex-1 px-3 py-2 text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition border border-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Breadcrumb */}
          <div className="shrink-0 flex items-center gap-1.5 text-xs text-gray-500">
            <span className="text-gray-400 font-medium">
              {ESTRUCTURA_CMS.find(g => g.secciones.some(s => s.key === seccion))?.pagina}
            </span>
            <span className="material-symbols-outlined text-[13px]">chevron_right</span>
            <span className="text-white font-medium">
              {TODAS_SECCIONES.find(s => s.key === seccion)?.label}
            </span>
          </div>

          {/* Campos del formulario (scrollable) */}
          <div className="flex-1 overflow-y-auto pr-1 min-h-0">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              {loading ? (
                <SkeletonForm />
              ) : seccion === 'hero' ? (
                <SeccionHero            {...formProps} />
              ) : seccion === 'elegirnos' ? (
                <SeccionElegirnos       {...formProps} />
              ) : seccion === 'tecnologia' ? (
                <SeccionTecnologia      {...formProps} />
              ) : seccion === 'infraestructura' ? (
                <SeccionInfraestructura {...formProps} />
              ) : seccion === 'premium' ? (
                <SeccionPremium         {...formProps} />
              ) : seccion === 'acciones' ? (
                <SeccionAcciones        {...formProps} />
              ) : seccion === 'nosotros' ? (
                <SeccionNosotros        {...formProps} />
              ) : seccion === 'nosotros_valores' ? (
                <SeccionNosotrosValores {...formProps} />
              ) : seccion === 'esp_hero' ? (
                <SeccionEspHero         {...formProps} />
              ) : seccion === 'uni_hero' ? (
                <SeccionUniHero         {...formProps} />
              ) : seccion === 'noticias_hero' ? (
                <SeccionNoticiasHero    {...formProps} />
              ) : seccion === 'contacto' ? (
                <SeccionContacto        {...formProps} />
              ) : seccion === 'redes' ? (
                <SeccionRedes           {...formProps} />
              ) : (
                <SeccionFooter          {...formProps} />
              )}
            </div>
          </div>

          {/* Botón guardar — siempre visible */}
          <div className="shrink-0">
            <button
              onClick={handleSave}
              disabled={!isDirty || saving}
              className={`relative w-full py-3 text-sm font-semibold rounded-2xl transition flex items-center justify-center gap-2 border ${
                saved
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : isDirty
                    ? 'bg-teal-500 hover:bg-teal-400 text-white border-teal-400'
                    : 'bg-gray-900 text-gray-600 border-gray-800 cursor-not-allowed'
              }`}
            >
              {isDirty && !saving && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-gray-950" />
              )}
              {saving ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  Guardando…
                </>
              ) : saved ? (
                <>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  ¡Guardado!
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  Guardar sección
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Preview ───────────────────────────────────────────────────── */}
        <SitePreview
          url={previewUrl}
          hash={seccionInfo.hash}
          previewKey={previewKey}
          loading={previewLoad}
          onLoad={() => setPreviewLoad(false)}
          onRefresh={() => { setPreviewLoad(true); setPreviewKey(k => k + 1) }}
        />
      </div>
    </div>
  )
}
