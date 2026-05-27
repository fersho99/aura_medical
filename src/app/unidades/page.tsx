export const metadata = {
  title: 'Unidades Médicas | Aura Medical',
  description: 'Instalaciones de clase mundial: Baby Port, Imagenología, UCI, Bloque Quirúrgico, Urgencias 24/7 y Medicina Preventiva en Chihuahua.',
}

export default function UnidadesMedicasPage() {
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
              <span className="text-primary font-medium">Unidades Médicas</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-125 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay muted loop playsInline
            poster="/imagenes/hero-background.png"
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero-unidades.mp4" type="video/mp4" />
            <img alt="Instalaciones Aura Medical" src="/imagenes/hero-background.png" className="w-full h-full object-cover" />
          </video>
          <div className="absolute inset-0 bg-linear-to-r from-slate-900/95 to-slate-900/60"></div>
        </div>
        <div className="relative z-10 container-page py-xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-sm px-md py-xs bg-primary/20 text-primary-fixed-dim rounded-full type-label border border-primary/30 mb-md backdrop-blur-sm">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
              Infraestructura de Clase Mundial
            </div>
            <h1 className="type-display font-bold text-white mb-md leading-tight">
              Unidades Médicas de <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-fixed to-secondary-fixed-dim">
                Alta Especialidad
              </span>
            </h1>
            <p className="type-body-lg text-slate-300 mb-lg">
              Instalaciones diseñadas con los más altos estándares internacionales, integrando tecnología de vanguardia y confort premium para cada etapa de su atención.
            </p>
            <div className="flex flex-col sm:flex-row gap-sm">
              <a href="#unidades" className="bg-primary-container text-on-primary-container hover:bg-primary-fixed hover:text-on-primary-fixed type-label px-lg py-sm rounded-full emerald-glow transition-all duration-300 flex items-center gap-xs">
                Conocer Instalaciones
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <a href="https://wa.me/526531332053?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20visita%20a%20las%20instalaciones%20de%20Aura%20Medical." target="_blank" rel="noopener noreferrer" className="bg-transparent border border-white text-white hover:bg-white/10 type-label px-lg py-sm rounded-full transition-all duration-300 flex items-center gap-xs">
                <span className="material-symbols-outlined">calendar_month</span>
                Agendar Visita
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-primary py-lg">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md text-on-primary text-center">
            <div>
              <div className="type-display font-bold">6</div>
              <div className="type-label opacity-80 uppercase tracking-wider">Unidades Especializadas</div>
            </div>
            <div>
              <div className="type-display font-bold">24/7</div>
              <div className="type-label opacity-80 uppercase tracking-wider">Atención Continua</div>
            </div>
            <div>
              <div className="type-display font-bold">+500</div>
              <div className="type-label opacity-80 uppercase tracking-wider">Especialistas</div>
            </div>
            <div>
              <div className="type-display font-bold">JCI</div>
              <div className="type-label opacity-80 uppercase tracking-wider">Acreditación Internacional</div>
            </div>
          </div>
        </div>
      </section>

      {/* Units Catalog */}
      <section className="section bg-surface-container-low">
        <div className="container-page">
          <div className="flex flex-col md:flex-row justify-between items-end mb-lg gap-md">
            <div>
              <h2 className="type-display text-on-surface mb-xs">Excelencia Clínica en Cada Área</h2>
              <p className="type-body text-on-surface-variant max-w-2xl">Nuestras unidades están equipadas con sistemas de monitoreo en tiempo real y protocolos de seguridad internacional.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">

            {/* Unit 1: Baby Port */}
            <div className="group flex flex-col bg-surface rounded-3xl overflow-hidden shadow-md shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
              <div className="h-56 overflow-hidden relative">
                <img
                  alt="Maternidad Baby Port"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/imagenes/card-baby-port.jpg"
                />
                <div className="absolute top-md left-md glass-card p-xs rounded-xl">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>child_care</span>
                </div>
              </div>
              <div className="p-md flex flex-col grow">
                <h3 className="type-headline text-on-surface mb-xs">Baby Port</h3>
                <p className="type-body text-on-surface-variant mb-lg grow">Área Materno-Infantil con suites privadas y tecnología de monitoreo fetal avanzado.</p>
                <a href="/unidades/baby-port" className="type-label text-primary flex items-center gap-xs group/btn hover:text-primary-container transition-colors">
                  Explorar Unidad
                  <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Unit 2: Imagenología */}
            <div className="group flex flex-col bg-surface rounded-3xl overflow-hidden shadow-md shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
              <div className="h-56 overflow-hidden relative">
                <img
                  alt="Centro de Diagnóstico por Imagen"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/imagenes/card-imagenologia.jpg"
                />
                <div className="absolute top-md left-md glass-card p-xs rounded-xl">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>biotech</span>
                </div>
              </div>
              <div className="p-md flex flex-col grow">
                <h3 className="type-headline text-on-surface mb-xs">Centro de Imagenología</h3>
                <p className="type-body text-on-surface-variant mb-lg grow">Diagnóstico de precisión con resonancia magnética 3T y tomografía de alta resolución.</p>
                <a href="/unidades/imagenologia" className="type-label text-primary flex items-center gap-xs group/btn hover:text-primary-container transition-colors">
                  Explorar Unidad
                  <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Unit 3: UCI */}
            <div className="group flex flex-col bg-surface rounded-3xl overflow-hidden shadow-md shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
              <div className="h-56 overflow-hidden relative">
                <img
                  alt="Unidad de Cuidados Intensivos"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/imagenes/card-uci.jpg"
                />
                <div className="absolute top-md left-md glass-card p-xs rounded-xl">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
                </div>
              </div>
              <div className="p-md flex flex-col grow">
                <h3 className="type-headline text-on-surface mb-xs">Unidad de Cuidados Intensivos</h3>
                <p className="type-body text-on-surface-variant mb-lg grow">UCI con atención especializada 24/7 y sistemas de soporte vital de última generación.</p>
                <a href="/unidades/uci" className="type-label text-primary flex items-center gap-xs group/btn hover:text-primary-container transition-colors">
                  Explorar Unidad
                  <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Unit 4: Bloque Quirúrgico */}
            <div className="group flex flex-col bg-surface rounded-3xl overflow-hidden shadow-md shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
              <div className="h-56 overflow-hidden relative">
                <img
                  alt="Bloque Quirúrgico Inteligente"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/imagenes/card-quirofano.jpg"
                />
                <div className="absolute top-md left-md glass-card p-xs rounded-xl">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>precision_manufacturing</span>
                </div>
              </div>
              <div className="p-md flex flex-col grow">
                <h3 className="type-headline text-on-surface mb-xs">Bloque Quirúrgico Inteligente</h3>
                <p className="type-body text-on-surface-variant mb-lg grow">Quirófanos integrados con asistencia robótica Da Vinci y técnicas de mínima invasión.</p>
                <a href="/unidades/quirofano" className="type-label text-primary flex items-center gap-xs group/btn hover:text-primary-container transition-colors">
                  Explorar Unidad
                  <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Unit 5: Urgencias */}
            <div className="group flex flex-col bg-surface rounded-3xl overflow-hidden shadow-md shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
              <div className="h-56 overflow-hidden relative">
                <img
                  alt="Urgencias 24/7"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/imagenes/card-urgencias.jpg"
                />
                <div className="absolute top-md left-md glass-card p-xs rounded-xl">
                  <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
                </div>
              </div>
              <div className="p-md flex flex-col grow">
                <h3 className="type-headline text-on-surface mb-xs">Urgencias 24/7</h3>
                <p className="type-body text-on-surface-variant mb-lg grow">Atención inmediata con triage inteligente y especialistas siempre disponibles para cualquier emergencia.</p>
                <a href="/unidades/urgencias" className="type-label text-primary flex items-center gap-xs group/btn hover:text-primary-container transition-colors">
                  Explorar Unidad
                  <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Unit 6: Medicina Preventiva */}
            <div className="group flex flex-col bg-surface rounded-3xl overflow-hidden shadow-md shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
              <div className="h-56 overflow-hidden relative">
                <img
                  alt="Medicina Preventiva y Check-up"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/imagenes/card-medicina-preventiva.jpg"
                />
                <div className="absolute top-md left-md glass-card p-xs rounded-xl">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>health_and_safety</span>
                </div>
              </div>
              <div className="p-md flex flex-col grow">
                <h3 className="type-headline text-on-surface mb-xs">Medicina Preventiva</h3>
                <p className="type-body text-on-surface-variant mb-lg grow">Programas de Check-up ejecutivos en un ambiente de total privacidad y confort premium.</p>
                <a href="/unidades/medicina-preventiva" className="type-label text-primary flex items-center gap-xs group/btn hover:text-primary-container transition-colors">
                  Explorar Unidad
                  <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Accreditations Banner */}
      <section className="section bg-surface">
        <div className="container-page">
          <div className="border-y border-outline-variant py-lg flex flex-col md:flex-row items-center justify-around gap-lg opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="flex items-center gap-md">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">verified_user</span>
              <div>
                <p className="type-headline text-on-surface">Joint Commission International</p>
                <p className="type-label text-on-surface-variant">Gold Seal of Approval</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-outline-variant/50"></div>
            <div className="flex items-center gap-md">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">workspace_premium</span>
              <div>
                <p className="type-headline text-on-surface">ISO 9001:2015</p>
                <p className="type-label text-on-surface-variant">Certificación de Calidad</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-outline-variant/50"></div>
            <div className="flex items-center gap-md">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">award_star</span>
              <div>
                <p className="type-headline text-on-surface">COFEPRIS</p>
                <p className="type-label text-on-surface-variant">Acreditación Nacional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-on-secondary-fixed text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
          <span
            className="material-symbols-outlined text-5xl text-primary-fixed-dim mb-md block"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            domain
          </span>
          <h2 className="type-display font-bold mb-md">Conozca Nuestras Instalaciones</h2>
          <p className="type-body-lg text-surface-container-highest mb-lg max-w-2xl mx-auto">
            Le invitamos a visitar nuestras unidades y conocer de primera mano la infraestructura que pone a Aura Medical a la vanguardia de la medicina privada.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-sm">
            <a href="https://wa.me/526531332053?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20visita%20guiada%20a%20las%20instalaciones%20de%20Aura%20Medical." target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-primary-container text-white type-label px-lg py-md rounded-full transition-colors duration-300 flex items-center justify-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              Agendar Visita Guiada
            </a>
            <a href="https://wa.me/526531332053?text=Hola%2C%20me%20gustar%C3%ADa%20contactar%20con%20el%20%C3%A1rea%20de%20admisiones%20de%20Aura%20Medical." target="_blank" rel="noopener noreferrer" className="border border-outline-variant hover:border-white text-white type-label px-lg py-md rounded-full transition-colors duration-300 flex items-center justify-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
              Contactar Admisiones
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
