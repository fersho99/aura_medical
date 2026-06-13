'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { sanitizeText, isValidName, isValidEmail, isValidPhone } from '@/lib/validators'

// ─── Constantes (mismas que en /nuevo) ────────────────────────────────────────

const ESPECIALIDADES = [
  'Cardiología', 'Neurología', 'Oncología', 'Pediatría',
  'Cirugía General', 'Medicina Interna', 'Traumatología y Ortopedia',
  'Dermatología', 'Ginecología y Obstetricia', 'Urología',
  'Oftalmología', 'Psiquiatría', 'Endocrinología', 'Gastroenterología',
  'Neumología', 'Reumatología', 'Nefrología', 'Infectología',
  'Medicina de Urgencias', 'Anestesiología', 'Radiología e Imagen',
  'Otra especialidad…',
]

const inputCls = 'w-full mt-1 px-4 py-2.5 bg-gray-800 text-white text-sm rounded-xl border border-gray-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition placeholder:text-gray-600 disabled:opacity-50'
const labelCls = 'text-xs font-medium text-gray-400 uppercase tracking-wider'

// ─── Utilidades ───────────────────────────────────────────────────────────────

function revokeBlobUrl(url: string) {
  if (url.startsWith('blob:')) URL.revokeObjectURL(url)
}

