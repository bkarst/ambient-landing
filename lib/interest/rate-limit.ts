import 'server-only';
import { createHmac } from 'node:crypto';

/** 5 per window by default; INTEREST_RATE_LIMIT_MAX raises it for CI and smoke tests. */
export const RATE_LIMIT_MAX = Number(process.env.INTEREST_RATE_LIMIT_MAX) || 5;
export const RATE_LIMIT_WINDOW_SECONDS = 10 * 60;

export interface RateLimitStore {
  /** Increments the counter for `key` and returns the count within the window. */
  hit(key: string, windowSeconds: number): Promise<number>;
}

/** Development store. Per process, so it resets on restart and doesn't share across instances. */
class MemoryStore implements RateLimitStore {
  private hits = new Map<string, { count: number; resetAt: number }>();
  async hit(key: string, windowSeconds: number): Promise<number> {
    const now = Date.now();
    const entry = this.hits.get(key);
    if (!entry || entry.resetAt <= now) {
      this.hits.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
      return 1;
    }
    entry.count += 1;
    return entry.count;
  }
}

/** Upstash Redis REST (or any REST-compatible Redis), configured by RATE_LIMIT_URL and RATE_LIMIT_TOKEN. */
class RedisRestStore implements RateLimitStore {
  constructor(
    private url: string,
    private token: string,
  ) {}
  async hit(key: string, windowSeconds: number): Promise<number> {
    const res = await fetch(`${this.url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, windowSeconds, 'NX'],
      ]),
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`Rate-limit store responded ${res.status}`);
    const data = (await res.json()) as Array<{ result?: number }>;
    return Number(data[0]?.result ?? 0);
  }
}

let store: RateLimitStore | undefined;
function getStore(): RateLimitStore {
  if (store) return store;
  const url = process.env.RATE_LIMIT_URL;
  const token = process.env.RATE_LIMIT_TOKEN;
  store = url && token ? new RedisRestStore(url.replace(/\/$/, ''), token) : new MemoryStore();
  return store;
}

/** Keyed on an HMAC of the client IP; the raw IP is never stored. */
export function rateLimitKey(ip: string): string {
  const secret = process.env.INTEREST_HASH_SECRET ?? 'development-only';
  return `interest:${createHmac('sha256', secret).update(ip).digest('hex').slice(0, 32)}`;
}

/** Returns true when the request is allowed. Fails open if the store is unreachable. */
export async function allowSubmission(ip: string): Promise<boolean> {
  try {
    const count = await getStore().hit(rateLimitKey(ip), RATE_LIMIT_WINDOW_SECONDS);
    return count <= RATE_LIMIT_MAX;
  } catch (err) {
    console.error('[interest] rate limit store unavailable; allowing request', err);
    return true;
  }
}
