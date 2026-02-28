'use client';

import { createContext, useContext, useCallback, type ReactNode } from 'react';
import type { SuggestedUpdateField } from '@entities/resume/types/resume-data';
import { useSuggestions } from '../hooks/use-suggestions';
import type { SuggestedUpdate } from '@entities/resume';

interface SuggestionContextValue {
  getFieldSuggestions: (itemId: string, field: string) => SuggestedUpdateField | undefined;
  acceptSuggestion: (sectionId: string, itemId: string, field: string, index: number, value: string) => void;
  dismissSuggestion: (itemId: string, field: string, index: number) => void;
  hasSuggestions: boolean;
}

const SuggestionCtx = createContext<SuggestionContextValue | null>(null);

export function useSuggestionContext(): SuggestionContextValue | null {
  return useContext(SuggestionCtx);
}

/**
 * Wraps the preview panel so templates can access suggestion data
 * via `useSuggestionContext()` without prop drilling.
 */
export function SuggestionProvider({ children }: { children: ReactNode }) {
  const { suggestions, accept, dismiss } = useSuggestions();

  const getFieldSuggestions = useCallback(
    (itemId: string, field: string): SuggestedUpdateField | undefined => {
      if (!suggestions) return undefined;
      const update = suggestions.find((s: SuggestedUpdate) => s.itemId === itemId);
      return update?.fields[field];
    },
    [suggestions],
  );

  const value: SuggestionContextValue = {
    getFieldSuggestions,
    acceptSuggestion: accept,
    dismissSuggestion: dismiss,
    hasSuggestions: !!suggestions && suggestions.length > 0,
  };

  return <SuggestionCtx value={value}>{children}</SuggestionCtx>;
}
