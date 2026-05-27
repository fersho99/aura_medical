export default function MedicinaPreventivaPage() {
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
              <span className="text-secondary font-medium">Medicina Preventiva</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-150 md:h-175 flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            alt="Centro de Medicina Preventiva Aura Medical"
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-sm px-md py-sm rounded-full glass-panel text-secondary-fixed type-label mb-md border border-secondary-fixed/30">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
              Bienestar Integral · Check-up VIP
            </div>
            <h1 className="type-display font-bold text-white mb-sm leading-tight">
              Medicina Preventiva <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary-fixed to-primary-fixed">
                Detección Temprana
              </span>
            </h1>
            <p className="type-body-lg text-slate-300 mb-lg">
              Evaluaciones médicas exhaustivas en un entorno de absoluto confort y privacidad para detectar riesgos antes de que se conviertan en problemas de salud.
            </p>
            <div className="flex flex-col sm:flex-row gap-sm">
              <button className="bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed hover:text-on-secondary-fixed type-label px-lg py-sm rounded-full transition-all duration-300 flex justify-center items-center gap-xs">
                Ver Paquetes de Check-up
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button className="bg-transparent border border-white text-white hover:bg-white/10 type-label px-lg py-sm rounded-full transition-all duration-300 flex justify-center items-center">
                Agendar Evaluación
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
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Agilidad</div>
              <div className="type-headline text-on-surface">Resultados el Mismo Día</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>hotel</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Confort</div>
              <div className="type-headline text-on-surface">Suite Privada con Catering</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>stethoscope</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Seguimiento</div>
              <div className="type-headline text-on-surface">Médico Internista Asignado</div>
            </div>
          </div>

        </div>
      </div>

      {/* VIP Experience Grid */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="bg-zinc-50 rounded-3xl p-lg">

            <div className="section-header">
              <h2 className="type-display text-on-surface mb-sm">La Experiencia VIP</h2>
              <p className="type-body text-on-surface-variant max-w-2xl mx-auto">Cada detalle está diseñado para que su jornada de salud sea cómoda, privada y sin fricciones.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">

              {/* Card 1 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-secondary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-md group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">chair_alt</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Lounge Privado</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Espacio exclusivo con menú saludable entre estudios, preparado por nuestro chef especializado en nutrición clínica.</p>
                <a className="type-label text-secondary flex items-center gap-xs hover:text-secondary-container transition-colors mt-auto" href="#">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 2 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-secondary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-md group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">science</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Toma In-Suite</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Nuestro equipo acude a su suite privada para extracciones y tomas de muestras. Sin salas de espera, sin incomodidades.</p>
                <a className="type-label text-secondary flex items-center gap-xs hover:text-secondary-container transition-colors mt-auto" href="#">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 3 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-secondary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-md group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">forum</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Asesoría Personalizada</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Un internista revisa cada resultado detalladamente con usted y diseña un plan de salud proactivo a largo plazo.</p>
                <a className="type-label text-secondary flex items-center gap-xs hover:text-secondary-container transition-colors mt-auto" href="#">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 4 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-secondary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-md group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">smartphone</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Portal de Salud Digital</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Acceso permanente a su historial de check-ups, resultados y recomendaciones desde cualquier dispositivo.</p>
                <a className="type-label text-secondary flex items-center gap-xs hover:text-secondary-container transition-colors mt-auto" href="#">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Check-up Plans */}
      <section className="section bg-surface">
        <div className="container-page">
          <div className="section-header">
            <h2 className="type-display text-on-surface mb-sm">Programas de Check-up</h2>
            <p className="type-body text-on-surface-variant">Seleccione el nivel de evaluación que mejor se adapte a sus necesidades y estilo de vida.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">

            {/* Plan 1 — Esencial */}
            <div className="bg-surface-container-low p-lg rounded-3xl border border-outline-variant/20 flex flex-col hover:shadow-xl transition-shadow">
              <h3 className="type-headline text-on-surface mb-md">Check-up Esencial</h3>
              <div className="mb-lg">
                <span className="text-display-lg-mobile font-bold text-secondary">$30,600</span>
                <span className="type-label text-on-surface-variant ml-xs">MXN</span>
              </div>
              <ul className="flex flex-col gap-sm mb-xl grow">
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                  Laboratorios clínicos básicos (Biometría, Química, Lípidos)
                </li>
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                  Electrocardiograma en reposo
                </li>
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                  Radiografía de tórax
                </li>
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                  Consulta y valoración de resultados
                </li>
              </ul>
              <button className="w-full py-sm rounded-full border-2 border-secondary text-secondary type-label font-bold hover:bg-secondary/5 transition-all">
                Seleccionar Esencial
              </button>
            </div>

            {/* Plan 2 — Ejecutivo (Destacado) */}
            <div className="bg-inverse-surface p-lg rounded-3xl border-4 border-secondary-container flex flex-col shadow-2xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary-container text-on-secondary-container px-md py-xs rounded-full type-label font-bold whitespace-nowrap">
                RECOMENDADO
              </div>
              <h3 className="type-headline text-white mb-md">Check-up Ejecutivo</h3>
              <div className="mb-lg">
                <span className="text-display-lg-mobile font-bold text-secondary-fixed">$54,400</span>
                <span className="type-label text-surface-variant ml-xs">MXN</span>
              </div>
              <ul className="flex flex-col gap-sm mb-xl grow">
                <li className="flex items-start gap-sm type-body text-white">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px] shrink-0">add_circle</span>
                  Todo lo del plan Esencial, más:
                </li>
                <li className="flex items-start gap-sm type-body text-white">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px] shrink-0">check_circle</span>
                  Ultrasonido abdominal superior e inferior
                </li>
                <li className="flex items-start gap-sm type-body text-white">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px] shrink-0">check_circle</span>
                  Prueba de esfuerzo (Ergometría)
                </li>
                <li className="flex items-start gap-sm type-body text-white">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px] shrink-0">check_circle</span>
                  Consulta nutricional personalizada
                </li>
                <li className="flex items-start gap-sm type-body text-white">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px] shrink-0">check_circle</span>
                  Marcadores tumorales básicos
                </li>
              </ul>
              <button className="w-full py-sm rounded-full bg-secondary-container text-on-secondary-container type-label font-bold transition-all duration-300">
                Seleccionar Ejecutivo
              </button>
            </div>

            {/* Plan 3 — Integral */}
            <div className="bg-surface-container-low p-lg rounded-3xl border border-outline-variant/20 flex flex-col hover:shadow-xl transition-shadow">
              <h3 className="type-headline text-on-surface mb-md">Check-up Integral Avanzado</h3>
              <div className="mb-lg">
                <span className="text-display-lg-mobile font-bold text-secondary">$93,500</span>
                <span className="type-label text-on-surface-variant ml-xs">MXN</span>
              </div>
              <ul className="flex flex-col gap-sm mb-xl grow">
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">add_circle</span>
                  Todo lo del plan Ejecutivo, más:
                </li>
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                  Resonancia Magnética de cuerpo entero
                </li>
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                  Perfil genómico predictivo de enfermedades
                </li>
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                  Consultas con 3 especialistas a elegir
                </li>
              </ul>
              <button className="w-full py-sm rounded-full border-2 border-secondary text-secondary type-label font-bold hover:bg-secondary/5 transition-all">
                Seleccionar Integral
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Medical Team Section */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="flex flex-col md:flex-row justify-between items-end mb-lg">
            <div>
              <h2 className="type-display text-on-surface mb-sm">Nuestros Especialistas en Prevención</h2>
              <p className="type-body text-on-surface-variant max-w-2xl">Internistas y expertos en salud integral comprometidos con su bienestar a largo plazo.</p>
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
                    alt="Dr. Andrés Molina, Internista"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-secondary rounded-full border-2 border-surface" title="Disponible"></div>
              </div>
              <div className="grow text-center sm:text-left">
                <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-full text-on-surface-variant font-data-mono text-[10px] mb-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> Check-up · Piso 3
                </div>
                <h3 className="type-headline text-on-surface mb-xs">Dr. Andrés Molina Pereira</h3>
                <p className="type-body text-secondary font-medium mb-md">Internista · Medicina Preventiva y Longevidad</p>
                <div className="flex flex-col sm:flex-row gap-sm justify-center sm:justify-start">
                  <button className="bg-surface-container hover:bg-surface-container-high text-on-surface type-label px-md py-xs rounded-full transition-colors">
                    Ver Perfil
                  </button>
                  <button className="bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container type-label px-md py-xs rounded-full transition-colors">
                    Agendar Check-up
                  </button>
                </div>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="bg-surface rounded-3xl p-lg border border-outline/20 shadow-md shadow-secondary/5 flex flex-col sm:flex-row items-center gap-lg">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_0_2px_var(--color-primary)]">
                  <img
                    alt="Dra. Carmen Salinas, Nutrióloga"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full border-2 border-surface" title="Disponible"></div>
              </div>
              <div className="grow text-center sm:text-left">
                <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-full text-on-surface-variant font-data-mono text-[10px] mb-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> Check-up · Piso 3
                </div>
                <h3 className="type-headline text-on-surface mb-xs">Dra. Carmen Salinas Vega</h3>
                <p className="type-body text-secondary font-medium mb-md">Nutrióloga · Salud Integral y Genómica</p>
                <div className="flex flex-col sm:flex-row gap-sm justify-center sm:justify-start">
                  <button className="bg-surface-container hover:bg-surface-container-high text-on-surface type-label px-md py-xs rounded-full transition-colors">
                    Ver Perfil
                  </button>
                  <button className="bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container type-label px-md py-xs rounded-full transition-colors">
                    Agendar Check-up
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
                alt="Perfil Genómico Predictivo Aura Medical"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2000&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-md left-md right-md flex items-center gap-sm">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary-fixed"></span>
                </span>
                <span className="font-data-mono text-data-mono text-secondary-fixed uppercase tracking-wider">Análisis Genómico · En Proceso</span>
              </div>
            </div>

            {/* Text Side */}
            <div>
              <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-secondary-container/20 text-secondary-fixed type-label mb-md border border-secondary-fixed/30">
                <span className="material-symbols-outlined text-[14px]">genetics</span>
                Medicina de Precisión
              </div>
              <h2 className="type-display font-bold mb-md">Perfil Genómico Predictivo de Enfermedades</h2>
              <p className="type-body-lg text-slate-300 mb-lg">
                Nuestro análisis genómico identifica variantes de riesgo para más de 200 enfermedades crónicas antes de que aparezcan los primeros síntomas. Le permite tomar decisiones preventivas basadas en su biología única.
              </p>

              <ul className="flex flex-col gap-sm mb-lg">
                <li className="flex items-start gap-sm">
                  <div className="mt-1 w-6 h-6 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-fixed shrink-0">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="type-headline font-semibold text-white mb-xs">Riesgo Cardiovascular, Oncológico y Metabólico</h4>
                    <p className="type-body text-slate-400">Identificación de predisposiciones hereditarias con décadas de anticipación para una prevención real.</p>
                  </div>
                </li>
                <li className="flex items-start gap-sm">
                  <div className="mt-1 w-6 h-6 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-fixed shrink-0">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="type-headline font-semibold text-white mb-xs">Plan de Acción Personalizado</h4>
                    <p className="type-body text-slate-400">Su internista diseña intervenciones preventivas específicas basadas en su perfil genético único.</p>
                  </div>
                </li>
              </ul>

              <button className="border border-secondary-fixed text-secondary-fixed hover:bg-secondary-fixed hover:text-slate-900 type-label px-md py-sm rounded-full transition-all duration-300 flex items-center gap-sm">
                Conocer el análisis genómico
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
