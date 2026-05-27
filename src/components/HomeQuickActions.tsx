'use client'

/** Acciones rápidas del home: Agendar Cita (modal) y Buscar Médico (directorio) */

import AgendarCitaModal from '@/components/AgendarCitaModal'

export default function HomeQuickActions() {
  return (
    <section className="relative z-20 -mt-xl px-margin-mobile md:px-margin-desktop max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">

        {/* Agendar Cita — abre el modal */}
        <AgendarCitaModal
          triggerLabel="Agendar Cita"
          triggerIcon="calendar_add_on"
          triggerClassName="group bg-surface/80 backdrop-blur-2xl border border-surface-variant/50 rounded-2xl p-lg shadow-2xl shadow-on-background/10 hover:shadow-primary/20 transition-all duration-500 flex items-center justify-between cursor-pointer hover:-translate-y-1 w-full text-left"
          triggerContent={
            <>
              <div className="flex flex-col gap-sm">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary-container/30 to-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_add_on</span>
                </div>
                <h3 className="type-headline text-on-surface">Agendar Cita</h3>
                <p className="type-body text-on-surface-variant">Reserve su consulta con nuestros especialistas de forma rápida y segura.</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-surface-variant flex items-center justify-center bg-surface group-hover:bg-primary group-hover:border-primary transition-colors duration-500 shrink-0">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary transition-colors duration-500 text-[24px]">arrow_forward</span>
              </div>
            </>
          }
        />

        {/* Buscar Médico — navega al directorio */}
        <a
          href="/directorio"
          className="group bg-surface/80 backdrop-blur-2xl border border-surface-variant/50 rounded-2xl p-lg shadow-2xl shadow-on-background/10 hover:shadow-secondary/20 transition-all duration-500 flex items-center justify-between cursor-pointer hover:-translate-y-1"
        >
          <div className="flex flex-col gap-sm">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-secondary-container/30 to-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>person_search</span>
            </div>
            <h3 className="type-headline text-on-surface">Buscar Médico</h3>
            <p className="type-body text-on-surface-variant">Encuentre al profesional ideal dentro de nuestro directorio médico de excelencia.</p>
          </div>
          <div className="w-12 h-12 rounded-full border border-surface-variant flex items-center justify-center bg-surface group-hover:bg-secondary group-hover:border-secondary transition-colors duration-500 shrink-0">
            <span className="material-symbols-outlined text-secondary group-hover:text-on-secondary transition-colors duration-500 text-[24px]">arrow_forward</span>
          </div>
        </a>

      </div>
    </section>
  )
}
