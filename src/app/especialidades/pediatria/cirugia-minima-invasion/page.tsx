const whatsappNumber = "526531332053";
const whatsappMessage = encodeURIComponent("Hola, visité la página de Cirugía Pediátrica de Mínima Invasión en Aura Medical y me gustaría información para agendar una valoración.");
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

export default function CirugiaMinimaPediatriaPage() {
  return (
    <main>

      {/* Breadcrumbs */}
      <div className="container-page py-sm">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-xs type-label text-on-surface-variant flex-wrap">
            <li>
              <a className="hover:text-primary transition-colors" href="/">Inicio</a>
            </li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <a className="hover:text-primary transition-colors" href="/especialidades">Especialidades</a>
            </li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <a className="hover:text-primary transition-colors" href="/especialidades/pediatria">Pediatría</a>
            </li>
            <li className="flex items-center gap-xs" aria-current="page">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-primary font-medium">Cirugía de Mínima Invasión</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-150 md:h-175 flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            alt="Cirugía pediátrica de mínima invasión con instrumentos especializados"
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=2000&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-sm px-md py-sm rounded-full glass-panel text-primary-fixed type-label mb-md border border-primary-fixed/30">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>precision_manufacturing</span>
              Centro Pediátrico · Cirugía Pediátrica
            </div>
            <h1 className="type-display font-bold text-white mb-sm leading-tight">
              Cirugía Pediátrica de <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-fixed to-tertiary-fixed">
                Mínima Invasión
              </span>
            </h1>
            <p className="type-body-lg text-slate-300 mb-lg">
              Procedimientos avanzados para niños a través de incisiones mínimas con instrumentos y ópticas adaptados a la anatomía pediátrica, logrando tiempos de recuperación ultra rápidos y mínimo impacto en su vida cotidiana.
            </p>
            <div className="flex flex-col sm:flex-row gap-sm">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1ebd5b] text-white type-label font-bold px-lg py-sm rounded-full transition-all shadow-sm flex items-center justify-center gap-xs"
              >
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Agendar Valoración
              </a>
              <a
                href="/especialidades/pediatria"
                className="bg-transparent border border-white text-white hover:bg-white/10 type-label px-lg py-sm rounded-full transition-all flex items-center justify-center gap-xs"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Volver a Pediatría
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ¿En qué consiste? ────────────────────────────────────────────────────── */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">

            <div className="flex flex-col gap-md">
              <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-primary/10 border border-primary/20 type-label text-primary w-fit">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                El Procedimiento
              </div>
              <h2 className="type-display text-on-surface">¿En qué consiste la cirugía pediátrica laparoscópica?</h2>
              <p className="type-body-lg text-on-surface-variant">
                La cirugía de mínima invasión pediátrica utiliza pequeñas incisiones de 3 a 5 mm por donde se introducen una cámara de alta definición y los instrumentos quirúrgicos. Nuestros cirujanos trabajan con equipos específicamente diseñados para la anatomía de los niños, garantizando máxima seguridad en cada etapa de vida.
              </p>
              <p className="type-body text-on-surface-variant">
                Gracias a esta técnica, el niño experimenta menos dolor postoperatorio, menor riesgo de infección de la herida y una recuperación que en muchos casos permite el regreso a casa el mismo día del procedimiento.
              </p>
              <div className="flex flex-col gap-sm mt-sm">
                {[
                  { icon: 'cut',             text: 'Incisiones de 3 a 5 mm — prácticamente sin cicatriz visible' },
                  { icon: 'home',            text: 'Alta en el mismo día en la mayoría de los procedimientos' },
                  { icon: 'child_care',      text: 'Instrumentos y técnicas adaptados a la fisiología pediátrica' },
                ].map(({ icon, text }) => (
                  <div key={icon} className="flex items-center gap-sm">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[18px]">{icon}</span>
                    </div>
                    <p className="type-body text-on-surface">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-150 order-first lg:order-last">
              <img
                alt="Quirófano pediátrico equipado para cirugía de mínima invasión"
                className="absolute inset-0 w-full h-full object-cover"
                src="/imagenes/cardiologia.png"
              />
              <div className="absolute inset-0 bg-linear-to-t from-on-background/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-md left-md right-md">
                <div className="inline-flex items-center gap-xs bg-surface/20 backdrop-blur-md rounded-full px-sm py-xs text-white type-label">
                  <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></span>
                  Quirófano Pediátrico · Aura Medical
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ¿Cuándo se recomienda? ───────────────────────────────────────────────── */}
      <section className="section bg-surface-container-low">
        <div className="container-page">
          <div className="section-header">
            <h2 className="type-display text-on-surface mb-sm">¿Cuándo se recomienda?</h2>
            <p className="type-body text-on-surface-variant max-w-2xl mx-auto">
              La cirugía laparoscópica pediátrica es aplicable a una amplia variedad de condiciones, desde las más frecuentes hasta las de mayor complejidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md max-w-5xl mx-auto">
            {[
              { icon: 'gastroenterology',  title: 'Apendicectomía laparoscópica',  desc: 'Extirpación del apéndice inflamado con mínimo trauma, recuperación en 24 a 48 horas.' },
              { icon: 'medical_services',  title: 'Hernia inguinal y umbilical',   desc: 'Reparación por vía laparoscópica con alta el mismo día y retorno rápido a actividades.' },
              { icon: 'water_drop',        title: 'Criptorquidia y orquidopexia',  desc: 'Descenso testicular mediante laparoscopía con incisiones mínimas en pacientes pediátricos.' },
              { icon: 'filter_alt',        title: 'Reflujo gastroesofágico',       desc: 'Funduplicatura de Nissen por vía laparoscópica para niños con ERGE severo.' },
              { icon: 'adjust',            title: 'Malrotación intestinal',        desc: 'Corrección laparoscópica de anomalías de rotación intestinal en neonatos y lactantes.' },
              { icon: 'healing',           title: 'Quistes y tumores abdominales', desc: 'Resección de quistes benignos, esplenectomía y otras masas abdominales pediátricas.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-surface rounded-2xl p-md border border-outline-variant/30 shadow-sm flex flex-col gap-sm">
                <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                </div>
                <h3 className="type-headline text-on-surface">{title}</h3>
                <p className="type-body text-on-surface-variant">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Por qué en Aura Medical ─────────────────────────────────────────────── */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">

            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-150">
              <img
                alt="Cirujano pediátrico especializado de Aura Medical"
                className="absolute inset-0 w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2000&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-md left-md right-md flex items-center gap-sm">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-fixed opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-fixed"></span>
                </span>
                <span className="font-data-mono text-data-mono text-primary-fixed uppercase tracking-wider">Equipo Especializado</span>
              </div>
            </div>

            <div className="flex flex-col gap-md">
              <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-primary/10 border border-primary/20 type-label text-primary w-fit">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                Ventajas de Aura Medical
              </div>
              <h2 className="type-display text-on-surface">Por qué elegirnos para cirugía pediátrica</h2>
              <p className="type-body-lg text-on-surface-variant">
                Nuestro equipo de cirujanos pediátricos combina formación subespecializada con tecnología quirúrgica de última generación para los mejores resultados posibles.
              </p>
              <div className="flex flex-col gap-md">
                {[
                  { icon: 'precision_manufacturing', color: 'text-primary',    bg: 'bg-primary/10',    title: 'Instrumental Pediátrico Especializado',     desc: 'Equipos a escala pediátrica desde recién nacidos hasta adolescentes con ópticas 4K.' },
                  { icon: 'psychology',              color: 'text-secondary',  bg: 'bg-secondary/10',  title: 'Anestesiología Pediátrica Dedicada',        desc: 'Anestesiólogos subespecializados en fisiología pediátrica para máxima seguridad.' },
                  { icon: 'family_restroom',         color: 'text-tertiary',   bg: 'bg-tertiary/10',   title: 'Acompañamiento Familiar Integral',          desc: 'Los padres son informados en tiempo real durante el procedimiento en sala de espera dedicada.' },
                  { icon: 'emergency',               color: 'text-error',      bg: 'bg-error/10',      title: 'Disponibilidad Quirúrgica 24/7',            desc: 'Quirófano pediátrico disponible para urgencias como apendicitis en cualquier momento.' },
                ].map(({ icon, color, bg, title, desc }) => (
                  <div key={title} className="flex gap-md">
                    <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center ${color} shrink-0 mt-xs`}>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                    </div>
                    <div>
                      <h4 className="type-headline text-on-surface mb-xs">{title}</h4>
                      <p className="type-body text-on-surface-variant">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA Final ────────────────────────────────────────────────────────────── */}
      <section className="section bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary-fixed via-slate-900 to-slate-900 pointer-events-none"></div>
        <div className="container-page relative z-10 text-center flex flex-col items-center gap-md">
          <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary-fixed/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-fixed text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>precision_manufacturing</span>
          </div>
          <h2 className="type-display font-bold">¿Su hijo requiere una evaluación quirúrgica?</h2>
          <p className="type-body-lg text-slate-300 max-w-2xl">
            Nuestros cirujanos pediátricos evaluarán el caso y le explicarán con claridad si la cirugía de mínima invasión es la opción más adecuada y segura para su hijo.
          </p>
          <div className="flex flex-col sm:flex-row gap-sm mt-sm">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1ebd5b] text-white type-label font-bold px-lg py-sm rounded-full transition-all shadow-lg flex items-center justify-center gap-xs"
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Agendar por WhatsApp
            </a>
            <a
              href="/directorio"
              className="border border-white/30 text-white hover:bg-white/10 type-label px-lg py-sm rounded-full transition-all flex items-center justify-center gap-xs"
            >
              <span className="material-symbols-outlined text-[18px]">groups</span>
              Ver Nuestros Especialistas
            </a>
          </div>
          <p className="type-label text-slate-400 mt-sm">
            Nuestro equipo de recepción confirma disponibilidad y le orienta sin compromiso.
          </p>
        </div>
      </section>

    </main>
  );
}
