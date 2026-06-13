'use client'

import CmsField from './CmsField'
import type { CmsSectionProps } from './types'

export default function SeccionTecnologia({ fields, types, setField }: CmsSectionProps) {
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

      <div className="bg-gray-800/40 rounded-xl p-4 flex flex-col gap-4 border border-gray-700/50">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Imagen lateral</p>
        {f('imagen')}
        {f('badge')}
        {f('imagen_titulo')}
        {f('imagen_desc')}
      </div>

      <div className="bg-gray-800/40 rounded-xl p-4 flex flex-col gap-4 border border-gray-700/50">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Punto destacado 1</p>
        {f('bullet_1_icono')}
        {f('bullet_1_titulo')}
        {f('bullet_1_desc')}
      </div>

      <div className="bg-gray-800/40 rounded-xl p-4 flex flex-col gap-4 border border-gray-700/50">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Punto destacado 2</p>
        {f('bullet_2_icono')}
        {f('bullet_2_titulo')}
        {f('bullet_2_desc')}
      </div>

      <div className="bg-gray-800/40 rounded-xl p-4 flex flex-col gap-4 border border-gray-700/50">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Botón</p>
        {f('boton_texto')}
        {f('boton_href')}
      </div>
    </div>
  )
}
