'use client'

import { useState } from 'react'
import { WA_URL } from '@/lib/constants'

interface ContactoClientProps {
  direccion:    string
  telefono:     string
  email:        string
  urgencias:    string
  horario:      string
  mapa_url?:      string
  hero_badge?:    string
  hero_titulo?:   string
  hero_subtitulo?: string
}

const especialidades = [
  'Cardiología', 'Neurología', 'Oncología', 'Pediatría',
  'Cirugía Robótica', 'Medicina Preventiva', 'Otro',
]

export default function ContactoClient({ direccion, telefono, email, urgencias, horario, mapa_url, hero_badge, hero_titulo, hero_subtitulo }: ContactoClientProps) {
  const [form,    setForm]    = useState({ nombre: '', correo: '', telefono: '', especialidad: '', mensaje: '' })
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const infoCards = [
    { icon: 'location_on', color: 'text-primary',   bg: 'bg-primary/10',          title: 'Dirección',      lines: [direccion] },
    { icon: 'call',        color: 'text-secondary',  bg: 'bg-secondary/10',        title: 'Teléfono',       lines: [telefono, horario] },
    { icon: 'mail',        color: 'text-tertiary',   bg: 'bg-tertiary/10',         title: 'Correo',         lines: [email, 'Respuesta en menos de 24 horas hábiles'] },
    { icon: 'emergency',   color: 'text-error',      bg: 'bg-error-container/30',  title: 'Urgencias 24/7', lines: [urgencias, 'Servicio de urgencias las 24 horas, los 365 días del año'] },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contacto', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })

      if (res.status === 429) {
        setError('Demasiados intentos. Espera un momento e intenta de nuevo.')
        return
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body.error ?? 'No se pudo enviar el mensaje. Intenta de nuevo.')
        return
      }
    } catch {
      setError('Error de conexión. Verifica tu internet e intenta de nuevo.')
      return
    } finally {
      setLoading(false)
    }

    const msg = `Hola, me pongo en contacto desde el sitio web.\n\n*Nombre:* ${form.nombre}\n*Teléfono:* ${form.telefono}${form.correo ? `\n*Correo:* ${form.correo}` : ''}\n*Especialidad de interés:* ${form.especialidad || 'No especificada'}\n*Mensaje:* ${form.mensaje}`
    window.open(WA_URL(msg), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <main>

      {/* Hero */}
      <section className="bg-surface-container-lowest border-b border-outline-variant/30 py-lg px-margin-mobile md:px-margin-desktop relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-secondary/5 to-transparent pointer-events-none" />
        <div className="container-page relative z-10">
          <nav aria-label="Breadcrumb" className="mb-md">
            <ol className="flex items-center gap-xs type-label text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="/">Inicio</a></li>
              <li className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
                <span className="text-primary font-medium">Contacto</span>
              </li>
            </ol>
          </nav>
          <div className="inline-flex items-center gap-xs bg-primary/10 border border-primary/20 rounded-full px-sm py-xs type-label text-primary mb-sm">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>contact_support</span>
            {hero_badge || 'Estamos para ayudarte'}
          </div>
          <h1 className="type-display text-on-surface mb-sm">{hero_titulo || 'Contáctanos'}</h1>
          <p className="type-body-lg text-on-surface-variant max-w-2xl">
            {hero_subtitulo || 'Nuestro equipo de coordinación médica está disponible para resolver tus dudas, orientarte hacia el especialista correcto y agendar tu consulta.'}
          </p>
        </div>
      </section>

      {/* Tarjetas de contacto */}
      <section className="section container-page">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md mb-xl">
          {infoCards.map(({ icon, color, bg, title, lines }) => (
            <div key={title} className="card flex flex-col gap-sm">
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center ${color} shrink-0`}>
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
              </div>
              <h3 className="type-headline text-on-surface">{title}</h3>
              {lines.map((line, i) => (
                <p key={i} className={`type-body ${i === 0 ? 'text-on-surface font-medium' : 'text-on-surface-variant text-sm'}`}>{line}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Mapa + Formulario */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">

          {/* Google Maps embed */}
          <div className="rounded-3xl overflow-hidden shadow-md border border-outline-variant/30 h-100 lg:h-auto min-h-100">
            <iframe
              title="Ubicación Aura Medical — San Luis Río Colorado"
              src={mapa_url || "https://maps.google.com/maps?q=Hospital+Santa+Margarita+San+Luis+Rio+Colorado+Sonora+Mexico&z=16&output=embed"}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Formulario */}
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm p-xl">
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center h-full gap-md py-xl">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <h2 className="type-headline text-on-surface">¡Mensaje enviado!</h2>
                <p className="type-body text-on-surface-variant max-w-sm">
                  Tu consulta fue redirigida a WhatsApp. Nuestro equipo te responderá en breve.
                </p>
                <button onClick={() => { setSent(false); setError(''); setForm({ nombre: '', correo: '', telefono: '', especialidad: '', mensaje: '' }) }}
                  className="btn-outline mt-sm">
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <>
                <h2 className="type-headline text-on-surface mb-xs">Envíanos un mensaje</h2>
                <p className="type-body text-on-surface-variant mb-lg">
                  Completa el formulario y te contactaremos vía WhatsApp.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                    <div className="flex flex-col gap-xs">
                      <label className="type-label text-on-surface-variant" htmlFor="nombre">Nombre completo *</label>
                      <input
                        id="nombre" name="nombre" type="text" required
                        maxLength={100}
                        value={form.nombre} onChange={handleChange}
                        placeholder="Juan Pérez"
                        disabled={loading}
                        className="bg-surface border border-outline-variant rounded-xl px-md py-sm type-body text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label className="type-label text-on-surface-variant" htmlFor="telefono">Teléfono *</label>
                      <input
                        id="telefono" name="telefono" type="tel" required
                        maxLength={20}
                        value={form.telefono} onChange={handleChange}
                        placeholder="653 123 4567"
                        disabled={loading}
                        className="bg-surface border border-outline-variant rounded-xl px-md py-sm type-body text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label className="type-label text-on-surface-variant" htmlFor="correo">Correo electrónico</label>
                    <input
                      id="correo" name="correo" type="email"
                      maxLength={150}
                      value={form.correo} onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      disabled={loading}
                      className="bg-surface border border-outline-variant rounded-xl px-md py-sm type-body text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label className="type-label text-on-surface-variant" htmlFor="especialidad">Especialidad de interés</label>
                    <select
                      id="especialidad" name="especialidad"
                      value={form.especialidad} onChange={handleChange}
                      disabled={loading}
                      className="bg-surface border border-outline-variant rounded-xl px-md py-sm type-body text-on-surface focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                    >
                      <option value="">Selecciona una opción</option>
                      {especialidades.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label className="type-label text-on-surface-variant" htmlFor="mensaje">Mensaje *</label>
                    <textarea
                      id="mensaje" name="mensaje" required rows={4}
                      maxLength={1000}
                      value={form.mensaje} onChange={handleChange}
                      placeholder="¿En qué podemos ayudarte?"
                      disabled={loading}
                      className="bg-surface border border-outline-variant rounded-xl px-md py-sm type-body text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors resize-none disabled:opacity-50"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-sm bg-error-container/20 border border-error/20 rounded-xl px-md py-sm">
                      <span className="material-symbols-outlined text-error text-[18px] shrink-0">error</span>
                      <p className="type-label text-error">{error}</p>
                    </div>
                  )}

                  <button type="submit" disabled={loading} className="btn-primary justify-center disabled:opacity-50">
                    {loading ? (
                      <><span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>Enviando…</>
                    ) : (
                      <><span className="material-symbols-outlined text-[18px]">send</span>Enviar por WhatsApp</>
                    )}
                  </button>
                  <p className="type-label text-on-surface-variant/60 text-center">
                    Al enviar aceptas nuestra{' '}
                    <a href="/privacidad" className="underline hover:text-primary">política de privacidad</a>.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Horarios */}
      <section className="bg-surface-container-low border-t border-outline-variant/20 py-xl">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <div>
              <h3 className="type-headline text-on-surface mb-md flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                Horarios de Atención
              </h3>
              <div className="flex flex-col gap-sm">
                {[
                  { dia: 'Lunes – Viernes', hora: '8:00 – 20:00' },
                  { dia: 'Sábado',          hora: '9:00 – 14:00' },
                  { dia: 'Domingo',         hora: 'Solo urgencias' },
                ].map(({ dia, hora }) => (
                  <div key={dia} className="flex justify-between type-body text-on-surface-variant border-b border-outline-variant/20 pb-sm">
                    <span>{dia}</span>
                    <span className="font-medium text-on-surface">{hora}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="type-headline text-on-surface mb-md flex items-center gap-sm">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
                Cómo llegar
              </h3>
              <p className="type-body text-on-surface-variant mb-sm">
                Nos encontramos en <strong className="text-on-surface">{direccion}</strong>, en San Luis Río Colorado, Sonora, a unos minutos del centro de la ciudad.
              </p>
              <div className="flex flex-wrap gap-sm">
                <div className="flex items-center gap-xs bg-surface rounded-xl border border-outline-variant/30 px-sm py-xs">
                  <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_parking</span>
                  <span className="type-label text-on-surface-variant">Estacionamiento gratuito</span>
                </div>
                <div className="flex items-center gap-xs bg-surface rounded-xl border border-outline-variant/30 px-sm py-xs">
                  <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>accessible</span>
                  <span className="type-label text-on-surface-variant">Acceso para personas con discapacidad</span>
                </div>
                <div className="flex items-center gap-xs bg-surface rounded-xl border border-outline-variant/30 px-sm py-xs">
                  <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>directions_bus</span>
                  <span className="type-label text-on-surface-variant">Ruta de transporte público</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
