import React from 'react';
import { Telescope } from '../../utils/icons';

/**
 * Empty state with animated CSS constellation, gradient heading,
 * pulsing glow, and keyboard shortcut hint.
 */
export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center page-transition-enter">
      {/* Illustration with pulsing glow */}
      <div className="relative mb-8">
        {/* Pulsing glow behind illustration */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.2) 0%, transparent 70%)',
            animation: 'pulseGlow 3s ease-in-out infinite',
            transform: 'scale(1.8)',
          }}
        />
        <div className="relative w-24 h-24 rounded-full bg-[var(--accent-glow)] flex items-center justify-center">
          <Telescope className="text-[var(--accent)]" size={48} />
        </div>

        {/* Animated constellation dots */}
        <div
          className="absolute -top-3 -right-3 w-2 h-2 rounded-full bg-[var(--accent)]"
          style={{ animation: 'constellationFloat 4s ease-in-out infinite', animationDelay: '0s' }}
        />
        <div
          className="absolute -bottom-2 -left-4 w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
          style={{ animation: 'constellationFloat 4s ease-in-out infinite', animationDelay: '0.8s' }}
        />
        <div
          className="absolute top-0 -left-6 w-1 h-1 rounded-full bg-[var(--info)]"
          style={{ animation: 'constellationFloat 4s ease-in-out infinite', animationDelay: '1.6s' }}
        />
        <div
          className="absolute -top-1 right-[-2rem] w-1 h-1 rounded-full bg-[var(--info)]"
          style={{ animation: 'constellationFloat 4s ease-in-out infinite', animationDelay: '2.4s' }}
        />
        <div
          className="absolute bottom-[-0.5rem] right-[-1.5rem] w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
          style={{ animation: 'constellationFloat 4s ease-in-out infinite', animationDelay: '3.2s' }}
        />
      </div>

      <h2 className="font-display font-bold text-2xl gradient-text mb-3">
        Explore GitHub Profiles
      </h2>

      <p className="font-body text-[var(--text-secondary)] text-base max-w-sm leading-relaxed">
        Enter a username to discover repos, languages, and coding statistics.
      </p>

      {/* Keyboard shortcut hints */}
      <div className="mt-6 flex items-center gap-3 text-xs font-mono text-[var(--text-tertiary)]">
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[10px]">
            /
          </kbd>
          <span>to focus</span>
        </span>
        <span className="text-[var(--border-subtle)]">·</span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[10px]">
            ↵
          </kbd>
          <span>to search</span>
        </span>
      </div>
    </div>
  );
};
