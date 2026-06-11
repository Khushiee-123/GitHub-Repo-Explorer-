import { formatDistanceToNow, format, parseISO } from 'date-fns';

/**
 * Format a large number with K/M suffixes for compact display.
 * e.g. 1234 → "1.2k", 1_500_000 → "1.5M"
 */
export function formatCount(num: number): string {
  if (num >= 1_000_000) {
    const val = num / 1_000_000;
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}M`;
  }
  if (num >= 1_000) {
    const val = num / 1_000;
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}k`;
  }
  return num.toString();
}

/**
 * Format an ISO date string as a relative time, e.g. "3 days ago".
 */
export function formatRelativeDate(isoString: string): string {
  try {
    return formatDistanceToNow(parseISO(isoString), { addSuffix: true });
  } catch {
    return 'Unknown';
  }
}

/**
 * Format an ISO date string as "MMM d, yyyy", e.g. "Jan 15, 2023".
 */
export function formatFullDate(isoString: string): string {
  try {
    return format(parseISO(isoString), 'MMM d, yyyy');
  } catch {
    return 'Unknown';
  }
}

/**
 * Format an ISO date string as "MMMM yyyy", e.g. "January 2023".
 */
export function formatMonthYear(isoString: string): string {
  try {
    return format(parseISO(isoString), 'MMMM yyyy');
  } catch {
    return 'Unknown';
  }
}
