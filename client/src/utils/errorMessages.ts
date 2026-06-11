interface ErrorInfo {
  title: string;
  description: string;
}

const ERROR_MAP: Record<string, ErrorInfo> = {
  USER_NOT_FOUND: {
    title: 'User Not Found',
    description: 'No GitHub user exists with that username. Double-check the spelling and try again.',
  },
  RATE_LIMITED: {
    title: 'Rate Limit Exceeded',
    description: 'Too many requests to the GitHub API. Please wait a minute before trying again.',
  },
  GITHUB_API_ERROR: {
    title: 'GitHub API Error',
    description: 'Something went wrong communicating with GitHub. Please try again shortly.',
  },
  NETWORK_ERROR: {
    title: 'Network Error',
    description: 'Unable to reach the server. Check your internet connection and try again.',
  },
  SERVER_ERROR: {
    title: 'Server Error',
    description: 'Our server encountered an unexpected problem. Please try again later.',
  },
  VALIDATION_ERROR: {
    title: 'Invalid Input',
    description: 'The username format is invalid. Usernames can only contain alphanumeric characters and hyphens.',
  },
  UNKNOWN_ERROR: {
    title: 'Unexpected Error',
    description: 'Something unexpected happened. Please try again.',
  },
};

/**
 * Get a user-friendly error title and description from an error code.
 */
export function getErrorInfo(code: string): ErrorInfo {
  return ERROR_MAP[code] ?? ERROR_MAP.UNKNOWN_ERROR;
}
