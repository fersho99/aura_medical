import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center bg-surface px-margin-mobile md:px-margin-desktop py-xl">
      <div className="text-center max-w-2xl mx-auto">

        {/* Número decorativo */}
        <div
          className="text-[160px] md:text-[220px] font-black leading-none text-primary/10 select-none"
          aria-hidden="true"
        >
          404
        </div>

        {/* Ícono + Contenido */}
        <div className="-mt-8 md:-mt-12 flex flex-col items-center gap-md">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-primary text-[32px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              search_off
            </span>
          </div>

          <div>
            <h1 className="type-display text-on-surface mb-sm">
              Página no encontrada
            </h1>
            <p className="type-body-lg text-on-surface-variant max-w-2xl mx-auto">
              La página que buscas no existe o fue movida.
              Verifica la URL o regresa al inicio.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-sm justify-center mt-sm">
            <Link href="/" className="btn-primary">
              <span className="material-symbols-outlined text-[18px]">home</span>
              Ir al inicio
            </Link>
            <Link href="/directorio" className="btn-outline">
              <span className="material-symbols-outlined text-[18px]">people</span>
              Ver directorio médico
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
