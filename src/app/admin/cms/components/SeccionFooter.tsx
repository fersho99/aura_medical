'use client'

import CmsField from './CmsField'
import { type CmsSectionProps } from './types'

const FIELDS = ['descripcion', 'whatsapp_texto', 'columna_1_titulo', 'columna_2_titulo', 'copyright']

export default function SeccionFooter({ fields, types, setField }: CmsSectionProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <span className="material-symbols-outlined text-teal-400 text-[20px] mt-0.5 shrink-0"
          style={{ fontVariationSettings: "'FILL' 1" }}>
          info
        </span>
        <p className="text-gray-400 text-xs leading-relaxed">
          El footer aparece en todas las páginas del sitio. La descripción es el texto
          introductorio debajo del logo. El copyright se muestra al pie de página.
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
