/** Página: Política de Privacidad — Aura Medical */

export const metadata = {
  title: 'Política de Privacidad | Aura Medical',
  description: 'Política de privacidad de Aura Medical. Cómo recopilamos, usamos y protegemos sus datos personales conforme a la Ley Federal de Protección de Datos Personales.',
}

export default function PrivacidadPage() {
  return (
    <main className="bg-surface">

      {/* Hero */}
      <section className="bg-on-background py-2xl">
        <div className="container-page max-w-4xl">
          <div className="inline-flex items-center gap-sm px-md py-xs bg-primary/20 text-primary-fixed-dim rounded-full type-label border border-primary/30 mb-md">
            <span className="material-symbols-outlined text-sm">shield</span>
            Privacidad y Datos
          </div>
          <h1 className="type-display font-bold text-white mb-sm">Política de Privacidad</h1>
          <p className="type-body text-surface-variant/70">Última actualización: enero 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-2xl">
        <div className="container-page max-w-4xl">
          <div className="space-y-xl">

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">1. Responsable del Tratamiento</h2>
              <p className="type-body text-on-surface-variant leading-relaxed">
                <strong>Aura Medical Private Clinic, S.A. de C.V.</strong>, en adelante &quot;Aura Medical&quot;, con domicilio en Av. de la Innovación 45, Chihuahua, Chih., México, C.P. 31200, es el responsable del tratamiento de sus datos personales conforme a la <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</em> (LFPDPPP) y su Reglamento.
              </p>
              <p className="type-body text-on-surface-variant leading-relaxed mt-sm">
                Contacto: <a className="text-primary hover:underline" href="mailto:info@auramedical.com">info@auramedical.com</a> | Tel: <a className="text-primary hover:underline" href="tel:+526531332053">653 133 2053</a>
              </p>
            </div>

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">2. Datos Personales que Recopilamos</h2>
              <p className="type-body text-on-surface-variant leading-relaxed mb-sm">
                Podemos recopilar las siguientes categorías de datos personales:
              </p>
              <ul className="space-y-xs text-on-surface-variant">
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">circle</span>
                  <span><strong>Datos de identificación:</strong> nombre completo, fecha de nacimiento, género, número de identificación oficial.</span>
                </li>
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">circle</span>
                  <span><strong>Datos de contacto:</strong> dirección de correo electrónico, número de teléfono, dirección postal.</span>
                </li>
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">circle</span>
                  <span><strong>Datos sensibles de salud:</strong> historial médico, diagnósticos, resultados de estudios clínicos y tratamientos, necesarios para la prestación de servicios médicos.</span>
                </li>
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">circle</span>
                  <span><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas y tiempo de navegación en este sitio web.</span>
                </li>
              </ul>
            </div>

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">3. Finalidades del Tratamiento</h2>
              <p className="type-body text-on-surface-variant leading-relaxed mb-sm">Sus datos personales son utilizados para:</p>
              <ul className="space-y-xs text-on-surface-variant">
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">check_circle</span>
                  Gestión de citas médicas, historial clínico y prestación de servicios de salud.
                </li>
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">check_circle</span>
                  Comunicaciones relacionadas con su atención médica y seguimiento clínico.
                </li>
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">check_circle</span>
                  Facturación, cobranza y gestión administrativa.
                </li>
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">check_circle</span>
                  Cumplimiento de obligaciones legales y regulatorias en materia sanitaria.
                </li>
                <li className="flex items-start gap-sm type-body">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">check_circle</span>
                  Envío de comunicaciones informativas y boletines (solo con su consentimiento expreso).
                </li>
              </ul>
            </div>

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">4. Datos Sensibles</h2>
              <p className="type-body text-on-surface-variant leading-relaxed">
                Los datos relativos a su estado de salud son considerados datos sensibles conforme a la LFPDPPP. Su tratamiento se realizará exclusivamente con su consentimiento expreso, bajo estrictas medidas de seguridad, y únicamente con la finalidad de brindarle atención médica. Estos datos nunca serán vendidos, transferidos o cedidos a terceros para fines comerciales.
              </p>
            </div>

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">5. Medidas de Seguridad</h2>
              <p className="type-body text-on-surface-variant leading-relaxed">
                Aura Medical ha implementado medidas técnicas, administrativas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción, uso, acceso o tratamiento no autorizado. Nuestros sistemas cuentan con cifrado SSL/TLS, control de acceso por roles y auditorías periódicas de seguridad.
              </p>
            </div>

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">6. Sus Derechos (ARCO)</h2>
              <p className="type-body text-on-surface-variant leading-relaxed mb-sm">
                Conforme a la LFPDPPP, usted tiene derecho a:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
                {[
                  { letra: 'A', derecho: 'Acceso', desc: 'Conocer qué datos tenemos sobre usted.' },
                  { letra: 'R', derecho: 'Rectificación', desc: 'Corregir datos inexactos o incompletos.' },
                  { letra: 'C', derecho: 'Cancelación', desc: 'Solicitar la eliminación de sus datos.' },
                  { letra: 'O', derecho: 'Oposición', desc: 'Oponerse al tratamiento de sus datos.' },
                ].map(({ letra, derecho, desc }) => (
                  <div key={letra} className="bg-surface rounded-2xl p-md text-center">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mx-auto mb-sm">
                      <span className="text-on-primary font-bold type-label">{letra}</span>
                    </div>
                    <div className="type-label font-semibold text-on-surface mb-xs">{derecho}</div>
                    <div className="type-body text-on-surface-variant text-xs">{desc}</div>
                  </div>
                ))}
              </div>
              <p className="type-body text-on-surface-variant leading-relaxed mt-md">
                Para ejercer sus derechos ARCO, envíe una solicitud a <a className="text-primary hover:underline" href="mailto:info@auramedical.com">info@auramedical.com</a> indicando su nombre completo, datos de contacto y la petición específica. Responderemos en un plazo máximo de 20 días hábiles.
              </p>
            </div>

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">7. Transferencias de Datos</h2>
              <p className="type-body text-on-surface-variant leading-relaxed">
                Aura Medical podrá compartir sus datos con terceros únicamente en los siguientes supuestos: (i) con su consentimiento expreso; (ii) cuando sea necesario para la prestación del servicio médico solicitado (por ejemplo, laboratorios, especialistas externos o aseguradoras); (iii) cuando sea requerido por autoridades sanitarias o judiciales competentes. En ningún caso se cederán sus datos para fines publicitarios sin su consentimiento.
              </p>
            </div>

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">8. Cambios a esta Política</h2>
              <p className="type-body text-on-surface-variant leading-relaxed">
                Aura Medical se reserva el derecho de modificar esta Política de Privacidad en cualquier momento. Las modificaciones serán publicadas en este sitio web con indicación de la fecha de actualización. Le recomendamos revisar periódicamente esta página.
              </p>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">Contacto para Privacidad</h2>
              <p className="type-body text-on-surface-variant leading-relaxed mb-md">
                Para cualquier consulta, ejercicio de derechos ARCO o reclamación relacionada con el tratamiento de sus datos personales:
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
