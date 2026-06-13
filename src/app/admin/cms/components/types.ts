export type CmsSectionProps = {
  fields:   Record<string, string>
  types:    Record<string, string>
  setField: (clave: string, valor: string) => void
}
