// ─── Interface — preparada para conexión a BD (Supabase) ──────────────────────
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  location: string;
  motto: string;
  about: string[];
  imageUrl: string;
  consultationFee: number;
  education: { degree: string; institution: string; year: string }[];
  certifications: string[];
  whatsappNumber: string; // Añadido para el enlace de contacto
}

// ─── Mock data — este fetch vendrá de Supabase en el futuro ───────────────────
const doctorData: Doctor = {
  id: "alejandro-vargas",
  name: "Dr. Alejandro Vargas",
  specialty: "Cardiología Intervencionista & Robótica",
  rating: 4.9,
  reviewCount: 124,
  experienceYears: 15,
  location: "Torre Norte, Nivel 4 · Consultorio 402",
  motto: "Especialista en procedimientos de mínima invasión y cuidado cardiovascular preventivo.",
  about: [
    "El Dr. Alejandro Vargas es un pionero en el campo de la cardiología intervencionista, combinando décadas de experiencia clínica con las últimas tecnologías en cirugía asistida por robótica. Su enfoque se centra en la precisión absoluta y la minimización del trauma para el paciente, asegurando recuperaciones más rápidas y resultados a largo plazo óptimos.",
    "Comprometido con la medicina preventiva, el Dr. Vargas dedica tiempo a educar a sus pacientes sobre estilos de vida saludables y manejo del estrés, creyendo firmemente que el tratamiento proactivo es tan crucial como la intervención quirúrgica."
  ],
  imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop",
  consultationFee: 2040,
  education: [
    { degree: "Especialidad en Cardiología Intervencionista", institution: "Hospital Universitario de Barcelona", year: "2012" },
    { degree: "Medicina General", institution: "Universidad Nacional Autónoma de México", year: "2008" },
  ],
  certifications: [
    "Certificado por el Consejo Mexicano de Cardiología",
    "Fellow de la Sociedad Americana del Corazón (AHA)",
    "Operador certificado Sistema Da Vinci Xi",
  ],
  whatsappNumber: "521234567890" // Reemplaza con el número real de la clínica
};

