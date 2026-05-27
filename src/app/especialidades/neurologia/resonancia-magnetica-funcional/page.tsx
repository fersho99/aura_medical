export const metadata = {
  title: 'Resonancia Magnética Funcional | Neurología — Aura Medical',
  description: 'Neuroimagen funcional de alta resolución con resonancia magnética 3T para diagnóstico neurológico preciso.',
}

const whatsappNumber = "526531332053";
const whatsappMessage = encodeURIComponent("Hola, visité la página de Resonancia Magnética Funcional en Aura Medical y me gustaría información para agendar una valoración.");
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

export default function ResonanciaMagneticaFuncionalPage() {
  return (
    <main>

      {/* Breadcrumbs */}
      <div className="container-page py-sm">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-xs type-label text-on-surface-variant flex-wrap">
            <li><a className="hover:text-secondary transition-colors" href="/">Inicio</a></li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <a className="hover:text-secondary transition-colors" href="/especialidades">Especialidades</a>
            </li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <a className="hover:text-secondary transition-colors" href="/especialidades/neurologia">Neurología</a>
            </li>
            <li className="flex items-center gap-xs" aria-current="page">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-secondary font-medium">Resonancia Magnética Funcional</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative w-full h-150 md:h-175 flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img alt="Resonancia magnética cerebral 3T de alta resolución"
            className="w-full h-full object-cover opacity-40"
            src="/imagenes/neurologia.png" />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl w-full mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-sm px-md py-sm rounded-full glass-panel text-secondary-fixed type-label mb-md border border-secondary-fixed/30">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>radiology</span>
              Instituto de Neurociencias · Neuroimagen Avanzada
            </div>
            <h1 className="type-display font-bold text-white mb-sm leading-tight">
              Resonancia Magnética <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary-fixed to-primary-fixed">
                Funcional
              </span>
            </h1>
            <p className="type-body-lg text-slate-300 mb-lg">
              Mapeo cerebral no invasivo de alta precisión que identifica las áreas activas del cerebro antes de una cirugía, protegiendo funciones esenciales como el habla, la memoria y el movimiento.
            </p>
            <div className="flex flex-col sm:flex-row gap-sm">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1ebd5b] text-white type-label font-bold px-lg py-sm rounded-full transition-all shadow-sm flex items-center justify-center gap-xs">
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Agendar Valoración
              </a>
              <a href="/especialidades/neurologia"
                className="bg-transparent border border-white text-white hover:bg-white/10 type-label px-lg py-sm rounded-full transition-all flex items-center justify-center gap-xs">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Volver a Neurología
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ¿En qué consiste? */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
            <div className="flex flex-col gap-md">
              <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-secondary/10 border border-secondary/20 type-label text-secondary w-fit">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                El Estudio
              </div>
              <h2 className="type-display text-on-surface">¿En qué consiste la RMF?</h2>
              <p className="type-body-lg text-on-surface-variant">
                La Resonancia Magnética Funcional (RMF) es una técnica de neuroimagen no invasiva que detecta cambios en el flujo sanguíneo cerebral relacionados con la actividad neuronal. Mientras el paciente realiza tareas específicas (mover la mano, hablar, leer), el equipo registra qué regiones del cerebro se activan.
              </p>
              <p className="type-body text-on-surface-variant">
                Esta información es crítica antes de una neurocirugía: permite al equipo planificar el abordaje quirúrgico evitando áreas elocuentes como el área motora, el lenguaje o la memoria, minimizando el riesgo de déficits funcionales postoperatorios. Los resultados se integran directamente al sistema de neuronavegación del quirófano.
              </p>
              <div className="flex flex-col gap-sm mt-sm">
                {[
                  { icon: 'schedule',   text: 'Duración: 45 a 90 minutos según el protocolo' },
                  { icon: 'no_flash',   text: 'Sin radiación — usa campo magnético y ondas de radio' },
                  { icon: 'integration_instructions', text: 'Integración directa al sistema de neuronavegación' },
                ].map(({ icon, text }) => (
                  <div key={icon} className="flex items-center gap-sm">
                    <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                      <span className="material-symbols-outlined text-[18px]">{icon}</span>
                    </div>
                    <p className="type-body text-on-surface">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-150 order-first lg:order-last">
              <img alt="Imagen de resonancia magnética funcional cerebral"
                className="absolute inset-0 w-full h-full object-cover"
                src="/imagenes/advanced-mri.png" />
              <div className="absolute inset-0 bg-linear-to-t from-on-background/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-md left-md right-md">
                <div className="inline-flex items-center gap-xs bg-surface/20 backdrop-blur-md rounded-full px-sm py-xs text-on-primary type-label">
                  <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
                  Resonancia 3T · Instituto de Neurociencias
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Cuándo se recomienda? */}
      <section className="section bg-surface-container-low">
        <div className="container-page">
          <div className="section-header">
            <h2 className="type-display text-on-surface mb-sm">¿Cuándo se recomienda?</h2>
            <p className="type-body text-on-surface-variant max-w-2xl mx-auto">
              Su neurólogo o neurocirujano puede indicar una RMF en las siguientes situaciones clínicas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md max-w-5xl mx-auto">
            {[
              { icon: 'oncology',       title: 'Tumores cerebrales',               desc: 'Localización de áreas elocuentes adyacentes al tumor antes de la resección quirúrgica.' },
              { icon: 'bolt',           title: 'Epilepsia refractaria',             desc: 'Identificación del foco epiléptico y mapeo de funciones antes de cirugía de epilepsia.' },
              { icon: 'psychology',     title: 'Evaluación cognitiva',              desc: 'Estudio de activación de memoria, lenguaje y funciones ejecutivas en deterioro cognitivo.' },
              { icon: 'manage_search',  title: 'Planificación neuroquirúrgica',     desc: 'Integración al neuronavegador para guiar el abordaje con máxima seguridad funcional.' },
              { icon: 'healing',        title: 'Rehabilitación post-ictus',         desc: 'Seguimiento de la recuperación funcional cerebral tras un accidente cerebrovascular.' },
              { icon: 'science',        title: 'Investigación clínica',             desc: 'Estudios de activación cerebral en protocolos de investigación de enfermedades neurológicas.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-surface rounded-2xl p-md border border-outline-variant/30 shadow-sm flex flex-col gap-sm">
                <div className="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                </div>
                <h3 className="type-headline text-on-surface">{title}</h3>
                <p className="type-body text-on-surface-variant">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué en Aura Medical */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-150">
              <img alt="Equipo de resonancia magnética 3 Tesla"
                className="absolute inset-0 w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-md left-md right-md flex items-center gap-sm">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary-fixed"></span>
                </span>
                <span className="font-data-mono text-data-mono text-secondary-fixed uppercase tracking-wider">Sistema Activo</span>
              </div>
            </div>
            <div className="flex flex-col gap-md">
              <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-secondary/10 border border-secondary/20 type-label text-secondary w-fit">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                Ventajas de Aura Medical
              </div>
              <h2 className="type-display text-on-surface">Por qué elegirnos para su estudio</h2>
              <p className="type-body-lg text-on-surface-variant">
                Equipo de resonancia 3 Tesla de última generación con protocolos funcionales avanzados e interpretación por neuroradiólogos especializados.
              </p>
              <div className="flex flex-col gap-md">
                {[
                  { icon: 'view_in_ar',       color: 'text-secondary', bg: 'bg-secondary/10', title: 'Resonancia 3 Tesla de Alta Resolución',    desc: 'Mayor campo magnético para imágenes funcionales con resolución espacial y temporal superiores.' },
                  { icon: 'integration_instructions', color: 'text-primary', bg: 'bg-primary/10', title: 'Integración con Neuronavegador',          desc: 'Los mapas funcionales se cargan directamente al sistema de navegación quirúrgica en tiempo real.' },
                  { icon: 'psychology',        color: 'text-tertiary', bg: 'bg-tertiary/10', title: 'Neuropsicólogos y Neuroradiólogos',          desc: 'Equipo multidisciplinario que administra, interpreta e integra los resultados en el plan quirúrgico.' },
                  { icon: 'analytics',         color: 'text-error',    bg: 'bg-error/10',    title: 'Informe Completo en 24-48 Horas',            desc: 'Mapas de activación, lateralización del lenguaje y reporte estructurado para el equipo quirúrgico.' },
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

      {/* CTA Final */}
      <section className="section bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-secondary-fixed via-slate-900 to-slate-900 pointer-events-none"></div>
        <div className="container-page relative z-10 text-center flex flex-col items-center gap-md">
          <div className="w-16 h-16 rounded-full bg-secondary/20 border border-secondary-fixed/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary-fixed text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>radiology</span>
          </div>
          <h2 className="type-display font-bold">¿Necesita un mapeo cerebral prequirúrgico?</h2>
          <p className="type-body-lg text-slate-300 max-w-2xl">
            Nuestro equipo de neuroimagen le orienta sobre el protocolo adecuado para su caso y coordina el estudio con su equipo neuroquirúrgico.
          </p>
          <div className="flex flex-col sm:flex-row gap-sm mt-sm">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1ebd5b] text-white type-label font-bold px-lg py-sm rounded-full transition-all shadow-lg flex items-center justify-center gap-xs">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Agendar por WhatsApp
            </a>
            <a href="/directorio"
              className="border border-white/30 text-white hover:bg-white/10 type-label px-lg py-sm rounded-full transition-all flex items-center justify-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">groups</span>
              Ver Nuestros Especialistas
            </a>
          </div>
          <p className="type-label text-slate-400 mt-sm">Nuestro equipo confirma disponibilidad y le orienta sin compromiso.</p>
        </div>
      </section>

    </main>
  );
}
