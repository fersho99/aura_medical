/** Página: Home — Inicio de Aura Medical */


export const metadata = {
  title: 'Aura Medical | Clínica Privada de Alta Especialidad',
  description: 'Atención médica de excelencia en Chihuahua. Especialidades en cardiología, neurología, oncología y pediatría con tecnología de vanguardia y trato humano.',
}

import HomeQuickActions from '@/components/HomeQuickActions'
import NewsletterForm from '@/components/NewsletterForm'

export default function Inicio() {
  return (
    <main>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative w-full h-204.75 min-h-150 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/imagenes/hero-background.png"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          >
            <source src="/videos/hero-home.mp4" type="video/mp4" />
            <img
              alt="Hero Background"
              src="/imagenes/hero-background.png"
              className="w-full h-full object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-linear-to-t from-on-background/90 via-on-background/40 to-transparent mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto flex flex-col items-center gap-md">
          <div className="inline-flex items-center gap-xs bg-surface-bright/10 backdrop-blur-md border border-surface-bright/20 rounded-full px-sm py-xs text-on-primary type-label mb-sm">
            <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse" />
            Innovación en Salud
          </div>
          <h1 className="type-display text-on-primary drop-shadow-lg">
            Excelencia Médica de Nueva Generación
          </h1>
          <p className="type-body-lg text-surface-variant max-w-2xl mx-auto mt-sm drop-shadow-md">
            Precisión clínica y tecnología de vanguardia al servicio de su bienestar. Descubra un entorno médico diseñado para la máxima eficiencia y cuidado personalizado.
          </p>
        </div>
      </section>

      {/* ── Acciones rápidas ─────────────────────────────── */}
      <HomeQuickActions />

      {/* ── Por qué Aura Medical ─────────────────────────── */}
      <section className="section container-page mt-lg">
        <div className="section-header">
          <h2 className="type-display text-on-surface mb-sm">Por qué elegir Aura Medical</h2>
          <p className="type-body-lg text-on-surface-variant max-w-3xl mx-auto">Un nuevo estándar en atención médica privada, combinando el factor humano con la más alta innovación.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {[
            { icon: 'health_and_safety', color: 'text-primary', bg: 'bg-primary-container/20', title: 'Atención 24/7', desc: 'Urgencias y cuidados intensivos disponibles a cualquier hora, todos los días del año con personal altamente capacitado.' },
            { icon: 'public', color: 'text-secondary', bg: 'bg-secondary-container/20', title: 'Expertos Globales', desc: 'Una red de especialistas con formación internacional y líderes de opinión en sus respectivas áreas terapéuticas.' },
            { icon: 'memory', color: 'text-tertiary', bg: 'bg-tertiary-container/20', title: 'Tecnología de Punta', desc: 'Inversión constante en los últimos avances médicos, robótica y sistemas de IA para diagnósticos precisos.' },
          ].map(({ icon, color, bg, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center p-md">
              <div className={`w-20 h-20 rounded-full ${bg} flex items-center justify-center ${color} mb-md`}>
                <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
              </div>
              <h3 className="type-headline text-on-surface mb-sm">{title}</h3>
              <p className="type-body text-on-surface-variant">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Unidades médicas ─────────────────────────────── */}
      <section className="section bg-surface-container-low">
        <div className="container-page">
          <div className="flex flex-col md:flex-row justify-between items-end mb-xl gap-md">
            <div className="max-w-2xl">
              <h2 className="type-display text-on-surface mb-sm">Unidades Médicas Especializadas</h2>
              <p className="type-body-lg text-on-surface-variant">Centros de excelencia dedicados al tratamiento integral de diversas patologías, con equipos multidisciplinarios.</p>
            </div>
            <a className="btn-outline whitespace-nowrap" href="/unidades">Ver todas las unidades</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
            {[
              { icon: 'cardiology',  color: 'primary',   title: 'Cardiología', desc: 'Prevención, diagnóstico y tratamiento de enfermedades cardiovasculares con hemodinamia avanzada.',    href: '/especialidades/cardiologia' },
              { icon: 'neurology',   color: 'secondary', title: 'Neurología',  desc: 'Atención integral de trastornos del sistema nervioso, neurocirugía de mínima invasión e ictus.',        href: '/especialidades/neurologia' },
              { icon: 'oncology',    color: 'tertiary',  title: 'Oncología',   desc: 'Tratamientos personalizados contra el cáncer, radioterapia de precisión y apoyo psicológico.',          href: '/especialidades/oncologia' },
              { icon: 'pediatrics',  color: 'primary',   title: 'Pediatría',   desc: 'Cuidado especializado para niños y adolescentes en un entorno amigable y seguro.',                       href: '/especialidades/pediatria' },
            ].map(({ icon, color, title, desc, href }) => (
              <div key={title} className="card group">
                <div className={`card-icon bg-${color}/10 text-${color} group-hover:bg-${color} group-hover:text-on-${color}`}>
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">{title}</h3>
                <p className="type-body text-on-surface-variant mb-md h-24 overflow-hidden">{desc}</p>
                <a className={`card-link text-${color} hover:text-${color}-container`} href={href}>
                  Explorar unidad <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vanguardia tecnológica ────────────────────────── */}
      <section className="section container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
          <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden shadow-2xl h-150">
            <img alt="Surgical Robotics" className="absolute inset-0 w-full h-full object-cover"
              src="/imagenes/surgical-robotics.png" />
            <div className="absolute inset-0 bg-linear-to-t from-on-background/90 via-on-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-lg w-full">
              <div className="inline-flex items-center gap-xs bg-surface/20 backdrop-blur-md rounded-full px-sm py-xs text-on-primary type-label mb-md">
                <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
                Robótica Quirúrgica
              </div>
              <h3 className="type-display text-on-primary mb-sm">Precisión Milimétrica</h3>
              <p className="type-body text-surface-variant">Intervenciones mínimamente invasivas con sistemas robóticos de última generación para una recuperación más rápida.</p>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex flex-col gap-md">
            <h2 className="type-display text-on-surface">Vanguardia Tecnológica</h2>
            <p className="type-body-lg text-on-surface-variant mb-md">La integración de la inteligencia artificial y la robótica redefine lo que es posible en la medicina moderna.</p>
            <div className="flex flex-col gap-lg">
              {[
                { icon: 'psychology', color: 'text-primary', bg: 'bg-primary/10', title: 'Diagnóstico por IA', desc: 'Algoritmos predictivos que asisten a nuestros médicos en la detección temprana de anomalías con una precisión sin precedentes.' },
                { icon: 'science',    color: 'text-secondary', bg: 'bg-secondary/10', title: 'Medicina Genómica', desc: 'Terapias diseñadas específicamente según el perfil genético del paciente para maximizar la eficacia del tratamiento.' },
              ].map(({ icon, color, bg, title, desc }) => (
                <div key={title} className="flex gap-md">
                  <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center ${color} shrink-0`}>
                    <span className="material-symbols-outlined text-[24px]">{icon}</span>
                  </div>
                  <div>
                    <h4 className="type-headline text-on-surface mb-xs">{title}</h4>
                    <p className="type-body text-on-surface-variant">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a className="btn-dark mt-md w-fit" href="/unidades">Descubrir Tecnología</a>
          </div>
        </div>
      </section>

      {/* ── Bento Grid ───────────────────────────────────── */}
      <section className="section container-page bg-surface-container-lowest rounded-3xl mb-xl">
        <div className="section-header">
          <h2 className="type-headline text-on-surface mb-sm">Infraestructura Tecnológica</h2>
          <p className="type-body text-on-surface-variant max-w-2xl mx-auto">Nuestro compromiso con la salud se refleja en la integración de sistemas de diagnóstico avanzados e instalaciones de primer nivel.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-md auto-rows-[300px]">

          <div className="md:col-span-8 rounded-2xl overflow-hidden relative group border border-surface-variant shadow-sm shadow-secondary/5">
            <img alt="Advanced MRI" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="/imagenes/advanced-mri.png" />
            <div className="absolute inset-0 bg-linear-to-t from-on-background/90 via-on-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-lg w-full">
              <div className="flex items-center gap-xs text-primary-fixed mb-xs">
                <span className="material-symbols-outlined text-[20px]">biotech</span>
                <span className="type-label uppercase tracking-wider">Diagnóstico</span>
              </div>
              <h3 className="type-headline text-on-primary mb-xs">Imagenología de Alta Precisión</h3>
              <p className="type-body text-surface-variant">Equipos de última generación que garantizan resultados exactos y oportunos para un tratamiento eficaz.</p>
            </div>
          </div>

          <div className="md:col-span-4 rounded-2xl overflow-hidden relative group border border-surface-variant shadow-sm shadow-secondary/5">
            <img alt="UCI — Monitoreo de pacientes" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="/imagenes/card-uci.jpg" />
            <div className="absolute inset-0 bg-linear-to-t from-on-background/90 via-on-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-lg w-full">
              <div className="flex items-center gap-xs text-primary-fixed mb-xs">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>monitor_heart</span>
                <span className="type-label uppercase tracking-wider">UCI</span>
              </div>
              <h3 className="type-headline text-on-primary mb-xs">Monitoreo Continuo</h3>
              <p className="type-body text-surface-variant">Sistemas integrados de datos vitales en tiempo real para pacientes hospitalizados.</p>
            </div>
          </div>

          <div className="md:col-span-5 rounded-2xl overflow-hidden relative group border border-surface-variant shadow-sm shadow-secondary/5">
            <img alt="Cirugía robótica Da Vinci" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="/imagenes/surgical-robotics.png" />
            <div className="absolute inset-0 bg-linear-to-t from-on-background/90 via-on-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-lg w-full">
              <div className="flex items-center gap-xs text-primary-fixed mb-xs">
                <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
                <span className="type-label uppercase tracking-wider">Cirugía</span>
              </div>
              <h3 className="type-headline text-on-primary mb-xs">Cirugía Robótica Da Vinci</h3>
              <p className="type-body text-surface-variant">Intervenciones de alta precisión con mínima invasión, menos dolor y recuperación acelerada.</p>
            </div>
          </div>

          <div className="md:col-span-7 rounded-2xl overflow-hidden relative group border border-surface-variant shadow-sm shadow-secondary/5">
            <img alt="Equipo de especialistas de Aura Medical" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="/imagenes/premium-service.jpg" />
            <div className="absolute inset-0 bg-linear-to-t from-on-background/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-lg">
              <h3 className="type-headline text-on-primary mb-xs">Equipo de Especialistas</h3>
              <p className="type-body text-surface-variant">Más de 200 médicos certificados colaborando para ofrecer los mejores resultados clínicos.</p>
              <a className="mt-sm inline-flex items-center gap-xs text-primary-fixed hover:underline type-label" href="/directorio">
                Conocer equipo <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── Testimonios ──────────────────────────────────── */}
      <section className="section bg-primary/5">
        <div className="container-page">
          <div className="section-header">
            <h2 className="type-display text-on-surface mb-sm">Historias de Éxito</h2>
            <p className="type-body-lg text-on-surface-variant max-w-2xl mx-auto">La experiencia de nuestros pacientes es el verdadero reflejo de nuestro compromiso con la excelencia médica.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {[
              { initials: 'CM', color: 'primary',   name: 'Carlos Mendoza',  role: 'Paciente de Cardiología',    stars: 5, quote: 'La atención en la unidad de cardiología fue excepcional. Desde el primer momento me sentí seguro en manos de profesionales que realmente se preocupan por el paciente.' },
              { initials: 'ER', color: 'secondary', name: 'Elena Rivas',     role: 'Paciente de Cirugía General', stars: 5, quote: 'Las suites de recuperación no tienen nada que envidiarle a un hotel de cinco estrellas. Ese nivel de confort hizo que mi recuperación fuera mucho más llevadera.' },
              { initials: 'DL', color: 'tertiary',  name: 'David Londoño',   role: 'Paciente de Neurología',     stars: 4.5, quote: 'El enfoque multidisciplinario de Aura Medical marcó la diferencia en mi diagnóstico. Varios especialistas revisaron mi caso de forma colaborativa.' },
            ].map(({ initials, color, name, role, stars, quote }) => (
              <div key={name} className="bg-surface p-lg rounded-2xl shadow-md relative">
                <span className="material-symbols-outlined absolute top-lg right-lg text-primary/20 text-[64px] leading-none">format_quote</span>
                <div className="flex items-center gap-xs text-primary mb-md">
                  {Array.from({ length: Math.floor(stars) }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                  {stars % 1 > 0 && <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>}
                </div>
                <p className="type-body text-on-surface-variant mb-lg italic relative z-10">"{quote}"</p>
                <div className="flex items-center gap-sm">
                  <div className={`w-12 h-12 rounded-full bg-${color}-container/20 flex items-center justify-center type-label font-bold text-${color}`}>{initials}</div>
                  <div>
                    <h4 className="type-label text-on-surface font-bold">{name}</h4>
                    <p className="type-label text-on-surface-variant">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Aura Premium Club ────────────────────────────── */}
      <section className="section container-page">
        <div className="bg-inverse-surface rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
          <div className="md:w-1/2 p-xl flex flex-col justify-center">
            <div className="inline-flex items-center gap-xs text-primary-fixed mb-md">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              <span className="type-label uppercase tracking-widest font-bold">Membresía Exclusiva</span>
            </div>
            <h2 className="type-display text-on-primary mb-sm">Aura Premium Club</h2>
            <p className="type-body-lg text-surface-variant mb-lg">Acceso preferencial a medicina concierge, gestor de salud personal 24/7 y beneficios exclusivos en todas nuestras instalaciones.</p>
            <ul className="flex flex-col gap-sm mb-lg">
              {['Consultas sin tiempo de espera', 'Check-ups ejecutivos anuales incluidos', 'Acceso a la sala VIP y parking preferencial'].map(item => (
                <li key={item} className="flex items-center gap-sm text-on-primary type-body">
                  <span className="material-symbols-outlined text-primary-fixed">check_circle</span> {item}
                </li>
              ))}
            </ul>
            <a
              href={`https://wa.me/526531332053?text=${encodeURIComponent('Hola, me gustaría solicitar información sobre el Aura Premium Club.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-flex items-center gap-sm"
            >
              Solicitar Información
            </a>
          </div>
          <div className="md:w-1/2 relative min-h-100">
            <img alt="Premium Service" className="absolute inset-0 w-full h-full object-cover"
              src="/imagenes/premium-suite.jpg" />
            <div className="absolute inset-0 bg-linear-to-r from-inverse-surface to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────── */}
      <section className="section px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto text-center border-t border-surface-variant">
        <span className="material-symbols-outlined text-primary text-[48px] mb-md block" style={{ fontVariationSettings: "'FILL' 1" }}>mark_email_read</span>
        <h2 className="type-headline text-on-surface mb-sm">Salud e Innovación en su Bandeja</h2>
        <p className="type-body text-on-surface-variant mb-lg max-w-2xl mx-auto">Suscríbase a nuestro boletín para recibir consejos de bienestar, noticias sobre avances médicos y actualizaciones de Aura Medical.</p>
        <NewsletterForm />
        <p className="type-label text-on-surface-variant/60 mt-sm">Al suscribirse acepta nuestras políticas de privacidad.</p>
      </section>

    </main>
  );
}
