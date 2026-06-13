'use client'

import { Fragment, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

type Hito = {
  id:          string
  año:         string
  titulo:      string
  descripcion: string
  orden:       number
  activo:      boolean
}

type EditData = { año: string; titulo: string; descripcion: string }

export default function HitosAdminPage() {
  const [items,    setItems]    = useState<Hito[]>([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState('')
  const [toggling, setToggling] = useState<string | null>(null)
  const [editing,  setEditing]  = useState<string | null>(null)
  const [editData, setEditData] = useState<EditData>({ año: '', titulo: '', descripcion: '' })
  const [saving,   setSaving]   = useState(false)
  const [creating, setCreating] = useState(false)
  const [newData,  setNewData]  = useState<EditData & { orden: number }>({ año: '', titulo: '', descripcion: '', orden: 0 })

  const supabase = createClient()

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    setLoading(true)
    setError('')
    const { data, error } = await supabase
      .from('hitos')
      .select('*')
      .order('orden')
    if (error) { setError('No se pudieron cargar los hitos.') }
    else { setItems((data as unknown as Hito[]) ?? []) }
    setLoading(false)
  }

  const revalidate = () => fetch('/api/revalidate', { method: 'POST' }).catch(() => {})

  const toggleActivo = async (id: string, activo: boolean) => {
    setToggling(id)
    const { error } = await supabase.from('hitos').update({ activo: !activo }).eq('id', id)
    if (!error) {
      setItems(prev => prev.map(i => i.id === id ? { ...i, activo: !activo } : i))
      await revalidate()
    }
    setToggling(null)
  }

  const startEdit = (item: Hito) => {
    setEditing(item.id)
    setEditData({ año: item.año, titulo: item.titulo, descripcion: item.descripcion })
  }

  const saveEdit = async (id: string) => {
    setSaving(true)
    const { error } = await supabase.from('hitos').update(editData).eq('id', id)
    if (!error) {
      setItems(prev => prev.map(i => i.id === id ? { ...i, ...editData } : i))
      await revalidate()
      setEditing(null)
    }
    setSaving(false)
  }

  const moveOrden = async (id: string, dir: 'up' | 'down') => {
    const idx = items.findIndex(i => i.id === id)
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= items.length) return

    const a = items[idx]
    const b = items[swapIdx]
    await Promise.all([
      supabase.from('hitos').update({ orden: b.orden }).eq('id', a.id),
      supabase.from('hitos').update({ orden: a.orden }).eq('id', b.id),
    ])
    const next = [...items]
    next[idx]     = { ...a, orden: b.orden }
    next[swapIdx] = { ...b, orden: a.orden }
    next.sort((x, y) => x.orden - y.orden)
    setItems(next)
    await revalidate()
  }

  const createHito = async () => {
    setSaving(true)
    const maxOrden = items.length > 0 ? Math.max(...items.map(i => i.orden)) + 1 : 1
    const { data, error } = await supabase
      .from('hitos')
      .insert({ ...newData, orden: maxOrden, activo: true })
      .select()
      .single()
    if (!error && data) {
      setItems(prev => [...prev, data as Hito].sort((a, b) => a.orden - b.orden))
      await revalidate()
      setCreating(false)
      setNewData({ año: '', titulo: '', descripcion: '', orden: 0 })
    }
    setSaving(false)
  }

  const deleteHito = async (id: string) => {
    if (!confirm('¿Eliminar este hito? Esta acción no se puede deshacer.')) return
    const { error } = await supabase.from('hitos').delete().eq('id', id)
    if (!error) {
      setItems(prev => prev.filter(i => i.id !== id))
      await revalidate()
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-gray-400">
      <span className="material-symbols-outlined text-[24px] animate-spin">progress_activity</span>
      Cargando hitos…
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Hitos / Historia</h1>
          <p className="text-gray-400 mt-1 text-sm">{items.length} hito{items.length !== 1 ? 's' : ''} en la línea del tiempo</p>
        </div>
        <button
          onClick={() => { setCreating(true); setEditing(null) }}
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nuevo hito
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">
          <span className="material-symbols-outlined text-red-400 text-[18px] shrink-0">error</span>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Formulario de nuevo hito */}
      {creating && (
        <div className="bg-gray-900 border border-teal-500/30 rounded-2xl p-5 mb-6">
          <p className="text-teal-400 text-sm font-semibold mb-4">Nuevo hito</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Año</label>
              <input
                value={newData.año}
                onChange={e => setNewData(p => ({ ...p, año: e.target.value }))}
                placeholder="2026"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Título</label>
              <input
                value={newData.titulo}
                onChange={e => setNewData(p => ({ ...p, titulo: e.target.value }))}
                placeholder="Nombre del hito"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-gray-400 text-xs mb-1 block">Descripción</label>
            <textarea
              value={newData.descripcion}
              onChange={e => setNewData(p => ({ ...p, descripcion: e.target.value }))}
              rows={3}
              placeholder="Descripción del hito…"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 resize-none"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setCreating(false)}
              className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition border border-gray-700"
            >
              Cancelar
            </button>
            <button
              onClick={createHito}
              disabled={saving || !newData.año || !newData.titulo}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-xl transition disabled:opacity-50"
            >
              {saving && <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>}
              Guardar
            </button>
          </div>
        </div>
      )}

      {items.length === 0 && !creating ? (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-teal-400 text-[32px]">timeline</span>
          </div>
          <p className="text-gray-400 mb-4">No hay hitos registrados</p>
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Agregar el primero
          </button>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider w-10">Orden</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider w-16">Año</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Título / Descripción</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Estado</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {items.map((item, idx) => (
                <Fragment key={item.id}>
                  <tr className="hover:bg-gray-800/40 transition">
                    {/* Reorder */}
                    <td className="px-3 py-4">
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => moveOrden(item.id, 'up')}
                          disabled={idx === 0}
                          className="p-0.5 text-gray-600 hover:text-gray-300 disabled:opacity-20 transition"
                        >
                          <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                        </button>
                        <button
                          onClick={() => moveOrden(item.id, 'down')}
                          disabled={idx === items.length - 1}
                          className="p-0.5 text-gray-600 hover:text-gray-300 disabled:opacity-20 transition"
                        >
                          <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                        </button>
                      </div>
                    </td>
                    {/* Año */}
                    <td className="px-3 py-4">
                      <span className="text-teal-400 text-sm font-bold">{item.año}</span>
                    </td>
                    {/* Título + desc */}
                    <td className="px-6 py-4">
                      <p className="text-white text-sm font-medium">{item.titulo}</p>
                      <p className="text-gray-500 text-xs mt-0.5 max-w-sm truncate">{item.descripcion}</p>
                    </td>
                    {/* Toggle */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleActivo(item.id, item.activo)}
                        disabled={toggling === item.id}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition border disabled:opacity-50 ${
                          item.activo
                            ? 'bg-teal-500/10 text-teal-400 border-teal-500/20 hover:bg-teal-500/20'
                            : 'bg-gray-700/50 text-gray-400 border-gray-700 hover:bg-gray-700'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${item.activo ? 'bg-teal-400' : 'bg-gray-500'}`} />
                        {item.activo ? 'Visible' : 'Oculto'}
                      </button>
                    </td>
                    {/* Acciones */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => editing === item.id ? setEditing(null) : startEdit(item)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition border border-gray-700"
                        >
                          <span className="material-symbols-outlined text-[14px]">{editing === item.id ? 'close' : 'edit'}</span>
                          {editing === item.id ? 'Cerrar' : 'Editar'}
                        </button>
                        <button
                          onClick={() => deleteHito(item.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition border border-red-500/20"
                        >
                          <span className="material-symbols-outlined text-[14px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Inline edit row */}
                  {editing === item.id && (
                    <tr className="bg-gray-800/60">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="text-gray-400 text-xs mb-1 block">Año</label>
                            <input
                              value={editData.año}
                              onChange={e => setEditData(p => ({ ...p, año: e.target.value }))}
                              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div>
                            <label className="text-gray-400 text-xs mb-1 block">Título</label>
                            <input
                              value={editData.titulo}
                              onChange={e => setEditData(p => ({ ...p, titulo: e.target.value }))}
                              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="text-gray-400 text-xs mb-1 block">Descripción</label>
                          <textarea
                            value={editData.descripcion}
                            onChange={e => setEditData(p => ({ ...p, descripcion: e.target.value }))}
                            rows={3}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 resize-none"
                          />
                        </div>
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => setEditing(null)}
                            className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition border border-gray-700"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={() => saveEdit(item.id)}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 text-sm bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-xl transition disabled:opacity-50"
                          >
                            {saving && <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>}
                            Guardar cambios
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
