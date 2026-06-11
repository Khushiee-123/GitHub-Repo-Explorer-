import React from 'react';
import type { TransformedRepo, SortOption } from '../../types/github';
import { SortControls } from './SortControls';
import { RepoCard } from './RepoCard';
import { RepoSkeleton } from './RepoSkeleton';
import { Button } from '../ui/Button';
import { BookOpen } from '../../utils/icons';

interface RepoListProps {
  repos: TransformedRepo[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onLoadMore: () => void;
  expandedId: number | null;
  onToggleExpand: (id: number) => void;
}

/**
 * Full repo listing with sort controls, count header, cards, and load-more button.
 */
export const RepoList: React.FC<RepoListProps> = ({
  repos,
  isLoading,
  isLoadingMore,
  hasMore,
  sortBy,
  onSortChange,
  onLoadMore,
  expandedId,
  onToggleExpand,
}) => {
  if (isLoading && repos.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-5 w-28 rounded skeleton-shimmer" />
          <div className="h-7 w-48 rounded skeleton-shimmer" />
        </div>
        <RepoSkeleton />
      </div>
    );
  }

  if (repos.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <BookOpen size={14} className="text-[var(--text-tertiary)]" />
          <span className="text-sm font-body text-[var(--text-secondary)]">
            <span className="font-mono font-semibold text-[var(--text-mono)]">{repos.length}</span>
            {' '}repositories
          </span>
        </div>
        <SortControls sortBy={sortBy} onChange={onSortChange} />
      </div>

      {/* Repo cards */}
      <div className="space-y-3">
        {repos.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            isExpanded={expandedId === repo.id}
            onToggle={() => onToggleExpand(repo.id)}
          />
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <Button
            variant="secondary"
            onClick={onLoadMore}
            isLoading={isLoadingMore}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
