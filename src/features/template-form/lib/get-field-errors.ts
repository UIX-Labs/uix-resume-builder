import type { SuggestedUpdates, SuggestionType } from '@entities/resume';

/**
 * Get error counts for a specific field in a specific item
 * Excludes suggestions where old === new (no actual change)
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

  // Get actual suggestions and filter out invalid ones (where old === new)
  const suggestions = fieldData.suggestedUpdates || [];
  const validSuggestions = suggestions.filter((suggestion) => {
    // If there's an old value and it equals the new value, it's invalid
    if (suggestion.old && suggestion.old === suggestion.new) {
      return false;
    }
    return true;
  });

  // Calculate counts from valid suggestions only
  const counts = {
    spellingCount: 0,
    sentenceCount: 0,
    newSummaryCount: 0,
  };

  validSuggestions.forEach((suggestion) => {
    if (suggestion.type === 'spelling_error') {
      counts.spellingCount++;
    } else if (suggestion.type === 'sentence_refinement') {
      counts.sentenceCount++;
    } else if (suggestion.type === 'new_summary') {
      counts.newSummaryCount++;
    }
  });

  return counts;
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
