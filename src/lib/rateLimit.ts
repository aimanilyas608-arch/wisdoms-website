import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

let limiter: Ratelimit | null = null

function getLimiter() {
  if (limiter) return limiter
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }
  limiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    analytics: true,
  })
  return limiter
}

export async function rateLimit(key: string): Promise<boolean> {
  const l = getLimiter()
  if (!l) return true // no Redis configured — skip rate limiting in dev
  const { success } = await l.limit(key)
  return success
}