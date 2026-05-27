export const metadata = {
  title: 'Unidad de Cuidados Intensivos | Aura Medical',
  description: 'UCI adultos con monitoreo avanzado 24/7, ventilación mecánica inteligente y soporte vital de última generación.',
}

export default function UCIPage() {
  return (
    <main>

      {/* Breadcrumbs */}
      <div className="container-page py-sm">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-xs type-label text-on-surface-variant">
            <li>
              <a className="hover:text-error transition-colors" href="/">Inicio</a>
            </li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <a className="hover:text-error transition-colors" href="/unidades">Unidades Médicas</a>
            </li>
            <li className="flex items-center gap-xs" aria-current="page">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-error font-medium">Cuidados Intensivos (UCI)</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-150 md:h-175 flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            alt="Unidad de Cuidados Intensivos Aura Medical"
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1538108149393-cebb47cbd6a8?q=80&w=2000&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-sm px-md py-sm rounded-full glass-panel text-error-container type-label mb-md border border-error-container/40">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
              Atención Crítica Especializada
            </div>
            <h1 className="type-display font-bold text-white mb-sm leading-tight">
              Cuidados Intensivos <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-error-container to-primary-fixed">
                Nivel de Excelencia
              </span>
            </h1>
            <p className="type-body-lg text-slate-300 mb-lg">
              Monitoreo continuo 24/7 y soporte vital avanzado con ratio de atención 1:1 para pacientes en estado crítico. Un equipo humano altamente especializado respaldado por tecnología de punta.
            </p>
            <div className="flex flex-col sm:flex-row gap-sm">
              <button className="bg-error text-on-error hover:bg-error/80 type-label px-lg py-sm rounded-full transition-all duration-300 flex justify-center items-center gap-xs">
                Información para Familiares
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button className="bg-transparent border border-white text-white hover:bg-white/10 type-label px-lg py-sm rounded-full transition-all duration-300 flex justify-center items-center">
                Reglamento de Visitas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Trust Bar */}
      <div className="relative z-20 max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop -mt-12 md:-mt-16 mb-xl">
        <div className="glass-panel rounded-3xl p-md md:p-lg flex flex-col md:flex-row justify-around items-center gap-md border border-zinc-200 shadow-lg shadow-error/5">

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-on-error-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>monitor_heart</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Vigilancia</div>
              <div className="type-headline text-on-surface">Monitoreo Centralizado 24/7</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Atención</div>
              <div className="type-headline text-on-surface">Ratio Enfermera / Paciente 1:1</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>vital_signs</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Soporte Vital</div>
              <div className="type-headline text-on-surface">ECMO y Ventilación Avanzada</div>
            </div>
          </div>

        </div>
      </div>

      {/* Procedures & Capabilities Grid */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="bg-zinc-50 rounded-3xl p-lg">

            <div className="section-header">
              <h2 className="type-display text-on-surface mb-sm">Capacidades Clínicas</h2>
              <p className="type-body text-on-surface-variant max-w-2xl mx-auto">Infraestructura y protocolos diseñados para el manejo integral del paciente en estado crítico.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">

              {/* Card 1 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-error/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-error-container flex items-center justify-center text-on-error-container mb-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">monitor_heart</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Monitoreo Hemodinámico</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Vigilancia continua de presión arterial invasiva, gasto cardíaco y saturación de oxígeno en tiempo real.</p>
                <a className="type-label text-error flex items-center gap-xs hover:text-on-error-container transition-colors mt-auto" href="#">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 2 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-error/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-error-container flex items-center justify-center text-on-error-container mb-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">air</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Ventilación Mecánica</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Soporte respiratorio invasivo y no invasivo con ventiladores de alta gama y protocolos de weaning personalizado.</p>
                <a className="type-label text-error flex items-center gap-xs hover:text-on-error-container transition-colors mt-auto" href="#">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 3 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-error/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-error-container flex items-center justify-center text-on-error-container mb-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">water_drop</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Hemodiálisis Continua</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Terapia de reemplazo renal continua (CRRT) in-situ para soporte crítico sin necesidad de traslados.</p>
                <a className="type-label text-error flex items-center gap-xs hover:text-on-error-container transition-colors mt-auto" href="#">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 4 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-error/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-error-container flex items-center justify-center text-on-error-container mb-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">emergency</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Soporte ECMO</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Oxigenación por membrana extracorpórea como soporte cardiopulmonar de rescate en falla orgánica severa.</p>
                <a className="type-label text-error flex items-center gap-xs hover:text-on-error-container transition-colors mt-auto" href="#">
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
              <h2 className="type-display text-on-surface mb-sm">Médicos Intensivistas</h2>
              <p className="type-body text-on-surface-variant max-w-2xl">Liderazgo clínico de excelencia formado en los centros de terapia intensiva más exigentes del mundo.</p>
            </div>
            <button className="hidden md:flex mt-md shrink-0 bg-transparent border border-outline text-on-surface hover:bg-surface-container type-label px-md py-sm rounded-full transition-all duration-300 items-center gap-sm">
              Ver Todo el Equipo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">

            {/* Doctor 1 */}
            <div className="bg-surface rounded-3xl p-lg border border-outline/20 shadow-md shadow-error/5 flex flex-col sm:flex-row items-center gap-lg">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_0_2px_var(--color-error)]">
                  <img
                    alt="Dr. Ricardo Méndez, Intensivista"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-error rounded-full border-2 border-surface" title="Disponible"></div>
              </div>
              <div className="grow text-center sm:text-left">
                <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-full text-on-surface-variant font-data-mono text-[10px] mb-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> UCI · Piso 7
                </div>
                <h3 className="type-headline text-on-surface mb-xs">Dr. Ricardo Méndez Olvera</h3>
                <p className="type-body text-error font-medium mb-md">Jefe de UCI · Medicina Crítica y ECMO</p>
                <div className="flex flex-col sm:flex-row gap-sm justify-center sm:justify-start">
                  <button className="bg-surface-container hover:bg-surface-container-high text-on-surface type-label px-md py-xs rounded-full transition-colors">
                    Ver Perfil
                  </button>
                  <button className="bg-error text-on-error hover:bg-error/80 type-label px-md py-xs rounded-full transition-colors">
                    Información UCI
                  </button>
                </div>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="bg-surface rounded-3xl p-lg border border-outline/20 shadow-md shadow-error/5 flex flex-col sm:flex-row items-center gap-lg">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_0_2px_var(--color-primary)]">
                  <img
                    alt="Dra. Sofía Valerio, Intensivista"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1594824436998-d40b243c158b?q=80&w=300&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full border-2 border-surface" title="Disponible"></div>
              </div>
              <div className="grow text-center sm:text-left">
                <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-full text-on-surface-variant font-data-mono text-[10px] mb-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> UCI · Piso 7
                </div>
                <h3 className="type-headline text-on-surface mb-xs">Dra. Sofía Valerio Reyes</h3>
                <p className="type-body text-error font-medium mb-md">Coordinadora UCI · Neurointensivismo</p>
                <div className="flex flex-col sm:flex-row gap-sm justify-center sm:justify-start">
                  <button className="bg-surface-container hover:bg-surface-container-high text-on-surface type-label px-md py-xs rounded-full transition-colors">
                    Ver Perfil
                  </button>
                  <button className="bg-error text-on-error hover:bg-error/80 type-label px-md py-xs rounded-full transition-colors">
                    Información UCI
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
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-error-container via-slate-900 to-slate-900"></div>
        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg items-center">

            {/* Image Side */}
            <div className="relative rounded-3xl overflow-hidden border border-error-container/20 aspect-4/3 group">
              <img
                alt="Centro de Monitoreo UCI Aura Medical"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=80&w=2000&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-md left-md right-md flex items-center gap-sm">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error-container opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-error-container"></span>
                </span>
                <span className="font-data-mono text-data-mono text-error-container uppercase tracking-wider">Monitoreo Activo · Todos los Cubículos</span>
              </div>
            </div>

            {/* Text Side */}
            <div>
              <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-error-container/20 text-error-container type-label mb-md border border-error-container/30">
                <span className="material-symbols-outlined text-[14px]">memory</span>
                Tecnología de Control
              </div>
              <h2 className="type-display font-bold mb-md">Centro de Monitoreo Centralizado — El Búnker</h2>
              <p className="type-body-lg text-slate-300 mb-lg">
                Nuestro centro de control operativo permite a los intensivistas vigilar simultáneamente todos los cubículos en tiempo real. Algoritmos de IA analizan constantes vitales generando alertas predictivas antes de que ocurra una crisis.
              </p>

              <ul className="flex flex-col gap-sm mb-lg">
                <li className="flex items-start gap-sm">
                  <div className="mt-1 w-6 h-6 rounded-full bg-error-container/20 flex items-center justify-center text-error-container shrink-0">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="type-headline font-semibold text-white mb-xs">Análisis Predictivo de Deterioro Clínico</h4>
                    <p className="type-body text-slate-400">La IA detecta patrones de riesgo horas antes de que se manifieste una crisis, permitiendo intervención temprana.</p>
                  </div>
                </li>
                <li className="flex items-start gap-sm">
                  <div className="mt-1 w-6 h-6 rounded-full bg-error-container/20 flex items-center justify-center text-error-container shrink-0">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="type-headline font-semibold text-white mb-xs">Integración con Expediente Electrónico</h4>
                    <p className="type-body text-slate-400">Acceso inmediato al historial completo del paciente para decisiones clínicas rápidas y seguras.</p>
                  </div>
                </li>
              </ul>

              <button className="border border-error-container text-error-container hover:bg-error-container hover:text-slate-900 type-label px-md py-sm rounded-full transition-all duration-300 flex items-center gap-sm">
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
