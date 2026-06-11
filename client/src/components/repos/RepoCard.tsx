import React from 'react';
import type { TransformedRepo } from '../../types/github';
import { Badge } from '../ui/Badge';
import {
  Star,
  Fork,
  Clock,
  ChevronDown,
  Bug,
  GitBranch,
  Shield,
  Tag,
  ExternalLink,
  Archive,
} from '../../utils/icons';
import { getLanguageColor } from '../../utils/languageColors';
import { formatRelativeDate, formatCount } from '../../utils/formatters';

interface RepoCardProps {
  repo: TransformedRepo;
  isExpanded: boolean;
  onToggle: () => void;
}

/**
 * Repository card with glass styling and smooth CSS grid expand/collapse.
 * Keyboard accessible (Enter/Space to toggle), hover border transition.
 */
const RepoCardInner: React.FC<RepoCardProps> = ({ repo, isExpanded, onToggle }) => {
  const langColor = getLanguageColor(repo.language);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      aria-expanded={isExpanded}
      className="card-base p-4 sm:p-5 cursor-pointer select-none transition-all duration-300"
      style={{
        borderColor: isExpanded ? 'rgba(var(--accent-rgb), 0.2)' : undefined,
        boxShadow: isExpanded ? 'var(--shadow-hover)' : undefined,
      }}
    >
      {/* Collapsed content — always visible */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Repo name */}
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-mono font-semibold text-sm text-[var(--text-mono)] truncate">
              {repo.name}
            </h3>
            {repo.isArchived && (
              <span className="flex items-center gap-1 text-[10px] font-body text-[var(--warning)] px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(var(--warning-rgb), 0.1)' }}
              >
                <Archive size={10} />
                Archived
              </span>
            )}
            {repo.isFork && (
              <span className="text-[10px] font-body text-[var(--text-tertiary)] bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded">
                Fork
              </span>
            )}
          </div>

          {/* Description */}
          {repo.description && (
            <p className="font-body text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed line-clamp-2">
              {repo.description}
            </p>
          )}

          {/* Meta row */}
          <div className="flex items-center flex-wrap gap-3 mt-3">
            {/* Language */}
            {repo.language && (
              <Badge label={repo.language} color={langColor} variant="language" />
            )}

            {/* Stars */}
            <span className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
              <Star size={13} />
              <span className="font-mono text-[var(--text-secondary)]">
                {formatCount(repo.stars)}
              </span>
            </span>

            {/* Forks */}
            <span className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
              <Fork size={13} />
              <span className="font-mono text-[var(--text-secondary)]">
                {formatCount(repo.forks)}
              </span>
            </span>

            {/* Updated */}
            <span className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
              <Clock size={12} />
              <span>{formatRelativeDate(repo.updatedAt)}</span>
            </span>
          </div>
        </div>

        {/* Chevron with CSS rotation transition */}
        <div
          className="flex-shrink-0 mt-1 text-[var(--text-tertiary)] transition-transform duration-300"
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <ChevronDown size={16} />
        </div>
      </div>

      {/* Expanded content — smooth grid transition */}
      <div className={`expand-collapse ${isExpanded ? 'expanded' : ''}`}>
        <div className="expand-inner">
          <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] space-y-3"
            style={{ animation: isExpanded ? 'fadeIn 0.3s ease 0.1s forwards' : 'none', opacity: isExpanded ? undefined : 0 }}
          >
            {/* Detail row */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-body text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5">
                <Bug size={13} className="text-[var(--text-tertiary)]" />
                <span className="font-mono text-[var(--text-mono)]">{repo.openIssues}</span>
                open issues
              </span>

              <span className="flex items-center gap-1.5">
                <GitBranch size={13} className="text-[var(--text-tertiary)]" />
                <span className="font-mono text-[var(--text-mono)]">{repo.defaultBranch}</span>
              </span>

              {repo.license && (
                <span className="flex items-center gap-1.5">
                  <Shield size={13} className="text-[var(--text-tertiary)]" />
                  {repo.license}
                </span>
              )}
            </div>

            {/* Topics */}
            {repo.topics.length > 0 && (
              <div className="flex items-start gap-2 flex-wrap">
                <Tag size={12} className="text-[var(--text-tertiary)] mt-0.5 flex-shrink-0" />
                {repo.topics.map((topic) => (
                  <Badge key={topic} label={topic} variant="topic" />
                ))}
              </div>
            )}

            {/* GitHub link */}
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-body font-semibold
                text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
            >
              View on GitHub
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RepoCard = React.memo(RepoCardInner);
