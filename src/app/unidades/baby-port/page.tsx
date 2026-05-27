/** Página: Baby Port — Unidad de Maternidad Premium de Aura Medical */

export default function BabyPortPage() {
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
              <span className="text-primary font-medium">Baby Port</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-150 md:h-175 flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/imagenes/maternity-baby-port.png"
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/videos/hero-baby-port.mp4" type="video/mp4" />
            <img
              alt="Maternity Suite Baby Port"
              src="/imagenes/maternity-baby-port.png"
              className="w-full h-full object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-sm px-md py-sm rounded-full glass-panel text-primary-fixed type-label mb-md border border-primary-fixed/30">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>child_care</span>
              Maternidad Premium
            </div>
            <h1 className="type-display font-bold text-white mb-sm leading-tight">
              Baby Port: <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-fixed to-secondary-fixed-dim">
                El Mejor Comienzo
              </span>
            </h1>
            <p className="type-body-lg text-slate-300 mb-lg">
              Un entorno cálido, seguro y equipado con la más alta tecnología neonatal para dar la bienvenida a la nueva vida. Redefinimos la experiencia del nacimiento.
            </p>
            <div className="flex flex-col sm:flex-row gap-sm">
              <a
                href="#planes"
                className="bg-primary-container text-on-primary-container hover:bg-primary-fixed hover:text-on-primary-fixed type-label px-lg py-sm rounded-full emerald-glow transition-all duration-300 flex justify-center items-center gap-xs"
              >
                Planes de Maternidad
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <a
                href={`https://wa.me/526531332053?text=${encodeURIComponent('Hola, me gustaría agendar un recorrido por Baby Port Aura Medical.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-white text-white hover:bg-white/10 type-label px-lg py-sm rounded-full transition-all duration-300 flex justify-center items-center"
              >
                Agendar Recorrido
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Trust Bar */}
      <div className="relative z-20 max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop -mt-12 md:-mt-16 mb-xl">
        <div className="glass-panel rounded-3xl p-md md:p-lg flex flex-col md:flex-row justify-around items-center gap-md border border-zinc-200 shadow-lg shadow-primary/5">

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Certificación</div>
              <div className="type-headline text-secondary">UCIN Nivel III</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bed</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Confort</div>
              <div className="type-headline text-on-surface">Alojamiento Conjunto 24/7</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Infraestructura</div>
              <div className="type-headline text-on-surface">Quirófano Exclusivo</div>
            </div>
          </div>

        </div>
      </div>

      {/* Facilities Grid */}
      <section className="section bg-surface-container-low">
        <div className="container-page">
          <div className="mb-lg">
            <h2 className="type-display text-on-surface mb-sm">Instalaciones de Vanguardia</h2>
            <p className="type-body text-on-surface-variant max-w-2xl">Diseñadas para la comodidad de la familia y la eficiencia del equipo médico.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">

            {/* Card 1 */}
            <div className="group bg-surface-container-lowest p-md rounded-3xl border border-outline-variant/30 hover:border-primary/50 transition-all duration-300">
              <div className="h-48 rounded-2xl overflow-hidden mb-md">
                <img
                  alt="Suites LPR"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop"
                />
              </div>
              <div className="flex items-center gap-sm mb-xs">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>child_care</span>
                <h3 className="type-headline text-primary">Suites LPR</h3>
              </div>
              <p className="type-label text-on-surface-variant">Labor, Parto y Recuperación en un solo lugar privado y confortable.</p>
            </div>

            {/* Card 2 */}
            <div className="group bg-surface-container-lowest p-md rounded-3xl border border-outline-variant/30 hover:border-primary/50 transition-all duration-300">
              <div className="h-48 rounded-2xl overflow-hidden mb-md">
                <img
                  alt="Quirófano Cesáreas"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="/imagenes/quirofano-cesareas.png"
                />
              </div>
              <div className="flex items-center gap-sm mb-xs">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>surgical</span>
                <h3 className="type-headline text-primary">Quirófano Cesáreas</h3>
              </div>
              <p className="type-label text-on-surface-variant">Área estéril especializada para procedimientos obstétricos de alta precisión.</p>
            </div>

            {/* Card 3 */}
            <div className="group bg-surface-container-lowest p-md rounded-3xl border border-outline-variant/30 hover:border-primary/50 transition-all duration-300">
              <div className="h-48 rounded-2xl overflow-hidden mb-md">
                <img
                  alt="UCIN"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="/imagenes/ucin.png"
                />
              </div>
              <div className="flex items-center gap-sm mb-xs">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
                <h3 className="type-headline text-secondary">UCIN</h3>
              </div>
              <p className="type-label text-on-surface-variant">Cuidados intensivos de nivel III para recién nacidos de alto riesgo.</p>
            </div>

            {/* Card 4 */}
            <div className="group bg-surface-container-lowest p-md rounded-3xl border border-outline-variant/30 hover:border-primary/50 transition-all duration-300">
              <div className="h-48 rounded-2xl overflow-hidden mb-md">
                <img
                  alt="Lactario"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="/imagenes/lactario.png"
                />
              </div>
              <div className="flex items-center gap-sm mb-xs">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>breastfeeding</span>
                <h3 className="type-headline text-primary">Lactario</h3>
              </div>
              <p className="type-label text-on-surface-variant">Sala privada y espacio especializado de apoyo a la lactancia materna.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Maternity Plans */}
      <section id="planes" className="section bg-surface">
        <div className="container-page">
          <div className="section-header">
            <h2 className="type-display text-on-surface mb-sm">Nuestros Planes de Maternidad</h2>
            <p className="type-body text-on-surface-variant">Opciones diseñadas para cada familia con el respaldo médico completo de Aura.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">

            {/* Plan 1 */}
            <div className="bg-surface-container-low p-lg rounded-3xl border border-outline-variant/20 flex flex-col hover:shadow-xl transition-shadow">
              <h3 className="type-headline text-on-surface mb-md">Plan Parto Natural</h3>
              <div className="mb-lg">
                <span className="text-display-lg-mobile font-bold text-primary">$41,650</span>
                <span className="type-label text-on-surface-variant ml-xs">MXN</span>
              </div>
              <ul className="flex flex-col gap-sm mb-xl grow">
                <li className="flex items-center gap-sm type-body">
                  <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                  Suite LPR Estándar (1 noche)
                </li>
                <li className="flex items-center gap-sm type-body">
                  <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                  Honorarios de Enfermería
                </li>
                <li className="flex items-center gap-sm type-body">
                  <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                  Tamiz Metabólico Básico
                </li>
              </ul>
              <a
                href={`https://wa.me/526531332053?text=${encodeURIComponent('Hola, me gustaría solicitar información sobre el Plan Parto Natural de Baby Port Aura Medical.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-sm rounded-full border-2 border-primary text-primary type-label font-bold hover:bg-primary/5 transition-all text-center block"
              >
                Solicitar Información
              </a>
            </div>

            {/* Plan 2 — Destacado */}
            <div className="bg-inverse-surface p-lg rounded-3xl border-4 border-primary-container flex flex-col shadow-2xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-container text-on-primary-container px-md py-xs rounded-full type-label font-bold whitespace-nowrap">
                RECOMENDADO
              </div>
              <h3 className="type-headline text-white mb-md">Plan Cesárea</h3>
              <div className="mb-lg">
                <span className="text-display-lg-mobile font-bold text-primary-fixed">$64,600</span>
                <span className="type-label text-surface-variant ml-xs">MXN</span>
              </div>
              <ul className="flex flex-col gap-sm mb-xl grow">
                <li className="flex items-center gap-sm type-body text-white">
                  <span className="material-symbols-outlined text-primary-fixed text-[20px]">check_circle</span>
                  Suite Ejecutiva (2 noches)
                </li>
                <li className="flex items-center gap-sm type-body text-white">
                  <span className="material-symbols-outlined text-primary-fixed text-[20px]">check_circle</span>
                  Derecho de Quirófano y Recuperación
                </li>
                <li className="flex items-center gap-sm type-body text-white">
                  <span className="material-symbols-outlined text-primary-fixed text-[20px]">check_circle</span>
                  Tamiz Neonatal Ampliado
                </li>
                <li className="flex items-center gap-sm type-body text-white">
                  <span className="material-symbols-outlined text-primary-fixed text-[20px]">check_circle</span>
                  Asesoría en Lactancia Materna
                </li>
              </ul>
              <a
                href={`https://wa.me/526531332053?text=${encodeURIComponent('Hola, me gustaría solicitar información sobre el Plan Cesárea de Baby Port Aura Medical.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-sm rounded-full bg-primary-container text-on-primary-container type-label font-bold emerald-glow transition-all duration-300 text-center block"
              >
                Solicitar Información
              </a>
            </div>

            {/* Plan 3 */}
            <div className="bg-surface-container-low p-lg rounded-3xl border border-outline-variant/20 flex flex-col hover:shadow-xl transition-shadow">
              <h3 className="type-headline text-on-surface mb-md">Plan VIP Concierge</h3>
              <div className="mb-lg">
                <span className="text-display-lg-mobile font-bold text-primary">$88,400</span>
                <span className="type-label text-on-surface-variant ml-xs">MXN</span>
              </div>
              <ul className="flex flex-col gap-sm mb-xl grow">
                <li className="flex items-center gap-sm type-body">
                  <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                  Suite Presidencial (3 noches)
                </li>
                <li className="flex items-center gap-sm type-body">
                  <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                  Catering Gourmet para Padres
                </li>
                <li className="flex items-center gap-sm type-body">
                  <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                  Chofer Privado para Alta Médica
                </li>
                <li className="flex items-center gap-sm type-body">
                  <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                  Kit de Bienvenida Premium
                </li>
              </ul>
              <a
                href={`https://wa.me/526531332053?text=${encodeURIComponent('Hola, me gustaría solicitar información sobre el Plan VIP Concierge de Baby Port Aura Medical.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-sm rounded-full border-2 border-primary text-primary type-label font-bold hover:bg-primary/5 transition-all text-center block"
              >
                Solicitar Información
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section id="tecnologia" className="section bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary-fixed via-slate-900 to-slate-900"></div>
        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg items-center">

            {/* Text Side */}
            <div>
              <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-primary-container/20 text-primary-fixed type-label mb-md border border-primary-fixed/30">
                <span className="material-symbols-outlined text-[14px]">memory</span>
                Excelencia Tecnológica
              </div>
              <h2 className="type-display font-bold mb-md">Incubadoras Híbridas de Última Generación</h2>
              <p className="type-body-lg text-slate-300 mb-lg">
                En Baby Port, la seguridad de su bebé es nuestra prioridad absoluta. Nuestras incubadoras híbridas combinan el calor de un radiante con la estabilidad de una incubadora cerrada, minimizando el estrés ambiental para el recién nacido.
              </p>
              <div className="grid grid-cols-2 gap-md mb-lg">
                <div className="border-l-4 border-primary-container pl-md">
                  <h4 className="type-headline font-bold text-white mb-xs">Microclima Estable</h4>
                  <p className="type-label text-slate-400">Control preciso de humedad y temperatura.</p>
                </div>
                <div className="border-l-4 border-primary-container pl-md">
                  <h4 className="type-headline font-bold text-white mb-xs">Protección Acústica</h4>
                  <p className="type-label text-slate-400">Niveles de ruido ultra bajos para el descanso.</p>
                </div>
              </div>
              <a
                href="#tecnologia"
                className="border border-primary-fixed text-primary-fixed hover:bg-primary-fixed hover:text-slate-900 type-label px-md py-sm rounded-full transition-all duration-300 flex items-center gap-sm"
              >
                Conocer nuestra tecnología
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>

            {/* Image Side */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
              <div className="relative z-10 glass-card bg-white/5 border-white/10 p-md rounded-[3rem]">
                <img
                  alt="Incubadoras Híbridas de Última Generación — Baby Port Aura Medical"
                  className="w-full h-auto rounded-[2.5rem] shadow-2xl"
                  src="/imagenes/incubadoras-hibridas.jpg"
                />
                <div className="absolute -bottom-md -left-md bg-primary-container text-on-primary-container p-md rounded-3xl shadow-xl emerald-glow">
                  <div className="type-headline font-bold">99.9%</div>
                  <div className="type-label uppercase font-bold opacity-80">Precisión de Sensores</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
