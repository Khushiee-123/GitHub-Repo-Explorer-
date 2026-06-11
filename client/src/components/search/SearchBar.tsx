import React, { useRef, useEffect } from 'react';
import { Search, X } from '../../utils/icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

/**
 * Premium search bar with glass-card wrapper, animated accent glow on focus,
 * loading gradient border, smooth clear button, "/" keyboard shortcut, and a11y label.
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  isLoading,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // "/" keyboard shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch();
    }
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="glass-card p-1">
      <form role="search" onSubmit={handleSubmit} className="relative w-full">
        {/* Visually hidden label for a11y */}
        <label htmlFor="github-search-input" className="sr-only">
          GitHub username search
        </label>

        <div className="relative flex items-center">
          {/* Search icon */}
          <div className="absolute left-3.5 pointer-events-none text-[var(--text-tertiary)]">
            <Search size={18} />
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            id="github-search-input"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search GitHub username..."
            autoFocus
            autoComplete="off"
            spellCheck={false}
            aria-label="GitHub username"
            className={`w-full h-12 pl-10 pr-24 bg-[var(--bg-input)] rounded-xl
              font-mono text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]
              focus:outline-none transition-all duration-300
              ${isLoading
                ? 'border border-[var(--accent)] shadow-[0_0_12px_rgba(var(--accent-rgb),0.2)]'
                : 'border border-[var(--border-default)] focus:border-[var(--accent)] focus:shadow-[0_0_20px_rgba(var(--accent-rgb),0.15)]'
              }`}
          />

          {/* Right side buttons */}
          <div className="absolute right-2 flex items-center gap-1.5">
            {/* Clear button with scale+opacity transition */}
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className={`p-1.5 rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]
                hover:bg-[var(--bg-elevated)] transition-all duration-200
                ${value ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
            >
              <X size={14} />
            </button>

            {/* Search button */}
            <button
              type="submit"
              disabled={!value.trim() || isLoading}
              aria-label="Search"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-semibold
                bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-all duration-200 active:scale-[0.97]"
            >
              {isLoading ? (
                <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <Search size={13} />
              )}
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
