import React from 'react';
import type { SortOption } from '../../types/github';
import { Star, Code, Clock } from '../../utils/icons';

interface SortControlsProps {
  sortBy: SortOption;
  onChange: (sort: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
  { value: 'stars', label: 'Most Stars', icon: <Star size={13} /> },
  { value: 'name', label: 'Name (A-Z)', icon: <Code size={13} /> },
  { value: 'updated', label: 'Recently Updated', icon: <Clock size={13} /> },
];

/**
 * Sort toggle buttons for repo list ordering.
 */
export const SortControls: React.FC<SortControlsProps> = ({ sortBy, onChange }) => {
  return (
    <div className="flex items-center gap-1.5">
      {sortOptions.map((option) => {
        const isActive = sortBy === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium
              transition-all duration-200 focus-ring
              ${
                isActive
                  ? 'bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30'
                  : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] border border-transparent hover:border-[var(--border-subtle)]'
              }`}
          >
            {option.icon}
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};
