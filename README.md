<p align="center">
  <img src="client/public/favicon.svg" width="64" height="64" alt="GitLens Explorer" />
</p>

<h1 align="center">GitLens Explorer</h1>

<p align="center">
  A GitHub profile and repository explorer with intelligent in-memory caching, built with Node.js + React.
</p>

---

## Overview

GitLens Explorer is a full-stack application that allows users to search and explore GitHub profiles and repositories. All GitHub API calls are proxied through a Node.js backend with a 60-second in-memory TTL cache, preventing unnecessary API hits and providing a buffer against rate limiting.

### Key Features

- **Profile Search** — Search any GitHub user by username with debounced search-as-you-type
- **Profile Display** — Avatar, name, bio, follower/following counts, public repo count, location, company
- **Repository Browser** — Paginated list of public repos with sort controls (stars, name, last updated)
- **Expandable Repo Cards** — Click to reveal open issues, default branch, license, fork count, topics
- **Language Distribution Chart** — Donut chart showing language breakdown across loaded repos
- **Recently Searched** — Last 8 searches persisted in localStorage with click-to-re-search
- **In-Memory Cache** — Server-side 60s TTL cache eliminates redundant GitHub API calls
- **Error Handling** — User-friendly messages for 404, rate limiting (403/429), network errors
- **Skeleton Loading** — Content-shaped skeleton cards during loading (not just spinners)
- **Dark Theme** — "Observatory Noir" design system with warm orange accents

---

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Backend Runtime** | Node.js 20 LTS + Express 4 | Required by assessment brief |
| **Backend Language** | TypeScript 5 | Type safety, self-documenting code |
| **HTTP Client** | Axios | Interceptors for error handling, request transformation |
| **Caching** | Custom `InMemoryCache<T>` class | Demonstrates data structure implementation (no external lib) |
| **Security** | Helmet, CORS, express-rate-limit | Production-grade security headers and rate limiting |
| **Validation** | Zod | Schema-based runtime validation for username params |
| **Logging** | Morgan | HTTP request logging with dev format |
| **Frontend Framework** | React 18 + Vite | Fast HMR, modern build tooling |
| **State Management** | TanStack Query v5 | Server-state caching, deduplication, background refetch |
| **Charts** | Recharts | Declarative chart library with responsive containers |
| **Styling** | Tailwind CSS v3 | Utility-first CSS with design token support |
| **Date Formatting** | date-fns | Lightweight, tree-shakeable date utilities |
| **Testing** | Vitest + Supertest | Fast unit + integration testing |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20.0.0
- **npm** ≥ 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/gitlens-explorer.git
cd gitlens-explorer

# Install all dependencies (root + workspaces)
npm install
```

### Configuration

Create a `.env` file in the `server/` directory:

```bash
cp server/.env.example server/.env
```

Available environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Backend server port |
| `GITHUB_TOKEN` | _(empty)_ | Optional GitHub personal access token for higher rate limits |
| `CACHE_TTL_SECONDS` | `60` | Cache time-to-live in seconds |
| `ALLOWED_ORIGIN` | `http://localhost:5173` | CORS allowed origin |
| `NODE_ENV` | `development` | Environment mode |

> **Note:** Without a `GITHUB_TOKEN`, GitHub's API allows 60 requests/hour. With a token, this increases to 5,000 requests/hour. [Create a token here](https://github.com/settings/tokens) (no scopes needed for public data).

### Running

```bash
# Start both server and client concurrently
npm run dev
```

This starts:
- **Backend** at `http://localhost:3001`
- **Frontend** at `http://localhost:5173`

### Testing

```bash
# Run all backend tests
npm test
```

---

## API Documentation

All API responses follow a consistent envelope format:

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "statusCode": 404
  }
}
```

---

### `GET /api/health`

Health check endpoint.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2026-06-09T12:00:00.000Z",
    "uptime": 3600.5
  }
}
```

---

### `GET /api/github/users/:username`

Fetch a GitHub user profile.

**Path Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `username` | `string` | GitHub username (1–39 chars, alphanumeric + hyphens) |

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "username": "torvalds",
    "name": "Linus Torvalds",
    "avatarUrl": "https://avatars.githubusercontent.com/u/1024025?v=4",
    "bio": "Just for fun",
    "company": null,
    "location": "Portland, OR",
    "blog": null,
    "twitterUsername": null,
    "followers": 224000,
    "following": 0,
    "publicRepos": 6,
    "publicGists": 0,
    "createdAt": "2011-09-04T21:00:28Z",
    "profileUrl": "https://github.com/torvalds"
  }
}
```

**Error Responses:**

| Status | Code | Description |
|--------|------|-------------|
| `400` | `INVALID_USERNAME` | Username fails format validation |
| `404` | `USER_NOT_FOUND` | No GitHub user exists with that username |
| `429` | `RATE_LIMITED` | GitHub API rate limit exceeded |
| `503` | `NETWORK_ERROR` | Could not reach GitHub API |

---

### `GET /api/github/users/:username/repos?page=1`

Fetch paginated public repositories for a GitHub user.

**Path Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `username` | `string` | GitHub username |

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | `integer` | `1` | Page number (1–100) |

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "page": 1,
    "hasMore": true,
    "repos": [
      {
        "id": 2325298,
        "name": "linux",
        "fullName": "torvalds/linux",
        "description": "Linux kernel source tree",
        "url": "https://github.com/torvalds/linux",
        "language": "C",
        "stars": 189000,
        "forks": 56000,
        "openIssues": 0,
        "defaultBranch": "master",
        "isArchived": false,
        "isFork": false,
        "topics": ["linux", "kernel"],
        "license": "GPL-2.0",
        "updatedAt": "2026-06-08T14:22:00Z",
        "pushedAt": "2026-06-09T02:11:00Z",
        "createdAt": "2011-09-04T21:27:52Z"
      }
    ]
  }
}
```

