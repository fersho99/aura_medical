'use client'

/** Cabecera principal — sticky, glass-panel, con SearchBar y modal de cita */

import { useState, useEffect } from 'react'
import AgendarCitaModal from '@/components/AgendarCitaModal'
import SearchBar from '@/components/SearchBar'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-surface/80 light:bg-on-background/70 backdrop-blur-md shadow-sm shadow-secondary/5 transition-all duration-300 border-b border-outline-variant/20">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto h-20">

        {/* Brand */}
        <a href="/" className="flex items-center gap-sm shrink-0" onClick={() => setMenuOpen(false)}>
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
          <a className="nav-link" href="/nosotros">Nosotros</a>
          <a className="nav-link" href="/contacto">Contacto</a>
        </nav>

        {/* Acciones escritorio */}
        <div className="hidden md:flex items-center gap-sm shrink-0">
          <SearchBar />
          <AgendarCitaModal />
        </div>

        {/* Botón menú móvil */}
        <button
          className="md:hidden text-primary p-xs rounded-full hover:bg-primary/5 transition-colors"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span className="material-symbols-outlined text-[24px]">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Menú desplegable móvil */}
      {menuOpen && (
        <nav
          className="md:hidden bg-surface/95 backdrop-blur-md border-t border-outline-variant/20 px-margin-mobile py-md flex flex-col gap-xs shadow-lg"
          aria-label="Navegación móvil"
        >
          <a className="nav-link py-sm text-base" href="/especialidades" onClick={() => setMenuOpen(false)}>Especialidades</a>
          <a className="nav-link py-sm text-base" href="/unidades" onClick={() => setMenuOpen(false)}>Unidades</a>
          <a className="nav-link py-sm text-base" href="/directorio" onClick={() => setMenuOpen(false)}>Directorio</a>
          <a className="nav-link py-sm text-base" href="/noticias" onClick={() => setMenuOpen(false)}>Noticias</a>
          <a className="nav-link py-sm text-base" href="/nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
          <a className="nav-link py-sm text-base" href="/contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
          <div className="mt-sm pt-sm border-t border-outline-variant/20" onClick={() => setMenuOpen(false)}>
            <AgendarCitaModal
              triggerClassName="btn-primary w-full justify-center"
            />
          </div>
        </nav>
      )}
    </header>
  )
}
