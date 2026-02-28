import { useMemo } from 'react';

/**
 * Derives a human-readable "Saved X ago" string from a timestamp.
 * Computed during render — no useEffect, no state, no re-render loop.
 */
export function useSaveIndicator(lastSavedAt: Date | null): string {
  return useMemo(() => {
    if (!lastSavedAt) return '';

    const seconds = Math.floor((Date.now() - lastSavedAt.getTime()) / 1000);

    if (seconds < 5) return 'Just saved';
    if (seconds < 60) return `Saved ${seconds}s ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Saved ${minutes}m ago`;

    return `Saved ${Math.floor(minutes / 60)}h ago`;
  }, [lastSavedAt]);
}
