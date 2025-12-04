import type { SuggestedUpdates } from '@entities/resume';

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

export function getFieldSuggestions(
  suggestedUpdates: SuggestedUpdates | undefined,
  itemId: string | undefined,
  fieldName: string,
) {

  if (!suggestedUpdates || !itemId) return [];

const itemUpdate = suggestedUpdates.find((update) => update.itemId === itemId);
  if (!itemUpdate || !itemUpdate.fields[fieldName]) {

    return [];
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

  
  return validSuggestions;

  
}

/**
 * Get suggestions for a specific value in an array field
 * Handles both plain strings and objects with name property
 */
export function getArrayValueSuggestions(
  suggestedUpdates: SuggestedUpdates | undefined,
  itemId: string | undefined,
  fieldName: string,
  value: string,
): any[] {
 

  if (!suggestedUpdates || !itemId) {
    return [];
  }

  const suggestions = getFieldSuggestions(suggestedUpdates, itemId, fieldName);

  // Normalize the value for comparison (trim whitespace)
  const normalizedValue = value?.trim();

  // For array fields, filter suggestions that match this value
  const matched = suggestions.filter((suggestion) => {
    if (suggestion.type === 'new_summary') return true;

    // Compare trimmed values for better matching
    const suggestionOld = suggestion.old?.trim();
    const isMatch = suggestionOld === normalizedValue;

    if (!isMatch && suggestion.old) {
    return
    }

    return isMatch;
  });
  return matched;
}

/**
 * Get background color class based on suggestion types
 */
export function getSuggestionBackgroundColor(suggestions: any[]): string {
  if (suggestions.length === 0) return '';

  // Check if any suggestion is a spelling error
  const hasSpellingError = suggestions.some(s => s.type === 'spelling_error');
  if (hasSpellingError) return 'bg-[#FBDDBB]';

  // Check if any suggestion is a sentence refinement (weak sentence)
  const hasSentenceRefinement = suggestions.some(s => s.type === 'sentence_refinement');
  if (hasSentenceRefinement) return 'bg-[#F8BEC2]';

  // Default to sentence refinement color for other error types
  return 'bg-[#F8BEC2]';
}