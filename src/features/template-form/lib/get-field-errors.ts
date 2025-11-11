import type { SuggestedUpdates, SuggestionType } from '@entities/resume';

/**
 * Get error counts for a specific field in a specific item
 */
export function getFieldErrors(
  suggestedUpdates: SuggestedUpdates | undefined,
  itemId: string,
  fieldName: string,
): {
  spellingCount: number;
  sentenceCount: number;
  newSummaryCount: number;
} {
  if (!suggestedUpdates) {
    return { spellingCount: 0, sentenceCount: 0, newSummaryCount: 0 };
  }

  // Find the update for this specific item
  const itemUpdate = suggestedUpdates.find((update) => update.itemId === itemId);

  if (!itemUpdate || !itemUpdate.fields[fieldName]) {
    return { spellingCount: 0, sentenceCount: 0, newSummaryCount: 0 };
  }

  const fieldData = itemUpdate.fields[fieldName];

  return {
    spellingCount: fieldData.fieldCounts?.spelling_error || 0,
    sentenceCount: fieldData.fieldCounts?.sentence_refinement || 0,
    newSummaryCount: fieldData.fieldCounts?.new_summary || 0,
  };
}

/**
 * Get all suggestions for a specific field in a specific item
 */
export function getFieldSuggestions(
  suggestedUpdates: SuggestedUpdates | undefined,
  itemId: string,
  fieldName: string,
) {
  if (!suggestedUpdates) return [];

  const itemUpdate = suggestedUpdates.find((update) => update.itemId === itemId);

  if (!itemUpdate || !itemUpdate.fields[fieldName]) {
    return [];
  }

  return itemUpdate.fields[fieldName].suggestedUpdates || [];
}
