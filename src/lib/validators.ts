/**
 * validators.ts — Utilidades de sanitización y validación server-side.
 * Úsalas en API routes ANTES de tocar Supabase o cualquier sistema externo.
 *
 * Supabase ya usa queries parametrizadas (previene SQL injection),
 * pero aún necesitamos sanitizar para evitar XSS al renderizar datos
 * y rechazar payloads malformados antes de que lleguen a la BD.
 */

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult<T> {
  ok: boolean
  errors: ValidationError[]
  data: T | null
}

// ─── Sanitización ─────────────────────────────────────────────────────────────

/**
 * Elimina etiquetas HTML, caracteres de control y espacios extremos.
 * Limita la longitud para prevenir ataques de payload largo.
 */
export function sanitizeText(raw: unknown, maxLength = 500): string {
  if (typeof raw !== 'string') return ''
  return raw
    .replace(/<[^>]*>/g, '')                          // strip HTML tags
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // strip control chars
    .replace(/javascript:/gi, '')                      // strip js: URIs
    .replace(/on\w+\s*=/gi, '')                        // strip inline event handlers
    .trim()
    .slice(0, maxLength)
}

/**
 * Escapa caracteres HTML para renderizado seguro en el admin.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ─── Validadores ──────────────────────────────────────────────────────────────

/** Nombre: solo letras, espacios, tildes, apóstrofes y guiones. 2–100 chars. */
export function isValidName(value: string): boolean {
  return /^[a-zA-ZÀ-ÿ\s''\-\.]{2,100}$/.test(value)
}

/**
 * Email: validación RFC 5322 simplificada.
 * Más estricta que el regex original del modal.
 */
export function isValidEmail(value: string): boolean {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/.test(value)
}

/**
 * Teléfono: 7–15 dígitos numéricos (puede llevar +, espacios, guiones y paréntesis).
 * Exige al menos 7 dígitos reales.
 */
export function isValidPhone(value: string): boolean {
  if (!/^[+\d\s\-()]{7,20}$/.test(value)) return false
  const digitsOnly = value.replace(/\D/g, '')
  return digitsOnly.length >= 7 && digitsOnly.length <= 15
}

/** Slug: solo letras, números y guiones. */
export function isValidSlug(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
}

// ─── Validadores por entidad ──────────────────────────────────────────────────

const VALID_AREAS = [
  'Cabeza / Neurología',
  'Corazón / Cardiovascular',
  'Abdomen / Digestivo',
  'Huesos / Columna',
  'Pediatría / Niños',
  'General / Otro',
] as const

const VALID_HORARIOS = ['manana', 'tarde', 'flexible'] as const

export interface CitaPayload {
  nombre:   string
  telefono: string
  correo:   string
  area:     string
  horario:  string
  detalles: string
}

export function validateCita(raw: Record<string, unknown>): ValidationResult<CitaPayload> {
  const errors: ValidationError[] = []

  const nombre   = sanitizeText(raw.nombre,   100)
  const telefono = sanitizeText(raw.telefono,  20)
  const correo   = sanitizeText(raw.correo,   150)
  const area     = sanitizeText(raw.area,     100)
  const horario  = sanitizeText(raw.horario,   50)
  const detalles = sanitizeText(raw.detalles, 500)

  if (!nombre)                     errors.push({ field: 'nombre',   message: 'El nombre es requerido.' })
  else if (!isValidName(nombre))   errors.push({ field: 'nombre',   message: 'El nombre contiene caracteres no válidos.' })

  if (!telefono)                      errors.push({ field: 'telefono', message: 'El teléfono es requerido.' })
  else if (!isValidPhone(telefono))   errors.push({ field: 'telefono', message: 'Formato de teléfono inválido.' })

  if (correo && !isValidEmail(correo)) errors.push({ field: 'correo', message: 'Correo electrónico inválido.' })

  if (!VALID_AREAS.includes(area as typeof VALID_AREAS[number]))
    errors.push({ field: 'area', message: 'Área médica no reconocida.' })

  if (!VALID_HORARIOS.includes(horario as typeof VALID_HORARIOS[number]))
    errors.push({ field: 'horario', message: 'Horario no válido.' })

  if (errors.length > 0) return { ok: false, errors, data: null }

  return { ok: true, errors: [], data: { nombre, telefono, correo, area, horario, detalles } }
}

export interface NewsletterPayload { correo: string }

export function validateNewsletter(raw: Record<string, unknown>): ValidationResult<NewsletterPayload> {
  const errors: ValidationError[] = []
  const correo = sanitizeText(raw.correo, 150)

  if (!correo)                    errors.push({ field: 'correo', message: 'El correo es requerido.' })
  else if (!isValidEmail(correo)) errors.push({ field: 'correo', message: 'Correo electrónico inválido.' })

  if (errors.length > 0) return { ok: false, errors, data: null }
  return { ok: true, errors: [], data: { correo } }
}

const VALID_ESPECIALIDADES = [
  'Cardiología', 'Neurología', 'Oncología', 'Pediatría',
  'Cirugía Robótica', 'Medicina Preventiva', 'Otro', '',
] as const

export interface ContactoPayload {
  nombre:       string
  telefono:     string
  correo:       string
  especialidad: string
  mensaje:      string
}

export function validateContacto(raw: Record<string, unknown>): ValidationResult<ContactoPayload> {
  const errors: ValidationError[] = []

  const nombre       = sanitizeText(raw.nombre,       100)
  const telefono     = sanitizeText(raw.telefono,      20)
  const correo       = sanitizeText(raw.correo,       150)
  const especialidad = sanitizeText(raw.especialidad,  50)
  const mensaje      = sanitizeText(raw.mensaje,      1000)

  if (!nombre)                   errors.push({ field: 'nombre',   message: 'El nombre es requerido.' })
  else if (!isValidName(nombre)) errors.push({ field: 'nombre',   message: 'El nombre contiene caracteres no válidos.' })

  if (!telefono)                    errors.push({ field: 'telefono', message: 'El teléfono es requerido.' })
  else if (!isValidPhone(telefono)) errors.push({ field: 'telefono', message: 'Formato de teléfono inválido.' })

  if (correo && !isValidEmail(correo)) errors.push({ field: 'correo', message: 'Correo inválido.' })

  if (!VALID_ESPECIALIDADES.includes(especialidad as typeof VALID_ESPECIALIDADES[number]))
    errors.push({ field: 'especialidad', message: 'Especialidad no válida.' })

  if (!mensaje) errors.push({ field: 'mensaje', message: 'El mensaje es requerido.' })
  else if (mensaje.length < 10) errors.push({ field: 'mensaje', message: 'El mensaje es demasiado corto.' })

  if (errors.length > 0) return { ok: false, errors, data: null }
  return { ok: true, errors: [], data: { nombre, telefono, correo, especialidad, mensaje } }
}
