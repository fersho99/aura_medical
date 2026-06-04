/** Página: Noticias — Blog y actualidades de Aura Medical */


export const metadata = {
  title: 'Noticias y Actualidades | Aura Medical',
  description: 'Últimas noticias, avances médicos y eventos de Aura Medical Private Clinic. Mantente informado sobre salud y bienestar.',
}

import NewsletterForm from '@/components/NewsletterForm'
import { noticias } from '@/lib/noticias-data'

export default function NoticiasPage() {
  return (
    <main className="flex flex-col min-h-screen bg-surface">

      {/* Breadcrumbs */}
      <div className="container-page py-sm">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-xs type-label text-on-surface-variant">
            <li>
              <a className="hover:text-primary transition-colors" href="/">Inicio</a>
            </li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-primary font-medium">Noticias</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-surface-container-lowest border-b border-outline-variant/30 py-lg px-margin-mobile md:px-margin-desktop relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-primary-container/10 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-xs bg-primary/10 border border-primary/20 rounded-full px-sm py-xs type-label text-primary mb-sm">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>newspaper</span>
            Noticias Institucionales
          </div>
          <h1 className="type-display text-on-surface mb-sm">Actualidad en Aura Medical</h1>
          <p className="type-body-lg text-on-surface-variant max-w-2xl">
            Avances tecnológicos, reconocimientos a nuestros especialistas y novedades del hospital que nos mantienen a la vanguardia de la medicina privada.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="max-w-7xl mx-auto w-full px-margin-mobile md:px-margin-desktop py-xl grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {noticias.map((noticia) => (
            <a
              key={noticia.id}
              href={`/noticias/${noticia.slug}`}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  alt={noticia.title}
                  src={noticia.imageUrl}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-on-background/40 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-md flex flex-col gap-sm flex-1">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-xs py-0.5 rounded-full type-label border text-xs ${noticia.categoryColor}`}>
                    {noticia.category}
                  </span>
                  <span className="type-label text-on-surface-variant flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    {noticia.readTime}
                  </span>
                </div>

                <div>
                  <p className="type-label text-on-surface-variant mb-xs">{noticia.date}</p>
                  <h2 className="type-headline text-on-surface leading-snug">{noticia.title}</h2>
                </div>

                <p className="type-body text-on-surface-variant flex-1">{noticia.excerpt}</p>

                <div className="pt-sm border-t border-outline-variant/30 mt-auto flex items-center justify-between">
                  <span className="type-label text-primary font-semibold flex items-center gap-xs group-hover:gap-sm transition-all">
                    Leer artículo
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-outline-variant/30 bg-surface-container-low py-xl px-margin-mobile md:px-margin-desktop">
        <div className="max-w-2xl mx-auto text-center">
          <span className="material-symbols-outlined text-primary text-[40px] mb-sm block" style={{ fontVariationSettings: "'FILL' 1" }}>mark_email_read</span>
          <h2 className="type-headline text-on-surface mb-xs">Recibe noticias en tu correo</h2>
          <p className="type-body text-on-surface-variant mb-md">
            Suscríbete para estar al tanto de los avances, nuevos especialistas y programas de Aura Medical.
          </p>
          <NewsletterForm />
        </div>
      </section>

    </main>
  );
}
