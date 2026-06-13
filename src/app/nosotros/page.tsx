/** Página: Nosotros — Historia, misión y equipo directivo de Aura Medical */

import { getContenido, getHitos } from '@/lib/contenido'
import AnimatedStat from '@/components/AnimatedStat'

export const metadata = {
  title: 'Nosotros | Aura Medical',
  description: 'Conoce la historia, misión, visión y valores de Aura Medical. Más de una década de excelencia médica en Chihuahua, México.',
}

const COLOR_CYCLE = [
  { color: 'text-primary',   bg: 'bg-primary/10'   },
  { color: 'text-secondary', bg: 'bg-secondary/10' },
  { color: 'text-tertiary',  bg: 'bg-tertiary/10'  },
  { color: 'text-primary',   bg: 'bg-primary/10'   },
]

const directivos = [
  {
    nombre: 'Dr. Rodrigo Ibarra',
    cargo: 'Director Médico General',
    especialidad: 'Medicina Interna · Gestión Hospitalaria',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop&face',
    iniciales: 'RI',
  },
  {
    nombre: 'Dra. Carmen Ávila',
    cargo: 'Directora de Calidad y Seguridad',
    especialidad: 'Anestesiología · Gestión de Riesgos Clínicos',
    img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=400&auto=format&fit=crop',
    iniciales: 'CA',
  },
  {
    nombre: 'Ing. Felipe Salcido',
    cargo: 'Director de Operaciones',
    especialidad: 'Ingeniería Biomédica · Gestión de Infraestructura',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    iniciales: 'FS',
  },
]

