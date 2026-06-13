import { getEspecialidades, getContenido } from '@/lib/contenido'

export const metadata = {
  title: 'Especialidades Médicas | Aura Medical',
  description: 'Descubra nuestras especialidades médicas: Cardiología, Neurología, Oncología y Pediatría con tecnología avanzada y los mejores especialistas de Chihuahua.',
}

export default async function EspecialidadesPage() {
  const [especialidades, contenido] = await Promise.all([getEspecialidades(), getContenido()])
  const e = contenido.esp_hero ?? {}

  return (
    <main>

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-150 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Hospital corridor"
            className="w-full h-full object-cover"
            src="/imagenes/hero-background.png"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900/90 to-slate-900/50"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop text-center md:text-left text-white">
          <div className="inline-flex items-center gap-sm bg-primary-container/20 text-primary-fixed border border-primary-fixed/30 rounded-full px-md py-sm mb-md backdrop-blur-sm">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="type-label tracking-wider uppercase">{e.badge || 'Excelencia en Salud'}</span>
          </div>
          <h1 className="type-display font-bold mb-md max-w-3xl leading-tight">
            {e.titulo || 'Red Integral de'} <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-fixed to-secondary-fixed-dim">
              {e.titulo_2 || 'Especialidades Médicas'}
            </span>
          </h1>
          <p className="type-body-lg text-surface-container-high max-w-2xl mb-lg">
            {e.subtitulo || 'Atención especializada con tecnología de vanguardia y equipos multidisciplinarios. Nuestro compromiso es su salud integral.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-sm justify-center md:justify-start">
            <button className="bg-linear-to-r from-primary to-primary-container text-on-primary type-body font-semibold px-lg py-md rounded-full emerald-glow transition-all duration-300 flex items-center justify-center gap-sm">
              {e.boton_texto || 'Explorar Especialidades'}
              <span className="material-symbols-outlined">arrow_downward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Intro Features */}
      <section className="section bg-surface">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">

            {/* Feature 1 */}
            <div className="bg-surface-container-lowest p-lg rounded-3xl border border-surface-variant shadow-[0_4px_20px_rgba(2,62,138,0.04)] text-center transition-transform hover:-translate-y-1 duration-300">
              <div className="w-16 h-16 bg-tertiary-fixed rounded-2xl flex items-center justify-center mx-auto mb-md text-on-tertiary-fixed-variant">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              </div>
              <h3 className="type-headline text-on-surface mb-sm">Enfoque Multidisciplinario</h3>
              <p className="type-body text-on-surface-variant">Equipos de especialistas colaborando para brindar diagnósticos precisos y planes de tratamiento integrales.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-surface-container-lowest p-lg rounded-3xl border border-surface-variant shadow-[0_4px_20px_rgba(2,62,138,0.04)] text-center transition-transform hover:-translate-y-1 duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-primary-container"></div>
              <div className="w-16 h-16 bg-primary-fixed rounded-2xl flex items-center justify-center mx-auto mb-md text-on-primary-fixed">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </div>
              <h3 className="type-headline text-on-surface mb-sm">Centrado en el Paciente</h3>
              <p className="type-body text-on-surface-variant">Atención empática y personalizada que prioriza su bienestar físico, emocional y psicológico en cada etapa.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-surface-container-lowest p-lg rounded-3xl border border-surface-variant shadow-[0_4px_20px_rgba(2,62,138,0.04)] text-center transition-transform hover:-translate-y-1 duration-300">
              <div className="w-16 h-16 bg-secondary-fixed rounded-2xl flex items-center justify-center mx-auto mb-md text-on-secondary-fixed">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>precision_manufacturing</span>
              </div>
              <h3 className="type-headline text-on-surface mb-sm">Tecnología de Punta</h3>
              <p className="type-body text-on-surface-variant">Equipamiento médico de última generación para procedimientos menos invasivos y recuperación más rápida.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Especialidades dinámicas */}
      {especialidades.length > 0 && (
        <section className="section bg-background">
          <div className="container-page flex flex-col gap-xl">
            {especialidades.map((esp, i) => {
              const imgLeft = i % 2 === 0
              return (
                <div key={esp.id} className="grid grid-cols-1 lg:grid-cols-2 gap-lg items-center">
                  {/* Imagen */}
                  <div className={`rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(2,62,138,0.12)] relative group ${imgLeft ? 'order-2 lg:order-1' : 'order-2'}`}>
                    {esp.imagen_url ? (
                      <img alt={esp.nombre}
                        className="w-full h-125 object-cover transition-transform duration-700 group-hover:scale-105"
                        src={esp.imagen_url} />
                    ) : (
                      <div className="w-full h-125 bg-surface-container-lowest flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-[80px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {esp.icono || 'medical_services'}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  {/* Texto */}
                  <div className={imgLeft ? 'order-1 lg:order-2' : 'order-1'}>
                    <div className="inline-flex items-center gap-sm text-primary bg-primary-container/30 px-md py-sm rounded-full mb-md">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {esp.icono || 'medical_services'}
                      </span>
                      <span className="type-label uppercase tracking-wide">{esp.nombre}</span>
                    </div>
                    <h2 className="type-display font-bold text-on-surface mb-md">{esp.nombre}</h2>
                    {esp.descripcion_corta && (
                      <p className="type-body-lg text-on-surface-variant mb-lg">{esp.descripcion_corta}</p>
                    )}
                    {esp.servicios.length > 0 && (
                      <ul className="flex flex-col gap-sm mb-lg">
                        {esp.servicios.map(servicio => (
                          <li key={servicio} className="flex items-start gap-sm">
                            <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                            <span className="type-body text-on-surface-variant">{servicio}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <a href={`/especialidades/${esp.slug}`}
                      className="border-2 border-outline hover:border-primary text-on-surface hover:text-primary type-label px-md py-sm rounded-full transition-all duration-300 flex items-center gap-sm group w-fit">
                      Saber Más sobre {esp.nombre}
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Premium CTA */}
      <section className="section bg-on-secondary-fixed text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
          <span
            className="material-symbols-outlined text-5xl text-primary-fixed-dim mb-md block"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <h2 className="type-display font-bold mb-md">
            Medicina de Concierge
          </h2>
          <p className="type-body-lg text-surface-container-highest mb-lg max-w-2xl mx-auto">
            Experimente nuestro exclusivo Programa de Check-up Premium. Evaluaciones integrales preventivas en un entorno de máxima privacidad y confort, diseñadas para altos ejecutivos y pacientes exigentes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-sm">
            <button className="bg-primary hover:bg-primary-container text-white type-label px-lg py-md rounded-full transition-colors duration-300">
              Conocer Programa Premium
            </button>
            <button className="border border-outline-variant hover:border-white text-white type-label px-lg py-md rounded-full transition-colors duration-300">
              Contactar Asesor
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
