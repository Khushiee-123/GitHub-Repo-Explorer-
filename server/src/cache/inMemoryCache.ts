interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class InMemoryCache<T> {
  private store: Map<string, CacheEntry<T>>;
  private readonly ttlMs: number;
  private readonly maxEntries: number;
  private purgeInterval: ReturnType<typeof setInterval> | null;

  constructor(ttlSeconds: number, maxEntries: number = 500) {
    this.store = new Map();
    this.ttlMs = ttlSeconds * 1000;
    this.maxEntries = maxEntries;
    this.purgeInterval = setInterval(() => this._purgeExpired(), 30_000);
    // Allow the process to exit even if the interval is still running
    if (this.purgeInterval && typeof this.purgeInterval === 'object' && 'unref' in this.purgeInterval) {
      this.purgeInterval.unref();
    }
  }

  set(key: string, value: T): void {
    // Evict oldest entry if at capacity (Map preserves insertion order)
    if (this.store.size >= this.maxEntries && !this.store.has(key)) {
      const oldestKey = this.store.keys().next().value;
      if (oldestKey !== undefined) {
        this.store.delete(oldestKey);
      }
    }
    const expiresAt = Date.now() + this.ttlMs;
    this.store.set(key, { value, expiresAt });
  }

  get(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) {
      return null;
    }

    // Lazy eviction: remove expired entries on access
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return entry.value;
  }

  has(key: string): boolean {
    const entry = this.store.get(key);
    if (!entry) {
      return false;
    }

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  size(): number {
    // Count only non-expired entries, lazily evicting stale ones
    let count = 0;
    const now = Date.now();
    for (const [key, entry] of this.store) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
      } else {
        count++;
      }
    }
    return count;
  }

  purge(): void {
    this._purgeExpired();
  }

  destroy(): void {
    if (this.purgeInterval) {
      clearInterval(this.purgeInterval);
      this.purgeInterval = null;
    }
    this.store.clear();
  }

  private _purgeExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.store) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
      }
    }
  }
}

export function createCache<T>(ttlSeconds: number, maxEntries?: number): InMemoryCache<T> {
  return new InMemoryCache<T>(ttlSeconds, maxEntries);
}
