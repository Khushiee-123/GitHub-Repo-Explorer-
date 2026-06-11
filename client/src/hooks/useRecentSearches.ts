import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'gitlens:recent-searches';
const MAX_ENTRIES = 8;

function loadSearches(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((s): s is string => typeof s === 'string').slice(0, MAX_ENTRIES);
  } catch {
    return [];
  }
}

function saveSearches(searches: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
  } catch {
    // localStorage might be unavailable
  }
}

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>(loadSearches);

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    saveSearches(searches);
  }, [searches]);

  const addSearch = useCallback((username: string) => {
    const trimmed = username.trim().toLowerCase();
    if (!trimmed) return;

    setSearches((prev) => {
      const filtered = prev.filter((s) => s !== trimmed);
      return [trimmed, ...filtered].slice(0, MAX_ENTRIES);
    });
  }, []);

  const removeSearch = useCallback((username: string) => {
    setSearches((prev) => prev.filter((s) => s !== username));
  }, []);

  const clearAll = useCallback(() => {
    setSearches([]);
  }, []);

  return {
    searches,
    addSearch,
    removeSearch,
    clearAll,
  };
}
