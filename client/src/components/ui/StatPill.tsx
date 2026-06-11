import React from 'react';
import { formatCount } from '../../utils/formatters';

interface StatPillProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  className?: string;
}

/**
 * A compact pill showing an icon, label, and formatted numeric value.
 * Used in profile cards and repo stats.
 */
export const StatPill: React.FC<StatPillProps> = ({
  icon,
  label,
  value,
  className = '',
}) => {
  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] ${className}`}
    >
      <span className="text-[var(--text-tertiary)]">{icon}</span>
      <span className="text-xs font-body text-[var(--text-secondary)]">{label}</span>
      <span className="text-sm font-mono font-semibold text-[var(--text-mono)]">
        {formatCount(value)}
      </span>
    </div>
  );
};
