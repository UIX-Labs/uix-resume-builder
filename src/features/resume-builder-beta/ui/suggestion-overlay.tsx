'use client';

import { memo, useCallback } from 'react';
import type { SuggestedUpdate, SuggestedUpdateField } from '@entities/resume/types/resume-data';
import { useSuggestions } from '../hooks/use-suggestions';

interface SuggestionLookup {
  /** Get suggestions for a specific item + field. */
  getFieldSuggestions: (itemId: string, field: string) => SuggestedUpdateField | undefined;
  /** Accept a specific suggestion. */
  accept: (sectionId: string, itemId: string, field: string, index: number, value: string) => void;
  /** Dismiss a specific suggestion. */
  dismiss: (itemId: string, field: string, index: number) => void;
  /** Whether there are any active suggestions at all. */
  hasSuggestions: boolean;
}

/**
 * Hook that provides a lookup API for templates to query suggestions per field.
 * Templates call `getFieldSuggestions(itemId, 'description')` to check if there
 * are any suggestions for that field, and render `SuggestedRichText` instead of
 * plain `RichText` when suggestions exist.
 */
export function useSuggestionLookup(sectionId: string): SuggestionLookup {
  const { suggestions, accept, dismiss } = useSuggestions();

  const getFieldSuggestions = useCallback(
    (itemId: string, field: string): SuggestedUpdateField | undefined => {
      if (!suggestions) return undefined;

      const update = suggestions.find((s: SuggestedUpdate) => s.itemId === itemId);
      if (!update) return undefined;

      return update.fields[field];
    },
    [suggestions],
  );

  const boundAccept = useCallback(
    (itemId: string, field: string, index: number, value: string) => {
      accept(sectionId, itemId, field, index, value);
    },
    [accept, sectionId],
  );

  return {
    getFieldSuggestions,
    accept: (_, itemId, field, index, value) => boundAccept(itemId, field, index, value),
    dismiss,
    hasSuggestions: !!suggestions && suggestions.length > 0,
  };
}

/**
 * Analyze button + suggestion count badge.
 * Shown in the toolbar when suggestions are available.
 */
export const SuggestionBadge = memo(function SuggestionBadge() {
  const { suggestions } = useSuggestions();

  if (!suggestions || suggestions.length === 0) return null;

  const totalCount = suggestions.reduce((sum, update) => {
    return (
      sum +
      Object.values(update.fields).reduce(
        (fieldSum, field) => fieldSum + field.suggestedUpdates.length,
        0,
      )
    );
  }, 0);

  if (totalCount === 0) return null;

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
      {totalCount} suggestion{totalCount !== 1 ? 's' : ''}
    </span>
  );
});
