/** Página: Artículo interior de noticias — ruta dinámica /noticias/[slug] */

import { notFound } from 'next/navigation'
import { noticias, getNoticiaBySlug } from '@/lib/noticias-data'
import NewsletterForm from '@/components/NewsletterForm'

export async function generateStaticParams() {
  return noticias.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const noticia = getNoticiaBySlug(slug)
  if (!noticia) return {}
  return {
    title: `${noticia.title} | Aura Medical`,
    description: noticia.excerpt,
  }
}

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const noticia = getNoticiaBySlug(slug)

  if (!noticia) notFound()

  const relacionadas = noticias.filter((n) => n.slug !== slug).slice(0, 2)

  const paragraphs = noticia.content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

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
              <span className="text-primary font-medium truncate max-w-[200px]">{noticia.title}</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero imagen */}
      <div className="w-full h-72 md:h-96 relative overflow-hidden">
        <img
          src={noticia.imageUrl}
          alt={noticia.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-on-background/80 via-on-background/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full container-page pb-lg">
          <span className={`inline-flex items-center px-sm py-xs rounded-full type-label border text-xs mb-sm ${noticia.categoryColor}`}>
            {noticia.category}
          </span>
          <h1 className="type-display text-on-primary drop-shadow-md max-w-3xl">{noticia.title}</h1>
        </div>
      </div>

      {/* Meta + Contenido */}
      <div className="container-page py-xl max-w-3xl">

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-md text-on-surface-variant type-label mb-xl border-b border-outline-variant/30 pb-md">
          <span className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            {noticia.date}
          </span>
          <span className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            {noticia.readTime} de lectura
          </span>
          <span className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">person</span>
            {noticia.author} · {noticia.authorRole}
          </span>
        </div>

        {/* Cuerpo del artículo */}
        <article className="prose-aura">
          {paragraphs.map((line, i) => {
            if (line.startsWith('## ')) {
              return (
                <h2 key={i} className="type-headline text-on-surface mt-xl mb-md">
                  {line.replace('## ', '')}
                </h2>
              )
            }
            if (line.startsWith('### ')) {
              return (
                <h3 key={i} className="type-body-lg font-semibold text-on-surface mt-lg mb-sm">
                  {line.replace('### ', '')}
                </h3>
              )
            }
            if (line.startsWith('- ')) {
              return (
                <li key={i} className="type-body text-on-surface-variant flex items-start gap-sm mb-sm">
                  <span className="material-symbols-outlined text-primary text-[16px] mt-0.5 shrink-0">check_circle</span>
                  <span dangerouslySetInnerHTML={{ __html: line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </li>
              )
            }
            return (
              <p
                key={i}
                className="type-body text-on-surface-variant mb-md leading-relaxed"
                dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-on-surface font-semibold">$1</strong>') }}
              />
            )
          })}
        </article>

        {/* Volver */}
        <div className="mt-xl pt-lg border-t border-outline-variant/30">
          <a href="/noticias" className="btn-outline inline-flex items-center gap-sm">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Volver a Noticias
          </a>
        </div>
      </div>

      {/* Artículos relacionados */}
      {relacionadas.length > 0 && (
        <section className="bg-surface-container-low border-t border-outline-variant/20 py-xl">
          <div className="container-page">
            <h2 className="type-headline text-on-surface mb-lg">Otras noticias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {relacionadas.map((rel) => (
                <a
                  key={rel.id}
                  href={`/noticias/${rel.slug}`}
                  className="flex gap-md bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className="w-28 h-28 shrink-0 overflow-hidden">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-sm flex flex-col justify-center">
                    <span className={`type-label text-xs mb-xs ${rel.categoryColor.split(' ')[0]}`}>{rel.category}</span>
                    <p className="type-body font-semibold text-on-surface leading-snug line-clamp-2">{rel.title}</p>
                    <span className="type-label text-on-surface-variant mt-xs">{rel.readTime} de lectura</span>
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
          <p className="type-body text-on-surface-variant mb-md">
            Suscríbete para estar al tanto de los avances, nuevos especialistas y programas de Aura Medical.
          </p>
          <NewsletterForm />
        </div>
      </section>

    </main>
  )
}