// ─── Page component ───────────────────────────────────────────────────────────
export default function DoctorProfileTemplate() {
  // Mensaje pre-llenado para WhatsApp
  const whatsappMessage = encodeURIComponent(`Hola, visité la página web y me gustaría información para agendar una cita con el ${doctorData.name} (${doctorData.specialty}).`);
  const whatsappUrl = `https://wa.me/${doctorData.whatsappNumber}?text=${whatsappMessage}`;

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
              <a className="hover:text-primary transition-colors" href="/directorio">Directorio Médico</a>
            </li>
            <li className="flex items-center gap-xs" aria-current="page">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-primary font-medium">{doctorData.name}</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop pb-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-md items-start">

          {/* ── Left Column ── */}
          <div className="lg:col-span-8 flex flex-col gap-lg">

            {/* Profile Hero Card */}
            <div className="bg-surface-container-lowest rounded-3xl p-md border border-outline-variant/30 shadow-md shadow-primary/5 flex flex-col sm:flex-row gap-md items-start">
              <div className="relative shrink-0">
                <img
                  alt={doctorData.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-surface shadow-[0_0_0_2px_var(--color-primary)]"
                  src={doctorData.imageUrl}
                />
                <div className="absolute bottom-1 right-1 bg-primary text-on-primary rounded-full p-1 border-2 border-surface">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              </div>

              <div className="grow flex flex-col gap-sm">
                <div className="flex justify-between items-start w-full">
                  <div>
                    <h1 className="type-headline text-on-surface">{doctorData.name}</h1>
                    <p className="type-body text-primary font-medium mt-xs">{doctorData.specialty}</p>
                  </div>
                  <div className="flex gap-xs">
                    <button className="p-xs rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant border border-outline-variant">
                      <span className="material-symbols-outlined">favorite_border</span>
                    </button>
                    <button className="p-xs rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant border border-outline-variant hidden sm:flex">
                      <span className="material-symbols-outlined">share</span>
                    </button>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-md type-label text-on-surface-variant">
                  <div className="flex items-center gap-xs text-[#FFD700]">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                    <span className="text-on-surface font-bold ml-xs">{doctorData.rating}</span>
                    <span className="text-on-surface-variant">({doctorData.reviewCount} reseñas)</span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px]">work_history</span>
                    <span>{doctorData.experienceYears}+ años de experiencia</span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    <span>{doctorData.location}</span>
                  </div>
                </div>

                {/* Motto */}
                <p className="type-body text-on-surface bg-surface-container-low p-sm rounded-xl border-l-4 border-primary">
                  &ldquo;{doctorData.motto}&rdquo;
                </p>
              </div>
            </div>

            {/* About */}
            <section className="bg-surface-container-lowest rounded-3xl p-md border border-outline-variant/30 shadow-md shadow-primary/5">
              <h2 className="type-headline text-on-surface border-b border-outline-variant/30 pb-sm mb-md">Acerca de mí</h2>
              <div className="flex flex-col gap-md">
                {doctorData.about.map((paragraph, index) => (
                  <p key={index} className="type-body text-on-surface-variant">{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Formación y Certificaciones */}
            <section className="bg-surface-container-lowest rounded-3xl p-md border border-outline-variant/30 shadow-md shadow-primary/5">
              <h2 className="type-headline text-on-surface border-b border-outline-variant/30 pb-sm mb-md">Formación y Certificaciones</h2>

              <div className="flex flex-col gap-lg">
                {/* Educación */}
                <div>
                  <h3 className="type-label text-on-surface-variant uppercase tracking-wider mb-sm">Educación</h3>
                  <div className="flex flex-col gap-sm">
                    {doctorData.education.map((edu, index) => (
                      <div key={index} className="flex items-start gap-sm">
                        <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0 mt-xs">
                          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                        </div>
                        <div>
                          <p className="type-body text-on-surface font-medium">{edu.degree}</p>
                          <p className="type-label text-on-surface-variant">{edu.institution} · {edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certificaciones */}
                <div>
                  <h3 className="type-label text-on-surface-variant uppercase tracking-wider mb-sm">Certificaciones</h3>
                  <div className="flex flex-col gap-sm">
                    {doctorData.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-sm">
                        <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        <p className="type-body text-on-surface">{cert}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* ── Right Column — Sticky Contact Widget ── */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 glass-panel bg-surface/90 backdrop-blur-xl rounded-3xl p-md flex flex-col gap-md shadow-lg shadow-primary/10 border border-outline-variant/30">

              {/* Header del widget */}
              <div className="border-b border-outline-variant/30 pb-sm text-center">
                <h3 className="type-headline text-on-surface">Agendar Consulta</h3>
                <p className="type-label text-on-surface-variant mt-xs">Atención personalizada y sin tiempos de espera prolongados.</p>
              </div>

              {/* Info de pago */}
              <div className="flex justify-center items-center gap-xs">
                <span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                <span className="type-body font-semibold text-on-surface">
                  Consulta de Valoración: ${doctorData.consultationFee.toLocaleString('es-MX')} MXN
                </span>
              </div>

              {/* Botones de Contacto */}
              <div className="flex flex-col gap-sm mt-xs">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1ebd5b] text-white py-sm rounded-xl type-label font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-xs shadow-sm hover:shadow-md"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Agendar por WhatsApp
                </a>

                <a
                  href={`tel:+${doctorData.whatsappNumber}`}
                  className="w-full border border-outline text-on-surface hover:bg-surface-container py-sm rounded-xl type-label uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-xs"
                >
                  <span className="material-symbols-outlined text-[20px]">call</span>
                  Llamar a Recepción
                </a>
              </div>

              {/* Disclaimer */}
              <div className="bg-surface-container-low p-sm rounded-xl mt-xs">
                <p className="type-label text-on-surface-variant flex items-start gap-xs">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0">info</span>
                  Nuestro equipo de recepción le confirmará los horarios disponibles para este especialista al contactarnos.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </main>
  );
}