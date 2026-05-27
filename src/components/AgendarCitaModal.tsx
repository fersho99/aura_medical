'use client'

/** Modal de agendamiento de cita — 3 pasos: Motivo → Datos → Confirmación (WhatsApp) */

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

// ─── Data ─────────────────────────────────────────────────────────────────────

const areasAnatomicas = [
  { id: 'Cabeza / Neurología',      icon: 'psychology',                 label: 'Cabeza / Neurología',  costo: '$1,200 MXN' },
  { id: 'Corazón / Cardiovascular', icon: 'monitor_heart',              label: 'Corazón / Cardio',     costo: '$1,400 MXN' },
  { id: 'Abdomen / Digestivo',      icon: 'gastroenterology',           label: 'Abdomen / Digestivo',  costo: '$1,000 MXN' },
  { id: 'Huesos / Columna',         icon: 'airline_seat_recline_extra', label: 'Huesos / Columna',     costo: '$1,000 MXN' },
  { id: 'Pediatría / Niños',        icon: 'child_care',                 label: 'Pediatría / Niños',    costo:   '$900 MXN' },
  { id: 'General / Otro',           icon: 'medical_services',           label: 'General / Otro',       costo:   '$700 MXN' },
]

const horariosPref = [
  { id: 'manana',   label: 'Mañana',   sublabel: '8:00 – 12:00',    icon: 'wb_sunny'          },
  { id: 'tarde',    label: 'Tarde',    sublabel: '12:00 – 18:00',   icon: 'partly_cloudy_day' },
  { id: 'flexible', label: 'Flexible', sublabel: 'Sin preferencia', icon: 'schedule'          },
]

const STEPS = ['Motivo', 'Datos', 'Confirmación']

// ─── Component ────────────────────────────────────────────────────────────────

// ─── Validación ───────────────────────────────────────────────────────────────

const REGEX_NOMBRE   = /^[a-zA-ZÀ-ÿ\s''-]{2,100}$/
const REGEX_TELEFONO = /^[\d\s\-+()]{7,20}$/
const REGEX_CORREO   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(field: 'nombre' | 'telefono' | 'correo', value: string): string {
  if (!value.trim()) return 'Este campo es requerido.'
  if (field === 'nombre'   && !REGEX_NOMBRE.test(value))   return 'Solo letras y espacios (mín. 2 caracteres).'
  if (field === 'telefono' && !REGEX_TELEFONO.test(value)) return 'Ingresa un teléfono válido (7–20 dígitos).'
  if (field === 'correo'   && !REGEX_CORREO.test(value))   return 'Ingresa un correo electrónico válido.'
  return ''
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  triggerClassName?: string
  triggerLabel?: string
  triggerIcon?: string
  /** Contenido personalizado del botón trigger (reemplaza icon + label) */
  triggerContent?: React.ReactNode
}

