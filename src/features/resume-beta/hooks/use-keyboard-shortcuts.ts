'use client';

import { useEffect } from 'react';

export function useKeyboardShortcuts({ onSave }: { onSave: () => void }): void {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMeta = e.metaKey || e.ctrlKey;
      if (e.key === 's' && isMeta) {
        e.preventDefault();
        onSave();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSave]);
}
