import Link from 'next/link'

export default function Forbidden() {
  return (
    <div className="flex-1 flex items-center justify-center bg-surface px-margin-mobile md:px-margin-desktop py-xl">
      <div className="text-center max-w-2xl mx-auto">

        {/* Número decorativo */}
        <div
          className="text-[160px] md:text-[220px] font-black leading-none text-primary/10 select-none"
          aria-hidden="true"
        >
          403
        </div>

        {/* Ícono + Contenido */}
        <div className="-mt-8 md:-mt-12 flex flex-col items-center gap-md">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-primary text-[32px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lock
            </span>
          </div>

          <div>
            <h1 className="type-display text-on-surface mb-sm">
              Acceso restringido
            </h1>
            <p className="type-body-lg text-on-surface-variant max-w-2xl mx-auto">
              No tienes permisos para acceder a esta sección.
              Si crees que esto es un error, contacta al administrador del sistema.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-sm justify-center mt-sm">
            <Link href="/" className="btn-primary">
              <span className="material-symbols-outlined text-[18px]">home</span>
              Ir al inicio
            </Link>
            <Link href="/contacto" className="btn-outline">
              <span className="material-symbols-outlined text-[18px]">contact_support</span>
              Contactar soporte
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}