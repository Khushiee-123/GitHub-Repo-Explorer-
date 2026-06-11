import { useState, useCallback } from 'react';

/**
 * Manages which repo card is currently expanded.
 * Only one repo can be expanded at a time.
 */
export function useRepoDetails() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggle = useCallback((id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const collapse = useCallback(() => {
    setExpandedId(null);
  }, []);

  return {
    expandedId,
    toggle,
    collapse,
  };
}
