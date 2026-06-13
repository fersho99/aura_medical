import CmsField from './CmsField'
import { type CmsSectionProps } from './types'

export default function SeccionNosotrosValores({ fields, types, setField }: CmsSectionProps) {
  const render = (clave: string) => (
    <CmsField
      key={clave}
      clave={clave}
      valor={fields[clave] ?? ''}
      tipo={types[clave] ?? 'text'}
      onChange={v => setField(clave, v)}
    />
  )

  return (
    <div className="flex flex-col gap-4">
      {render('titulo')}
      {render('subtitulo')}

      {([1, 2, 3, 4] as const).map(n => (
        <div key={n} className="flex flex-col gap-3 p-4 rounded-xl bg-gray-800/40 border border-gray-700/50">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Card {n}</p>
          {render(`card_${n}_icono`)}
          {render(`card_${n}_titulo`)}
          {render(`card_${n}_desc`)}
        </div>
      ))}
    </div>
  )
}
