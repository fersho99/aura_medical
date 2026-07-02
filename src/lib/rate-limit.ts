import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const limiters = new Map<string, Ratelimit>()

function getLimiter(limit: number, windowMs: number): Ratelimit {
  const key = `${limit}_${windowMs}`
  if (!limiters.has(key)) {
    const windowSecs = Math.ceil(windowMs / 1000)
    limiters.set(key, new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(limit, `${windowSecs} s`),
    }))
  }
  return limiters.get(key)!
}

export async function checkRateLimit(
  ip: string,
  limit = 5,
  windowMs = 60_000,
): Promise<{ allowed: boolean; retryAfterMs?: number }> {
  try {
    const { success, reset } = await getLimiter(limit, windowMs).limit(ip)
    if (success) return { allowed: true }
    return { allowed: false, retryAfterMs: reset - Date.now() }
  } catch (err) {
    console.error('[rate-limit] Upstash error, failing open:', err)
    return { allowed: true }
  }
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  )
}
