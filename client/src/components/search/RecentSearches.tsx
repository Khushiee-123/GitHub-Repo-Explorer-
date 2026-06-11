import React from 'react';
import { Clock, X } from '../../utils/icons';

interface RecentSearchesProps {
  searches: string[];
  onSelect: (username: string) => void;
  onRemove: (username: string) => void;
  onClear: () => void;
}

/**
 * Displays recent search history as clickable chips.
 * Returns null if there are no recent searches.
 */
export const RecentSearches: React.FC<RecentSearchesProps> = ({
  searches,
  onSelect,
  onRemove,
  onClear,
}) => {
  if (searches.length === 0) return null;

  return (
    <div className="mt-3 animate-fadeSlideIn">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
          <Clock size={12} />
          <span className="text-xs font-body">Recent</span>
        </div>
        <button
          onClick={onClear}
          className="text-xs font-body text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {searches.map((username) => (
          <div
            key={username}
            className="group flex items-center gap-1 px-2.5 py-1 rounded-lg
              bg-[var(--bg-surface)] border border-[var(--border-subtle)]
              hover:border-[var(--border-default)] transition-all duration-200 cursor-pointer"
          >
            <button
              onClick={() => onSelect(username)}
              className="text-xs font-mono text-[var(--text-mono)] hover:text-[var(--accent)] transition-colors"
            >
              @{username}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(username);
              }}
              aria-label={`Remove ${username}`}
              className="p-0.5 rounded text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100
                hover:text-[var(--danger)] transition-all duration-200"
            >
              <X size={10} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
