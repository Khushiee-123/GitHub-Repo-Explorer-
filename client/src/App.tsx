import React, { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { AppShell } from './components/layout/AppShell';
import { SearchBar } from './components/search/SearchBar';
import { RecentSearches } from './components/search/RecentSearches';
import { ProfileCard } from './components/profile/ProfileCard';
import { ProfileSkeleton } from './components/profile/ProfileSkeleton';
import { RepoList } from './components/repos/RepoList';
import { LanguageChart } from './components/charts/LanguageChart';
import { ErrorMessage } from './components/ui/ErrorMessage';
import { EmptyState } from './components/ui/EmptyState';
import { useGitHubSearch } from './hooks/useGitHubSearch';
import { useRecentSearches } from './hooks/useRecentSearches';
import { useRepoDetails } from './hooks/useRepoDetails';

const App: React.FC = () => {
  const {
    searchInput,
    setSearchInput,
    handleSearch,
    isLoading,
    isError,
    error,
    profile,
    sortedRepos,
    hasMore,
    loadMore,
    isLoadingMore,
    sortBy,
    setSortBy,
  } = useGitHubSearch();

  const { searches, addSearch, removeSearch, clearAll } = useRecentSearches();
  const { expandedId, toggle } = useRepoDetails();

  // Add to recent searches when a profile is successfully loaded
  useEffect(() => {
    if (profile) {
      addSearch(profile.username);
    }
  }, [profile, addSearch]);

  const handleRecentSelect = (username: string) => {
    setSearchInput(username);
    handleSearch(username);
  };

  const handleRetry = () => {
    handleSearch();
  };

  // Determine what to render in the main content area
  const hasSearched = !!profile || isError || isLoading;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)]">
      <Header />

      <AppShell>
        {/* Search area */}
        <div className="mb-6 sm:mb-8">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
          <RecentSearches
            searches={searches}
            onSelect={handleRecentSelect}
            onRemove={removeSearch}
            onClear={clearAll}
          />
        </div>

        {/* Content area */}
        {!hasSearched && <EmptyState />}

        {isError && error && (
          <div className="mb-6">
            <ErrorMessage error={error} onRetry={handleRetry} />
          </div>
        )}

        {isLoading && !profile && (
          <div className="space-y-6">
            <ProfileSkeleton />
          </div>
        )}

        {profile && (
          <div className="space-y-6 sm:space-y-8">
            {/* Profile + Chart area */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 sm:gap-6">
              <ProfileCard profile={profile} />
              {sortedRepos.length > 0 && <LanguageChart repos={sortedRepos} />}
            </div>

            {/* Repos */}
            <RepoList
              repos={sortedRepos}
              isLoading={isLoading}
              isLoadingMore={isLoadingMore}
              hasMore={hasMore}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onLoadMore={loadMore}
              expandedId={expandedId}
              onToggleExpand={toggle}
            />
          </div>
        )}
      </AppShell>

      {/* Footer */}
      <footer className="text-center py-6 text-xs font-body text-[var(--text-tertiary)] border-t border-[var(--border-subtle)]">
        Built with React, TanStack Query & Tailwind CSS
      </footer>
    </div>
  );
};

export default App;
