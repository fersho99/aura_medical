/** Página: Política de Cookies — Aura Medical */

export const metadata = {
  title: 'Política de Cookies | Aura Medical',
  description: 'Política de cookies de Aura Medical. Información sobre los tipos de cookies que utilizamos y cómo gestionar sus preferencias.',
}

export default function CookiesPage() {
  return (
    <main className="bg-surface">

      {/* Hero */}
      <section className="bg-on-background py-2xl">
        <div className="container-page max-w-4xl">
          <div className="inline-flex items-center gap-sm px-md py-xs bg-primary/20 text-primary-fixed-dim rounded-full type-label border border-primary/30 mb-md">
            <span className="material-symbols-outlined text-sm">cookie</span>
            Cookies
          </div>
          <h1 className="type-display font-bold text-white mb-sm">Política de Cookies</h1>
          <p className="type-body text-surface-variant/70">Última actualización: enero 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-2xl">
        <div className="container-page max-w-4xl">
          <div className="space-y-xl">

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">¿Qué son las Cookies?</h2>
              <p className="type-body text-on-surface-variant leading-relaxed">
                Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo cuando los visita. Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente, mejorar la experiencia de navegación y proporcionar información a los propietarios del sitio.
              </p>
            </div>

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">Tipos de Cookies que Utilizamos</h2>

              <div className="space-y-md">

                <div className="bg-surface rounded-2xl p-md border border-outline/20">
                  <div className="flex items-center gap-sm mb-sm">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
                    </div>
                    <div>
                      <h3 className="type-label font-semibold text-on-surface">Cookies Estrictamente Necesarias</h3>
                      <span className="type-label text-primary">Siempre activas</span>
                    </div>
                  </div>
                  <p className="type-body text-on-surface-variant leading-relaxed">
                    Estas cookies son imprescindibles para el funcionamiento básico del sitio web. Permiten la navegación segura, la gestión de sesiones y el acceso a áreas protegidas. No recopilan información personal identificable y no pueden ser desactivadas.
                  </p>
                  <div className="mt-sm flex flex-wrap gap-xs">
                    {['Sesión de usuario', 'Seguridad CSRF', 'Preferencias de idioma'].map(tag => (
                      <span key={tag} className="px-sm py-xs bg-primary/10 text-primary rounded-full type-label text-xs">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-surface rounded-2xl p-md border border-outline/20">
                  <div className="flex items-center gap-sm mb-sm">
                    <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bar_chart</span>
                    </div>
                    <div>
                      <h3 className="type-label font-semibold text-on-surface">Cookies Analíticas</h3>
                      <span className="type-label text-on-surface-variant">Opcionales</span>
                    </div>
                  </div>
                  <p className="type-body text-on-surface-variant leading-relaxed">
                    Nos permiten contar las visitas y conocer las fuentes de tráfico para medir y mejorar el rendimiento del sitio. Toda la información que recopilan estas cookies es agregada y, por lo tanto, anónima.
                  </p>
                  <div className="mt-sm flex flex-wrap gap-xs">
                    {['Google Analytics', 'Páginas visitadas', 'Tiempo en página'].map(tag => (
                      <span key={tag} className="px-sm py-xs bg-secondary/10 text-secondary rounded-full type-label text-xs">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-surface rounded-2xl p-md border border-outline/20">
                  <div className="flex items-center gap-sm mb-sm">
                    <div className="w-8 h-8 bg-tertiary/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>tune</span>
                    </div>
                    <div>
                      <h3 className="type-label font-semibold text-on-surface">Cookies Funcionales</h3>
                      <span className="type-label text-on-surface-variant">Opcionales</span>
                    </div>
                  </div>
                  <p className="type-body text-on-surface-variant leading-relaxed">
                    Permiten que el sitio recuerde las elecciones que usted hace (como su nombre de usuario, idioma o región) y proporcionen funcionalidades mejoradas y más personales.
                  </p>
                  <div className="mt-sm flex flex-wrap gap-xs">
                    {['Preferencias de visualización', 'Formularios guardados', 'Historial de búsqueda'].map(tag => (
                      <span key={tag} className="px-sm py-xs bg-tertiary/10 text-tertiary rounded-full type-label text-xs">{tag}</span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">Cookies de Terceros</h2>
              <p className="type-body text-on-surface-variant leading-relaxed mb-md">
                Algunas páginas de nuestro sitio pueden contener contenido de terceros (como videos embebidos o mapas) que establecen sus propias cookies. No tenemos control sobre estas cookies. A continuación se listan los principales proveedores de terceros:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full type-body text-on-surface-variant">
                  <thead>
                    <tr className="border-b border-outline/20">
                      <th className="text-left py-sm pr-md font-semibold text-on-surface">Proveedor</th>
                      <th className="text-left py-sm pr-md font-semibold text-on-surface">Propósito</th>
                      <th className="text-left py-sm font-semibold text-on-surface">Tipo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline/10">
                    <tr>
                      <td className="py-sm pr-md">Google Analytics</td>
                      <td className="py-sm pr-md">Análisis de tráfico web</td>
                      <td className="py-sm"><span className="px-sm py-xs bg-secondary/10 text-secondary rounded-full type-label text-xs">Analítica</span></td>
                    </tr>
                    <tr>
                      <td className="py-sm pr-md">Google Maps</td>
                      <td className="py-sm pr-md">Mostrar ubicación del centro</td>
                      <td className="py-sm"><span className="px-sm py-xs bg-tertiary/10 text-tertiary rounded-full type-label text-xs">Funcional</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">Gestión y Control de Cookies</h2>
              <p className="type-body text-on-surface-variant leading-relaxed mb-md">
                Usted puede controlar y/o eliminar las cookies según su preferencia. Puede eliminar todas las cookies que ya están en su dispositivo y configurar la mayoría de los navegadores para que no las acepten.
              </p>
              <p className="type-body text-on-surface-variant leading-relaxed mb-md">
                Instrucciones para gestionar cookies en los principales navegadores:
              </p>
              <ul className="space-y-xs">
                {[
                  { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                  { name: 'Mozilla Firefox', url: 'https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias' },
                  { name: 'Safari', url: 'https://support.apple.com/es-mx/guide/safari/sfri11471/mac' },
                  { name: 'Microsoft Edge', url: 'https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies' },
                ].map(({ name, url }) => (
                  <li key={name} className="flex items-center gap-sm type-body text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-sm">open_in_new</span>
                    <a className="text-primary hover:underline" href={url} target="_blank" rel="noopener noreferrer">{name}</a>
                  </li>
                ))}
              </ul>
              <p className="type-body text-on-surface-variant leading-relaxed mt-md">
                Tenga en cuenta que si desactiva o rechaza las cookies, algunas partes del sitio web podrían volverse inaccesibles o no funcionar correctamente.
              </p>
            </div>

            <div className="bg-surface-container rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">Actualizaciones de esta Política</h2>
              <p className="type-body text-on-surface-variant leading-relaxed">
                Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en las cookies que utilizamos o por otras razones operativas, legales o reglamentarias. Le recomendamos que revise esta página regularmente para estar informado sobre el uso de cookies en nuestro sitio.
              </p>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-3xl p-xl">
              <h2 className="type-headline font-semibold text-on-surface mb-md">Más Información</h2>
              <p className="type-body text-on-surface-variant leading-relaxed mb-md">
                Si tiene alguna pregunta sobre el uso de cookies en nuestro sitio, puede contactarnos:
              </p>
              <ul className="space-y-sm">
                <li className="flex items-center gap-sm type-body text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-sm">email</span>
                  <a className="text-primary hover:underline" href="mailto:info@auramedical.com">info@auramedical.com</a>
                </li>
                <li className="flex items-center gap-sm type-body text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-sm">description</span>
                  <a className="text-primary hover:underline" href="/privacidad">Consultar nuestra Política de Privacidad</a>
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
