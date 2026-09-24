import "server-only";

/**
 * Minimal fixed-window rate limiter for public API routes.
 * In-memory: fine for a single instance. For multiple instances /
 * serverless, back this with Redis (e.g. Upstash) using the same API.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, { limit = 60, windowMs = 60_000 } = {}) {
  const now = Date.now();
  if (buckets.size > 5_000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetAt: now + windowMs };
  }
  bucket.count += 1;
  return { ok: bucket.count <= limit, remaining: Math.max(0, limit - bucket.count), resetAt: bucket.resetAt };
}

export function clientKey(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return fwd || headers.get("x-real-ip") || "anonymous";
}
