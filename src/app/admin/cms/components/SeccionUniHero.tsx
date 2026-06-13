'use client'

import CmsField from './CmsField'
import type { CmsSectionProps } from './types'

const FIELDS = ['badge', 'titulo', 'titulo_2', 'subtitulo', 'boton_1', 'boton_2'] as const

export default function SeccionUniHero({ fields, types, setField }: CmsSectionProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <span className="material-symbols-outlined text-teal-400 text-[20px] mt-0.5 shrink-0"
          style={{ fontVariationSettings: "'FILL' 1" }}>
          info
        </span>
        <p className="text-gray-400 text-xs leading-relaxed">
          Hero de la página <strong className="text-gray-300">/unidades</strong>.
          El título se muestra en dos líneas. Los dos botones son &quot;Conocer Instalaciones&quot; y &quot;Agendar Visita&quot;.
        </p>
      </div>

      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <span className="material-symbols-outlined text-blue-400 text-[18px] shrink-0 mt-0.5">
          info
        </span>
        <p className="text-gray-400 text-xs leading-relaxed">
          Los cards de unidades se gestionan desde el módulo{' '}
          <a href="/admin/unidades" className="text-teal-400 underline hover:text-teal-300">
            Unidades
          </a>.
          Aquí solo se edita el encabezado de la página.
        </p>
      </div>

      {FIELDS.map(clave => (
        <CmsField
          key={clave}
          clave={clave}
          valor={fields[clave] ?? ''}
          tipo={types[clave] ?? 'text'}
          onChange={v => setField(clave, v)}
        />
      ))}
    </div>
  )
}
