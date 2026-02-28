'use client';

import { useCallback, useEffect } from 'react';
import { useResumeStore } from '../stores/resume-store';

/**
 * Undo/redo via Zundo temporal store + keyboard shortcuts (Ctrl+Z / Ctrl+Shift+Z).
 */
export function useUndoRedo() {
  const temporalStore = useResumeStore.temporal;

  const undo = useCallback(() => {
    temporalStore.getState().undo();
  }, [temporalStore]);

  const redo = useCallback(() => {
    temporalStore.getState().redo();
  }, [temporalStore]);

  const canUndo = temporalStore.getState().pastStates.length > 0;
  const canRedo = temporalStore.getState().futureStates.length > 0;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      if (!isMod || e.key.toLowerCase() !== 'z') return;

      e.preventDefault();
      if (e.shiftKey) {
        redo();
      } else {
        undo();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  return { undo, redo, canUndo, canRedo };
}
