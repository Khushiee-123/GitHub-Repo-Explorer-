import React from 'react';
import type { GitHubUserProfile } from '../../types/github';
import { StatPill } from '../ui/StatPill';
import {
  Users,
  User,
  BookOpen,
  MapPin,
  Building,
  LinkIcon,
  Calendar,
  ExternalLink,
} from '../../utils/icons';
import { formatMonthYear } from '../../utils/formatters';

interface ProfileCardProps {
  profile: GitHubUserProfile;
}

/**
 * Glass card profile display with gradient avatar ring, staggered stat
 * animations, twitter handle, and mobile-first responsive layout.
 */
const ProfileCardInner: React.FC<ProfileCardProps> = ({ profile }) => {
  const blogUrl =
    profile.blog && !profile.blog.startsWith('http')
      ? `https://${profile.blog}`
      : profile.blog;

  return (
    <div className="card-base p-5 sm:p-6 page-transition-enter">
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Avatar with conic-gradient ring */}
        <div className="flex-shrink-0 self-center sm:self-start">
          <div className="relative group">
            {/* Gradient ring */}
            <div
              className="absolute -inset-[3px] rounded-full transition-transform duration-300 group-hover:scale-105"
              style={{
                background: 'conic-gradient(from 0deg, #F97316, #FB923C, #F59E0B, #F97316)',
                padding: 3,
                borderRadius: '50%',
              }}
            />
            <img
              src={profile.avatarUrl}
              alt={`${profile.username}'s avatar`}
              width={80}
              height={80}
              className="relative w-20 h-20 rounded-full ring-2 ring-[var(--bg-surface)] transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {/* Online-ish dot */}
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[var(--success)] border-2 border-[var(--bg-surface)]" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left min-w-0">
          {/* Name & Username */}
          <div className="mb-1">
            {profile.name && (
              <h2 className="font-display font-bold text-xl text-[var(--text-primary)] truncate">
                {profile.name}
              </h2>
            )}
            <p className="font-mono text-sm text-[var(--text-mono)]">
              @{profile.username}
            </p>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="font-body text-sm text-[var(--text-secondary)] mt-2 leading-relaxed line-clamp-3">
              {profile.bio}
            </p>
          )}

          {/* Stats Row — staggered entry */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4 stagger-in">
            <StatPill
              icon={<Users size={14} />}
              label="Followers"
              value={profile.followers}
            />
            <StatPill
              icon={<User size={14} />}
              label="Following"
              value={profile.following}
            />
            <StatPill
              icon={<BookOpen size={14} />}
              label="Repos"
              value={profile.publicRepos}
            />
          </div>

          {/* Secondary Info */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1.5 mt-4 text-xs font-body text-[var(--text-secondary)]">
            {profile.location && (
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-[var(--text-tertiary)]" />
                {profile.location}
              </span>
            )}
            {profile.company && (
              <span className="flex items-center gap-1">
                <Building size={12} className="text-[var(--text-tertiary)]" />
                {profile.company}
              </span>
            )}
            {blogUrl && (
              <a
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors truncate max-w-[200px]"
              >
                <LinkIcon size={12} className="text-[var(--text-tertiary)] flex-shrink-0" />
                <span className="truncate">
                  {profile.blog!.replace(/^https?:\/\//, '')}
                </span>
              </a>
            )}
            {profile.twitterUsername && (
              <a
                href={`https://twitter.com/${profile.twitterUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--text-tertiary)]">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @{profile.twitterUsername}
              </a>
            )}
          </div>

          {/* Footer Row */}
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-2 mt-4 pt-4 border-t border-[var(--border-subtle)]">
            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-body font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
            >
              View on GitHub
              <ExternalLink size={12} />
            </a>
            <span className="flex items-center gap-1 text-xs font-body text-[var(--text-tertiary)]">
              <Calendar size={12} />
              Member since {formatMonthYear(profile.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileCard = React.memo(ProfileCardInner);
