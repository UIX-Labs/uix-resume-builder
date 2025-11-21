

import type { SuggestedUpdate } from '@entities/resume';
import { SuggestionType } from '@entities/resume';

/**
 * Finds an item in the array by its ID
 * Handles both `itemId` and `id` properties
 */
export const findItemById = (items: unknown[], itemId: string): number => {
  const itemIndex = items.findIndex((item) => {
    if (typeof item === 'object' && item !== null) {
      return (
        (item as Record<string, unknown>).itemId === itemId ||
        (item as Record<string, unknown>).id === itemId
      );
    }
    return false;
  });

  return itemIndex;
};

/**
 * Normalizes text for comparison: removes HTML tags and normalizes whitespace
 */
const normalizeText = (str: string): string => {
  return str
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ')     // Normalize multiple spaces to single space
    .trim();                  // Trim leading/trailing spaces
};

/**
 * Creates a regex that matches text with flexible whitespace
 */
const createFlexibleRegex = (text: string): RegExp => {
  // Escape special regex characters except spaces
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Replace spaces with flexible whitespace pattern
  const flexible = escaped.replace(/\s+/g, '\\s+');
  return new RegExp(flexible, 'gi');
};

/**
 * Applies selected suggestions to a field value
 * Handles both replacement and append operations
 * Uses flexible whitespace matching to handle spacing differences
 */
export const applySuggestionsToFieldValue = (
  currentValue: string,
  suggestions: Array<{ old?: string; new: string; type: SuggestionType }>
): string => {
  let updatedValue = currentValue;

  suggestions.forEach((suggestion) => {
    if (suggestion.old) {
      // Normalize the old text to create a pattern
      const normalizedOld = normalizeText(suggestion.old);

      // Create a flexible regex that allows for varying whitespace
      const regex = createFlexibleRegex(normalizedOld);

      // Replace using the regex
      updatedValue = updatedValue.replace(regex, suggestion.new);
    } else {
      // For new summaries, append to the end
      updatedValue = updatedValue + (updatedValue ? '\n' : '') + suggestion.new;
    }
  });

  return updatedValue;
};

/**
 * Calculates suggestion counts by type
 */
export const calculateSuggestionCounts = (
  suggestions: Array<{ type: SuggestionType }>
): Record<SuggestionType, number> => {
  return {
    [SuggestionType.SPELLING_ERROR]: suggestions.filter(
      (s) => s.type === SuggestionType.SPELLING_ERROR
    ).length,
    [SuggestionType.SENTENCE_REFINEMENT]: suggestions.filter(
      (s) => s.type === SuggestionType.SENTENCE_REFINEMENT
    ).length,
    [SuggestionType.NEW_SUMMARY]: suggestions.filter(
      (s) => s.type === SuggestionType.NEW_SUMMARY
    ).length,
  };
};

/**
 * Removes applied suggestions from the suggested updates array
 * and recalculates counts for remaining suggestions
 */
export const removeAppliedSuggestions = (
  suggestedUpdates: SuggestedUpdate[] | undefined,
  itemId: string,
  fieldName: string,
  appliedSuggestions: Array<{ old?: string; new: string; type: SuggestionType }>
): SuggestedUpdate[] | undefined => {
  if (!suggestedUpdates || !Array.isArray(suggestedUpdates)) {
    return undefined;
  }

  return suggestedUpdates
    .map((update: SuggestedUpdate) => {
      if (update.itemId !== itemId) return update;

      const field = update.fields[fieldName];
      if (!field) return update;

      const remainingSuggestions =
        field.suggestedUpdates?.filter(
          (s) =>
            !appliedSuggestions.some(
              (applied) =>
                applied.old === s.old && applied.new === s.new && applied.type === s.type
            )
        ) || [];

      return {
        ...update,
        fields: {
          ...update.fields,
          [fieldName]: {
            suggestedUpdates: remainingSuggestions,
            fieldCounts: calculateSuggestionCounts(remainingSuggestions),
          },
        },
      };
    })
    .filter((update: SuggestedUpdate) => {
      return Object.values(update.fields).some(
        (field) => field.suggestedUpdates && field.suggestedUpdates.length > 0
      );
    });
};

/**
 * Updates a specific field value in an item
 * Returns a new array with the updated item
 */
export const updateItemFieldValue = (
  items: unknown[],
  itemIndex: number,
  fieldName: string,
  newValue: string
): unknown[] => {
  const updatedItems = [...items];
  const currentItem = items[itemIndex] as Record<string, unknown>;

  const updatedItem = {
    ...currentItem,
    [fieldName]: newValue,
  };

  (updatedItems as Array<Record<string, unknown>>)[itemIndex] = updatedItem;
  return updatedItems;
};


