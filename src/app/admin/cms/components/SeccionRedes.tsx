'use client'

import CmsField from './CmsField'
import { type CmsSectionProps } from './types'

const FIELDS = [
  { clave: 'facebook',  icon: 'facebook',  color: 'text-blue-400' },
  { clave: 'instagram', icon: 'photo_camera', color: 'text-pink-400' },
  { clave: 'youtube',   icon: 'play_circle', color: 'text-red-400' },
  { clave: 'linkedin',  icon: 'work',       color: 'text-sky-400' },
]

export default function SeccionRedes({ fields, types, setField }: CmsSectionProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <span className="material-symbols-outlined text-teal-400 text-[20px] mt-0.5 shrink-0"
          style={{ fontVariationSettings: "'FILL' 1" }}>
          info
        </span>
        <p className="text-gray-400 text-xs leading-relaxed">
          Las redes sociales aparecen en el footer y en la barra de navegación. Ingresa la URL
          completa del perfil (ej: https://facebook.com/auramedical). Deja vacío para ocultar.
        </p>
      </div>

      {FIELDS.map(({ clave, icon, color }) => (
        <div key={clave} className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0 mt-6">
            <span className={`material-symbols-outlined text-[20px] ${color}`}
              style={{ fontVariationSettings: "'FILL' 1" }}>
              {icon}
            </span>
          </div>
          <div className="flex-1">
            <CmsField
              clave={clave}
              valor={fields[clave] ?? ''}
              tipo={types[clave] ?? 'text'}
              onChange={v => setField(clave, v)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
