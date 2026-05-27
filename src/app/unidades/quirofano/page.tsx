export const metadata = {
  title: 'Bloque Quirúrgico | Aura Medical',
  description: 'Quirófanos integrados con asistencia robótica Da Vinci, neuroimagen intraoperatoria y suites de recuperación premium.',
}

export default function QuirofanoPage() {
  return (
    <main>

      {/* Breadcrumbs */}
      <div className="container-page py-sm">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-xs type-label text-on-surface-variant">
            <li>
              <a className="hover:text-tertiary transition-colors" href="/">Inicio</a>
            </li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <a className="hover:text-tertiary transition-colors" href="/unidades">Unidades Médicas</a>
            </li>
            <li className="flex items-center gap-xs" aria-current="page">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-tertiary font-medium">Bloque Quirúrgico</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-150 md:h-175 flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            alt="Bloque Quirúrgico Aura Medical"
            className="w-full h-full object-cover opacity-40"
            src="/imagenes/quirofano-cesareas.png"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-sm px-md py-sm rounded-full glass-panel text-tertiary-fixed type-label mb-md border border-tertiary-fixed/30">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>surgical</span>
              Alta Cirugía Especializada
            </div>
            <h1 className="type-display font-bold text-white mb-sm leading-tight">
              Bloque Quirúrgico <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-tertiary-fixed to-secondary-fixed-dim">
                Inteligente
              </span>
            </h1>
            <p className="type-body-lg text-slate-300 mb-lg">
              Quirófanos de última generación diseñados para intervenciones de máxima complejidad, con sistemas robóticos integrados, flujo laminar y esterilidad absoluta certificada.
            </p>
            <div className="flex flex-col sm:flex-row gap-sm">
              <button className="bg-tertiary-container text-on-tertiary-container hover:bg-tertiary-fixed hover:text-on-tertiary-fixed type-label px-lg py-sm rounded-full transition-all duration-300 flex justify-center items-center gap-xs">
                Programar Cirugía
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button className="bg-transparent border border-white text-white hover:bg-white/10 type-label px-lg py-sm rounded-full transition-all duration-300 flex justify-center items-center">
                Información Preoperatoria
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Trust Bar */}
      <div className="relative z-20 max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop -mt-12 md:-mt-16 mb-xl">
        <div className="glass-panel rounded-3xl p-md md:p-lg flex flex-col md:flex-row justify-around items-center gap-md border border-zinc-200 shadow-lg shadow-tertiary/5">

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>air</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Bioseguridad</div>
              <div className="type-headline text-on-surface">Flujo Laminar · Cero Infecciones</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>precision_manufacturing</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Robótica</div>
              <div className="type-headline text-on-surface">Sistema Da Vinci Integrado</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>vital_signs</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Recuperación</div>
              <div className="type-headline text-on-surface">Protocolos ERAS Avanzados</div>
            </div>
          </div>

        </div>
      </div>

      {/* Surgical Capabilities Grid */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="bg-zinc-50 rounded-3xl p-lg">

            <div className="section-header">
              <h2 className="type-display text-on-surface mb-sm">Instalaciones de Excelencia</h2>
              <p className="type-body text-on-surface-variant max-w-2xl mx-auto">Infraestructura quirúrgica diseñada bajo estándares internacionales para cada fase del procedimiento.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">

              {/* Card 1 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-tertiary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed mb-md group-hover:bg-tertiary-container group-hover:text-on-tertiary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">medical_information</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Quirófanos Híbridos</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Integración de imagenología y cirugía en tiempo real con tomografía intraoperatoria y navegación guiada.</p>
                <a className="type-label text-tertiary flex items-center gap-xs hover:text-on-tertiary-container transition-colors mt-auto" href="#">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 2 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-tertiary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed mb-md group-hover:bg-tertiary-container group-hover:text-on-tertiary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">cleaning_services</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Central de Esterilización</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Protocolos de bioseguridad internacional con trazabilidad digital completa de todo el instrumental quirúrgico.</p>
                <a className="type-label text-tertiary flex items-center gap-xs hover:text-on-tertiary-container transition-colors mt-auto" href="#">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 3 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-tertiary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed mb-md group-hover:bg-tertiary-container group-hover:text-on-tertiary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">bed</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Sala de Despertar (UCPA)</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Unidad de Cuidados Post-Anestésicos con monitoreo continuo 1:1 durante la recuperación inmediata.</p>
                <a className="type-label text-tertiary flex items-center gap-xs hover:text-on-tertiary-container transition-colors mt-auto" href="#">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 4 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-tertiary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed mb-md group-hover:bg-tertiary-container group-hover:text-on-tertiary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">medication</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Anestesiología de Alto Riesgo</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Gestión anestésica especializada con monitoreo neuro-muscular y sistemas de analgesia multimodal.</p>
                <a className="type-label text-tertiary flex items-center gap-xs hover:text-on-tertiary-container transition-colors mt-auto" href="#">
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
              <h2 className="type-display text-on-surface mb-sm">Dirección Quirúrgica</h2>
              <p className="type-body text-on-surface-variant max-w-2xl">Líderes en sus especialidades, combinando décadas de experiencia con el dominio de la tecnología robótica más avanzada.</p>
            </div>
            <button className="hidden md:flex mt-md shrink-0 bg-transparent border border-outline text-on-surface hover:bg-surface-container type-label px-md py-sm rounded-full transition-all duration-300 items-center gap-sm">
              Ver Todo el Equipo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">

            {/* Doctor 1 */}
            <div className="bg-surface rounded-3xl p-lg border border-outline/20 shadow-md shadow-tertiary/5 flex flex-col sm:flex-row items-center gap-lg">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_0_2px_var(--color-tertiary)]">
                  <img
                    alt="Dr. Alejandro Vargas, Cirujano Robótico"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-tertiary rounded-full border-2 border-surface" title="Disponible"></div>
              </div>
              <div className="grow text-center sm:text-left">
                <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-full text-on-surface-variant font-data-mono text-[10px] mb-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> Bloque Quirúrgico · Piso 4
                </div>
                <h3 className="type-headline text-on-surface mb-xs">Dr. Alejandro Vargas Leal</h3>
                <p className="type-body text-tertiary font-medium mb-md">Cirugía General y Robótica · Sistema Da Vinci</p>
                <div className="flex flex-col sm:flex-row gap-sm justify-center sm:justify-start">
                  <button className="bg-surface-container hover:bg-surface-container-high text-on-surface type-label px-md py-xs rounded-full transition-colors">
                    Ver Perfil
                  </button>
                  <button className="bg-tertiary text-on-tertiary hover:bg-tertiary-container hover:text-on-tertiary-container type-label px-md py-xs rounded-full transition-colors">
                    Agendar Consulta
                  </button>
                </div>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="bg-surface rounded-3xl p-lg border border-outline/20 shadow-md shadow-tertiary/5 flex flex-col sm:flex-row items-center gap-lg">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_0_2px_var(--color-secondary)]">
                  <img
                    alt="Dra. Elena Ríos, Neurocirujana"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=300&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-secondary rounded-full border-2 border-surface" title="Disponible"></div>
              </div>
              <div className="grow text-center sm:text-left">
                <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-full text-on-surface-variant font-data-mono text-[10px] mb-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> Bloque Quirúrgico · Piso 4
                </div>
                <h3 className="type-headline text-on-surface mb-xs">Dra. Elena Ríos Montoya</h3>
                <p className="type-body text-tertiary font-medium mb-md">Neurocirugía · Neuronavegación y Base de Cráneo</p>
                <div className="flex flex-col sm:flex-row gap-sm justify-center sm:justify-start">
                  <button className="bg-surface-container hover:bg-surface-container-high text-on-surface type-label px-md py-xs rounded-full transition-colors">
                    Ver Perfil
                  </button>
                  <button className="bg-tertiary text-on-tertiary hover:bg-tertiary-container hover:text-on-tertiary-container type-label px-md py-xs rounded-full transition-colors">
                    Agendar Consulta
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
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-tertiary-fixed via-slate-900 to-slate-900"></div>
        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg items-center">

            {/* Image Side */}
            <div className="relative rounded-3xl overflow-hidden border border-tertiary-fixed/20 aspect-4/3 group">
              <img
                alt="Sala de Robótica Quirúrgica Aura Medical"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-md left-md right-md flex items-center gap-sm">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-tertiary-fixed"></span>
                </span>
                <span className="font-data-mono text-data-mono text-tertiary-fixed uppercase tracking-wider">Sistema Da Vinci · Operativo</span>
              </div>
            </div>

            {/* Text Side */}
            <div>
              <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-tertiary-container/20 text-tertiary-fixed type-label mb-md border border-tertiary-fixed/30">
                <span className="material-symbols-outlined text-[14px]">memory</span>
                Robótica de Precisión
              </div>
              <h2 className="type-display font-bold mb-md">Cirugía Robótica Da Vinci de Última Generación</h2>
              <p className="type-body-lg text-slate-300 mb-lg">
                Nuestro sistema Da Vinci permite a los cirujanos realizar intervenciones de alta complejidad a través de incisiones mínimas, con visualización 3D magnificada y movimientos de precisión submilimétrica que superan la habilidad manual convencional.
              </p>

              <ul className="flex flex-col gap-sm mb-lg">
                <li className="flex items-start gap-sm">
                  <div className="mt-1 w-6 h-6 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary-fixed shrink-0">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="type-headline font-semibold text-white mb-xs">Incisiones Mínimas, Recuperación Rápida</h4>
                    <p className="type-body text-slate-400">Reducción significativa del dolor postoperatorio y tiempo de hospitalización frente a cirugía abierta.</p>
                  </div>
                </li>
                <li className="flex items-start gap-sm">
                  <div className="mt-1 w-6 h-6 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary-fixed shrink-0">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="type-headline font-semibold text-white mb-xs">Visualización 3D Magnificada 10×</h4>
                    <p className="type-body text-slate-400">Campo visual intraoperatorio de alta definición para mayor precisión en tejidos de acceso complejo.</p>
                  </div>
                </li>
              </ul>

              <button className="border border-tertiary-fixed text-tertiary-fixed hover:bg-tertiary-fixed hover:text-slate-900 type-label px-md py-sm rounded-full transition-all duration-300 flex items-center gap-sm">
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
