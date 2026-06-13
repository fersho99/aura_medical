'use client'

import CmsField from './CmsField'
import type { CmsSectionProps } from './types'

const FIELDS_MAIN  = ['badge', 'titulo', 'descripcion', 'imagen'] as const
const FIELDS_EXTRA = ['bullet_1', 'bullet_2', 'bullet_3'] as const
const FIELDS_WA    = ['whatsapp', 'whatsapp_msg', 'boton_texto'] as const

export default function SeccionPremium({ fields, types, setField }: CmsSectionProps) {
  const f = (clave: string) => (
    <CmsField
      key={clave}
      clave={clave}
      valor={fields[clave] ?? ''}
      tipo={types[clave] ?? 'text'}
      onChange={v => setField(clave, v)}
    />
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Encabezado e imagen</p>
        {FIELDS_MAIN.map(c => f(c))}
      </div>

      <div className="bg-gray-800/40 rounded-xl p-4 flex flex-col gap-4 border border-gray-700/50">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Beneficios</p>
        {FIELDS_EXTRA.map(c => f(c))}
      </div>

      <div className="bg-gray-800/40 rounded-xl p-4 flex flex-col gap-4 border border-gray-700/50">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">WhatsApp y botón</p>
        {FIELDS_WA.map(c => f(c))}
      </div>
    </div>
  )
}
