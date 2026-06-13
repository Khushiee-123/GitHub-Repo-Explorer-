import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from './useDebounce.js';
import { fetchUserProfile, fetchUserRepos } from '../api/github.js';
import type { TransformedRepo, SortOption, ApiError } from '../types/github.js';

export function useGitHubSearch() {
  // Raw user input — preserved casing for display
  const [searchInput, setSearchInput] = useState('');
  // The username actively being searched — lowercased, set ONLY by handleSearch or recent search click
  const [activeUsername, setActiveUsername] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('stars');
  const [loadedRepos, setLoadedRepos] = useState<TransformedRepo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const prevActiveRef = useRef('');

  const debouncedInput = useDebounce(searchInput, 600);

  // When debounced input changes, auto-trigger search if value is non-empty and differs from active
  useEffect(() => {
    const trimmed = debouncedInput.trim().toLowerCase();
    if (trimmed && trimmed !== activeUsername) {
      setActiveUsername(trimmed);
      setHasSearched(true);
    }
  }, [debouncedInput]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset repos and page when activeUsername changes
  useEffect(() => {
    if (activeUsername !== prevActiveRef.current) {
      prevActiveRef.current = activeUsername;
      setLoadedRepos([]);
      setCurrentPage(1);
    }
  }, [activeUsername]);

  // Profile query — enabled only when activeUsername is truthy
  const profileQuery = useQuery({
    queryKey: ['github-profile', activeUsername],
    queryFn: () => fetchUserProfile(activeUsername),
    enabled: !!activeUsername,
  });

  // Repos query — enabled only when activeUsername is truthy AND profile succeeded
  const reposQuery = useQuery({
    queryKey: ['github-repos', activeUsername, currentPage],
    queryFn: () => fetchUserRepos(activeUsername, currentPage),
    enabled: !!activeUsername && profileQuery.isSuccess,
  });

  // When repos data arrives, update loadedRepos
  useEffect(() => {
    if (reposQuery.data) {
      const { repos, page } = reposQuery.data;
      setLoadedRepos((prev) => {
        if (page === 1) return repos;
        // Avoid duplicates when appending
        const existingIds = new Set(prev.map((r) => r.id));
        const newRepos = repos.filter((r) => !existingIds.has(r.id));
        return [...prev, ...newRepos];
      });
    }
  }, [reposQuery.data]);

  // Sorted repos
  const sortedRepos = useMemo(() => {
    const clone = [...loadedRepos];
    switch (sortBy) {
      case 'stars':
        return clone.sort((a, b) => b.stars - a.stars);
      case 'name':
        return clone.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      case 'updated':
        return clone.sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      default:
        return clone;
    }
  }, [loadedRepos, sortBy]);

  // Explicit search (form submit / button click / recent search click)
  const handleSearch = useCallback(
    (usernameOverride?: string) => {
      const target = (usernameOverride ?? searchInput).trim().toLowerCase();
      if (!target) return;
      // Don't lowercase the display input — only set activeUsername
      if (usernameOverride) {
        setSearchInput(usernameOverride);
      }
      setActiveUsername(target);
      setHasSearched(true);
    },
    [searchInput]
  );

  // Load more — guard against double-clicks with isFetching check
  const loadMore = useCallback(() => {
    if (reposQuery.data?.hasMore && !reposQuery.isFetching) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [reposQuery.data?.hasMore, reposQuery.isFetching]);

  const isLoading = profileQuery.isLoading || reposQuery.isLoading;
  const isError = profileQuery.isError;
  const error = profileQuery.error as ApiError | null;
  const repoError = reposQuery.isError ? (reposQuery.error as ApiError | null) : null;
  const profile = profileQuery.data ?? null;
  const hasMore = reposQuery.data?.hasMore ?? false;
  const isLoadingMore = currentPage > 1 && reposQuery.isFetching;

  return {
    searchInput,
    setSearchInput,
    handleSearch,
    isLoading,
    isError,
    error,
    repoError,
    profile,
    sortedRepos,
    hasMore,
    loadMore,
    isLoadingMore,
    sortBy,
    setSortBy,
    hasSearched,
  };
}
