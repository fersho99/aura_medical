'use client'

import CmsField from './CmsField'
import { type CmsSectionProps } from './types'

const FIELDS = ['telefono', 'email', 'direccion', 'horario', 'whatsapp', 'urgencias', 'mapa_url']

export default function SeccionContacto({ fields, types, setField }: CmsSectionProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <span className="material-symbols-outlined text-teal-400 text-[20px] mt-0.5 shrink-0"
          style={{ fontVariationSettings: "'FILL' 1" }}>
          info
        </span>
        <p className="text-gray-400 text-xs leading-relaxed">
          Datos de contacto visibles en la página /contacto y en el footer. WhatsApp debe
          incluir código de país (ej: 5218001234567).
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
