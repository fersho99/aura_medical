const whatsappNumber = "526531332053";
const whatsappMessage = encodeURIComponent("Hola, visité la página de Tratamiento de ACV en Aura Medical y me gustaría información sobre la Unidad de Ictus y cómo actuar ante una emergencia.");
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

export default function TratamientoAcvPage() {
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
              <span className="text-secondary font-medium">Tratamiento Integral de ACV</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative w-full h-150 md:h-175 flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img alt="Unidad de ictus con monitoreo neurológico 24 horas"
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2000&auto=format&fit=crop" />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl w-full mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-sm px-md py-sm rounded-full glass-panel text-secondary-fixed type-label mb-md border border-secondary-fixed/30">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
              Instituto de Neurociencias · Unidad de Ictus 24/7
            </div>
            <h1 className="type-display font-bold text-white mb-sm leading-tight">
              Tratamiento Integral <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary-fixed to-primary-fixed">
                de ACV / Ictus
              </span>
            </h1>
            <p className="type-body-lg text-slate-300 mb-lg">
              Protocolo Código Ictus con trombolisis intravenosa y trombectomía mecánica endovascular disponibles las 24 horas. Cada minuto cuenta — actuamos en la ventana terapéutica.
            </p>
            <div className="flex flex-col sm:flex-row gap-sm">
              <a href="tel:911"
                className="bg-error hover:bg-error/90 text-on-error type-label font-bold px-lg py-sm rounded-full transition-all shadow-sm flex items-center justify-center gap-xs">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
                Llamar a Urgencias
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

      {/* Alerta FAST */}
      <div className="bg-error/5 border-b border-error/20">
        <div className="container-page py-md">
          <div className="flex flex-col md:flex-row items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-error/10 border border-error/30 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-error text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="type-headline text-on-surface mb-xs">Ante un ictus, cada segundo importa</p>
              <p className="type-body text-on-surface-variant">
                Si detecta alguno de estos signos — <strong>F</strong>ace (cara caída), <strong>A</strong>rm (brazo débil), <strong>S</strong>peech (habla difícil), <strong>T</strong>ime (tiempo de llamar) — llame a urgencias inmediatamente.
              </p>
            </div>
            <a href="tel:911"
              className="shrink-0 bg-error text-on-error hover:bg-error/90 type-label font-bold px-lg py-sm rounded-full transition-all flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">call</span>
              Urgencias 24/7
            </a>
          </div>
        </div>
      </div>

      {/* ¿En qué consiste? */}
      <section className="section bg-background">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
            <div className="flex flex-col gap-md">
              <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-secondary/10 border border-secondary/20 type-label text-secondary w-fit">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                El Protocolo
              </div>
              <h2 className="type-display text-on-surface">¿Cómo tratamos el ACV en Aura Medical?</h2>
              <p className="type-body-lg text-on-surface-variant">
                El accidente cerebrovascular (ACV o ictus) es una emergencia neurológica en la que cada minuto sin tratamiento equivale a la pérdida de aproximadamente 1.9 millones de neuronas. Nuestro protocolo Código Ictus activa un equipo multidisciplinario en menos de 10 minutos desde la llegada del paciente.
              </p>
              <p className="type-body text-on-surface-variant">
                Para ictus isquémico (por coágulo), ofrecemos trombolisis intravenosa con rtPA en los primeros 4.5 horas, y trombectomía mecánica endovascular —extracción del coágulo con un microcatéter— hasta 24 horas en casos seleccionados. Para ictus hemorrágico, el neurocirujano interviene de inmediato para controlar el sangrado.
              </p>
              <div className="flex flex-col gap-sm mt-sm">
                {[
                  { icon: 'timer',      text: 'Tiempo puerta-aguja: objetivo menor a 30 minutos' },
                  { icon: 'emergency',  text: 'Unidad de Ictus certificada disponible 24/7/365' },
                  { icon: 'healing',    text: 'Programa de neurorrehabilitación desde las primeras 24 h' },
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
              <img alt="Sala de urgencias neurológicas con monitoreo continuo"
                className="absolute inset-0 w-full h-full object-cover"
                src="/imagenes/hero-background.png" />
              <div className="absolute inset-0 bg-linear-to-t from-on-background/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-md left-md right-md">
                <div className="inline-flex items-center gap-xs bg-surface/20 backdrop-blur-md rounded-full px-sm py-xs text-on-primary type-label">
                  <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                  Unidad de Ictus · Activa 24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Cuándo actuar? */}
      <section className="section bg-surface-container-low">
        <div className="container-page">
          <div className="section-header">
            <h2 className="type-display text-on-surface mb-sm">Señales de alarma — actúe de inmediato</h2>
            <p className="type-body text-on-surface-variant max-w-2xl mx-auto">
              Reconocer estos síntomas y actuar en los primeros minutos puede salvar la vida o prevenir una discapacidad permanente.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md max-w-5xl mx-auto">
            {[
              { icon: 'face',             title: 'Parálisis facial súbita',          desc: 'Un lado de la cara cae o no puede sonreír simétricamente. Pida al paciente que muestre los dientes.' },
              { icon: 'back_hand',        title: 'Debilidad en brazo o pierna',      desc: 'Un brazo cae al intentar levantarlo. Debilidad súbita en una extremidad sin causa aparente.' },
              { icon: 'chat_bubble',      title: 'Dificultad para hablar',           desc: 'Habla enredada, incomprensible o incapacidad de repetir una frase sencilla.' },
              { icon: 'visibility_off',   title: 'Pérdida de visión súbita',         desc: 'Visión borrosa, doble o pérdida de visión en uno o ambos ojos de aparición repentina.' },
              { icon: 'crisis_alert',     title: 'Cefalea en trueno',                desc: 'Dolor de cabeza de máxima intensidad de inicio súbito, diferente a cualquier cefalea anterior.' },
              { icon: 'directions_walk',  title: 'Pérdida de equilibrio',            desc: 'Incapacidad súbita para caminar, mareo intenso o pérdida de coordinación sin causa clara.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-surface rounded-2xl p-md border border-error/20 shadow-sm flex flex-col gap-sm">
                <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center text-error shrink-0">
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
              <img alt="Equipo de neurología intervencionista en sala de angiorradiología"
                className="absolute inset-0 w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1581094693702-fbdc51b2763b?q=80&w=2000&auto=format&fit=crop" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-md left-md right-md flex items-center gap-sm">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
                </span>
                <span className="font-data-mono text-data-mono text-error uppercase tracking-wider">Código Ictus Activo</span>
              </div>
            </div>
            <div className="flex flex-col gap-md">
              <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-secondary/10 border border-secondary/20 type-label text-secondary w-fit">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                Ventajas de Aura Medical
              </div>
              <h2 className="type-display text-on-surface">Por qué Aura Medical ante un ictus</h2>
              <p className="type-body-lg text-on-surface-variant">
                Tiempo, tecnología y equipo humano: los tres pilares de una respuesta al ictus que marca la diferencia entre la recuperación y la discapacidad.
              </p>
              <div className="flex flex-col gap-md">
                {[
                  { icon: 'timer',          color: 'text-error',     bg: 'bg-error/10',     title: 'Tiempo Puerta-Aguja <30 Minutos',         desc: 'Protocolo de activación inmediata que garantiza trombolisis dentro del objetivo internacional.' },
                  { icon: 'emergency',      color: 'text-secondary', bg: 'bg-secondary/10', title: 'Trombectomía Mecánica 24/7',              desc: 'Sala de angiorradiología intervencionista disponible a cualquier hora para extracción endovascular del coágulo.' },
                  { icon: 'biotech',        color: 'text-primary',   bg: 'bg-primary/10',   title: 'Neuroimagen de Emergencia en 10 min',    desc: 'TC multimodal y angioRM disponibles en guardia para diagnóstico inmediato del tipo y extensión del ictus.' },
                  { icon: 'fitness_center', color: 'text-tertiary',  bg: 'bg-tertiary/10',  title: 'Neurorrehabilitación Precoz',             desc: 'Fisioterapia, terapia ocupacional y logopedia iniciadas en las primeras 24 horas para maximizar la recuperación.' },
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
          <div className="w-16 h-16 rounded-full bg-error/20 border border-error/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-error text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
          </div>
          <h2 className="type-display font-bold">Ante un ictus: llame ahora</h2>
          <p className="type-body-lg text-slate-300 max-w-2xl">
            No espere. Si sospecha un accidente cerebrovascular, cada minuto sin atención especializada es irreversible. Nuestra Unidad de Ictus está disponible las 24 horas.
          </p>
          <div className="flex flex-col sm:flex-row gap-sm mt-sm">
            <a href="tel:911"
              className="bg-error hover:bg-error/90 text-on-error type-label font-bold px-lg py-sm rounded-full transition-all shadow-lg flex items-center justify-center gap-xs">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
              Llamar a Urgencias 24/7
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1ebd5b] text-white type-label font-bold px-lg py-sm rounded-full transition-all shadow-lg flex items-center justify-center gap-xs">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Consultar por WhatsApp
            </a>
          </div>
          <p className="type-label text-slate-400 mt-sm">Para emergencias activas siempre llame por teléfono — no use WhatsApp.</p>
        </div>
      </section>

    </main>
  );
}
