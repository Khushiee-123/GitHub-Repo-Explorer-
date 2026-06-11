import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCache, createCache } from '../src/cache/inMemoryCache';

describe('InMemoryCache', () => {
  let cache: InMemoryCache<string>;

  beforeEach(() => {
    vi.useFakeTimers();
    cache = createCache<string>(10); // 10-second TTL
  });

  afterEach(() => {
    cache.destroy();
    vi.useRealTimers();
  });

  it('set and get returns stored value', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');

    expect(cache.get('key1')).toBe('value1');
    expect(cache.get('key2')).toBe('value2');
  });

  it('get returns null after TTL expires', () => {
    cache.set('key1', 'value1');

    // Before expiry
    expect(cache.get('key1')).toBe('value1');

    // Advance time past TTL (10 seconds = 10000ms)
    vi.advanceTimersByTime(11_000);

    expect(cache.get('key1')).toBeNull();
  });

  it('has returns false for expired entry', () => {
    cache.set('key1', 'value1');

    expect(cache.has('key1')).toBe(true);

    vi.advanceTimersByTime(11_000);

    expect(cache.has('key1')).toBe(false);
  });

  it('delete removes entry', () => {
    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');

    const deleted = cache.delete('key1');
    expect(deleted).toBe(true);
    expect(cache.get('key1')).toBeNull();

    // Deleting non-existent key returns false
    expect(cache.delete('nonexistent')).toBe(false);
  });

  it('size() only counts non-expired entries', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.set('key3', 'value3');

    expect(cache.size()).toBe(3);

    // Advance time past TTL
    vi.advanceTimersByTime(11_000);

    // Add a fresh entry after the old ones expired
    cache.set('key4', 'value4');

    expect(cache.size()).toBe(1);
  });
});
