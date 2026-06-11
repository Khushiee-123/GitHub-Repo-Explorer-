import React from 'react';
import { Telescope, ExternalLink } from '../../utils/icons';

/**
 * Sticky top header with glassmorphism, gradient bottom border,
 * app name and GitHub link.
 */
export const Header: React.FC = () => {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(var(--bg-base-rgb), 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid transparent',
        borderImage: 'linear-gradient(to right, transparent, var(--accent), transparent) 1',
      }}
    >
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2.5">
          <Telescope className="text-[var(--accent)]" size={22} />
          <h1 className="font-display font-bold text-lg tracking-tight">
            <span className="text-[var(--text-primary)]">Git</span>
            <span className="gradient-text">Lens</span>
          </h1>
        </div>

        {/* Right: GitHub Link + Keyboard shortcut */}
        <div className="flex items-center gap-3">
          <kbd
            className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono
              text-[var(--text-tertiary)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
            title="Press / to focus search"
          >
            /
          </kbd>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-body text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </header>
  );
};
