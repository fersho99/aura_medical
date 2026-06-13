'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase'

type Row = { id: string; clave: string; valor: string; tipo: string }

export function useCmsSection(seccion: string) {
  const [rows,    setRows]    = useState<Row[]>([])
  const [edited,  setEdited]  = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)

  useEffect(() => {
    setLoading(true)
    setEdited({})
    const sb = createClient()
    sb.from('contenido')
      .select('id, clave, valor, tipo')
      .eq('seccion', seccion)
      .then(({ data }) => {
        setRows((data ?? []) as Row[])
        setLoading(false)
      })
  }, [seccion])

  const fields = useMemo(() => {
    const base: Record<string, string> = {}
    for (const r of rows) base[r.clave] = r.valor ?? ''
    return { ...base, ...edited }
  }, [rows, edited])

  const types = useMemo(() => {
    const map: Record<string, string> = {}
    for (const r of rows) map[r.clave] = r.tipo ?? 'text'
    return map
  }, [rows])

  const ids = useMemo(() => {
    const map: Record<string, string> = {}
    for (const r of rows) map[r.clave] = r.id
    return map
  }, [rows])

  const isDirty = Object.keys(edited).length > 0

  const setField = useCallback(
    (clave: string, valor: string) =>
      setEdited(prev => ({ ...prev, [clave]: valor })),
    []
  )

  const save = useCallback(async () => {
    if (!isDirty) return
    setSaving(true)
    const sb = createClient()
    await Promise.all(
      Object.entries(edited).map(([clave, valor]) =>
        sb.from('contenido')
          .update({ valor, updated_at: new Date().toISOString() })
          .eq('id', ids[clave])
      )
    )
    await fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    setRows(prev =>
      prev.map(r => edited[r.clave] !== undefined ? { ...r, valor: edited[r.clave] } : r)
    )
    setEdited({})
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }, [edited, ids, isDirty])

  return { fields, types, ids, setField, save, saving, saved, isDirty, loading }
}
