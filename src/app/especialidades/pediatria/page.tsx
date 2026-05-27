export const metadata = {
  title: 'Pediatría y Neonatología | Aura Medical',
  description: 'Centro pediátrico integral con neonatología, medicina preventiva infantil y cirugía pediátrica de mínima invasión.',
}

import AgendarCitaModal from '@/components/AgendarCitaModal'

export default function PediatriaPage() {
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
              <span className="text-primary font-medium">Cuidado Pediátrico</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-150 md:h-175 flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay muted loop playsInline
            poster="https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?q=80&w=2059&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/videos/hero-pediatria.mp4" type="video/mp4" />
            <img alt="Modern Pediatric Ward" src="https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?q=80&w=2059&auto=format&fit=crop" className="w-full h-full object-cover" />
          </video>
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-sm px-md py-sm rounded-full glass-panel text-primary-fixed type-label mb-md border border-primary-fixed/30">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>child_care</span>
              Centro Pediátrico
            </div>
            <h1 className="type-display font-bold text-white mb-sm leading-tight">
              Cuidado Pediátrico <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-fixed to-tertiary-fixed">
                de Excelencia
              </span>
            </h1>
            <p className="type-body-lg text-slate-300 mb-lg">
              Entornos diseñados específicamente para el bienestar infantil, donde especialistas compasivos utilizan la más alta tecnología clínica para proteger lo que más importa.
            </p>
            <div className="flex flex-col sm:flex-row gap-sm">
              <AgendarCitaModal
                triggerLabel="Agendar Consulta"
                triggerIcon="arrow_forward"
                triggerClassName="bg-primary-container text-on-primary-container hover:bg-primary-fixed hover:text-on-primary-fixed type-label px-lg py-sm rounded-full transition-all duration-300 emerald-glow flex justify-center items-center gap-xs"
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
        <div className="glass-panel rounded-3xl p-md md:p-lg flex flex-col md:flex-row justify-around items-center gap-md border border-zinc-200 shadow-lg shadow-primary/5">

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-primary-container/30 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
            <div>
              <div className="type-headline text-primary">100%</div>
              <div className="type-label text-on-surface-variant">Especialistas Certificados</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>child_care</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Ambiente</div>
              <div className="type-headline text-on-surface">Entorno Amigable y Seguro</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-outline-variant/30"></div>

          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-on-error-container shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
            </div>
            <div>
              <div className="type-label text-on-surface-variant uppercase tracking-wider">Atención Continua</div>
              <div className="type-headline text-on-surface">Urgencias Pediátricas 24/7</div>
            </div>
          </div>

        </div>
      </div>

      {/* Services & Procedures Grid */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="bg-zinc-50 rounded-3xl p-lg">

            <div className="section-header">
              <h2 className="type-display text-on-surface mb-sm">Servicios Especializados</h2>
              <p className="type-body text-on-surface-variant max-w-2xl mx-auto">Innovación clínica aplicada al crecimiento y desarrollo integral de los más pequeños.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">

              {/* Card 1 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-primary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed mb-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">monitoring</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Control de Niño Sano</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Seguimiento integral del crecimiento físico, cognitivo y social en cada etapa del desarrollo infantil.</p>
                <a className="type-label text-primary flex items-center gap-xs hover:text-primary-container transition-colors mt-auto" href="/especialidades/pediatria/control-nino-sano">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 2 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-primary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed mb-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">precision_manufacturing</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Cirugía de Mínima Invasión</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Procedimientos avanzados pediátricos con tiempos de recuperación ultra rápidos y mínimo trauma.</p>
                <a className="type-label text-primary flex items-center gap-xs hover:text-primary-container transition-colors mt-auto" href="/especialidades/pediatria/cirugia-minima-invasion">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 3 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-primary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed mb-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">stethoscope</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Neonatología Alta Complejidad</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Cuidados intensivos especializados para recién nacidos prematuros o en condición crítica.</p>
                <a className="type-label text-primary flex items-center gap-xs hover:text-primary-container transition-colors mt-auto" href="/especialidades/pediatria/neonatologia">
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Card 4 */}
              <div className="bg-surface rounded-3xl p-md border border-outline/20 shadow-md shadow-primary/5 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full group">
                <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed mb-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl">vaccines</span>
                </div>
                <h3 className="type-headline text-on-surface mb-sm">Medicina Preventiva</h3>
                <p className="type-body text-on-surface-variant grow mb-md">Esquemas de vacunación personalizados y detección oportuna de trastornos del desarrollo.</p>
                <a className="type-label text-primary flex items-center gap-xs hover:text-primary-container transition-colors mt-auto" href="/especialidades/pediatria/medicina-preventiva">
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
              <h2 className="type-display text-on-surface mb-sm">Nuestros Especialistas en Pediatría</h2>
              <p className="type-body text-on-surface-variant max-w-2xl">Liderazgo médico con un enfoque humano, compasivo y altamente tecnológico.</p>
            </div>
            <a href="/directorio" className="hidden md:flex mt-md shrink-0 bg-transparent border border-outline text-on-surface hover:bg-surface-container type-label px-md py-sm rounded-full transition-all duration-300 items-center gap-sm">
              Ver Todo el Equipo
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">

            {/* Doctor 1 */}
            <div className="bg-surface rounded-3xl p-lg border border-outline/20 shadow-md shadow-primary/5 flex flex-col sm:flex-row items-center gap-lg">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_0_2px_var(--color-primary)]">
                  <img
                    alt="Dra. Ana López, Neonatóloga"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=300&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full border-2 border-surface" title="Disponible"></div>
              </div>
              <div className="grow text-center sm:text-left">
                <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-full text-on-surface-variant font-data-mono text-[10px] mb-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> Torre Pediátrica
                </div>
                <h3 className="type-headline text-on-surface mb-xs">Dra. Ana López</h3>
                <p className="type-body text-primary font-medium mb-md">Neonatóloga Senior</p>
                <div className="flex flex-col sm:flex-row gap-sm justify-center sm:justify-start">
                  <a href="/directorio" className="bg-surface-container hover:bg-surface-container-high text-on-surface type-label px-md py-xs rounded-full transition-colors">
                    Ver Perfil
                  </a>
                  <AgendarCitaModal
                    triggerLabel="Agendar Cita"
                    triggerIcon="calendar_month"
                    triggerClassName="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container type-label px-md py-xs rounded-full transition-colors flex items-center gap-xs"
                  />
                </div>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="bg-surface rounded-3xl p-lg border border-outline/20 shadow-md shadow-primary/5 flex flex-col sm:flex-row items-center gap-lg">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_0_2px_var(--color-secondary)]">
                  <img
                    alt="Dr. Jorge Salinas, Pediatra"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1537368910025-7028b596914a?q=80&w=300&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full border-2 border-surface" title="Disponible"></div>
              </div>
              <div className="grow text-center sm:text-left">
                <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-full text-on-surface-variant font-data-mono text-[10px] mb-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> Torre Pediátrica
                </div>
                <h3 className="type-headline text-on-surface mb-xs">Dr. Jorge Salinas</h3>
                <p className="type-body text-primary font-medium mb-md">Pediatra Integral</p>
                <div className="flex flex-col sm:flex-row gap-sm justify-center sm:justify-start">
                  <a href="/directorio" className="bg-surface-container hover:bg-surface-container-high text-on-surface type-label px-md py-xs rounded-full transition-colors">
                    Ver Perfil
                  </a>
                  <AgendarCitaModal
                    triggerLabel="Agendar Cita"
                    triggerIcon="calendar_month"
                    triggerClassName="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container type-label px-md py-xs rounded-full transition-colors flex items-center gap-xs"
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
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary-fixed via-slate-900 to-slate-900"></div>
        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg items-center">

            {/* Image Side */}
            <div className="relative rounded-3xl overflow-hidden border border-primary-fixed/20 aspect-4/3 group">
              <img
                alt="Advanced Neonatal ICU"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/imagenes/ucin.png"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-md left-md right-md flex items-center gap-sm">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-fixed opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-fixed"></span>
                </span>
                <span className="font-data-mono text-data-mono text-primary-fixed uppercase tracking-wider">Monitoreo Activo</span>
              </div>
            </div>

            {/* Text Side */}
            <div>
              <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-primary-container/20 text-primary-fixed type-label mb-md border border-primary-fixed/30">
                <span className="material-symbols-outlined text-[14px]">memory</span>
                Innovación Vital
              </div>
              <h2 className="type-display font-bold mb-md">Unidad de Cuidados Intensivos Neonatales</h2>
              <p className="type-body-lg text-slate-300 mb-lg">
                Nuestra UCIN está equipada con incubadoras híbridas de última generación que minimizan el ruido y la luz, simulando el entorno uterino mientras proporcionan soporte vital de precisión quirúrgica.
              </p>

              <ul className="flex flex-col gap-sm mb-lg">
                <li className="flex items-start gap-sm">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-fixed shrink-0">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="type-headline font-semibold text-white mb-xs">Sensores Biomédicos No Invasivos</h4>
                    <p className="type-body text-slate-400">Monitoreo constante sin contacto directo para proteger la piel sensible del recién nacido.</p>
                  </div>
                </li>
                <li className="flex items-start gap-sm">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-fixed shrink-0">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="type-headline font-semibold text-white mb-xs">Telemetría Digital en Tiempo Real</h4>
                    <p className="type-body text-slate-400">Acceso inmediato para especialistas y padres a través de nuestra red segura y cifrada.</p>
                  </div>
                </li>
              </ul>

              <a href="/unidades" className="border border-primary-fixed text-primary-fixed hover:bg-primary-fixed hover:text-slate-900 type-label px-md py-sm rounded-full transition-all duration-300 flex items-center gap-sm">
                Conocer nuestras instalaciones
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="bg-primary/5 rounded-[3rem] p-xl border border-primary/10 text-center">
            <h2 className="type-display text-on-surface mb-md">¿Listo para brindarle lo mejor?</h2>
            <p className="type-body-lg text-on-surface-variant mb-lg max-w-2xl mx-auto">
              Programar una cita es el primer paso para asegurar un futuro saludable. Nuestro equipo está listo para recibirles.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-sm">
              <AgendarCitaModal
                triggerLabel="Solicitar Cita Ahora"
                triggerIcon="calendar_month"
                triggerClassName="bg-primary text-on-primary type-label px-lg py-md rounded-full emerald-glow transition-all duration-300 flex items-center gap-xs"
              />
              <a href="/directorio" className="bg-secondary text-on-secondary type-label px-lg py-md rounded-full transition-all duration-300 flex items-center justify-center gap-xs">
                <span className="material-symbols-outlined text-[18px]">person_search</span>
                Hablar con un Asesor
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
