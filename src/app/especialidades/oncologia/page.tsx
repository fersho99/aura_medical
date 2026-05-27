import AgendarCitaModal from '@/components/AgendarCitaModal'

export default function OncologiaPage() {
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
              <span className="text-tertiary font-medium">Centro Oncológico</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-150 md:h-175 flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay muted loop playsInline
            poster="/imagenes/oncologia.png"
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/videos/hero-oncologia.mp4" type="video/mp4" />
            <img alt="Centro de oncología de precisión" src="/imagenes/oncologia.png" className="w-full h-full object-cover" />
          </video>
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-sm px-md py-sm rounded-full glass-panel text-tertiary-fixed type-label mb-md border border-tertiary-fixed/30">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>health_metrics</span>
              Centro Oncológico Integral
            </div>
            <h1 className="type-display font-bold text-white mb-sm leading-tight">
              Oncología de <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-tertiary-fixed to-secondary-fixed-dim">
                Vanguardia
              </span>
            </h1>
            <p className="type-body-lg text-slate-300 mb-lg">
              Proporcionamos terapias contra el cáncer personalizadas y basadas en genómica, con un comité de tumores multidisciplinario dedicado a su recuperación.
            </p>
            <div className="flex flex-col sm:flex-row gap-sm">
              <AgendarCitaModal
                triggerLabel="Agendar Consulta"
                triggerIcon="calendar_month"
                triggerClassName="bg-tertiary-container text-on-tertiary-container hover:bg-tertiary-fixed hover:text-on-tertiary-fixed type-label px-lg py-sm rounded-full transition-all duration-300 flex justify-center items-center gap-xs"
              />
              <a href="/directorio" className="bg-transparent border border-white text-white hover:bg-white/10 type-label px-lg py-sm rounded-full transition-all duration-300 flex justify-center items-center gap-xs">
                <span className="material-symbols-outlined">group</span>
                Conocer al Equipo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Trust Bar */}
      <div className="relative z-20 max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop -mt-12 md:-mt-16 mb-xl">
        <div className="glass-panel rounded-3xl p-md md:p-lg flex flex-col md:flex-row justify-around items-center gap-md border border-zinc-200 shadow-lg shadow-tertiary/5">

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>medical_information</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Gestión</div>
              <div className="type-headline text-on-surface">Comité Multidisciplinario</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>biotech</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Genómica</div>
              <div className="type-headline text-on-surface">Tratamientos Personalizados</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Bienestar</div>
              <div className="type-headline text-on-surface">Apoyo Psicológico 24/7</div>
            </div>
          </div>

        </div>
      </div>

      {/* Services & Procedures Grid */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="bg-zinc-50 rounded-3xl p-lg">

            <div className="section-header">
              <h2 className="type-display text-on-surface mb-sm">Especialidades de Tratamiento</h2>
              <p className="type-body text-on-surface-variant max-w-2xl mx-auto">Enfoques clínicos avanzados diseñados para máxima eficacia y precisión en cada tipo de tumor.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">

              {/* Card 1 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-tertiary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed mb-md group-hover:bg-tertiary-container group-hover:text-on-tertiary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>radiology</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Radioterapia de Precisión</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Tratamientos submilimétricos que atacan el tumor con exactitud milimétrica, protegiendo el tejido sano circundante.</p>
                <a className="type-label text-tertiary flex items-center gap-xs hover:text-tertiary-container transition-colors mt-auto" href="/especialidades/oncologia/radioterapia">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 2 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-tertiary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed mb-md group-hover:bg-tertiary-container group-hover:text-on-tertiary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>vaccines</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Inmunoterapia y Terapias Dirigidas</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Activación del sistema inmunológico propio para combatir células cancerígenas con alta especificidad.</p>
                <a className="type-label text-tertiary flex items-center gap-xs hover:text-tertiary-container transition-colors mt-auto" href="/especialidades/oncologia/inmunoterapia">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 3 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-tertiary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed mb-md group-hover:bg-tertiary-container group-hover:text-on-tertiary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>surgical</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Cirugía Oncológica Robótica</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Intervenciones mínimamente invasivas asistidas por el sistema Da Vinci para tumores de alta complejidad.</p>
                <a className="type-label text-tertiary flex items-center gap-xs hover:text-tertiary-container transition-colors mt-auto" href="/especialidades/oncologia/cirugia-robotica">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 4 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-tertiary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed mb-md group-hover:bg-tertiary-container group-hover:text-on-tertiary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>medication_liquid</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Quimioterapia Personalizada</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Protocolos ajustados según el perfil genómico específico del paciente para maximizar la eficacia del tratamiento.</p>
                <a className="type-label text-tertiary flex items-center gap-xs hover:text-tertiary-container transition-colors mt-auto" href="/especialidades/oncologia/quimioterapia">
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
              <h2 className="type-display text-on-surface mb-sm">Liderazgo Clínico en Oncología</h2>
              <p className="type-body text-on-surface-variant max-w-2xl">Especialistas reconocidos internacionalmente en oncología de precisión y terapias genómicas.</p>
            </div>
            <a href="/directorio" className="hidden md:flex mt-md shrink-0 bg-transparent border border-outline text-on-surface hover:bg-surface-container type-label px-md py-sm rounded-full transition-all duration-300 items-center gap-sm">
              Ver Todo el Equipo
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">

            {/* Doctor 1 */}
            <div className="bg-surface rounded-3xl p-lg border border-outline/20 shadow-md shadow-tertiary/5 flex flex-col sm:flex-row items-center gap-lg">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_0_2px_var(--color-tertiary)]">
                  <img
                    alt="Dra. Carmen Ruiz, Oncóloga"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-7 h-7 bg-tertiary rounded-full border-2 border-surface flex items-center justify-center" title="Verificado">
                  <span className="material-symbols-outlined text-sm text-on-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              </div>
              <div className="grow text-center sm:text-left">
                <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-full text-on-surface-variant font-data-mono text-[10px] mb-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> Torre Oncológica
                </div>
                <h3 className="type-headline text-on-surface mb-xs">Dra. Carmen Ruiz</h3>
                <p className="type-body text-tertiary font-medium mb-md">Oncóloga Médica</p>
                <div className="flex flex-col sm:flex-row gap-sm justify-center sm:justify-start">
                  <a href="/directorio" className="bg-surface-container hover:bg-surface-container-high text-on-surface type-label px-md py-xs rounded-full transition-colors">
                    Ver Perfil
                  </a>
                  <AgendarCitaModal
                    triggerLabel="Agendar Cita"
                    triggerIcon="calendar_month"
                    triggerClassName="bg-tertiary text-on-tertiary hover:bg-tertiary-container hover:text-on-tertiary-container type-label px-md py-xs rounded-full transition-colors flex items-center gap-xs"
                  />
                </div>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="bg-surface rounded-3xl p-lg border border-outline/20 shadow-md shadow-tertiary/5 flex flex-col sm:flex-row items-center gap-lg">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_0_2px_var(--color-secondary)]">
                  <img
                    alt="Dr. Luis Navarro, Cirujano Oncólogo"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-7 h-7 bg-tertiary rounded-full border-2 border-surface flex items-center justify-center" title="Verificado">
                  <span className="material-symbols-outlined text-sm text-on-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              </div>
              <div className="grow text-center sm:text-left">
                <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-full text-on-surface-variant font-data-mono text-[10px] mb-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> Torre Oncológica
                </div>
                <h3 className="type-headline text-on-surface mb-xs">Dr. Luis Navarro</h3>
                <p className="type-body text-tertiary font-medium mb-md">Cirujano Oncólogo</p>
                <div className="flex flex-col sm:flex-row gap-sm justify-center sm:justify-start">
                  <a href="/directorio" className="bg-surface-container hover:bg-surface-container-high text-on-surface type-label px-md py-xs rounded-full transition-colors">
                    Ver Perfil
                  </a>
                  <AgendarCitaModal
                    triggerLabel="Agendar Cita"
                    triggerIcon="calendar_month"
                    triggerClassName="bg-tertiary text-on-tertiary hover:bg-tertiary-container hover:text-on-tertiary-container type-label px-md py-xs rounded-full transition-colors flex items-center gap-xs"
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
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-tertiary-fixed via-slate-900 to-slate-900"></div>
        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg items-center">

            {/* Image Side */}
            <div className="relative rounded-3xl overflow-hidden border border-tertiary-fixed/20 aspect-4/3 group">
              <img
                alt="Acelerador Lineal TrueBeam"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/imagenes/surgical-robotics.png"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-md left-md right-md flex items-center gap-sm">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-tertiary-fixed"></span>
                </span>
                <span className="font-data-mono text-data-mono text-tertiary-fixed uppercase tracking-wider">Sistema Activo</span>
              </div>
            </div>

            {/* Text Side */}
            <div>
              <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-tertiary-container/20 text-tertiary-fixed type-label mb-md border border-tertiary-fixed/30">
                <span className="material-symbols-outlined text-[14px]">memory</span>
                Infraestructura Tecnológica
              </div>
              <h2 className="type-display font-bold mb-md">Acelerador Lineal TrueBeam</h2>
              <p className="type-body-lg text-slate-300 mb-lg">
                Nuestro centro está equipado con el sistema de radioterapia más avanzado, permitiendo tratamientos con precisión submilimétrica. Esta tecnología nos permite atacar tumores complejos mientras preservamos el tejido sano con una eficacia sin precedentes.
              </p>

              <ul className="flex flex-col gap-sm mb-lg">
                <li className="flex items-start gap-sm">
                  <div className="mt-1 w-6 h-6 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary-fixed shrink-0">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="type-headline font-semibold text-white mb-xs">Sincronización Respiratoria en Tiempo Real</h4>
                    <p className="type-body text-slate-400">Ajuste dinámico del haz para compensar el movimiento respiratorio del paciente.</p>
                  </div>
                </li>
                <li className="flex items-start gap-sm">
                  <div className="mt-1 w-6 h-6 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary-fixed shrink-0">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="type-headline font-semibold text-white mb-xs">Imagen Guiada Integrada (IGRT)</h4>
                    <p className="type-body text-slate-400">Verificación de posición en tiempo real para garantizar máxima precisión en cada sesión.</p>
                  </div>
                </li>
              </ul>

              <a href="/unidades" className="border border-tertiary-fixed text-tertiary-fixed hover:bg-tertiary-fixed hover:text-slate-900 type-label px-md py-sm rounded-full transition-all duration-300 flex items-center gap-sm">
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