**Additional Error Responses:**

| Status | Code | Description |
|--------|------|-------------|
| `400` | `INVALID_PAGE` | Page number out of range (1–100) |

---

### `GET /api/github/cache-stats`

Debug endpoint showing current cache statistics.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "profileEntries": 3,
    "repoEntries": 7,
    "ttlSeconds": 60
  }
}
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend                          │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │SearchBar │→ │TanStack Query│→ │ ProfileCard / RepoList│ │
│  └──────────┘  └──────┬───────┘  └───────────────────────┘ │
│                       │                                     │
└───────────────────────┼─────────────────────────────────────┘
                        │ HTTP (Axios)
┌───────────────────────┼─────────────────────────────────────┐
│                  Express Backend                            │
│  ┌─────────┐  ┌───────┴──────┐  ┌────────────────────────┐ │
│  │Validate │→ │ Controller   │→ │ Service + Cache        │ │
│  │Username │  │ (thin)       │  │ (business logic)       │ │
│  └─────────┘  └──────────────┘  └──────────┬─────────────┘ │
│                                            │               │
└────────────────────────────────────────────┼───────────────┘
                                             │ HTTP (Axios)
                                    ┌────────┴────────┐
                                    │   GitHub API    │
                                    │ api.github.com  │
                                    └─────────────────┘
```

### Backend Architecture

- **Controllers** — Thin request handlers that extract params and delegate to services
- **Services** — Business logic, GitHub API calls, cache integration
- **Cache** — Generic `InMemoryCache<T>` with TTL-based lazy eviction
- **Middleware** — Username validation, error handling, request logging, rate limiting
- **Transformers** — Map raw GitHub API responses to clean, frontend-friendly shapes

### Frontend Architecture

- **TanStack Query** — Manages all server state (profiles, repos) with built-in caching
- **Custom Hooks** — `useGitHubSearch` orchestrates search, pagination, and sorting
- **Component Hierarchy** — AppShell → Search → Profile → Charts → RepoList
- **Design System** — CSS custom properties for the "Observatory Noir" dark theme

---

## Project Structure

```
gitlens-explorer/
├── client/                     # React + Vite + TypeScript
│   ├── src/
│   │   ├── api/                # Axios client + typed API functions
│   │   ├── components/         # UI components (layout, search, profile, repos, charts)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── types/              # TypeScript interfaces
│   │   └── utils/              # Formatters, colors, icons, error messages
│   ├── index.html
│   └── package.json
│
├── server/                     # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── cache/              # InMemoryCache implementation
│   │   ├── config/             # Environment variables
│   │   ├── controllers/        # Request handlers
│   │   ├── middleware/         # Validation, errors, logging
│   │   ├── routes/             # Express route definitions
│   │   ├── services/           # GitHub API service with caching
│   │   ├── types/              # TypeScript types + AppError
│   │   └── utils/              # Data transformers
│   ├── tests/                  # Vitest unit + integration tests
│   └── package.json
│
├── .editorconfig
├── .gitignore
├── package.json                # Root workspace config
└── README.md
```

---

## Bonus Features

### 1. Language Distribution Chart
A donut chart (Recharts) showing the percentage breakdown of programming languages across all loaded repositories. Updates dynamically as more pages are loaded via "Load More".

### 2. Recently Searched
Last 8 unique usernames are stored in `localStorage` and displayed as clickable chips. Each chip re-runs the search; an × button removes individual entries. Persists across browser sessions.

### 3. Debounced Search-as-you-type
The search input uses a 600ms debounce: as the user types, the search triggers automatically after a pause. The explicit search button and Enter key also work for immediate search.

---

## Caching Strategy

The server implements a dual-layer caching strategy:

1. **Server Cache** — `InMemoryCache<T>` with 60-second TTL. Separate instances for profiles and repo pages. Lazy eviction on read (expired entries are cleaned up when accessed).

2. **Client Cache** — TanStack Query with 60-second `staleTime` matching the server TTL. Prevents redundant API calls from the frontend.

Cache key format:
- Profiles: `user:{username}`
- Repo pages: `repos:{username}:{page}`

---

## Error Handling

Errors are handled at three levels:

1. **Middleware** — Username validation catches malformed input before any API call
2. **Service** — GitHub API errors (404, 403, 429, network) are caught and wrapped in `AppError`
3. **Central Handler** — Express error middleware formats all errors into the consistent envelope

The frontend maps error codes to user-friendly messages with contextual titles and descriptions.

---

## License

MIT
