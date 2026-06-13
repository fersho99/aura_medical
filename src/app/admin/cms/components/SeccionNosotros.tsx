'use client'

import CmsField from './CmsField'
import { type CmsSectionProps } from './types'

const FIELDS_TEXTO = ['titulo', 'subtitulo']
const FIELDS_STATS = ['años_trayectoria', 'especialistas', 'pacientes', 'satisfaccion']

export default function SeccionNosotros({ fields, types, setField }: CmsSectionProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <span className="material-symbols-outlined text-teal-400 text-[20px] mt-0.5 shrink-0"
          style={{ fontVariationSettings: "'FILL' 1" }}>
          info
        </span>
        <p className="text-gray-400 text-xs leading-relaxed">
          Sección "Nosotros" en la página principal. Las estadísticas se muestran como
          contadores animados. Usa números simples (ej: 25, 120, 50000, 98).
        </p>
      </div>

      {FIELDS_TEXTO.map(clave => (
        <CmsField
          key={clave}
          clave={clave}
          valor={fields[clave] ?? ''}
          tipo={types[clave] ?? 'text'}
          onChange={v => setField(clave, v)}
        />
      ))}

      <div className="border-t border-gray-800 pt-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Estadísticas
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            'años_trayectoria', 'años_label',
            'especialistas',    'especialistas_label',
            'pacientes',        'pacientes_label',
            'satisfaccion',     'satisfaccion_label',
          ].map(clave => (
            <CmsField
              key={clave}
              clave={clave}
              valor={fields[clave] ?? ''}
              tipo={types[clave] ?? 'text'}
              onChange={v => setField(clave, v)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
