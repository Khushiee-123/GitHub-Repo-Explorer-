import React from 'react';

/**
 * Skeleton placeholder for repository cards during loading.
 * Renders 4 skeleton cards.
 */
export const RepoSkeleton: React.FC = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="card-base p-4 sm:p-5 animate-pulse">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-3">
              {/* Name */}
              <div className="h-4 w-36 rounded-md skeleton-shimmer" />

              {/* Description */}
              <div className="space-y-1.5">
                <div className="h-3 w-full rounded-md skeleton-shimmer" />
                <div className="h-3 w-2/3 rounded-md skeleton-shimmer" />
              </div>

              {/* Meta row */}
              <div className="flex items-center gap-3">
                <div className="h-5 w-20 rounded-full skeleton-shimmer" />
                <div className="h-4 w-12 rounded skeleton-shimmer" />
                <div className="h-4 w-12 rounded skeleton-shimmer" />
                <div className="h-4 w-24 rounded skeleton-shimmer" />
              </div>
            </div>

            {/* Chevron placeholder */}
            <div className="h-4 w-4 rounded skeleton-shimmer flex-shrink-0 mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
};
