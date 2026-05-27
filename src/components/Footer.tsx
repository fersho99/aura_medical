export default function Footer() {
  return (
    <footer className="w-full bg-on-background border-t border-outline/10">
      <div className="container-page py-xl">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-xl mb-xl">

          {/* ── Brand ──────────────────────────────────────────────────────── */}
          <div className="md:col-span-4 flex flex-col gap-md">
            <a href="/" className="flex items-center gap-sm">
              <span
                className="material-symbols-outlined text-primary-fixed text-[32px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_hospital
              </span>
              <span className="type-display tracking-tighter text-surface-bright">
                AURA MEDICAL
              </span>
            </a>

            <p className="type-body text-surface-variant/70">
              Redefiniendo los estándares de la medicina privada a través de la excelencia clínica, tecnología avanzada y un trato verdaderamente humano.
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/526531332053?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Aura%20Medical."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-sm text-[#25D366] hover:text-[#1ebd5b] transition-colors type-label w-fit"
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.532 5.854L.054 23.554a.75.75 0 0 0 .916.916l5.7-1.478A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.985 0-3.842-.58-5.407-1.582l-.385-.242-4 1.037 1.037-4-.242-.385A9.951 9.951 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Escríbenos por WhatsApp
            </a>

            {/* Redes sociales */}
            <div className="flex items-center gap-md mt-xs">

              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="text-surface-variant/50 hover:text-primary-fixed transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="text-surface-variant/50 hover:text-primary-fixed transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="text-surface-variant/50 hover:text-primary-fixed transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="text-surface-variant/50 hover:text-primary-fixed transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

            </div>
          </div>

          {/* ── Especialidades ─────────────────────────────────────────────── */}
          <div className="md:col-span-3 flex flex-col gap-sm">
            <h4 className="footer-heading">Especialidades</h4>
            <a className="footer-link" href="/especialidades/cardiologia">Cardiología Avanzada</a>
            <a className="footer-link" href="/especialidades/neurologia">Neurociencias Clínicas</a>
            <a className="footer-link" href="/especialidades/oncologia">Oncología Integral</a>
            <a className="footer-link" href="/especialidades/pediatria">Pediatría</a>
            <a className="footer-link" href="/directorio">Directorio Médico</a>
            <a className="footer-link" href="/noticias">Noticias</a>
          </div>

          {/* ── Urgencias y Contacto ───────────────────────────────────────── */}
          <div className="md:col-span-5 flex flex-col gap-sm">
            <h4 className="footer-heading">Urgencias y Contacto</h4>

            {/* Urgencias */}
            <div className="bg-surface-variant/10 p-md rounded-xl border border-surface-variant/20 mb-sm">
              <div className="flex items-center gap-sm text-error-container mb-xs">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  emergency
                </span>
                <span className="type-label font-bold">Urgencias 24/7</span>
              </div>
              <a href="tel:911" className="type-headline text-surface-bright hover:text-primary-fixed transition-colors">
                911
              </a>
            </div>

            {/* Datos de contacto */}
            <p className="type-body text-surface-variant/70 flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              Av. de la Innovación 45, Chihuahua, México
            </p>
            <a
              href="mailto:info@auramedical.com"
              className="type-body text-surface-variant/70 hover:text-primary-fixed transition-colors flex items-center gap-xs"
            >
              <span className="material-symbols-outlined text-[16px]">mail</span>
              info@auramedical.com
            </a>
            <a
              href="https://wa.me/526531332053?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="type-body text-[#25D366] hover:text-[#1ebd5b] transition-colors flex items-center gap-xs"
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.532 5.854L.054 23.554a.75.75 0 0 0 .916.916l5.7-1.478A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.985 0-3.842-.58-5.407-1.582l-.385-.242-4 1.037 1.037-4-.242-.385A9.951 9.951 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              +52 653 133 2053
            </a>
          </div>

        </div>

        {/* ── Barra inferior ─────────────────────────────────────────────── */}
        <div className="pt-lg border-t border-surface-variant/20 flex flex-col md:flex-row justify-between items-center gap-md">
          <p className="type-label text-surface-variant/50">
            © 2026 Aura Medical Private Clinic. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-md">
            <a className="footer-link-sm" href="#">Aviso Legal</a>
            <a className="footer-link-sm" href="#">Política de Privacidad</a>
            <a className="footer-link-sm" href="#">Política de Cookies</a>
            <div className="flex items-center gap-xs text-surface-variant/30 ml-md">
              <span className="material-symbols-outlined text-[20px]">verified</span>
              <span className="type-label">ISO 9001 | JCI Accredited</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
