'use client'

import CmsField from './CmsField'
import type { CmsSectionProps } from './types'

const FIELDS = ['badge', 'titulo', 'subtitulo'] as const

export default function SeccionNoticiasHero({ fields, types, setField }: CmsSectionProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <span className="material-symbols-outlined text-teal-400 text-[20px] mt-0.5 shrink-0"
          style={{ fontVariationSettings: "'FILL' 1" }}>
          info
        </span>
        <p className="text-gray-400 text-xs leading-relaxed">
          Encabezado de la página <strong className="text-gray-300">/noticias</strong>.
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

      <div className="pt-4 mt-1 border-t border-gray-700/50">
        <p className="text-gray-500 text-xs mb-3">
          Las noticias se gestionan desde el módulo de Noticias.
        </p>
        <a
          href="/admin/noticias"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 text-sm font-medium hover:bg-teal-500/20 transition"
        >
          <span className="material-symbols-outlined text-[16px]">newspaper</span>
          Ir a gestionar noticias
        </a>
      </div>
    </div>
  )
}
