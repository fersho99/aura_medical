/** Página: Aviso Legal — Aura Medical */

export const metadata = {
  title: 'Aviso Legal | Aura Medical',
  description: 'Aviso legal de Aura Medical Private Clinic. Condiciones de uso del sitio web, titularidad, propiedad intelectual y limitación de responsabilidad.',
}

export default function AvisoLegalPage() {
  return (
    <main className="bg-surface">

      {/* Hero */}
      <section className="bg-on-background py-2xl">
        <div className="container-page max-w-4xl">
          <div className="inline-flex items-center gap-sm px-md py-xs bg-primary/20 text-primary-fixed-dim rounded-full type-label border border-primary/30 mb-md">
            <span className="material-symbols-outlined text-sm">gavel</span>
            Información Legal
          </div>
          <h1 className="type-display font-bold text-white mb-sm">Aviso Legal</h1>
          <p className="type-body text-surface-variant/70">Última actualización: enero 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-2xl">
        <div className="container-page max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-xl">

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">1. Titularidad del Sitio Web</h2>
              <p className="type-body text-on-surface-variant leading-relaxed">
                En cumplimiento con el deber de información recogido en la Ley Federal de Protección al Consumidor y demás normativa aplicable, se informa que el presente sitio web <strong>auramedical.com</strong> es titularidad de <strong>Aura Medical Private Clinic, S.A. de C.V.</strong>, con domicilio en Av. de la Innovación 45, Chihuahua, Chih., México, C.P. 31200.
              </p>
              <p className="type-body text-on-surface-variant leading-relaxed mt-sm">
                Correo de contacto: <a className="text-primary hover:underline" href="mailto:info@auramedical.com">info@auramedical.com</a>
              </p>
            </div>

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">2. Objeto y Ámbito de Aplicación</h2>
              <p className="type-body text-on-surface-variant leading-relaxed">
                El presente Aviso Legal regula el acceso y uso del sitio web de Aura Medical, así como los servicios e información disponibles a través del mismo. El acceso y navegación por el sitio implica la aceptación expresa e íntegra de las presentes condiciones.
              </p>
              <p className="type-body text-on-surface-variant leading-relaxed mt-sm">
                La información publicada en este sitio tiene carácter meramente informativo y en ningún caso puede sustituir la consulta médica profesional. Ante cualquier duda sobre su salud, consulte a un profesional sanitario cualificado.
              </p>
            </div>

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">3. Propiedad Intelectual e Industrial</h2>
              <p className="type-body text-on-surface-variant leading-relaxed">
                Todos los contenidos del sitio web — incluyendo, sin limitación, textos, fotografías, gráficos, logotipos, iconos, imágenes, diseño gráfico, código fuente y software — son propiedad de Aura Medical o de sus proveedores de contenido, y están protegidos por las leyes mexicanas e internacionales de propiedad intelectual e industrial.
              </p>
              <p className="type-body text-on-surface-variant leading-relaxed mt-sm">
                Queda expresamente prohibida la reproducción total o parcial, distribución, comunicación pública, transformación o cualquier otra forma de explotación de los contenidos del sitio sin la autorización previa y expresa de Aura Medical.
              </p>
            </div>

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">4. Limitación de Responsabilidad</h2>
              <p className="type-body text-on-surface-variant leading-relaxed">
                Aura Medical no será responsable de los daños y perjuicios que pudieran derivarse del uso del sitio web, incluyendo errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
              </p>
              <p className="type-body text-on-surface-variant leading-relaxed mt-sm">
                Aura Medical se reserva el derecho a efectuar sin previo aviso las modificaciones que considere oportunas en el sitio web, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten como la forma en que éstos aparezcan presentados o localizados.
              </p>
            </div>

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">5. Información Médica y Sanitaria</h2>
              <p className="type-body text-on-surface-variant leading-relaxed">
                La información médica y sanitaria contenida en este sitio tiene exclusivamente un propósito divulgativo e informativo. Aura Medical no ofrece diagnósticos, tratamientos ni recomendaciones médicas personalizadas a través de este sitio web.
              </p>
              <p className="type-body text-on-surface-variant leading-relaxed mt-sm">
                El acceso a los servicios médicos de Aura Medical requiere cita previa y evaluación por parte de nuestros profesionales de salud. En caso de emergencia médica, llame al <strong>911</strong> o acuda a urgencias.
              </p>
            </div>

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">6. Legislación Aplicable y Jurisdicción</h2>
              <p className="type-body text-on-surface-variant leading-relaxed">
                La relación entre Aura Medical y el usuario se regirá por la legislación vigente en México. Para la resolución de conflictos, ambas partes se someten a los Juzgados y Tribunales competentes de la ciudad de Chihuahua, Chih., con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
              </p>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">7. Contacto</h2>
              <p className="type-body text-on-surface-variant leading-relaxed mb-md">
                Para cualquier consulta sobre este Aviso Legal, puede contactarnos a través de los siguientes medios:
              </p>
              <ul className="space-y-sm">
                <li className="flex items-center gap-sm type-body text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-sm">email</span>
                  <a className="text-primary hover:underline" href="mailto:info@auramedical.com">info@auramedical.com</a>
                </li>
                <li className="flex items-center gap-sm type-body text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                  Av. de la Innovación 45, Chihuahua, Chih., México
                </li>
                <li className="flex items-center gap-sm type-body text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-sm">phone</span>
                  <a className="text-primary hover:underline" href="tel:+526531332053">653 133 2053</a>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-xl pt-xl border-t border-outline/20">
            <a href="/" className="inline-flex items-center gap-sm text-primary hover:text-primary-container transition-colors type-label">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Volver al inicio
            </a>
          </div>

        </div>
      </section>

    </main>
  )
}
