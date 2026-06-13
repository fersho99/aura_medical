'use client'

import CmsField from './CmsField'
import type { CmsSectionProps } from './types'

const CARDS_BASE = [1, 2, 3] as const
const CARD4_FIELDS = ['card_4_imagen', 'card_4_titulo', 'card_4_desc', 'card_4_href', 'card_4_link'] as const

export default function SeccionInfraestructura({ fields, types, setField }: CmsSectionProps) {
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
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Encabezado</p>
        {f('titulo')}
        {f('subtitulo')}
      </div>

      {CARDS_BASE.map(n => (
        <div key={n} className="bg-gray-800/40 rounded-xl p-4 flex flex-col gap-4 border border-gray-700/50">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tarjeta {n}</p>
          {f(`card_${n}_imagen`)}
          {f(`card_${n}_badge`)}
          {f(`card_${n}_icono`)}
          {f(`card_${n}_titulo`)}
          {f(`card_${n}_desc`)}
        </div>
      ))}

      <div className="bg-gray-800/40 rounded-xl p-4 flex flex-col gap-4 border border-gray-700/50">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tarjeta 4 (especialistas)</p>
        {CARD4_FIELDS.map(c => f(c))}
      </div>
    </div>
  )
}
