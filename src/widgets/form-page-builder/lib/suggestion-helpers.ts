import type { SuggestedUpdate } from '@entities/resume';
import { SuggestionType } from '@entities/resume';
import { normalizeMarkdownContent } from '@shared/lib/markdown';

/**
 * Finds an item in the array by its ID
 * Handles both `itemId` and `id` properties
 */
export const findItemById = (items: unknown[], itemId: string): number => {
  const itemIndex = items.findIndex((item) => {
    if (typeof item === 'object' && item !== null) {
      return (item as Record<string, unknown>).itemId === itemId || (item as Record<string, unknown>).id === itemId;
    }
    return false;
  });

  return itemIndex;
};

/**
 * Decodes HTML entities in a string
 */
const decodeHtmlEntities = (str: string): string => {
  return str.replace(/&[#\w]+;/g, (entity) => {
    const entities: Record<string, string> = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&apos;': "'",
      '&nbsp;': ' ',
    };
    return entities[entity] || entity;
  });
};

/**
 * Normalizes text for comparison: removes HTML tags, entities, bullets, spaces, and hyphens for accurate matching
 */
const normalizeText = (str: string): string => {
  return str
    .replace(/<[^>]*>/g, '') // Remove HTML tags FIRST (before decoding entities)
    .replace(/&[#\w]+;/g, (entity) => {
      // Decode HTML entities AFTER removing tags
      const entities: Record<string, string> = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&apos;': "'",
        '&nbsp;': ' ',
      };
      return entities[entity] || entity;
    })
    .replace(/[•\-*◦▪▫►▸]/g, '') // Remove bullet characters and hyphens
    .replace(/\s+/g, '') // Remove ALL spaces for comparison
    .toLowerCase() // Convert to lowercase for case-insensitive comparison
    .trim();
};

/**
 * Converts text (including markdown) to proper HTML format for TipTap
 * Handles markdown syntax, plain text, and existing HTML
 */
const convertTextToHtml = (text: string): string => {
  if (!text) return '';

  return normalizeMarkdownContent(text);
};

/**
 * Applies suggestions to array fields (like achievements, interests)
 * Finds matching strings in the array and replaces them
 * Converts markdown to HTML in the process
 */
export const applySuggestionsToArrayField = (
  currentValue: string[],
  suggestions: Array<{ old?: string; new: string; type: SuggestionType }>,
): string[] => {
  const updatedArray = [...currentValue];

  suggestions.forEach((suggestion) => {
    if (suggestion.old) {
      // Find the index of the string that matches the old value
      const matchIndex = updatedArray.findIndex((item) => item.trim() === suggestion.old?.trim());

      if (matchIndex !== -1) {
        updatedArray[matchIndex] = normalizeMarkdownContent(suggestion.new);
      }
    }
  });

  return updatedArray;
};

/**
 * Applies selected suggestions to a field value
 * Supports both full field replacement and partial (per-sentence) replacement
 */
export const applySuggestionsToFieldValue = (
  currentValue: string,
  suggestions: Array<{ old?: string; new: string; type: SuggestionType }>,
): string => {
  let updatedValue = currentValue;

  suggestions.forEach((suggestion, _index) => {
    if (suggestion.old) {
      const normalizedCurrent = normalizeText(updatedValue);
      const normalizedOld = normalizeText(suggestion.old);

      const isHtmlField = /<[^>]+>/.test(updatedValue);

      if (normalizedCurrent === normalizedOld) {
        updatedValue = convertTextToHtml(suggestion.new);
      } else if (normalizedCurrent.includes(normalizedOld)) {
        // Partial match - find and replace only that sentence within the field

        if (isHtmlField) {
          // Try direct replacement first (works if no HTML tags interrupt the text)

          if (updatedValue.includes(suggestion.old)) {
            const convertedNew = convertTextToHtml(suggestion.new);
            updatedValue = updatedValue.replace(suggestion.old, convertedNew);
          } else {
            // Direct match failed - HTML tags likely interrupt the text
            // Strip HTML tags and decode entities, do replacement on plain text, then re-wrap in HTML
            const plainText = decodeHtmlEntities(updatedValue.replace(/<[^>]*>/g, ''));

            if (plainText.includes(suggestion.old)) {
              const convertedNew = convertTextToHtml(suggestion.new);
              const updatedPlainText = plainText.replace(suggestion.old, convertedNew);
              updatedValue = updatedPlainText;
            } else {
              // Since we can't reliably find the exact position, replace the whole field
              updatedValue = convertTextToHtml(suggestion.new);
            }
          }
        } else {
          // For plain text, direct replacement

          if (updatedValue.includes(suggestion.old)) {
            const convertedNew = convertTextToHtml(suggestion.new);
            updatedValue = updatedValue.replace(suggestion.old, convertedNew);
          }
        }
      }
    } else {
      // For new summaries (no old value), always treat as HTML field

      const newTextHtml = convertTextToHtml(suggestion.new);
      updatedValue = updatedValue + newTextHtml;
    }
  });

  return updatedValue;
};

/**
 * Calculates suggestion counts by type
 */
export const calculateSuggestionCounts = (
  suggestions: Array<{ type: SuggestionType }>,
): Record<SuggestionType, number> => {
  return {
    [SuggestionType.SPELLING_ERROR]: suggestions.filter((s) => s.type === SuggestionType.SPELLING_ERROR).length,
    [SuggestionType.SENTENCE_REFINEMENT]: suggestions.filter((s) => s.type === SuggestionType.SENTENCE_REFINEMENT)
      .length,
    [SuggestionType.NEW_SUMMARY]: suggestions.filter((s) => s.type === SuggestionType.NEW_SUMMARY).length,
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
  appliedSuggestions: Array<{ old?: string; new: string; type: SuggestionType }>,
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
              (applied) => applied.old === s.old && applied.new === s.new && applied.type === s.type,
            ),
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
      return Object.values(update.fields).some((field) => field.suggestedUpdates && field.suggestedUpdates.length > 0);
    });
};

/**
 * Updates a specific field value in an item
 * Returns a new array with the updated item
 * Supports both string and array values
 */
export const updateItemFieldValue = (
  items: unknown[],
  itemIndex: number,
  fieldName: string,
  newValue: string | string[],
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
