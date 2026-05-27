export default function ImagenologiaPage() {
  return (
    <main>

      {/* Breadcrumbs */}
      <div className="container-page py-sm">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-xs type-label text-on-surface-variant">
            <li>
              <a className="hover:text-secondary transition-colors" href="/">Inicio</a>
            </li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <a className="hover:text-secondary transition-colors" href="/unidades">Unidades Médicas</a>
            </li>
            <li className="flex items-center gap-xs" aria-current="page">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-secondary font-medium">Imagenología y Diagnóstico</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-150 md:h-175 flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            alt="Sala de Resonancia Magnética Aura Medical"
            className="w-full h-full object-cover opacity-40"
            src="/imagenes/advanced-mri.png"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-sm px-md py-sm rounded-full glass-panel text-secondary-fixed type-label mb-md border border-secondary-fixed/30">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>biotech</span>
              Centro de Diagnóstico por Imagen
            </div>
            <h1 className="type-display font-bold text-white mb-sm leading-tight">
              Imagenología de <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary-fixed to-primary-fixed">
                Alta Precisión
              </span>
            </h1>
            <p className="type-body-lg text-slate-300 mb-lg">
              Equipamiento radiológico de última generación potenciado por Inteligencia Artificial para diagnósticos exactos, rápidos y con el mínimo de radiación para el paciente.
            </p>
            <div className="flex flex-col sm:flex-row gap-sm">
              <button className="bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed hover:text-on-secondary-fixed type-label px-lg py-sm rounded-full transition-all duration-300 flex justify-center items-center gap-xs">
                Agendar Estudio
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button className="bg-transparent border border-white text-white hover:bg-white/10 type-label px-lg py-sm rounded-full transition-all duration-300 flex justify-center items-center">
                Preparación para Estudios
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Trust Bar */}
      <div className="relative z-20 max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop -mt-12 md:-mt-16 mb-xl">
        <div className="glass-panel rounded-3xl p-md md:p-lg flex flex-col md:flex-row justify-around items-center gap-md border border-zinc-200 shadow-lg shadow-secondary/5">

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>radiology</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Resolución Clínica</div>
              <div className="type-headline text-on-surface">Resonancia de 3 Teslas</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Entrega</div>
              <div className="type-headline text-on-surface">Resultados Digitales 24h</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Tecnología</div>
              <div className="type-headline text-on-surface">IA Diagnóstica Integrada</div>
            </div>
          </div>

        </div>
      </div>

      {/* Services & Studies Grid */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="bg-zinc-50 rounded-3xl p-lg">

            <div className="section-header">
              <h2 className="type-display text-on-surface mb-sm">Estudios Especializados</h2>
              <p className="type-body text-on-surface-variant max-w-2xl mx-auto">Tecnología de vanguardia para cada necesidad clínica, con los más altos estándares de seguridad radiológica.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">

              {/* Card 1 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-secondary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-md group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">scanner</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Resonancia Magnética 3T</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Imágenes de alta definición para neurología, ortopedia y oncología con mayor confort y sin radiación ionizante.</p>
                <a className="type-label text-secondary flex items-center gap-xs hover:text-secondary-container transition-colors mt-auto" href="#">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 2 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-secondary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-md group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">change_circle</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Tomografía Multicorte</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Estudios rápidos y precisos de cuerpo entero con reconstrucción 3D y mínima exposición a radiación.</p>
                <a className="type-label text-secondary flex items-center gap-xs hover:text-secondary-container transition-colors mt-auto" href="#">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 3 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-secondary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-md group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">graphic_eq</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Ultrasonido 4D y Doppler</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Evaluación dinámica en tiempo real para estudios obstétricos, vasculares y de tejidos blandos.</p>
                <a className="type-label text-secondary flex items-center gap-xs hover:text-secondary-container transition-colors mt-auto" href="#">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 4 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-secondary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-md group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">ecg_heart</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Mastografía y Densitometría</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Detección temprana y precisa para la salud integral de la mujer con sistemas de compresión optimizada.</p>
                <a className="type-label text-secondary flex items-center gap-xs hover:text-secondary-container transition-colors mt-auto" href="#">
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
              <h2 className="type-display text-on-surface mb-sm">Nuestros Especialistas en Imagenología</h2>
              <p className="type-body text-on-surface-variant max-w-2xl">Radiólogos certificados con formación en centros de referencia internacionales, líderes en diagnóstico por imagen.</p>
            </div>
            <button className="hidden md:flex mt-md shrink-0 bg-transparent border border-outline text-on-surface hover:bg-surface-container type-label px-md py-sm rounded-full transition-all duration-300 items-center gap-sm">
              Ver Todo el Equipo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">

            {/* Doctor 1 */}
            <div className="bg-surface rounded-3xl p-lg border border-outline/20 shadow-md shadow-secondary/5 flex flex-col sm:flex-row items-center gap-lg">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_0_2px_var(--color-secondary)]">
                  <img
                    alt="Dra. Mariana Ríos, Radióloga"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-secondary rounded-full border-2 border-surface" title="Disponible"></div>
              </div>
              <div className="grow text-center sm:text-left">
                <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-full text-on-surface-variant font-data-mono text-[10px] mb-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> Torre Diagnóstica
                </div>
                <h3 className="type-headline text-on-surface mb-xs">Dra. Mariana Ríos Castillo</h3>
                <p className="type-body text-secondary font-medium mb-md">Radióloga · RM y IA Diagnóstica</p>
                <div className="flex flex-col sm:flex-row gap-sm justify-center sm:justify-start">
                  <button className="bg-surface-container hover:bg-surface-container-high text-on-surface type-label px-md py-xs rounded-full transition-colors">
                    Ver Perfil
                  </button>
                  <button className="bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container type-label px-md py-xs rounded-full transition-colors">
                    Agendar Estudio
                  </button>
                </div>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="bg-surface rounded-3xl p-lg border border-outline/20 shadow-md shadow-secondary/5 flex flex-col sm:flex-row items-center gap-lg">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_0_2px_var(--color-primary)]">
                  <img
                    alt="Dr. Alejandro Vargas, Radiólogo Intervencionista"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full border-2 border-surface" title="Disponible"></div>
              </div>
              <div className="grow text-center sm:text-left">
                <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-full text-on-surface-variant font-data-mono text-[10px] mb-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> Torre Diagnóstica
                </div>
                <h3 className="type-headline text-on-surface mb-xs">Dr. Alejandro Vargas Mora</h3>
                <p className="type-body text-secondary font-medium mb-md">Radiólogo Intervencionista · Tomografía</p>
                <div className="flex flex-col sm:flex-row gap-sm justify-center sm:justify-start">
                  <button className="bg-surface-container hover:bg-surface-container-high text-on-surface type-label px-md py-xs rounded-full transition-colors">
                    Ver Perfil
                  </button>
                  <button className="bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container type-label px-md py-xs rounded-full transition-colors">
                    Agendar Estudio
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-lg text-center md:hidden">
            <button className="w-full bg-transparent border border-outline text-on-surface hover:bg-surface-container type-label px-md py-sm rounded-full transition-all duration-300">
              Ver Todo el Equipo
            </button>
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
                alt="Diagnóstico asistido por IA Aura Medical"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/imagenes/neurologia.png"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-md left-md right-md flex items-center gap-sm">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary-fixed"></span>
                </span>
                <span className="font-data-mono text-data-mono text-secondary-fixed uppercase tracking-wider">IA Activa · Análisis en Tiempo Real</span>
              </div>
            </div>

            {/* Text Side */}
            <div>
              <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-secondary-container/20 text-secondary-fixed type-label mb-md border border-secondary-fixed/30">
                <span className="material-symbols-outlined text-[14px]">memory</span>
                Vanguardia Tecnológica
              </div>
              <h2 className="type-display font-bold mb-md">Diagnóstico Asistido por Inteligencia Artificial</h2>
              <p className="type-body-lg text-slate-300 mb-lg">
                Nuestros sistemas integran algoritmos de aprendizaje profundo que analizan imágenes radiológicas en tiempo real. Esta tecnología detecta anomalías microscópicas con una precisión sin precedentes, apoyando a nuestros radiólogos para un diagnóstico más rápido y seguro.
              </p>

              <ul className="flex flex-col gap-sm mb-lg">
                <li className="flex items-start gap-sm">
                  <div className="mt-1 w-6 h-6 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-fixed shrink-0">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="type-headline font-semibold text-white mb-xs">Detección Temprana de Patologías Sutiles</h4>
                    <p className="type-body text-slate-400">Identifica anomalías microscópicas antes invisibles al ojo clínico convencional.</p>
                  </div>
                </li>
                <li className="flex items-start gap-sm">
                  <div className="mt-1 w-6 h-6 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-fixed shrink-0">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="type-headline font-semibold text-white mb-xs">Reducción de Falsos Positivos</h4>
                    <p className="type-body text-slate-400">Minimiza re-estudios innecesarios y la ansiedad del paciente con mayor exactitud.</p>
                  </div>
                </li>
              </ul>

              <button className="border border-secondary-fixed text-secondary-fixed hover:bg-secondary-fixed hover:text-slate-900 type-label px-md py-sm rounded-full transition-all duration-300 flex items-center gap-sm">
                Conocer nuestras instalaciones
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
