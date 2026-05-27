"use client";

/** Página: Directorio Médico — búsqueda y filtros sincronizados con URL */

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

// ─── Data (module-level) ──────────────────────────────────────────────────────

const doctorsList = [
  {
    id: "alejandro-vargas",
    name: "Dr. Alejandro Vargas",
    specialty: "Neurología Clínica",
    rating: 5.0,
    reviewCount: 120,
    location: "Torre Norte · Consultorio 402",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&auto=format&fit=crop",
    color: "primary",
    whatsappNumber: "526531332053",
  },
  {
    id: "elena-montes",
    name: "Dra. Elena Montes",
    specialty: "Cardiología Intervencionista",
    rating: 4.5,
    reviewCount: 85,
    location: "Torre Sur · Consultorio 110",
    imageUrl: "https://images.unsplash.com/photo-1594824436998-d40b243c158b?q=80&w=150&auto=format&fit=crop",
    color: "primary",
    whatsappNumber: "526531332053",
  },
  {
    id: "marcos-torres",
    name: "Dr. Marcos Torres",
    specialty: "Cirugía General y Robótica",
    rating: 4.0,
    reviewCount: 67,
    location: "Bloque Quirúrgico · Piso 4",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=150&auto=format&fit=crop",
    color: "primary",
    whatsappNumber: "526531332053",
  },
  {
    id: "sofia-valerio",
    name: "Dra. Sofía Valerio",
    specialty: "Medicina Interna",
    rating: 4.5,
    reviewCount: 93,
    location: "UCI · Piso 7",
    imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=150&auto=format&fit=crop",
    color: "secondary",
    whatsappNumber: "526531332053",
  },
]

// ─── DirectorioContent — reads URL params (must be inside Suspense) ───────────

