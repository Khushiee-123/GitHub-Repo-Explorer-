import React from 'react';

interface BadgeProps {
  label: string;
  color?: string;
  variant?: 'language' | 'topic';
  className?: string;
}

/**
 * A small pill badge used for languages and topics.
 * When variant is 'language', shows a colored dot next to the label.
 * When variant is 'topic', uses a subtle accent background.
 */
export const Badge: React.FC<BadgeProps> = ({
  label,
  color,
  variant = 'topic',
  className = '',
}) => {
  if (variant === 'language' && color) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-body font-medium ${className}`}
        style={{
          backgroundColor: `${color}15`,
          color: color,
          border: `1px solid ${color}30`,
        }}
      >
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        {label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body font-medium
        bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]
        ${className}`}
    >
      {label}
    </span>
  );
};