export default function AgendarCitaModal({
  triggerClassName,
  triggerLabel = 'Agendar Cita',
  triggerIcon  = 'event_available',
  triggerContent,
}: Props = {}) {
  const [open,     setOpen]     = useState(false)
  const [step,     setStep]     = useState(1)
  const [area,     setArea]     = useState('')
  const [detalles, setDetalles] = useState('')
  const [nombre,   setNombre]   = useState('')
  const [telefono, setTelefono] = useState('')
  const [correo,   setCorreo]   = useState('')
  const [horario,  setHorario]  = useState('flexible')
  const [mounted,  setMounted]  = useState(false)
  const [touched,  setTouched]  = useState<Record<string, boolean>>({})

  // Errores de validación calculados
  const errNombre   = validate('nombre',   nombre)
  const errTelefono = validate('telefono', telefono)
  const errCorreo   = validate('correo',   correo)

  useEffect(() => { setMounted(true) }, [])

  function reset() {
    setStep(1); setArea(''); setDetalles('')
    setNombre(''); setTelefono(''); setCorreo(''); setHorario('flexible')
    setTouched({})
  }

  function close() { setOpen(false); setTimeout(reset, 300) }

  const areaData    = areasAnatomicas.find(a => a.id === area)
  const horarioData = horariosPref.find(h => h.id === horario)

  const canNext1 = area !== ''
  const canNext2 = !errNombre && !errTelefono && !errCorreo

  function touch(field: string) {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const waText = encodeURIComponent(
    [
      `*Solicitud de cita — Aura Medical*`,
      ``,
      `*Paciente:* ${nombre}`,
      `*Teléfono:* ${telefono}`,
      `*Correo:* ${correo}`,
      `*Área de consulta:* ${area}`,
      `*Horario preferido:* ${horarioData?.label} (${horarioData?.sublabel})`,
      detalles ? `*Síntomas:* ${detalles}` : '',
      ``,
      `*Costo de consulta:* ${areaData?.costo} · Se liquida en recepción al asistir`,
    ].filter(Boolean).join('\n')
  )

  return (
    <>
      {/* ── Trigger ──────────────────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        className={triggerClassName ?? "font-label-sm text-label-sm bg-linear-to-r from-primary to-primary-container text-on-primary shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/40 px-md py-sm rounded-full transition-all flex items-center gap-xs hover:brightness-110"}
      >
        {triggerContent ?? (
          <>
            <span className="material-symbols-outlined text-[18px]">{triggerIcon}</span>
            {triggerLabel}
          </>
        )}
      </button>

      {/* ── Modal overlay (portal → escapa el stacking context del header) ──── */}
      {mounted && open && createPortal(
        <div
          className="fixed inset-0 z-200 flex items-center justify-center px-md py-lg"
          role="dialog"
          aria-modal="true"
          aria-label="Agendar cita en Aura Medical"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={close}
          />

          {/* ── Panel ──────────────────────────────────────────────────────────── */}
          <div className="relative z-10 w-full max-w-128 bg-surface-container-lowest rounded-3xl shadow-2xl shadow-on-background/20 border border-outline-variant/30 overflow-hidden flex flex-col max-h-[92vh]">

            {/* Accent stripe */}
            <div className="h-1 w-full bg-linear-to-r from-primary via-primary-container to-secondary shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between px-lg pt-md pb-sm shrink-0">
              <div className="flex items-center gap-sm">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-[20px] text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    local_hospital
                  </span>
                </div>
                <div>
                  <p className="type-label text-on-surface-variant uppercase tracking-wider">Aura Medical</p>
                  <h2 className="type-headline text-on-surface">Agendar Consulta</h2>
                </div>
              </div>
              <button
                onClick={close}
                aria-label="Cerrar"
                className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Step indicator */}
            <div className="px-lg pb-sm flex items-center shrink-0">
              {STEPS.map((label, i) => {
                const s = i + 1
                const done   = s < step
                const active = s === step
                return (
                  <div key={s} className="flex items-center gap-sm flex-1 last:flex-none">
                    <div className="flex items-center gap-xs shrink-0">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center type-label transition-all duration-300 ${
                        done   ? 'bg-primary text-on-primary' :
                        active ? 'bg-primary text-on-primary ring-4 ring-primary/20' :
                                 'bg-surface-container text-on-surface-variant'
                      }`}>
                        {done
                          ? <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                          : s
                        }
                      </div>
                      <span className={`type-label hidden sm:inline transition-colors duration-300 ${active ? 'text-primary' : 'text-on-surface-variant'}`}>
                        {label}
                      </span>
                    </div>
                    {s < 3 && (
                      <div className={`h-px flex-1 transition-colors duration-300 ${done ? 'bg-primary' : 'bg-outline-variant/40'}`} />
                    )}
                  </div>
                )
              })}
            </div>

            <div className="h-px bg-outline-variant/20 mx-lg shrink-0" />

            {/* ── Scrollable content ─────────────────────────────────────────────── */}
            <div className="px-lg py-md overflow-y-auto flex-1">

              {/* Step 1 — Área de molestia */}
              {step === 1 && (
                <div className="flex flex-col gap-md">
                  <p className="type-body text-on-surface-variant">
                    ¿En qué área presenta molestias o requiere atención?
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-sm">
                    {areasAnatomicas.map(a => {
                      const sel = area === a.id
                      return (
                        <button
                          key={a.id}
                          onClick={() => setArea(a.id)}
                          className={`flex flex-col items-center gap-xs p-md rounded-2xl border-2 transition-all duration-200 text-center ${
                            sel
                              ? 'border-primary bg-primary/5 text-primary shadow-sm shadow-primary/10'
                              : 'border-outline-variant/40 bg-surface hover:border-outline-variant hover:bg-surface-container-low text-on-surface-variant'
                          }`}
                        >
                          <span
                            className="material-symbols-outlined text-[30px]"
                            style={{ fontVariationSettings: sel ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            {a.icon}
                          </span>
                          <span className="type-label normal-case tracking-normal font-semibold leading-tight">{a.label}</span>
                          {sel && (
                            <span className="type-label text-primary flex items-center gap-xs">
                              <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                              Seleccionado
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-xs">
                      <label className="type-label text-on-surface-variant" htmlFor="detalles">
                        Describe brevemente tus síntomas{' '}
                        <span className="font-normal normal-case tracking-normal">(opcional)</span>
                      </label>
                      <span className={`type-label font-normal normal-case tracking-normal ${detalles.length > 480 ? 'text-error' : 'text-on-surface-variant/60'}`}>
                        {detalles.length}/500
                      </span>
                    </div>
                    <textarea
                      id="detalles"
                      rows={3}
                      value={detalles}
                      onChange={e => setDetalles(e.target.value.slice(0, 500))}
                      placeholder="Ej. Dolor de cabeza constante desde hace 3 días..."
                      maxLength={500}
                      className="w-full bg-surface border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-2xl px-md py-sm type-body text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 2 — Datos de contacto */}
              {step === 2 && (
                <div className="flex flex-col gap-md">

                  {/* Area chip */}
                  <div className="inline-flex items-center gap-xs bg-primary/10 text-primary px-sm py-xs rounded-full type-label self-start">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {areaData?.icon}
                    </span>
                    {areaData?.label}
                  </div>

                  <p className="type-body text-on-surface-variant">
                    Ingresa tus datos para que nuestro equipo te contacte y confirme la cita.
                  </p>

                  <div className="flex flex-col gap-sm">
                    {([
                      { id: 'nombre',   label: 'Nombre completo',    type: 'text',  value: nombre,   set: setNombre,   placeholder: 'Ej. María González',    err: errNombre,   maxLen: 100 },
                      { id: 'telefono', label: 'Teléfono celular',   type: 'tel',   value: telefono, set: setTelefono, placeholder: 'Ej. 653 133 2053',      err: errTelefono, maxLen: 20  },
                      { id: 'correo',   label: 'Correo electrónico', type: 'email', value: correo,   set: setCorreo,   placeholder: 'Ej. maria@ejemplo.com', err: errCorreo,   maxLen: 100 },
                    ] as const).map(field => {
                      const showErr = touched[field.id] && field.err
                      return (
                        <div key={field.id}>
                          <label className="type-label text-on-surface-variant block mb-xs" htmlFor={field.id}>
                            {field.label} <span className="text-error">*</span>
                          </label>
                          <input
                            id={field.id}
                            type={field.type}
                            value={field.value}
                            onChange={e => field.set(e.target.value.slice(0, field.maxLen))}
                            onBlur={() => touch(field.id)}
                            placeholder={field.placeholder}
                            maxLength={field.maxLen}
                            autoComplete={field.id === 'correo' ? 'email' : field.id === 'nombre' ? 'name' : 'tel'}
                            className={`w-full bg-surface border rounded-2xl px-md py-sm type-body text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:ring-2 ${
                              showErr
                                ? 'border-error focus:border-error focus:ring-error/20'
                                : 'border-outline-variant/50 focus:border-primary focus:ring-primary/20'
                            }`}
                          />
                          {showErr && (
                            <p className="type-label text-error font-normal normal-case tracking-normal mt-1 flex items-center gap-xs">
                              <span className="material-symbols-outlined text-[13px]">error</span>
                              {field.err}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Horario preferido */}
                  <div>
                    <label className="type-label text-on-surface-variant block mb-sm">
                      Horario preferido de atención
                    </label>
                    <div className="flex gap-sm">
                      {horariosPref.map(h => (
                        <button
                          key={h.id}
                          onClick={() => setHorario(h.id)}
                          className={`flex-1 flex flex-col items-center gap-xs py-sm px-xs rounded-2xl border-2 transition-all duration-200 ${
                            horario === h.id
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-outline-variant/30 text-on-surface-variant hover:border-outline-variant'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[22px]">{h.icon}</span>
                          <span className="type-label">{h.label}</span>
                          <span className="type-label font-normal normal-case tracking-normal" style={{ fontSize: '10px' }}>{h.sublabel}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 — Confirmación */}
              {step === 3 && (
                <div className="flex flex-col gap-md">

                  {/* Summary */}
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-md flex flex-col gap-sm">
                    <p className="type-label text-primary uppercase tracking-wider">Resumen de tu solicitud</p>

                    <div className="flex items-center gap-sm">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[20px] text-primary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {areaData?.icon}
                        </span>
                      </div>
                      <div>
                        <p className="type-body text-on-surface font-semibold">{areaData?.label}</p>
                        <p className="type-label text-on-surface-variant font-normal normal-case tracking-normal">Área de consulta</p>
                      </div>
                    </div>

                    <div className="h-px bg-primary/10" />

                    <div className="flex flex-col gap-xs">
                      {[
                        { icon: 'person',      value: nombre },
                        { icon: 'phone',       value: telefono },
                        { icon: 'mail',        value: correo },
                        { icon: 'schedule',    value: `${horarioData?.label} · ${horarioData?.sublabel}` },
                        ...(detalles ? [{ icon: 'description', value: detalles }] : []),
                      ].map((row, i) => (
                        <div key={i} className="flex items-start gap-sm">
                          <span className="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0 mt-0.75">{row.icon}</span>
                          <span className="type-body text-on-surface">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Costo de consulta */}
                  <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-md flex items-center justify-between gap-md">
                    <div className="flex items-center gap-sm">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                      </div>
                      <div>
                        <p className="type-label text-on-surface-variant uppercase tracking-wider">Costo de consulta</p>
                        <p className="type-label text-on-surface-variant font-normal normal-case tracking-normal">Se liquida en recepción al asistir</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="type-headline text-primary font-bold">{areaData?.costo}</p>
                      <p className="type-label text-on-surface-variant font-normal normal-case tracking-normal">Primera consulta</p>
                    </div>
                  </div>

                  {/* Info note */}
                  <div className="bg-surface-container-low rounded-2xl p-md flex items-start gap-sm">
                    <span
                      className="material-symbols-outlined text-[18px] text-on-surface-variant shrink-0 mt-0.5"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      info
                    </span>
                    <p className="type-body text-on-surface-variant">
                      Un especialista de Aura Medical se pondrá en contacto contigo dentro de las próximas{' '}
                      <strong className="text-on-surface">24 horas hábiles</strong> para confirmar tu cita.
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-sm">
                    <a
                      href={`https://wa.me/526531332053?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                      className="flex items-center justify-center gap-sm bg-[#25D366] text-white rounded-full px-lg py-sm type-label hover:brightness-105 transition-all shadow-md shadow-[#25D366]/20"
                    >
                      {/* WhatsApp icon */}
                      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.532 5.854L.054 23.554a.75.75 0 0 0 .916.916l5.7-1.478A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.985 0-3.842-.58-5.407-1.582l-.385-.242-4 1.037 1.037-4-.242-.385A9.951 9.951 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                      </svg>
                      Confirmar por WhatsApp
                    </a>

                    <button
                      onClick={close}
                      className="type-label text-on-surface-variant hover:text-on-surface transition-colors text-center py-xs"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Footer navigation ──────────────────────────────────────────────── */}
            {step < 3 && (
              <div className="px-lg pb-lg pt-md border-t border-outline-variant/20 flex items-center justify-between shrink-0">
                <button
                  onClick={step === 1 ? close : () => setStep(s => s - 1)}
                  className="type-label text-on-surface-variant hover:text-on-surface flex items-center gap-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  {step === 1 ? 'Cancelar' : 'Regresar'}
                </button>

                <button
                  onClick={() => setStep(s => s + 1)}
                  disabled={step === 1 ? !canNext1 : !canNext2}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {step === 2 ? 'Revisar solicitud' : 'Continuar'}
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            )}

          </div>
        </div>,
        document.body
      )}
    </>
  )
}