export default async function NosotrosPage() {
  const [contenido, hitos] = await Promise.all([getContenido(), getHitos()])
  const n = contenido.nosotros ?? {}
  const v = contenido.nosotros_valores ?? {}

  const stripSuffix = (s: string) => s.replace(/[+%]+$/, '')
  const stats = [
    { valor: stripSuffix(n.años_trayectoria || '12'),     sufijo: '+', label: n.años_label         || 'Años de trayectoria' },
    { valor: stripSuffix(n.especialistas    || '200'),    sufijo: '+', label: n.especialistas_label || 'Especialistas certificados' },
    { valor: stripSuffix(n.pacientes        || '50,000'), sufijo: '+', label: n.pacientes_label     || 'Pacientes atendidos' },
    { valor: stripSuffix(n.satisfaccion     || '98'),     sufijo: '%', label: n.satisfaccion_label  || 'Satisfacción del paciente' },
  ]

  const DEFAULT_ICONS  = ['favorite', 'science', 'security', 'lightbulb']
  const DEFAULT_TITLES = ['Humanismo', 'Excelencia Científica', 'Seguridad', 'Innovación']
  const DEFAULT_DESCS  = [
    'Cada paciente es una persona, no un expediente.',
    'Adoptamos protocolos clínicos basados en la evidencia.',
    'La seguridad del paciente es innegociable.',
    'Invertimos constantemente en tecnología de vanguardia.',
  ]
  const cards = [1, 2, 3, 4].map((num, i) => ({
    icon:  v[`card_${num}_icono`]  || DEFAULT_ICONS[i],
    color: COLOR_CYCLE[i].color,
    bg:    COLOR_CYCLE[i].bg,
    title: v[`card_${num}_titulo`] || DEFAULT_TITLES[i],
    desc:  v[`card_${num}_desc`]   || DEFAULT_DESCS[i],
  }))

  return (
    <main>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative w-full h-[55vh] min-h-95 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Equipo Aura Medical"
            className="w-full h-full object-cover"
            src="/imagenes/premium-service.jpg"
          />
          <div className="absolute inset-0 bg-linear-to-r from-on-background/90 via-on-background/60 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop text-white">
          <div className="inline-flex items-center gap-xs bg-white/10 border border-white/20 rounded-full px-sm py-xs type-label mb-sm backdrop-blur-sm">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            {n.hero_badge || 'Desde 2012'}
          </div>
          <h1 className="type-display mb-sm max-w-2xl">
            {n.hero_titulo || 'Una institución construida sobre la confianza médica'}
          </h1>
          <p className="type-body-lg text-white/75 max-w-2xl">
            {n.hero_subtitulo || 'Más de una década redefiniendo los estándares de la medicina privada en el norte de México.'}
          </p>
        </div>
      </section>

      {/* ── Cifras ───────────────────────────────────────── */}
      <section className="bg-primary py-md">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md text-center">
            {stats.map(({ valor, sufijo, label }) => (
              <AnimatedStat key={label} valor={valor} sufijo={sufijo} label={label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Misión y Visión ──────────────────────────────── */}
      <section className="py-lg container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
          <div className="bg-surface-container-lowest rounded-2xl p-lg border border-outline-variant/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-primary to-primary-container" />
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-sm">
              <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
            </div>
            <h2 className="type-headline text-on-surface mb-xs">Nuestra Misión</h2>
            <p className="type-body text-on-surface-variant leading-relaxed">
              Proporcionar atención médica de la más alta calidad, integrando la excelencia clínica con tecnología avanzada y un profundo respeto por la dignidad de cada paciente. Ser el socio de salud más confiable para las familias del norte de México.
            </p>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl p-lg border border-outline-variant/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-secondary to-secondary-container" />
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-sm">
              <span className="material-symbols-outlined text-secondary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
            </div>
            <h2 className="type-headline text-on-surface mb-xs">Nuestra Visión</h2>
            <p className="type-body text-on-surface-variant leading-relaxed">
              Ser reconocidos como el hospital privado líder del norte de México, referente en innovación médica, seguridad del paciente y experiencia clínica, con impacto positivo en la salud pública de la región.
            </p>
          </div>
        </div>
      </section>

      {/* ── Historia ─────────────────────────────────────── */}
      <section id="historia" className="py-lg bg-surface-container-low">
        <div className="container-page">
          <div className="text-center mb-lg">
            <h2 className="type-display text-on-surface mb-xs">Nuestra Historia</h2>
            <p className="type-body text-on-surface-variant max-w-2xl mx-auto">Cada año, un capítulo de crecimiento y compromiso renovado.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {hitos.map((hito) => (
              <div key={hito.año} className="bg-surface rounded-2xl p-md border border-outline-variant/30 shadow-sm">
                <p className="type-label text-primary font-bold mb-xs">{hito.año}</p>
                <h3 className="type-headline text-on-surface mb-xs">{hito.titulo}</h3>
                <p className="type-body text-on-surface-variant">{hito.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Valores ──────────────────────────────────────── */}
      <section id="valores" className="py-lg container-page">
        <div className="text-center mb-lg">
          <h2 className="type-display text-on-surface mb-xs">{v.titulo || 'Nuestros Valores'}</h2>
          <p className="type-body text-on-surface-variant max-w-2xl mx-auto">{v.subtitulo || 'Los principios que guían cada decisión clínica e inversión que realizamos.'}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {cards.map(({ icon, color, bg, title, desc }) => (
            <div key={title} className="card flex gap-md">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center ${color} shrink-0`}>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
              </div>
              <div>
                <h3 className="type-headline text-on-surface mb-xs">{title}</h3>
                <p className="type-body text-on-surface-variant">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Equipo directivo ─────────────────────────────── */}
      <section className="py-lg bg-surface-container-low">
        <div className="container-page">
          <div className="text-center mb-lg">
            <h2 className="type-display text-on-surface mb-xs">Equipo Directivo</h2>
            <p className="type-body text-on-surface-variant max-w-2xl mx-auto">Líderes comprometidos con el futuro de Aura Medical.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {directivos.map(({ nombre, cargo, especialidad, iniciales }) => (
              <div key={nombre} className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm text-center p-md flex flex-col items-center gap-xs">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-black mb-xs">
                  {iniciales}
                </div>
                <h3 className="type-headline text-on-surface">{nombre}</h3>
                <p className="type-label text-primary font-semibold">{cargo}</p>
                <p className="type-body text-on-surface-variant text-sm">{especialidad}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-lg px-margin-mobile md:px-margin-desktop">
        <div className="max-w-7xl mx-auto bg-inverse-surface rounded-3xl py-lg px-lg text-center">
          <h2 className="type-display text-on-primary mb-xs">¿Listo para conocernos?</h2>
          <p className="type-body-lg text-surface-variant mb-md max-w-2xl mx-auto">
            Agenda una consulta o visita nuestras instalaciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-sm justify-center">
            <a href="/contacto" className="btn-primary">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              Cómo llegar
            </a>
            <a href="/directorio" className="btn-outline" style={{ color: 'var(--color-primary-fixed)', borderColor: 'var(--color-primary-fixed)' }}>
              <span className="material-symbols-outlined text-[18px]">people</span>
              Ver especialistas
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
