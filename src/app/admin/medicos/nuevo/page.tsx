'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { sanitizeText, isValidName, isValidEmail, isValidPhone } from '@/lib/validators'

// ─── Constantes ───────────────────────────────────────────────────────────────

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
  if (n < 1024)       return `${n} B`
  if (n < 1048576)    return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1048576).toFixed(2)} MB`
}

/**
 * Comprime una imagen a WebP con dimensiones máximas y calidad configurable.
 * Usa createImageBitmap + Canvas API — no requiere librerías externas.
 */
async function compressToWebP(file: File, maxDim = 500, quality = 0.85): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const ratio  = Math.min(maxDim / bitmap.width, maxDim / bitmap.height, 1)
  const w = Math.round(bitmap.width  * ratio)
  const h = Math.round(bitmap.height * ratio)

  const canvas = document.createElement('canvas')
  canvas.width  = w
  canvas.height = h
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, w, h)
  bitmap.close()

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => blob ? resolve(blob) : reject(new Error('WebP conversion failed')),
      'image/webp',
      quality,
    )
  })
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function NuevoMedicoPage() {
  const router      = useRouter()
  const supabase    = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [dragOver,  setDragOver]  = useState(false)

  // Foto
  const [fotoPreview,       setFotoPreview]       = useState<string>('')
  const [fotoBlob,          setFotoBlob]          = useState<Blob | null>(null)
  const [fotoOriginalSize,  setFotoOriginalSize]  = useState(0)
  const [fotoCompressedSize,setFotoCompressedSize]= useState(0)
  const [fotoCompressing,   setFotoCompressing]   = useState(false)

  // Especialidad
  const [especialidadSelect, setEspecialidadSelect] = useState('')
  const [especialidadCustom, setEspecialidadCustom] = useState('')
  const isCustomEsp = especialidadSelect === 'Otra especialidad…'
  const especialidadFinal = isCustomEsp ? especialidadCustom : especialidadSelect

  const [form, setForm] = useState({
    nombre: '', cedula: '', consultorio: '',
    telefono: '', email: '', descripcion: '', activo: true,
  })

  // ── Handlers de campo ───────────────────────────────────────────────────────

  // Nombre: sin dígitos
  const onNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(p => ({ ...p, nombre: e.target.value.replace(/[0-9]/g, '') }))
    setError('')
  }

  // Teléfono: solo dígitos + +, -, (), espacio
  const onTelefono = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(p => ({ ...p, telefono: e.target.value.replace(/[^0-9+\-() ]/g, '') }))
    setError('')
  }

  // Email: sin espacios
  const onEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(p => ({ ...p, email: e.target.value.replace(/\s/g, '') }))
    setError('')
  }

  // Campos genéricos
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setError('')
  }

  // ── Foto ────────────────────────────────────────────────────────────────────

  const handleFotoFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen (PNG, JPG, WEBP, GIF, etc.).')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede pesar más de 5 MB antes de comprimirse.')
      return
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
      clearFoto()
    } finally {
      setFotoCompressing(false)
    }
  }

  const clearFoto = () => {
    revokeBlobUrl(fotoPreview)
    setFotoPreview('')
    setFotoBlob(null)
    setFotoOriginalSize(0)
    setFotoCompressedSize(0)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFotoFile(file)
  }

  // ── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    setError('')

    // Sanitizar
    const nombre      = sanitizeText(form.nombre,      100)
    const especial    = sanitizeText(especialidadFinal, 100)
    const cedula      = sanitizeText(form.cedula,        50)
    const consult     = sanitizeText(form.consultorio,  100)
    const telefono    = sanitizeText(form.telefono,      20)
    const email       = sanitizeText(form.email,        150)
    const descripcion = sanitizeText(form.descripcion, 1000)

    // Validar
    if (!isValidName(nombre))                  return setError('El nombre contiene caracteres no válidos.')
    if (!especial)                             return setError('Selecciona o escribe una especialidad.')
    if (telefono && !isValidPhone(telefono))   return setError('Formato de teléfono inválido.')
    if (email    && !isValidEmail(email))      return setError('Correo electrónico inválido.')
    if (fotoCompressing)                       return setError('La foto aún se está procesando. Espera un momento.')

    setLoading(true)

    let foto_url = ''
    if (fotoBlob) {
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.webp`
      const { error: uploadErr } = await supabase.storage
        .from('medicos')
        .upload(fileName, fotoBlob, { contentType: 'image/webp', upsert: false })

      if (uploadErr) {
        console.error('[Medicos] storage.upload:', uploadErr)
        setError('No se pudo subir la foto. Inténtalo de nuevo.')
        setLoading(false)
        return
      }

      const { data: { publicUrl } } = supabase.storage
        .from('medicos')
        .getPublicUrl(fileName)
      foto_url = publicUrl
    }

    // ── Insertar en BD ────────────────────────────────────────────────────────
    const { error: dbErr } = await supabase.from('medicos').insert([{
      nombre, especialidad: especial, cedula, consultorio: consult,
      telefono, email, foto_url, descripcion, activo: form.activo,
    }])

    if (dbErr) {
      console.error('[Medicos] db.insert:', dbErr)
      setError('No se pudo guardar el médico. Inténtalo de nuevo.')
      setLoading(false)
      return
    }

    router.push('/admin/medicos')
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-5xl">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/medicos"
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">Nuevo médico</h1>
          <p className="text-gray-400 text-sm">Agrega un especialista al directorio</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* ── Layout principal: foto | campos ──────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4">

          {/* ── Columna izquierda: Foto + Estado ─────────────────────── */}
          <div className="flex flex-col gap-3">

            {/* Drag & drop compacto */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col gap-3">
              <p className={labelCls}>Foto de perfil</p>

              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative rounded-xl border-2 border-dashed cursor-pointer transition-all flex items-center justify-center overflow-hidden ${
                  dragOver ? 'border-teal-400 bg-teal-500/10' : 'border-gray-700 hover:border-gray-600'
                }`}
                style={{ aspectRatio: '1 / 1' }}
              >
                {fotoPreview ? (
                  <img src={fotoPreview} alt="Vista previa"
                    className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <span className="material-symbols-outlined text-gray-600 text-[36px]">add_photo_alternate</span>
                    <p className="text-gray-500 text-xs mt-1">Arrastra o haz clic</p>
                  </div>
                )}
              </div>

              {/* Info compresión */}
              {fotoPreview && (
                <div className="text-xs" onClick={e => e.stopPropagation()}>
                  {fotoCompressing ? (
                    <p className="text-teal-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] animate-spin">progress_activity</span>
                      Comprimiendo…
                    </p>
                  ) : fotoCompressedSize > 0 ? (
                    <p className="text-gray-500">
                      {formatBytes(fotoOriginalSize)} →{' '}
                      <span className="text-teal-400">{formatBytes(fotoCompressedSize)}</span>
                      <span className="text-green-400 ml-1">
                        (−{Math.round((1 - fotoCompressedSize / fotoOriginalSize) * 100)}%)
                      </span>
                    </p>
                  ) : null}
                  <button type="button" onClick={clearFoto}
                    className="text-red-400 hover:text-red-300 flex items-center gap-1 mt-1 transition">
                    <span className="material-symbols-outlined text-[13px]">delete</span>
                    Quitar foto
                  </button>
                </div>
              )}

              <p className="text-gray-600 text-xs">PNG, JPG o WebP · máx. 5 MB · se convierte a WebP</p>

              <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFotoFile(f) }} />
            </div>

            {/* Estado */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
              <span className={labelCls}>Estado</span>
              <button type="button"
                onClick={() => setForm(p => ({ ...p, activo: !p.activo }))}
                disabled={loading}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition border ${
                  form.activo
                    ? 'bg-teal-500/10 text-teal-400 border-teal-500/20'
                    : 'bg-gray-700/50 text-gray-400 border-gray-700'
                }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${form.activo ? 'bg-teal-400' : 'bg-gray-500'}`} />
                {form.activo ? 'Activo' : 'Inactivo'}
              </button>
            </div>
          </div>

          {/* ── Columna derecha: Campos ───────────────────────────────── */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-3">

            {/* Nombre */}
            <div>
              <label className={labelCls}>Nombre completo *</label>
              <input value={form.nombre} onChange={onNombre}
                required maxLength={100} disabled={loading}
                className={inputCls} placeholder="Dr. Juan Pérez García" />
            </div>

            {/* Especialidad */}
            <div>
              <label className={labelCls}>Especialidad *</label>
              <select value={especialidadSelect}
                onChange={e => { setEspecialidadSelect(e.target.value); setError('') }}
                required={!isCustomEsp} disabled={loading}
                className={`${inputCls} appearance-none`}>
                <option value="">Selecciona una especialidad</option>
                {ESPECIALIDADES.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
              {isCustomEsp && (
                <div className="mt-2">
                  <input value={especialidadCustom}
                    onChange={e => { setEspecialidadCustom(e.target.value.replace(/[0-9]/g, '')); setError('') }}
                    required maxLength={100} disabled={loading} autoFocus
                    placeholder="Escribe la especialidad…" className={inputCls} />
                  <p className="text-teal-400 text-xs mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">info</span>
                    Quedará disponible en los filtros del directorio
                  </p>
                </div>
              )}
            </div>

            {/* Cédula + Consultorio */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Cédula profesional</label>
                <input name="cedula" value={form.cedula} onChange={onChange}
                  maxLength={50} disabled={loading}
                  className={inputCls} placeholder="12345678" />
              </div>
              <div>
                <label className={labelCls}>Consultorio</label>
                <input name="consultorio" value={form.consultorio} onChange={onChange}
                  maxLength={100} disabled={loading}
                  className={inputCls} placeholder="Piso 3, cons. 302" />
              </div>
            </div>

            {/* Teléfono + Email */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Teléfono</label>
                <input value={form.telefono} onChange={onTelefono}
                  type="tel" maxLength={20} disabled={loading} inputMode="tel"
                  className={inputCls} placeholder="653 123 4567" />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input value={form.email} onChange={onEmail}
                  type="email" maxLength={150} disabled={loading}
                  className={inputCls} placeholder="doctor@auramedical.com" />
              </div>
            </div>

            {/* Descripción */}
            <div className="flex-1 flex flex-col">
              <label className={labelCls}>Descripción / Biografía</label>
              <textarea name="descripcion" value={form.descripcion} onChange={onChange}
                rows={3} maxLength={1000} disabled={loading}
                className={`${inputCls} resize-none flex-1`}
                placeholder="Especialista con más de 10 años de experiencia en…" />
              <p className="text-gray-600 text-xs text-right mt-1">{form.descripcion.length}/1000</p>
            </div>
          </div>
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
          <button type="submit" disabled={loading || fotoCompressing}
            className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:bg-teal-500/40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition">
            {loading
              ? <><span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>Guardando…</>
              : <><span className="material-symbols-outlined text-[18px]">save</span>Guardar médico</>
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
