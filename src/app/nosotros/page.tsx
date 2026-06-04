/** Página: Nosotros — Historia, misión y equipo directivo de Aura Medical */

export const metadata = {
  title: 'Nosotros | Aura Medical',
  description: 'Conoce la historia, misión, visión y valores de Aura Medical. Más de una década de excelencia médica en Chihuahua, México.',
}

const cifras = [
  { valor: '12+', label: 'Años de trayectoria' },
  { valor: '200+', label: 'Especialistas certificados' },
  { valor: '50,000+', label: 'Pacientes atendidos' },
  { valor: '98%', label: 'Satisfacción del paciente' },
]

const valores = [
  {
    icon: 'favorite',
    color: 'text-primary',
    bg: 'bg-primary/10',
    title: 'Humanismo',
    desc: 'Cada paciente es una persona, no un expediente. Nuestra práctica médica está guiada por la empatía, el respeto y la dignidad en todo momento.',
  },
  {
    icon: 'science',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    title: 'Excelencia Científica',
    desc: 'Adoptamos protocolos clínicos basados en la evidencia más actualizada y fomentamos la investigación continua entre nuestros especialistas.',
  },
  {
    icon: 'shield',
    color: 'text-tertiary',
    bg: 'bg-tertiary/10',
    title: 'Seguridad',
    desc: 'La seguridad del paciente es innegociable. Implementamos estándares internacionales JCI y sistemas de doble verificación en todos los procedimientos.',
  },
  {
    icon: 'lightbulb',
    color: 'text-primary',
    bg: 'bg-primary/10',
    title: 'Innovación',
    desc: 'Invertimos constantemente en tecnología de vanguardia y en la formación continua de nuestros equipos para mantenernos a la vanguardia médica.',
  },
]

const hitos = [
  { year: '2012', title: 'Fundación', desc: 'Aura Medical abre sus puertas con 4 especialidades y 18 médicos fundadores comprometidos con un modelo de atención diferente.' },
  { year: '2015', title: 'Acreditación JCI', desc: 'Obtenemos la acreditación de la Joint Commission International, convirtiéndonos en uno de los primeros hospitales privados en el norte de México en alcanzar este estándar.' },
  { year: '2018', title: 'Unidad de Oncología', desc: 'Inauguramos nuestro Centro de Oncología de Precisión, con radioterapia de intensidad modulada y el primer comité multidisciplinario de tumores de la región.' },
  { year: '2021', title: 'Cirugía Robótica', desc: 'Integramos el primer sistema Da Vinci en Chihuahua, marcando el inicio de nuestra era de cirugía de mínima invasión de alta precisión.' },
  { year: '2024', title: 'Expansión Digital', desc: 'Lanzamos nuestra plataforma de gestión médica y telemedicina, acercando a nuestros especialistas a pacientes en toda la región noroeste de México.' },
  { year: '2026', title: 'Medicina Preventiva', desc: 'Apertura de la Unidad de Medicina Preventiva y Bienestar, consolidando nuestro modelo de atención proactiva centrado en la salud a largo plazo.' },
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

export default function NosotrosPage() {
  return (
    <main>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative w-full h-[55vh] min-h-[380px] flex items-center overflow-hidden">
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
            Desde 2012
          </div>
          <h1 className="type-display mb-sm max-w-2xl">
            Una institución construida sobre la confianza médica
          </h1>
          <p className="type-body-lg text-white/75 max-w-2xl">
            Más de una década redefiniendo los estándares de la medicina privada en el norte de México.
          </p>
        </div>
      </section>

      {/* ── Cifras ───────────────────────────────────────── */}
      <section className="bg-primary py-md">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md text-center">
            {cifras.map(({ valor, label }) => (
              <div key={label}>
                <p className="text-3xl md:text-4xl font-black text-primary-fixed tracking-tight">{valor}</p>
                <p className="type-label text-on-primary/70 mt-xs">{label}</p>
              </div>
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
      <section className="py-lg bg-surface-container-low">
        <div className="container-page">
          <div className="text-center mb-lg">
            <h2 className="type-display text-on-surface mb-xs">Nuestra Historia</h2>
            <p className="type-body text-on-surface-variant max-w-2xl mx-auto">Cada año, un capítulo de crecimiento y compromiso renovado.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {hitos.map((hito) => (
              <div key={hito.year} className="bg-surface rounded-2xl p-md border border-outline-variant/30 shadow-sm">
                <p className="type-label text-primary font-bold mb-xs">{hito.year}</p>
                <h3 className="type-headline text-on-surface mb-xs">{hito.title}</h3>
                <p className="type-body text-on-surface-variant">{hito.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Valores ──────────────────────────────────────── */}
      <section className="py-lg container-page">
        <div className="text-center mb-lg">
          <h2 className="type-display text-on-surface mb-xs">Nuestros Valores</h2>
          <p className="type-body text-on-surface-variant max-w-2xl mx-auto">Los principios que guían cada decisión clínica e inversión que realizamos.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {valores.map(({ icon, color, bg, title, desc }) => (
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
