import type { SuggestedUpdate } from '@entities/resume';
import { SuggestionType } from '@entities/resume';

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
    .replace(/[•\-\*◦▪▫►▸]/g, '') // Remove bullet characters and hyphens
    .replace(/\s+/g, '') // Remove ALL spaces for comparison
    .toLowerCase() // Convert to lowercase for case-insensitive comparison
    .trim();
};

/**
 * Converts text with \n to proper HTML format for TipTap
 * Handles both plain text and text that already contains HTML tags
 */
const convertTextToHtml = (text: string): string => {
  if (!text) return '';

  // Check if text already contains HTML paragraph tags
  const hasHtmlParagraphs = /<p[^>]*>/.test(text);

  if (hasHtmlParagraphs) {
    // Already has proper HTML structure, return as-is
    return text;
  }

  // Check if text has other HTML tags (like <b>, <strong>, etc.)
  const hasHtmlTags = /<[^>]+>/.test(text);

  if (hasHtmlTags) {
    // Has HTML tags but no paragraphs - split by \n and wrap each in <p>
    const lines = text.split('\n').filter((line) => line.trim());
    if (lines.length === 0) return '';
    if (lines.length === 1) return `<p>${lines[0]}</p>`;
    return lines.map((line) => `<p>${line}</p>`).join('');
  }

  // Plain text - split by \n and wrap in <p> tags
  const lines = text.split('\n').filter((line) => line.trim());
  if (lines.length === 0) return '';
  if (lines.length === 1) return `<p>${lines[0]}</p>`;
  return lines.map((line) => `<p>${line}</p>`).join('');
};

/**
 * Applies suggestions to array fields (like achievements, interests)
 * Finds matching strings in the array and replaces them
 */
export const applySuggestionsToArrayField = (
  currentValue: string[],
  suggestions: Array<{ old?: string; new: string; type: SuggestionType }>,
): string[] => {
  let updatedArray = [...currentValue];

  suggestions.forEach((suggestion) => {
    if (suggestion.old) {
      // Find the index of the string that matches the old value
      const matchIndex = updatedArray.findIndex((item) => item.trim() === suggestion.old?.trim());

      if (matchIndex !== -1) {
        updatedArray[matchIndex] = suggestion.new;
      } else {
        console.log(`✗ No match found for: "${suggestion.old}"`);
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
        if (isHtmlField) {
          updatedValue = convertTextToHtml(suggestion.new);
        } else {
          updatedValue = suggestion.new.replace(/\n/g, ' ');
        }
      } else if (normalizedCurrent.includes(normalizedOld)) {
        // Partial match - find and replace only that sentence within the field

        if (isHtmlField) {
          // Try direct replacement first (works if no HTML tags interrupt the text)

          if (updatedValue.includes(suggestion.old)) {
            // Direct match found - replace as-is
            updatedValue = updatedValue.replace(suggestion.old, suggestion.new.replace(/\n/g, ' '));
          } else {
            // Direct match failed - HTML tags likely interrupt the text
            // Strip HTML tags and decode entities, do replacement on plain text, then re-wrap in HTML
            const plainText = decodeHtmlEntities(updatedValue.replace(/<[^>]*>/g, ''));

            if (plainText.includes(suggestion.old)) {
              const updatedPlainText = plainText.replace(suggestion.old, suggestion.new.replace(/\n/g, ' '));
              // Re-wrap in HTML paragraph tags
              updatedValue = convertTextToHtml(updatedPlainText);
            } else {
              // Last resort: use normalized comparison to find and replace

              const normalizedPlainText = normalizeText(plainText);
              const normalizedOldText = normalizeText(suggestion.old);

              if (normalizedPlainText.includes(normalizedOldText)) {
                // Replace the entire plain text with the new suggestion
                // Since we can't reliably find the exact position, replace the whole field
                updatedValue = convertTextToHtml(suggestion.new);
              } else {
                console.log('✗ Could not find old text even with normalization');
              }
            }
          }
        } else {
          // For plain text, direct replacement

          if (updatedValue.includes(suggestion.old)) {
            updatedValue = updatedValue.replace(suggestion.old, suggestion.new.replace(/\n/g, ' '));
          } else {
            console.log('✗ Could not find old text in plain text content');
          }
        }
      } else {
        console.log('✗ No match found - skipping this suggestion');
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
