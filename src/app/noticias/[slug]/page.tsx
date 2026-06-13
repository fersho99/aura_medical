/** Página: Artículo interior de noticias — ruta dinámica /noticias/[slug] */

import { notFound } from 'next/navigation'
import { getNoticiaBySlug, getNoticias } from '@/lib/contenido'
import NewsletterForm from '@/components/NewsletterForm'

export async function generateStaticParams() {
  const noticias = await getNoticias()
  return noticias.map(n => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const noticia = await getNoticiaBySlug(slug)
  if (!noticia) return {}
  return {
    title: `${noticia.titulo} | Aura Medical`,
    description: noticia.titulo,
  }
}

function formatFecha(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const noticia = await getNoticiaBySlug(slug)

  if (!noticia) notFound()

  // Noticias relacionadas (las 2 más recientes, excluyendo la actual)
  const todas = await getNoticias()
  const relacionadas = todas.filter(n => n.slug !== slug).slice(0, 2)

  return (
    <main className="flex flex-col min-h-screen bg-surface">

      {/* Breadcrumbs */}
      <div className="container-page py-sm">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-xs type-label text-on-surface-variant flex-wrap">
            <li><a className="hover:text-primary transition-colors" href="/">Inicio</a></li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <a className="hover:text-primary transition-colors" href="/noticias">Noticias</a>
            </li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-primary font-medium truncate max-w-xs">{noticia.titulo}</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero de la noticia */}
      {noticia.imagen_url && (
        <div className="w-full h-[45vh] min-h-64 overflow-hidden relative">
          <img alt={noticia.titulo} src={noticia.imagen_url}
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-on-background/70 to-transparent" />
        </div>
      )}

      {/* Artículo */}
      <article className="max-w-3xl mx-auto w-full px-margin-mobile md:px-margin-desktop py-xl flex flex-col gap-lg">

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-sm">
          {noticia.categoria && (
            <span className="inline-flex items-center px-sm py-xs rounded-full type-label border text-xs bg-primary/10 text-primary border-primary/20">
              {noticia.categoria}
            </span>
          )}
          <span className="type-label text-on-surface-variant">{formatFecha(noticia.fecha_publicacion)}</span>
          {noticia.autor && (
            <span className="type-label text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[14px]">person</span>
              {noticia.autor}
            </span>
          )}
        </div>

        {/* Título */}
        <h1 className="type-display text-on-surface">{noticia.titulo}</h1>

        {/* Contenido HTML de TipTap */}
        <div
          className="prose-noticia text-on-surface-variant"
          dangerouslySetInnerHTML={{ __html: noticia.contenido }}
        />

        {/* Volver */}
        <div className="pt-lg border-t border-outline-variant/30">
          <a href="/noticias"
            className="inline-flex items-center gap-sm type-label text-primary hover:text-primary-container transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Volver a Noticias
          </a>
        </div>
      </article>

      {/* Relacionadas */}
      {relacionadas.length > 0 && (
        <section className="bg-surface-container-low border-t border-outline-variant/20 py-xl px-margin-mobile md:px-margin-desktop">
          <div className="max-w-7xl mx-auto">
            <h2 className="type-headline text-on-surface mb-lg">Más noticias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {relacionadas.map(n => (
                <a key={n.id} href={`/noticias/${n.slug}`}
                  className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex gap-md p-md items-start group">
                  {n.imagen_url && (
                    <img alt={n.titulo} src={n.imagen_url}
                      className="w-24 h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300" />
                  )}
                  <div className="flex flex-col gap-xs flex-1 min-w-0">
                    {n.categoria && (
                      <span className="type-label text-primary text-xs">{n.categoria}</span>
                    )}
                    <h3 className="type-body text-on-surface font-semibold leading-snug line-clamp-2">{n.titulo}</h3>
                    <span className="type-label text-on-surface-variant text-xs">{formatFecha(n.fecha_publicacion)}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="border-t border-outline-variant/30 bg-surface py-xl px-margin-mobile md:px-margin-desktop">
        <div className="max-w-2xl mx-auto text-center">
          <span className="material-symbols-outlined text-primary text-[40px] mb-sm block" style={{ fontVariationSettings: "'FILL' 1" }}>mark_email_read</span>
          <h2 className="type-headline text-on-surface mb-xs">Recibe noticias en tu correo</h2>
          <p className="type-body text-on-surface-variant mb-md">Suscríbete para estar al tanto de los avances de Aura Medical.</p>
          <NewsletterForm />
        </div>
      </section>

    </main>
  )
}
