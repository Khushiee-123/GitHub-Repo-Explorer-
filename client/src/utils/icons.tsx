import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const Search: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="7" r="5" />
    <line x1="11" y1="11" x2="14.5" y2="14.5" />
  </svg>
);

export const Star: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="8,1.5 9.8,5.7 14.3,6.1 10.9,9.1 11.9,13.5 8,11.2 4.1,13.5 5.1,9.1 1.7,6.1 6.2,5.7" />
  </svg>
);

export const Fork: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="3.5" r="1.5" />
    <circle cx="11" cy="3.5" r="1.5" />
    <circle cx="8" cy="13" r="1.5" />
    <path d="M5 5v2c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5" />
    <line x1="8" y1="9" x2="8" y2="11.5" />
  </svg>
);

export const Eye: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" />
    <circle cx="8" cy="8" r="2" />
  </svg>
);

export const Calendar: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="12" height="11" rx="1.5" />
    <line x1="2" y1="7" x2="14" y2="7" />
    <line x1="5.5" y1="1.5" x2="5.5" y2="4.5" />
    <line x1="10.5" y1="1.5" x2="10.5" y2="4.5" />
  </svg>
);

export const MapPin: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.5-2-4.5-4.5-4.5z" />
    <circle cx="8" cy="6" r="1.5" />
  </svg>
);

export const Building: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="12" height="12" rx="1" />
    <line x1="5" y1="5" x2="5" y2="5.01" />
    <line x1="8" y1="5" x2="8" y2="5.01" />
    <line x1="11" y1="5" x2="11" y2="5.01" />
    <line x1="5" y1="8" x2="5" y2="8.01" />
    <line x1="8" y1="8" x2="8" y2="8.01" />
    <line x1="11" y1="8" x2="11" y2="8.01" />
    <rect x="6" y="11" width="4" height="3" />
  </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 9.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5l-1 1" />
    <path d="M9.5 6.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1" />
  </svg>
);

export const Users: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="5" r="2.5" />
    <path d="M1.5 14.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" />
    <circle cx="11.5" cy="5.5" r="2" />
    <path d="M11.5 10c1.8 0 3.2 1.5 3.2 3.5" />
  </svg>
);

export const User: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="5" r="3" />
    <path d="M2 14.5c0-3 2.7-5 6-5s6 2 6 5" />
  </svg>
);

export const BookOpen: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1.5 2.5h4c1.1 0 2 .9 2 2v9.5s-1-.5-2.5-.5H1.5v-11z" />
    <path d="M14.5 2.5h-4c-1.1 0-2 .9-2 2v9.5s1-.5 2.5-.5h3.5v-11z" />
  </svg>
);

export const GitBranch: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="3.5" r="1.5" />
    <circle cx="5" cy="12.5" r="1.5" />
    <circle cx="12" cy="6" r="1.5" />
    <line x1="5" y1="5" x2="5" y2="11" />
    <path d="M12 7.5c0 2-1 3-3 3.5" />
  </svg>
);

export const Bug: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="6" width="8" height="8" rx="4" />
    <path d="M4 8H1.5M14.5 8H12M4 12H2M14 12H12" />
    <path d="M5.5 6c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5" />
    <line x1="8" y1="6" x2="8" y2="14" />
  </svg>
);

export const ChevronDown: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4,6 8,10 12,6" />
  </svg>
);

export const X: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="4" x2="12" y2="12" />
    <line x1="12" y1="4" x2="4" y2="12" />
  </svg>
);

export const Clock: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6" />
    <polyline points="8,4.5 8,8 10.5,9.5" />
  </svg>
);

export const Shield: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 1.5L2.5 4v4c0 3.5 2.5 6 5.5 7 3-1 5.5-3.5 5.5-7V4L8 1.5z" />
  </svg>
);

export const Tag: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1.5 9.2V2.5a1 1 0 011-1h6.7a1 1 0 01.7.3l5.6 5.6a1 1 0 010 1.4l-5.3 5.3a1 1 0 01-1.4 0L1.8 9.9a1 1 0 01-.3-.7z" />
    <circle cx="5" cy="5" r="1" fill="currentColor" />
  </svg>
);

export const ExternalLink: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8.5v4a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 012 12.5v-7A1.5 1.5 0 013.5 4H7" />
    <polyline points="10,2 14,2 14,6" />
    <line x1="14" y1="2" x2="7.5" y2="8.5" />
  </svg>
);

export const Code: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4.5,4 1,8 4.5,12" />
    <polyline points="11.5,4 15,8 11.5,12" />
    <line x1="9.5" y1="2" x2="6.5" y2="14" />
  </svg>
);

export const Telescope: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="7" r="4.5" />
    <line x1="10.2" y1="10.2" x2="17" y2="17" />
    <circle cx="5.5" cy="5.5" r="1.2" fill="currentColor" opacity="0.4" />
    <line x1="3" y1="14" x2="6" y2="18" />
    <line x1="11" y1="14" x2="8" y2="18" />
  </svg>
);

export const Archive: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1.5" y="2" width="13" height="3" rx="0.5" />
    <path d="M2.5 5v8a1 1 0 001 1h9a1 1 0 001-1V5" />
    <line x1="6" y1="8.5" x2="10" y2="8.5" />
  </svg>
);
