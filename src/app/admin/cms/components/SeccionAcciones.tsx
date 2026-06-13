'use client'

import CmsField from './CmsField'
import type { CmsSectionProps } from './types'

export default function SeccionAcciones({ fields, types, setField }: CmsSectionProps) {
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
      <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <span className="material-symbols-outlined text-teal-400 text-[20px] mt-0.5 shrink-0"
          style={{ fontVariationSettings: "'FILL' 1" }}>
          info
        </span>
        <p className="text-gray-400 text-xs leading-relaxed">
          Las acciones rápidas son los dos botones destacados que aparecen en la página principal
          para agendar cita y ver directorio de médicos.
        </p>
      </div>

      {[1, 2].map(n => (
        <div key={n} className="bg-gray-800/40 rounded-xl p-4 flex flex-col gap-4 border border-gray-700/50">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Acción {n}</p>
          {f(`accion_${n}_titulo`)}
          {f(`accion_${n}_desc`)}
          {f(`accion_${n}_href`)}
        </div>
      ))}
    </div>
  )
}
