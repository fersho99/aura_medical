export const metadata = {
  title: 'Urgencias 24/7 | Aura Medical',
  description: 'Atención de urgencias médicas las 24 horas, 7 días a la semana, con especialistas en sala de choque y acceso directo a UCI.',
}

export default function UrgenciasPage() {
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
              <a className="hover:text-primary transition-colors" href="/unidades">Unidades Médicas</a>
            </li>
            <li className="flex items-center gap-xs" aria-current="page">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-primary font-medium">Urgencias 24/7</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-150 md:h-175 flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            alt="Centro de Urgencias Aura Medical"
            className="w-full h-full object-cover opacity-40"
            src="/imagenes/hero-background.png"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-sm px-md py-sm rounded-full glass-panel text-primary-fixed type-label mb-md border border-primary-fixed/30">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
              Respuesta Inmediata · Triage Inteligente
            </div>
            <h1 className="type-display font-bold text-white mb-sm leading-tight">
              Centro de Urgencias <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-fixed to-error-container">
                Atención 24 / 7
              </span>
            </h1>
            <p className="type-body-lg text-slate-300 mb-lg">
              Atención médica inmediata para adultos y niños con sistema de Triage inteligente, especialistas de guardia presencial y conexión directa a quirófano en menos de 4 minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-sm">
              <a href="tel:911" className="bg-error text-on-error hover:bg-error/80 type-label px-lg py-sm rounded-full transition-all duration-300 flex justify-center items-center gap-xs">
                <span className="material-symbols-outlined">call</span>
                Emergencias: 911
              </a>
              <button className="bg-transparent border border-white text-white hover:bg-white/10 type-label px-lg py-sm rounded-full transition-all duration-300 flex justify-center items-center gap-xs">
                <span className="material-symbols-outlined">location_on</span>
                Ver Ubicación
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Trust Bar */}
      <div className="relative z-20 max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop -mt-12 md:-mt-16 mb-xl">
        <div className="glass-panel rounded-3xl p-md md:p-lg flex flex-col md:flex-row justify-around items-center gap-md border border-zinc-200 shadow-lg shadow-primary/5">

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-on-error-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Priorización</div>
              <div className="type-headline text-on-surface">Triage sin Esperas</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>clinical_notes</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Cobertura</div>
              <div className="type-headline text-on-surface">Especialistas 24/7 en Guardia</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>monitor_heart</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Infraestructura</div>
              <div className="type-headline text-on-surface">Sala de Choque Equipada</div>
            </div>
          </div>

        </div>
      </div>

      {/* Services Grid */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="bg-zinc-50 rounded-3xl p-lg">

            <div className="section-header">
              <h2 className="type-display text-on-surface mb-sm">Instalaciones de Primer Nivel</h2>
              <p className="type-body text-on-surface-variant max-w-2xl mx-auto">Diseñadas para maximizar la eficiencia clínica en cada fase de la atención urgente.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">

              {/* Card 1 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-primary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed mb-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">filter_alt</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Triage Inteligente</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Sistema de clasificación asistido por IA que prioriza casos críticos en tiempo real, sin tiempos de espera innecesarios.</p>
                <a className="type-label text-primary flex items-center gap-xs hover:text-primary-container transition-colors mt-auto" href="#">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 2 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-primary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-error-container flex items-center justify-center text-on-error-container mb-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">emergency</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Sala de Choque</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Equipada para reanimación cardiopulmonar, politrauma y estabilización hemodinámica de emergencia.</p>
                <a className="type-label text-primary flex items-center gap-xs hover:text-primary-container transition-colors mt-auto" href="#">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 3 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-primary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed mb-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">meeting_room</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Boxes Privados</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Cubículos individuales con monitoreo por telemetría, privacidad garantizada y acceso inmediato al equipo médico.</p>
                <a className="type-label text-primary flex items-center gap-xs hover:text-primary-container transition-colors mt-auto" href="#">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 4 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-primary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed mb-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">child_care</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Urgencias Pediátricas</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Área especializada para niños con pediatras de guardia, entorno diseñado para reducir el estrés del menor.</p>
                <a className="type-label text-primary flex items-center gap-xs hover:text-primary-container transition-colors mt-auto" href="#">
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
              <h2 className="type-display text-on-surface mb-sm">Nuestros Urgenciólogos</h2>
              <p className="type-body text-on-surface-variant max-w-2xl">Especialistas en medicina de emergencias con respuesta inmediata y formación en trauma avanzado.</p>
            </div>
            <button className="hidden md:flex mt-md shrink-0 bg-transparent border border-outline text-on-surface hover:bg-surface-container type-label px-md py-sm rounded-full transition-all duration-300 items-center gap-sm">
              Ver Todo el Equipo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">

            {/* Doctor 1 */}
            <div className="bg-surface rounded-3xl p-lg border border-outline/20 shadow-md shadow-primary/5 flex flex-col sm:flex-row items-center gap-lg">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_0_2px_var(--color-primary)]">
                  <img
                    alt="Dr. Carlos Ángel, Urgenciólogo"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=300&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full border-2 border-surface" title="En Guardia"></div>
              </div>
              <div className="grow text-center sm:text-left">
                <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-full text-on-surface-variant font-data-mono text-[10px] mb-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> Urgencias · Planta Baja
                </div>
                <h3 className="type-headline text-on-surface mb-xs">Dr. Carlos Ángel Fuentes</h3>
                <p className="type-body text-primary font-medium mb-md">Jefe de Urgencias · Trauma y Emergencias</p>
                <div className="flex flex-col sm:flex-row gap-sm justify-center sm:justify-start">
                  <button className="bg-surface-container hover:bg-surface-container-high text-on-surface type-label px-md py-xs rounded-full transition-colors">
                    Ver Perfil
                  </button>
                  <button className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container type-label px-md py-xs rounded-full transition-colors">
                    Agendar Consulta
                  </button>
                </div>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="bg-surface rounded-3xl p-lg border border-outline/20 shadow-md shadow-primary/5 flex flex-col sm:flex-row items-center gap-lg">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_0_2px_var(--color-secondary)]">
                  <img
                    alt="Dra. Fernanda López, Pediatra Urgenciólogo"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-secondary rounded-full border-2 border-surface" title="En Guardia"></div>
              </div>
              <div className="grow text-center sm:text-left">
                <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-full text-on-surface-variant font-data-mono text-[10px] mb-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> Urgencias · Planta Baja
                </div>
                <h3 className="type-headline text-on-surface mb-xs">Dra. Fernanda López Serrano</h3>
                <p className="type-body text-primary font-medium mb-md">Urgencias Pediátricas · Coordinadora</p>
                <div className="flex flex-col sm:flex-row gap-sm justify-center sm:justify-start">
                  <button className="bg-surface-container hover:bg-surface-container-high text-on-surface type-label px-md py-xs rounded-full transition-colors">
                    Ver Perfil
                  </button>
                  <button className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container type-label px-md py-xs rounded-full transition-colors">
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
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary-fixed via-slate-900 to-slate-900"></div>
        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg items-center">

            {/* Image Side */}
            <div className="relative rounded-3xl overflow-hidden border border-primary-fixed/20 aspect-4/3 group">
              <img
                alt="Protocolo Golden Hour Aura Medical"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-md left-md right-md flex items-center gap-sm">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-fixed opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-fixed"></span>
                </span>
                <span className="font-data-mono text-data-mono text-primary-fixed uppercase tracking-wider">Código Fénix · Protocolo Activo</span>
              </div>
            </div>

            {/* Text Side */}
            <div>
              <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-primary-container/20 text-primary-fixed type-label mb-md border border-primary-fixed/30">
                <span className="material-symbols-outlined text-[14px]">hub</span>
                Protocolo de Alta Prioridad
              </div>
              <h2 className="type-display font-bold mb-md">Conexión Directa "Golden Hour"</h2>
              <p className="type-body-lg text-slate-300 mb-lg">
                Acceso directo por elevador exclusivo a la Sala de Hemodinamia y al Bloque Quirúrgico, garantizando una intervención en menos de 4 minutos en casos de infarto agudo o trauma severo.
              </p>

              <ul className="flex flex-col gap-sm mb-lg">
                <li className="flex items-start gap-sm">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-fixed shrink-0">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="type-headline font-semibold text-white mb-xs">Activación de Código Fénix en &lt;60 segundos</h4>
                    <p className="type-body text-slate-400">El equipo multidisciplinario se moviliza de forma simultánea desde el momento de llegada del paciente.</p>
                  </div>
                </li>
                <li className="flex items-start gap-sm">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-fixed shrink-0">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="type-headline font-semibold text-white mb-xs">Integración con Expediente Clínico en Tiempo Real</h4>
                    <p className="type-body text-slate-400">Historia clínica, alergias y medicamentos disponibles antes de que el paciente llegue al box.</p>
                  </div>
                </li>
              </ul>

              <button className="border border-primary-fixed text-primary-fixed hover:bg-primary-fixed hover:text-slate-900 type-label px-md py-sm rounded-full transition-all duration-300 flex items-center gap-sm">
                Conocer Protocolo Código Fénix
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
