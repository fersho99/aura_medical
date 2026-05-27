'use client'

/** Barra de búsqueda de médicos — se expande al hacer clic y navega a /directorio?q= */

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [expanded, setExpanded] = useState(false)
  const [query,    setQuery]    = useState('')
  const inputRef               = useRef<HTMLInputElement>(null)
  const router                 = useRouter()

  // Enfocar el input al expandir
  useEffect(() => {
    if (expanded) inputRef.current?.focus()
  }, [expanded])

  // Cerrar al hacer click fuera
  useEffect(() => {
    if (!expanded) return
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-searchbar]')) {
        setExpanded(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [expanded])

  function submit() {
    const q = query.trim().slice(0, 100)
    if (q) {
      router.push(`/directorio?q=${encodeURIComponent(q)}`)
      setExpanded(false)
      setQuery('')
    } else {
      router.push('/directorio')
      setExpanded(false)
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') submit()
    if (e.key === 'Escape') { setExpanded(false); setQuery('') }
  }

  return (
    <div data-searchbar className="relative flex items-center">
      {expanded ? (
        <div className="flex items-center gap-xs bg-surface border border-outline-variant rounded-full px-sm py-xs focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all shadow-sm">
          <span className="material-symbols-outlined text-[18px] text-primary shrink-0">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value.slice(0, 100))}
            onKeyDown={onKeyDown}
            placeholder="Nombre, especialidad..."
            maxLength={100}
            autoComplete="off"
            className="w-44 bg-transparent border-none focus:outline-none text-on-surface type-body text-sm placeholder:text-outline"
          />
          <button
            onClick={submit}
            aria-label="Buscar médico"
            className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          aria-label="Buscar médico"
          className="font-label-sm text-label-sm text-on-surface-variant border border-outline-variant hover:text-primary hover:border-primary hover:bg-primary/5 px-md py-sm rounded-full transition-all flex items-center gap-xs"
        >
          <span className="material-symbols-outlined text-[18px]">search</span>
          Buscar Médico
        </button>
      )}
    </div>
  )
}
