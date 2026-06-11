import React from 'react';

/**
 * Skeleton placeholder matching the ProfileCard layout during loading.
 * Uses only shimmer animation (no animate-pulse).
 */
export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="card-base p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Avatar skeleton */}
        <div className="flex-shrink-0 self-center sm:self-start">
          <div className="w-20 h-20 rounded-full skeleton" />
        </div>

        {/* Content skeleton */}
        <div className="flex-1 space-y-3">
          {/* Name */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="h-6 w-40 rounded-md skeleton" />
            <div className="h-4 w-24 rounded-md skeleton" />
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <div className="h-3.5 w-full rounded-md skeleton" />
            <div className="h-3.5 w-3/4 rounded-md skeleton" />
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
            <div className="h-8 w-28 rounded-lg skeleton" />
            <div className="h-8 w-28 rounded-lg skeleton" />
            <div className="h-8 w-24 rounded-lg skeleton" />
          </div>

          {/* Secondary info */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2">
            <div className="h-3.5 w-24 rounded-md skeleton" />
            <div className="h-3.5 w-32 rounded-md skeleton" />
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-[var(--border-subtle)] flex gap-4">
            <div className="h-3.5 w-28 rounded-md skeleton" />
            <div className="h-3.5 w-36 rounded-md skeleton" />
          </div>
        </div>
      </div>
    </div>
  );
};
