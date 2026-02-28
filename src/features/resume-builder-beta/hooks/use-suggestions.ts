'use client';

import { useCallback, useMemo } from 'react';
import { useSuggestionStore, makeDismissKey } from '../stores/suggestion-store';
import { useResumeStore } from '../stores/resume-store';
import type { SuggestedUpdates, SuggestedUpdate } from '@entities/resume';

/**
 * Reads, accepts, and dismisses Grammarly-style suggestions.
 * Filters out dismissed suggestions before returning.
 */
export function useSuggestions() {
  const rawSuggestions = useSuggestionStore((s) => s.suggestions);
  const dismissedKeys = useSuggestionStore((s) => s.dismissedKeys);
  const dismissSuggestion = useSuggestionStore((s) => s.dismissSuggestion);
  const updateSection = useResumeStore((s) => s.updateSection);

  // Filter out dismissed suggestions
  const suggestions = useMemo(() => {
    if (!rawSuggestions) return null;

    return rawSuggestions
      .map((update: SuggestedUpdate) => ({
        ...update,
        fields: Object.fromEntries(
          Object.entries(update.fields).map(([field, data]) => [
            field,
            {
              ...data,
              suggestedUpdates: data.suggestedUpdates.filter(
                (_, idx) => !dismissedKeys.has(makeDismissKey(update.itemId, field, idx)),
              ),
            },
          ]),
        ),
      }))
      .filter((update) =>
        Object.values(update.fields).some((f) => f.suggestedUpdates.length > 0),
      ) as SuggestedUpdates;
  }, [rawSuggestions, dismissedKeys]);

  const accept = useCallback(
    (sectionId: string, itemId: string, field: string, index: number, value: string) => {
      // Apply the suggestion to the resume store
      updateSection(sectionId as any, (draft: any) => {
        const item = draft.items?.find?.((i: any) => i.id === itemId);
        if (item && field in item) {
          (item as any)[field] = value;
        }
      });

      // Dismiss so it doesn't show again
      dismissSuggestion(makeDismissKey(itemId, field, index));
    },
    [updateSection, dismissSuggestion],
  );

  const dismiss = useCallback(
    (itemId: string, field: string, index: number) => {
      dismissSuggestion(makeDismissKey(itemId, field, index));
    },
    [dismissSuggestion],
  );

  return { suggestions, accept, dismiss };
}
