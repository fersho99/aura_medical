import AgendarCitaModal from '@/components/AgendarCitaModal'

export default function NeurologiaPage() {
  return (
    <main>

      {/* Breadcrumbs */}
      <div className="container-page py-sm">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-xs type-label text-on-surface-variant">
            <li>
              <a className="hover:text-primary transition-colors" href="/">Inicio</a>
            </li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <a className="hover:text-primary transition-colors" href="/especialidades">Especialidades</a>
            </li>
            <li className="flex items-center gap-xs" aria-current="page">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-secondary font-medium">Neurociencias Clínicas</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-150 md:h-175 flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay muted loop playsInline
            poster="/imagenes/neurologia.png"
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/videos/hero-neurologia.mp4" type="video/mp4" />
            <img alt="High-tech neurology laboratory" src="/imagenes/neurologia.png" className="w-full h-full object-cover" />
          </video>
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-sm px-md py-sm rounded-full glass-panel text-secondary-fixed type-label mb-md border border-secondary-fixed/30">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
              Instituto de Neurociencias
            </div>
            <h1 className="type-display font-bold text-white mb-sm leading-tight">
              Neurología de <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary-fixed to-primary-fixed">
                Alta Precisión
              </span>
            </h1>
            <p className="type-body-lg text-slate-300 mb-lg">
              Diagnóstico y tratamiento avanzado de trastornos del sistema nervioso, combinando neurocirugía de mínima invasión con neuroimagen de vanguardia.
            </p>
            <div className="flex flex-col sm:flex-row gap-sm">
              <AgendarCitaModal
                triggerLabel="Agendar Consulta"
                triggerIcon="arrow_forward"
                triggerClassName="bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed hover:text-on-secondary-fixed type-label px-lg py-sm rounded-full transition-all duration-300 flex justify-center items-center gap-xs"
              />
              <a href="/directorio" className="bg-transparent border border-white text-white hover:bg-white/10 type-label px-lg py-sm rounded-full transition-all duration-300 flex justify-center items-center">
                Conocer al Equipo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Trust Bar */}
      <div className="relative z-20 max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop -mt-12 md:-mt-16 mb-xl">
        <div className="glass-panel rounded-3xl p-md md:p-lg flex flex-col md:flex-row justify-around items-center gap-md border border-zinc-200 shadow-lg shadow-secondary/5">

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Casos Resueltos</div>
              <div className="type-headline text-on-surface">+200 Casos Complejos</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>view_in_ar</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Diagnóstico</div>
              <div className="type-headline text-on-surface">Neuroimagen 3D</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-on-error-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>vital_signs</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Atención Continua</div>
              <div className="type-headline text-on-surface">Unidad de Ictus 24/7</div>
            </div>
          </div>

        </div>
      </div>

      {/* Services & Procedures Grid */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="bg-zinc-50 rounded-3xl p-lg">

            <div className="section-header">
              <h2 className="type-display text-on-surface mb-sm">Procedimientos Especializados</h2>
              <p className="type-body text-on-surface-variant max-w-2xl mx-auto">Intervenciones precisas respaldadas por tecnología de punta y protocolos clínicos internacionales.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">

              {/* Card 1 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-secondary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-md group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">radiology</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Resonancia Magnética Funcional</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Mapeo cerebral avanzado no invasivo para identificar áreas elocuentes antes de procedimientos quirúrgicos complejos.</p>
                <a className="type-label text-secondary flex items-center gap-xs hover:text-secondary-container transition-colors mt-auto" href="/especialidades/neurologia/resonancia-magnetica-funcional">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 2 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-secondary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-md group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">prescriptions</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Neurocirugía Mínima Invasión</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Abordajes endoscópicos y microquirúrgicos para tumores y patologías vasculares, con recuperaciones más rápidas.</p>
                <a className="type-label text-secondary flex items-center gap-xs hover:text-secondary-container transition-colors mt-auto" href="/especialidades/neurologia/neurocirugia-minima-invasion">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 3 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-secondary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-md group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Clínica Especializada de Memoria</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Evaluación neurocognitiva integral para el diagnóstico temprano de demencias y trastornos neurodegenerativos.</p>
                <a className="type-label text-secondary flex items-center gap-xs hover:text-secondary-container transition-colors mt-auto" href="/especialidades/neurologia/clinica-de-memoria">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 4 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-secondary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-md group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">emergency</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Tratamiento Integral de ACV</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Protocolo 'Código Ictus' con trombolisis y trombectomía mecánica endovascular disponible 24/7.</p>
                <a className="type-label text-secondary flex items-center gap-xs hover:text-secondary-container transition-colors mt-auto" href="/especialidades/neurologia/tratamiento-acv">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Medical Team Section */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="flex flex-col md:flex-row justify-between items-end mb-lg">
            <div>
              <h2 className="type-display text-on-surface mb-sm">Nuestros Especialistas en Neurología</h2>
              <p className="type-body text-on-surface-variant max-w-2xl">Expertos reconocidos internacionalmente, liderando la innovación en el tratamiento neurológico.</p>
            </div>
            <a href="/directorio" className="hidden md:flex mt-md shrink-0 bg-transparent border border-outline text-on-surface hover:bg-surface-container type-label px-md py-sm rounded-full transition-all duration-300 items-center gap-sm">
              Ver Todo el Equipo
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">

            {/* Doctor 1 */}
            <div className="bg-surface rounded-3xl p-lg border border-outline/20 shadow-md shadow-secondary/5 flex flex-col sm:flex-row items-center gap-lg">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_0_2px_var(--color-secondary)]">
                  <img
                    alt="Dr. Roberto Méndez, Neurocirujano"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-secondary rounded-full border-2 border-surface" title="Disponible"></div>
              </div>
              <div className="grow text-center sm:text-left">
                <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-full text-on-surface-variant font-data-mono text-[10px] mb-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> Torre Sur
                </div>
                <h3 className="type-headline text-on-surface mb-xs">Dr. Roberto Méndez</h3>
                <p className="type-body text-secondary font-medium mb-md">Neurocirujano Principal</p>
                <div className="flex flex-col sm:flex-row gap-sm justify-center sm:justify-start">
                  <a href="/directorio" className="bg-surface-container hover:bg-surface-container-high text-on-surface type-label px-md py-xs rounded-full transition-colors">
                    Ver Perfil
                  </a>
                  <AgendarCitaModal
                    triggerLabel="Agendar Cita"
                    triggerIcon="calendar_month"
                    triggerClassName="bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container type-label px-md py-xs rounded-full transition-colors flex items-center gap-xs"
                  />
                </div>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="bg-surface rounded-3xl p-lg border border-outline/20 shadow-md shadow-secondary/5 flex flex-col sm:flex-row items-center gap-lg">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_0_2px_var(--color-primary)]">
                  <img
                    alt="Dra. Sofia Castro, Neuróloga"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1594824436998-d40b243c158b?q=80&w=300&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-secondary rounded-full border-2 border-surface" title="Disponible"></div>
              </div>
              <div className="grow text-center sm:text-left">
                <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-full text-on-surface-variant font-data-mono text-[10px] mb-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> Torre Sur
                </div>
                <h3 className="type-headline text-on-surface mb-xs">Dra. Sofia Castro</h3>
                <p className="type-body text-secondary font-medium mb-md">Neuróloga Clínica</p>
                <div className="flex flex-col sm:flex-row gap-sm justify-center sm:justify-start">
                  <a href="/directorio" className="bg-surface-container hover:bg-surface-container-high text-on-surface type-label px-md py-xs rounded-full transition-colors">
                    Ver Perfil
                  </a>
                  <AgendarCitaModal
                    triggerLabel="Agendar Cita"
                    triggerIcon="calendar_month"
                    triggerClassName="bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container type-label px-md py-xs rounded-full transition-colors flex items-center gap-xs"
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="mt-lg text-center md:hidden">
            <a href="/directorio" className="w-full bg-transparent border border-outline text-on-surface hover:bg-surface-container type-label px-md py-sm rounded-full transition-all duration-300 flex items-center justify-center">
              Ver Todo el Equipo
            </a>
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="section bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-secondary-fixed via-slate-900 to-slate-900"></div>
        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg items-center">

            {/* Image Side */}
            <div className="relative rounded-3xl overflow-hidden border border-secondary-fixed/20 aspect-4/3 group">
              <img
                alt="Quirófano inteligente con neuronavegación"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2000&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-md left-md right-md flex items-center gap-sm">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary-fixed"></span>
                </span>
                <span className="font-data-mono text-data-mono text-secondary-fixed uppercase tracking-wider">Sistema Activo</span>
              </div>
            </div>

            {/* Text Side */}
            <div>
              <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-secondary-container/20 text-secondary-fixed type-label mb-md border border-secondary-fixed/30">
                <span className="material-symbols-outlined text-[14px]">memory</span>
                Infraestructura Quirúrgica
              </div>
              <h2 className="type-display font-bold mb-md">Quirófano Inteligente con Neuronavegación</h2>
              <p className="type-body-lg text-slate-300 mb-lg">
                Nuestra instalación de grado clínico integra sistemas de mapeo cerebral 3D en tiempo real y robótica microscópica de precisión, permitiendo visualizar tractos nerviosos milimétricos durante la intervención para la máxima resección segura de lesiones.
              </p>

              <ul className="flex flex-col gap-sm mb-lg">
                <li className="flex items-start gap-sm">
                  <div className="mt-1 w-6 h-6 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-fixed shrink-0">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="type-headline font-semibold text-white mb-xs">Mapeo Cortical Intraoperatorio</h4>
                    <p className="type-body text-slate-400">Visualización inmersiva de tractos nerviosos durante el procedimiento quirúrgico.</p>
                  </div>
                </li>
                <li className="flex items-start gap-sm">
                  <div className="mt-1 w-6 h-6 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-fixed shrink-0">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="type-headline font-semibold text-white mb-xs">Microscopía de Fluorescencia Avanzada</h4>
                    <p className="type-body text-slate-400">Identificación precisa de tejido tumoral para máxima resección segura.</p>
                  </div>
                </li>
              </ul>

              <a href="/unidades" className="border border-secondary-fixed text-secondary-fixed hover:bg-secondary-fixed hover:text-slate-900 type-label px-md py-sm rounded-full transition-all duration-300 flex items-center gap-sm">
                Conocer nuestras instalaciones
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
