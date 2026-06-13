'use client'

import CmsField from './CmsField'
import type { CmsSectionProps } from './types'

const CARDS = [1, 2, 3] as const

export default function SeccionElegirnos({ fields, types, setField }: CmsSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      {CARDS.map(n => (
        <div key={n} className="bg-gray-800/40 rounded-xl p-4 flex flex-col gap-4 border border-gray-700/50">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tarjeta {n}</p>
          <CmsField clave={`card_${n}_titulo`} valor={fields[`card_${n}_titulo`] ?? ''} tipo={types[`card_${n}_titulo`] ?? 'text'}     onChange={v => setField(`card_${n}_titulo`, v)} />
          <CmsField clave={`card_${n}_desc`}   valor={fields[`card_${n}_desc`]   ?? ''} tipo={types[`card_${n}_desc`]   ?? 'textarea'} onChange={v => setField(`card_${n}_desc`, v)} />
          <CmsField clave={`card_${n}_icono`}  valor={fields[`card_${n}_icono`]  ?? ''} tipo={types[`card_${n}_icono`]  ?? 'text'}     onChange={v => setField(`card_${n}_icono`, v)} />
        </div>
      ))}
    </div>
  )
}
