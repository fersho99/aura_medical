/** Página: Noticias — Blog y actualidades de Aura Medical */

import { getNoticias, getContenido } from '@/lib/contenido'
import NewsletterForm from '@/components/NewsletterForm'

export const metadata = {
  title: 'Noticias y Actualidades | Aura Medical',
  description: 'Últimas noticias, avances médicos y eventos de Aura Medical Private Clinic. Mantente informado sobre salud y bienestar.',
}

const CATEGORIA_COLORS: Record<string, string> = {
  'Innovación':   'bg-teal-500/10 text-teal-600 border-teal-500/30',
  'Salud':        'bg-green-500/10 text-green-600 border-green-500/30',
  'Tecnología':   'bg-blue-500/10 text-blue-600 border-blue-500/30',
  'Investigación':'bg-purple-500/10 text-purple-600 border-purple-500/30',
  'Comunidad':    'bg-orange-500/10 text-orange-600 border-orange-500/30',
  'Institucional':'bg-gray-500/10 text-gray-600 border-gray-500/30',
}

function formatFecha(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function NoticiasPage() {
  const [noticias, contenido] = await Promise.all([getNoticias(), getContenido()])
  const nh = contenido.noticias_hero ?? {}

  return (
    <main className="flex flex-col min-h-screen bg-surface">

      {/* Breadcrumbs */}
      <div className="container-page py-sm">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-xs type-label text-on-surface-variant">
            <li><a className="hover:text-primary transition-colors" href="/">Inicio</a></li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-primary font-medium">Noticias</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-surface-container-lowest border-b border-outline-variant/30 py-lg px-margin-mobile md:px-margin-desktop relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-primary-container/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-xs bg-primary/10 border border-primary/20 rounded-full px-sm py-xs type-label text-primary mb-sm">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>newspaper</span>
            {nh.badge || 'Noticias Institucionales'}
          </div>
          <h1 className="type-display text-on-surface mb-sm">{nh.titulo || 'Actualidad en Aura Medical'}</h1>
          <p className="type-body-lg text-on-surface-variant max-w-2xl">
            {nh.subtitulo || 'Avances tecnológicos, reconocimientos a nuestros especialistas y novedades del hospital que nos mantienen a la vanguardia de la medicina privada.'}
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="max-w-7xl mx-auto w-full px-margin-mobile md:px-margin-desktop py-xl grow">
        {noticias.length === 0 ? (
          <div className="text-center py-xl text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px] block mb-sm">newspaper</span>
            <p className="type-headline">No hay noticias publicadas aún</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {noticias.map(noticia => (
              <a key={noticia.id} href={`/noticias/${noticia.slug}`}
                className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group">

                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-surface-container">
                  {noticia.imagen_url ? (
                    <img alt={noticia.titulo} src={noticia.imagen_url}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-[48px]">newspaper</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-on-background/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-md flex flex-col gap-sm flex-1">
                  <div className="flex items-center justify-between">
                    {noticia.categoria ? (
                      <span className={`inline-flex items-center px-xs py-0.5 rounded-full type-label border text-xs ${CATEGORIA_COLORS[noticia.categoria] ?? 'bg-teal-500/10 text-teal-600 border-teal-500/30'}`}>
                        {noticia.categoria}
                      </span>
                    ) : <span />}
                    {noticia.autor && (
                      <span className="type-label text-on-surface-variant text-xs truncate max-w-28">{noticia.autor}</span>
                    )}
                  </div>

                  <div>
                    <p className="type-label text-on-surface-variant mb-xs">{formatFecha(noticia.fecha_publicacion)}</p>
                    <h2 className="type-headline text-on-surface leading-snug">{noticia.titulo}</h2>
                  </div>

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
        )}
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
  )
}
