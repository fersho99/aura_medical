/** Cabecera principal — sticky, glass-panel, con SearchBar y modal de cita */

import AgendarCitaModal from '@/components/AgendarCitaModal'
import SearchBar from '@/components/SearchBar'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface/80 light:bg-on-background/70 backdrop-blur-md shadow-sm shadow-secondary/5 transition-all duration-300 border-b border-outline-variant/20">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto h-20">

        {/* Brand */}
        <a href="/" className="flex items-center gap-sm shrink-0">
          <span
            className="material-symbols-outlined text-primary text-[28px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_hospital
          </span>
          <span className="font-display-lg-mobile text-display-lg-mobile tracking-tighter text-primary dark:text-primary-fixed-dim">
            AURA MEDICAL
          </span>
        </a>

        {/* Navegación escritorio */}
        <nav className="hidden md:flex items-center gap-md">
          <a className="nav-link" href="/especialidades">Especialidades</a>
          <a className="nav-link" href="/unidades">Unidades</a>
          <a className="nav-link" href="/directorio">Directorio</a>
          <a className="nav-link" href="/noticias">Noticias</a>
        </nav>

        {/* Acciones */}
        <div className="hidden md:flex items-center gap-sm shrink-0">
          {/* Buscar Médico — barra expandible */}
          <SearchBar />

          {/* Agendar Cita — modal */}
          <AgendarCitaModal />
        </div>

        {/* Menú móvil */}
        <button className="md:hidden text-primary p-xs rounded-full hover:bg-primary/5">
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>
      </div>
    </header>
  );
}
