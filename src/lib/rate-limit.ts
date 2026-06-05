/**
 * rate-limit.ts — Rate limiter en memoria por IP.
 *
 * NOTA: Funciona en procesos únicos (desarrollo / VPS con un solo worker).
 * Para producción multi-instancia, reemplazar el Map por Redis/Upstash.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

/** Limpia entradas expiradas cada 5 minutos para evitar fugas de memoria. */
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key)
  }
}, 5 * 60 * 1000)

/**
 * Verifica si la IP puede hacer una solicitud más.
 *
 * @param ip       IP del cliente (req.ip o header X-Forwarded-For)
 * @param limit    Máximo de solicitudes por ventana (default: 5)
 * @param windowMs Duración de la ventana en ms (default: 60 000 = 1 min)
 * @returns `{ allowed: true }` si pasa, `{ allowed: false, retryAfterMs }` si bloqueada
 */
export function checkRateLimit(
  ip: string,
  limit = 5,
  windowMs = 60_000,
): { allowed: boolean; retryAfterMs?: number } {
  const now   = Date.now()
  const entry = store.get(ip)

  if (!entry || entry.resetAt < now) {
    store.set(ip, { count: 1, resetAt: now + windowMs })
    return { allowed: true }
  }

  if (entry.count >= limit) {
    return { allowed: false, retryAfterMs: entry.resetAt - now }
  }

  entry.count++
  return { allowed: true }
}

/** Extrae la IP real del cliente desde la request de Next.js. */
export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  )
}