function formatBytes(n: number): string {
  if (n < 1024)    return `${n} B`
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1048576).toFixed(2)} MB`
}

async function compressToWebP(file: File, maxDim = 500, quality = 0.85): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const ratio  = Math.min(maxDim / bitmap.width, maxDim / bitmap.height, 1)
  const w = Math.round(bitmap.width  * ratio)
  const h = Math.round(bitmap.height * ratio)
  const canvas = document.createElement('canvas')
  canvas.width = w; canvas.height = h
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, w, h)
  bitmap.close()
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => blob ? resolve(blob) : reject(new Error('WebP conversion failed')),
      'image/webp', quality,
    )
  })
}

// ─── Tipo del formulario (solo campos editables, sin id ni created_at) ────────
type FormState = {
  nombre: string; especialidad: string; cedula: string
  consultorio: string; telefono: string; email: string
  foto_url: string; descripcion: string; activo: boolean
}

const EMPTY: FormState = {
  nombre: '', especialidad: '', cedula: '', consultorio: '',
  telefono: '', email: '', foto_url: '', descripcion: '', activo: true,
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function EditarMedicoPage() {
  const router      = useRouter()
  const params      = useParams()
  const id          = params.id as string
  const supabase    = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)
  const [error,    setError]    = useState('')
  const [dragOver, setDragOver] = useState(false)

  const [form, setForm] = useState<FormState>(EMPTY)

  // Especialidad
  const [especialidadSelect, setEspecialidadSelect] = useState('')
  const [especialidadCustom, setEspecialidadCustom] = useState('')
  const isCustomEsp   = especialidadSelect === 'Otra especialidad…'
  const especialidadFinal = isCustomEsp ? especialidadCustom : especialidadSelect

  // Foto
  const [fotoPreview,        setFotoPreview]        = useState('')
  const [fotoBlob,           setFotoBlob]           = useState<Blob | null>(null)
  const [fotoOriginalSize,   setFotoOriginalSize]   = useState(0)
  const [fotoCompressedSize, setFotoCompressedSize] = useState(0)
  const [fotoCompressing,    setFotoCompressing]    = useState(false)
  const fotoHasNewFile = fotoBlob !== null

  // ── Cargar datos ────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetch = async () => {
      const { data, error: dbErr } = await supabase
        .from('medicos')
        // Seleccionamos solo los campos del formulario — nunca id ni created_at
        .select('nombre,especialidad,cedula,consultorio,telefono,email,foto_url,descripcion,activo')
        .eq('id', id)
        .single()

      if (dbErr || !data) {
        console.error('[Medicos] db.select:', dbErr)
        setError('No se pudo cargar el médico. Inténtalo de nuevo.')
      } else {
        const estado: FormState = {
          nombre:       data.nombre       ?? '',
          especialidad: data.especialidad ?? '',
          cedula:       data.cedula       ?? '',
          consultorio:  data.consultorio  ?? '',
          telefono:     data.telefono     ?? '',
          email:        data.email        ?? '',
          foto_url:     data.foto_url     ?? '',
          descripcion:  data.descripcion  ?? '',
          activo:       data.activo       ?? true,
        }
        setForm(estado)
        setFotoPreview(estado.foto_url)

        // Inicializar el select de especialidad
        const enLista = ESPECIALIDADES.includes(estado.especialidad)
        if (enLista || !estado.especialidad) {
          setEspecialidadSelect(estado.especialidad)
        } else {
          setEspecialidadSelect('Otra especialidad…')
          setEspecialidadCustom(estado.especialidad)
        }
      }
      setLoading(false)
    }
    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // ── Handlers de campo ───────────────────────────────────────────────────────

  const onNombre   = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(p => ({ ...p, nombre: e.target.value.replace(/[0-9]/g, '') })); setError('')
  }
  const onTelefono = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(p => ({ ...p, telefono: e.target.value.replace(/[^0-9+\-() ]/g, '') })); setError('')
  }
  const onEmail    = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(p => ({ ...p, email: e.target.value.replace(/\s/g, '') })); setError('')
  }
  const onChange   = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value })); setError('')
  }

  // ── Foto ────────────────────────────────────────────────────────────────────

  const handleFotoFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen.'); return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede pesar más de 5 MB.'); return
    }
    setError('')
    setFotoOriginalSize(file.size)
    revokeBlobUrl(fotoPreview)
    setFotoPreview(URL.createObjectURL(file))
    setFotoCompressing(true)
    try {
      const blob = await compressToWebP(file)
      setFotoBlob(blob)
      setFotoCompressedSize(blob.size)
    } catch (err) {
      console.error('[Medicos] compressToWebP:', err)
      setError('No se pudo procesar la imagen. Intenta con otro archivo.')
      clearNewFoto()
    } finally {
      setFotoCompressing(false)
    }
  }

  const clearNewFoto = () => {
    revokeBlobUrl(fotoPreview)
    setFotoBlob(null); setFotoOriginalSize(0); setFotoCompressedSize(0)
    setFotoPreview(form.foto_url) // restaura la foto original de BD
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFotoFile(file)
  }

  // ── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault(); setError('')

    const nombre      = sanitizeText(form.nombre,       100)
    const especial    = sanitizeText(especialidadFinal,  100)
    const cedula      = sanitizeText(form.cedula,         50)
    const consult     = sanitizeText(form.consultorio,   100)
    const telefono    = sanitizeText(form.telefono,       20)
    const email       = sanitizeText(form.email,         150)
    const descripcion = sanitizeText(form.descripcion,  1000)

    if (!isValidName(nombre))                 return setError('El nombre contiene caracteres no válidos.')
    if (!especial)                            return setError('Selecciona o escribe una especialidad.')
    if (telefono && !isValidPhone(telefono))  return setError('Formato de teléfono inválido.')
    if (email    && !isValidEmail(email))     return setError('Correo electrónico inválido.')
    if (fotoCompressing)                      return setError('La foto aún se está procesando.')

    setSaving(true)

    // ── Subir nueva foto si el usuario seleccionó una ─────────────────────────
    let foto_url = form.foto_url // mantiene la URL actual por defecto
    if (fotoBlob) {
      const oldFileName = form.foto_url?.split('/medicos/').pop()
      if (oldFileName) {
        await supabase.storage.from('medicos').remove([oldFileName])
      }
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.webp`
      const { error: uploadErr } = await supabase.storage
        .from('medicos')
        .upload(fileName, fotoBlob, { contentType: 'image/webp', upsert: false })

      if (uploadErr) {
        console.error('[Medicos] storage.upload:', uploadErr)
        setError('No se pudo subir la foto. Inténtalo de nuevo.')
        setSaving(false); return
      }

      const { data: { publicUrl } } = supabase.storage
        .from('medicos').getPublicUrl(fileName)
      foto_url = publicUrl
    }

    // ── Actualizar solo los campos del formulario ──────────────────────────────
    const { error: dbErr } = await supabase
      .from('medicos')
      .update({
        nombre, especialidad: especial, cedula, consultorio: consult,
        telefono, email, foto_url, descripcion, activo: form.activo,
      })
      .eq('id', id)

    if (dbErr) {
      console.error('[Medicos] db.update:', dbErr)
      setError('No se pudo actualizar el médico. Inténtalo de nuevo.')
      setSaving(false); return
    }

    router.push('/admin/medicos')
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-gray-400">
      <span className="material-symbols-outlined text-[24px] animate-spin">progress_activity</span>
      Cargando médico…
    </div>
  )

  return (
    <div className="max-w-2xl">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/medicos"
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Editar médico</h1>
          {form.nombre && <p className="text-gray-400 text-sm mt-0.5">{form.nombre}</p>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* ── Sección: Datos personales ─────────────────────────────────── */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="text-white font-semibold text-sm">Información personal</h2>

          <div>
            <label className={labelCls}>Nombre completo *</label>
            <input value={form.nombre} onChange={onNombre}
              required maxLength={100} disabled={saving}
              className={inputCls} />
          </div>

          {/* Especialidad select */}
          <div>
            <label className={labelCls}>Especialidad *</label>
            <select
              value={especialidadSelect}
              onChange={e => { setEspecialidadSelect(e.target.value); setError('') }}
              required={!isCustomEsp} disabled={saving}
              className={`${inputCls} appearance-none`}
            >
              <option value="">Selecciona una especialidad</option>
              {ESPECIALIDADES.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
            {isCustomEsp && (
              <div className="mt-2">
                <input
                  value={especialidadCustom}
                  onChange={e => { setEspecialidadCustom(e.target.value.replace(/[0-9]/g, '')); setError('') }}
                  required maxLength={100} disabled={saving}
                  placeholder="Escribe la especialidad…"
                  className={inputCls} autoFocus
                />
                <p className="text-teal-400 text-xs mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Esta especialidad quedará disponible en los filtros del directorio
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Cédula profesional</label>
              <input name="cedula" value={form.cedula} onChange={onChange}
                maxLength={50} disabled={saving} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Consultorio</label>
              <input name="consultorio" value={form.consultorio} onChange={onChange}
                maxLength={100} disabled={saving} className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Teléfono</label>
              <input value={form.telefono} onChange={onTelefono}
                type="tel" maxLength={20} disabled={saving}
                inputMode="tel" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input value={form.email} onChange={onEmail}
                type="email" maxLength={150} disabled={saving} className={inputCls} />
            </div>
          </div>

          {/* Toggle activo */}
          <div className="flex items-center gap-3 pt-2 border-t border-gray-800">
            <span className={labelCls}>Estado</span>
            <button type="button" disabled={saving}
              onClick={() => setForm(p => ({ ...p, activo: !p.activo }))}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition border ${
                form.activo
                  ? 'bg-teal-500/10 text-teal-400 border-teal-500/20 hover:bg-teal-500/20'
                  : 'bg-gray-700/50 text-gray-400 border-gray-700 hover:bg-gray-700'
              }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${form.activo ? 'bg-teal-400' : 'bg-gray-500'}`} />
              {form.activo ? 'Activo' : 'Inactivo'}
            </button>
          </div>
        </div>

        {/* ── Sección: Foto ──────────────────────────────────────────────── */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <h2 className="text-white font-semibold text-sm">Foto de perfil</h2>
            <p className="text-gray-500 text-xs mt-0.5">
              PNG, JPG o WebP · Máx. 5 MB · Se comprime a WebP automáticamente
            </p>
          </div>

          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
              dragOver
                ? 'border-teal-400 bg-teal-500/10'
                : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/40'
            }`}
          >
            {fotoPreview ? (
              <div className="flex items-center gap-4" onClick={e => e.stopPropagation()}>
                <img src={fotoPreview} alt="Foto actual"
                  className="w-20 h-20 rounded-full object-cover border-2 border-teal-500/30 shrink-0"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                <div className="text-left flex-1">
                  {fotoHasNewFile ? (
                    <>
                      <p className="text-white text-sm font-medium">Nueva foto seleccionada</p>
                      {fotoCompressing ? (
                        <p className="text-teal-400 text-xs flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined text-[14px] animate-spin">progress_activity</span>
                          Comprimiendo a WebP…
                        </p>
                      ) : (
                        <p className="text-gray-400 text-xs mt-1">
                          {formatBytes(fotoOriginalSize)} → <span className="text-teal-400">{formatBytes(fotoCompressedSize)}</span>
                          <span className="text-green-400 ml-1">
                            (−{Math.round((1 - fotoCompressedSize / fotoOriginalSize) * 100)}%)
                          </span>
                        </p>
                      )}
                      <button type="button" onClick={clearNewFoto}
                        className="mt-2 text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition">
                        <span className="material-symbols-outlined text-[14px]">undo</span>
                        Restaurar foto anterior
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-white text-sm font-medium">Foto actual</p>
                      <p className="text-gray-400 text-xs mt-1">Haz clic o arrastra para reemplazarla</p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-4">
                <span className="material-symbols-outlined text-gray-600 text-[48px]">add_photo_alternate</span>
                <p className="text-gray-400 text-sm mt-2">
                  Arrastra una foto o{' '}
                  <span className="text-teal-400 underline underline-offset-2">haz clic para seleccionar</span>
                </p>
                <p className="text-gray-600 text-xs mt-1">PNG, JPG, WebP · máx. 5 MB</p>
              </div>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFotoFile(f) }} />
        </div>

        {/* ── Descripción ────────────────────────────────────────────────── */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-3">
          <h2 className="text-white font-semibold text-sm">Descripción / Biografía</h2>
          <textarea name="descripcion" value={form.descripcion} onChange={onChange}
            rows={4} maxLength={1000} disabled={saving}
            className={`${inputCls} resize-none`} />
          <p className="text-gray-600 text-xs text-right">{form.descripcion.length}/1000</p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            <span className="material-symbols-outlined text-red-400 text-[18px] shrink-0">error</span>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Acciones */}
        <div className="flex gap-3">
          <button type="submit" disabled={saving || fotoCompressing}
            className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:bg-teal-500/40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition">
            {saving
              ? <><span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>Guardando…</>
              : <><span className="material-symbols-outlined text-[18px]">save</span>Guardar cambios</>
            }
          </button>
          <Link href="/admin/medicos"
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm rounded-xl transition border border-gray-700">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