function DirectorioContent() {
  const searchParams    = useSearchParams()
  const router          = useRouter()
  const pathname        = usePathname()
  const debounceRef     = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [searchTerm,        setSearchTerm]        = useState(() => searchParams.get('q') ?? '')
  const [activeSpecialties, setActiveSpecialties] = useState<string[]>(() => searchParams.getAll('especialidad'))

  // Sync state when URL changes (browser back/forward)
  useEffect(() => {
    setSearchTerm(searchParams.get('q') ?? '')
    setActiveSpecialties(searchParams.getAll('especialidad'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()])

  function pushURL(q: string, specs: string[]) {
    const params = new URLSearchParams()
    const safe   = q.trim().slice(0, 100)
    if (safe) params.set('q', safe)
    specs.forEach(s => params.append('especialidad', s))
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false })
  }

  function handleSearch(val: string) {
    const trimmed = val.slice(0, 100)
    setSearchTerm(trimmed)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => pushURL(trimmed, activeSpecialties), 300)
  }

  function toggleSpecialty(spec: string) {
    const next = activeSpecialties.includes(spec)
      ? activeSpecialties.filter(s => s !== spec)
      : [...activeSpecialties, spec]
    setActiveSpecialties(next)
    pushURL(searchTerm, next)
  }

  function clearFilters() {
    setSearchTerm('')
    setActiveSpecialties([])
    router.push(pathname, { scroll: false })
  }

  const filteredDoctors = doctorsList.filter(doctor => {
    const q = searchTerm.toLowerCase()
    const matchesSearch    = doctor.name.toLowerCase().includes(q) || doctor.specialty.toLowerCase().includes(q)
    const matchesSpecialty = activeSpecialties.length === 0 || activeSpecialties.some(s => doctor.specialty.includes(s))
    return matchesSearch && matchesSpecialty
  })

  return (
    <main className="flex flex-col min-h-screen bg-surface">

      {/* Breadcrumbs */}
      <div className="container-page py-sm">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-xs type-label text-on-surface-variant">
            <li><a className="hover:text-primary transition-colors" href="/">Inicio</a></li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-primary font-medium">Directorio Médico</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Search Hero */}
      <section className="bg-surface-container-lowest border-b border-outline-variant/30 py-lg px-margin-mobile md:px-margin-desktop relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary-container/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <h1 className="type-display text-on-surface mb-md">Encuentre a su Especialista</h1>

          {/* Search Bar */}
          <div className="w-full max-w-3xl relative mb-md">
            <div className="glass-panel rounded-2xl flex items-center p-xs shadow-md shadow-primary/5 focus-within:ring-2 focus-within:ring-primary transition-all bg-surface/80 backdrop-blur-md border border-outline-variant/30">
              <span className="material-symbols-outlined text-outline ml-md mr-sm shrink-0">search</span>
              <input
                type="text"
                value={searchTerm}
                onChange={e => handleSearch(e.target.value)}
                maxLength={100}
                autoComplete="off"
                className="grow bg-transparent border-none focus:outline-none text-on-surface type-body-lg placeholder:text-outline h-14 w-full"
                placeholder="Buscar por nombre, especialidad o padecimiento..."
              />
              <button
                onClick={() => pushURL(searchTerm, activeSpecialties)}
                className="h-14 px-lg rounded-xl bg-primary text-on-primary type-label font-semibold hover:bg-primary/90 transition-all shadow-sm shrink-0 flex items-center gap-xs emerald-glow"
              >
                <span>Buscar</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap justify-center gap-sm">
            {['Cardiología', 'Neurología', 'Pediatría', 'Oncología'].map(spec => (
              <button
                key={spec}
                onClick={() => toggleSpecialty(spec)}
                className={`px-md py-xs rounded-full border type-label transition-colors ${
                  activeSpecialties.includes(spec)
                    ? 'bg-primary text-on-primary border-primary'
                    : 'border-outline-variant text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="max-w-7xl mx-auto w-full px-margin-mobile md:px-margin-desktop py-xl grow grid grid-cols-1 lg:grid-cols-12 gap-md items-start">

        {/* Sidebar — Filtros */}
        <aside className="lg:col-span-3 sticky top-24 hidden lg:block">
          <div className="glass-panel bg-surface/60 rounded-2xl p-md flex flex-col gap-lg shadow-md shadow-primary/5 border border-outline-variant/30">

            <div className="flex items-center justify-between pb-sm border-b border-outline-variant/30">
              <h2 className="type-headline text-on-surface flex items-center gap-xs">
                <span className="material-symbols-outlined text-primary">tune</span>
                Filtros
              </h2>
              <button onClick={clearFilters} className="type-label text-primary hover:underline">Limpiar</button>
            </div>

            {/* Especialidad */}
            <div className="flex flex-col gap-sm">
              <h3 className="type-label text-on-surface-variant uppercase tracking-wider">Especialidad</h3>
              {['Cardiología', 'Neurología', 'Pediatría', 'Oncología', 'Medicina Interna', 'Cirugía General'].map(spec => (
                <label key={spec} className="flex items-center gap-sm cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={activeSpecialties.includes(spec)}
                    onChange={() => toggleSpecialty(spec)}
                    className="w-5 h-5 rounded accent-primary border-outline-variant"
                  />
                  <span className="type-body text-on-surface group-hover:text-primary transition-colors">{spec}</span>
                </label>
              ))}
            </div>

            {/* Unidad Médica */}
            <div className="flex flex-col gap-sm">
              <h3 className="type-label text-on-surface-variant uppercase tracking-wider">Unidad Médica</h3>
              {['Torre Norte', 'Torre Sur', 'Bloque Quirúrgico'].map(u => (
                <label key={u} className="flex items-center gap-sm cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded accent-primary border-outline-variant" />
                  <span className="type-body text-on-surface group-hover:text-primary transition-colors">{u}</span>
                </label>
              ))}
            </div>

          </div>
        </aside>

        {/* Results Area */}
        <div className="lg:col-span-9 flex flex-col gap-md">

          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-sm bg-surface-container-lowest p-md rounded-2xl border border-outline-variant/30 shadow-sm">
            <p className="type-body text-on-surface-variant">
              Mostrando <strong className="text-on-surface">{filteredDoctors.length}</strong> especialistas
              {searchTerm && (
                <> para &ldquo;<span className="text-primary">{searchTerm.slice(0, 60)}</span>&rdquo;</>
              )}
            </p>
            <div className="flex items-center gap-sm">
              <span className="type-label text-on-surface-variant">Ordenar por:</span>
              <select className="rounded-xl border border-outline-variant bg-surface py-sm px-md type-label text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all">
                <option>Relevancia</option>
                <option>A-Z</option>
                <option>Valoración</option>
              </select>
            </div>
          </div>

          {/* Doctor Cards Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-md">
            {filteredDoctors.map(doctor => {
              const waMsg = encodeURIComponent(`Hola, me gustaría agendar una cita con ${doctor.name}.`)
              const waUrl = `https://wa.me/${doctor.whatsappNumber}?text=${waMsg}`
              return (
                <div key={doctor.id} className="bg-surface-container-lowest rounded-2xl p-md flex flex-col gap-md shadow-md shadow-primary/5 border border-outline-variant/30 hover:shadow-lg transition-shadow">
                  <div className="flex gap-md items-start">
                    <div className="relative shrink-0">
                      <img
                        alt={doctor.name}
                        className={`w-20 h-20 rounded-full object-cover border-2 p-0.5 ${doctor.color === 'primary' ? 'border-primary' : 'border-secondary'}`}
                        src={doctor.imageUrl}
                      />
                      <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-surface-container-lowest ${doctor.color === 'primary' ? 'bg-primary' : 'bg-secondary'}`} />
                    </div>
                    <div className="grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="type-headline text-on-surface">{doctor.name}</h3>
                          <p className={`type-body ${doctor.color === 'primary' ? 'text-primary' : 'text-secondary'}`}>{doctor.specialty}</p>
                        </div>
                        <button className="text-outline hover:text-primary transition-colors" aria-label="Guardar en favoritos">
                          <span className="material-symbols-outlined">favorite_border</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-xs mt-xs">
                        <div className="flex text-[#FFD700]">
                          {[1,2,3,4].map(n => (
                            <span key={n} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          ))}
                          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: doctor.rating === 5 ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                        </div>
                        <span className="font-data-mono text-data-mono text-on-surface-variant">({doctor.reviewCount} opiniones)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-xs px-sm py-xs bg-surface rounded-xl border border-outline-variant/30 w-fit">
                    <span className={`material-symbols-outlined text-[18px] ${doctor.color === 'primary' ? 'text-primary' : 'text-secondary'}`}>location_on</span>
                    <span className="font-data-mono text-data-mono text-on-surface-variant">{doctor.location}</span>
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-sm mt-auto pt-sm border-t border-outline-variant/30">
                    <a href={`/directorio/${doctor.id}`} className="grow h-12 rounded-xl border border-outline text-on-surface type-label font-semibold hover:bg-surface-container transition-all flex items-center justify-center">
                      Ver Perfil
                    </a>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grow h-12 rounded-xl bg-[#25D366] text-white type-label font-bold tracking-wider hover:bg-[#1ebd5b] transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Contactar
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-xl text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] block mb-sm">search_off</span>
              <p className="type-headline">Sin resultados</p>
              <p className="type-body mt-xs">Intente con otro nombre o especialidad.</p>
              <button onClick={clearFilters} className="mt-md btn-primary">Limpiar búsqueda</button>
            </div>
          )}

          {filteredDoctors.length > 0 && (
            <div className="flex justify-center pt-md">
              <button className="bg-transparent border border-outline text-on-surface hover:bg-surface-container type-label px-lg py-sm rounded-full transition-all duration-300 flex items-center gap-sm">
                Cargar más especialistas
                <span className="material-symbols-outlined">expand_more</span>
              </button>
            </div>
          )}

        </div>
      </section>

    </main>
  )
}

// ─── Export — wraps in Suspense (required by useSearchParams) ─────────────────

export default function DirectorioPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><span className="material-symbols-outlined animate-spin text-primary text-[48px]">progress_activity</span></div>}>
      <DirectorioContent />
    </Suspense>
  )
}