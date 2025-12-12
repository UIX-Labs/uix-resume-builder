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
  if (!str) return '';
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
 * Strips HTML tags from a string and converts to plain text
 * Properly handles <br> tags by converting them to spaces
 */
const stripHtmlTags = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/<br\s*\/?>/gi, ' ') // Convert <br> tags to spaces FIRST
    .replace(/<\/p>\s*<p[^>]*>/gi, ' ') // Convert paragraph breaks to spaces
    .replace(/<[^>]*>/g, ''); // Remove all remaining HTML tags
};

/**
 * Normalizes text for comparison: removes HTML tags, entities, bullets, spaces, and hyphens for accurate matching
 */
const normalizeText = (str: string): string => {
  if (!str) return '';
  return (
    stripHtmlTags(str) // Remove HTML tags using proper function
      .replace(/&[#\w]+;/g, (entity) => {
        // Decode HTML entities
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
      .trim()
  );
};

/**
 * Splits text into sentences based on punctuation marks
 * Handles abbreviations and bullet points better
 */
const splitIntoSentences = (text: string): string[] => {
  if (!text) return [];

  // First, handle bullet points as separate sentences even without periods
  const bulletPattern = /^[\s]*[•\-\*◦▪▫►▸]\s*/gm;
  const hasBullets = bulletPattern.test(text);

  if (hasBullets) {
    // Split by bullet points
    return text
      .split(/(?=[\s]*[•\-\*◦▪▫►▸]\s+)/)
      .filter((s) => s.trim())
      .map((s) => s.trim());
  }

  // For regular text, split by sentence-ending punctuation
  // This regex handles: period, exclamation, question mark followed by space or end of string
  // But not abbreviations like Dr., Mr., Ph.D., etc.
  return text
    .split(/(?<=[.!?])(?=\s+[A-Z])|(?<=[.!?])$/)
    .filter((s) => s.trim())
    .map((s) => s.trim());
};

/**
 * Escapes special regex characters in a string
 */
const escapeRegex = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Normalizes whitespace: converts multiple spaces, tabs, newlines to single space
 */
const normalizeWhitespace = (str: string): string => {
  if (!str) return '';
  return str.replace(/\s+/g, ' ').trim();
};

/**
 * Finds text in a case-insensitive and whitespace-insensitive manner
 * Returns the actual matched text from the source, or null if not found
 */
const findTextIgnoreCase = (source: string, search: string): { match: string; index: number } | null => {
  if (!source || !search) return null;

  // Normalize both for comparison
  const normalizedSource = normalizeWhitespace(source);
  const normalizedSearch = normalizeWhitespace(search);

  // Create case-insensitive regex with flexible whitespace
  const searchPattern = normalizedSearch
    .split(/\s+/)
    .map(escapeRegex)
    .join('\\s+');

  const regex = new RegExp(searchPattern, 'i');
  const match = normalizedSource.match(regex);

  if (match && match.index !== undefined) {
    return { match: match[0], index: match.index };
  }

  return null;
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
 * Handles case-insensitive matching and whitespace variations
 */
export const applySuggestionsToArrayField = (
  currentValue: string[],
  suggestions: Array<{ old?: string; new: string; type: SuggestionType }>,
): string[] => {
  if (!currentValue || !Array.isArray(currentValue)) return currentValue;

  let updatedArray = [...currentValue];

  suggestions.forEach((suggestion) => {
    if (suggestion.old && suggestion.old.trim() && suggestion.new) {
      const normalizedOld = normalizeText(suggestion.old);

      // Find the index using normalized comparison
      const matchIndex = updatedArray.findIndex((item) => {
        if (!item) return false;
        return normalizeText(item) === normalizedOld;
      });

      if (matchIndex !== -1) {
        updatedArray[matchIndex] = suggestion.new;
      }
    }
  });

  return updatedArray;
};

/**
 * Applies selected suggestions to a field value
 * Rules:
 * 1. Exact Match: If old value matches entire description, replace the whole description
 * 2. Single Point Match: If old value appears in only one sentence, replace only that sentence
 * 3. No Match: If old value not found, do not apply the suggestion
 * 4. Multiple Points Match: If old value appears in multiple sentences, replace all occurrences
 */
export const applySuggestionsToFieldValue = (
  currentValue: string,
  suggestions: Array<{ old?: string; new: string; type: SuggestionType }>,
): string => {
  if (!currentValue) return currentValue;

  let updatedValue = currentValue;

  suggestions.forEach((suggestion) => {
    // Validate suggestion - skip if new value is empty or whitespace-only
    if (!suggestion.new || !suggestion.new.trim()) return;

    if (suggestion.old) {
      // Validate old value - skip if empty or whitespace-only
      if (!suggestion.old.trim()) return;

      const normalizedCurrent = normalizeText(updatedValue);
      const normalizedOld = normalizeText(suggestion.old);

      // Rule 1: Exact Match (Full Paragraph Match)
      if (normalizedCurrent === normalizedOld) {
        const isHtmlField = /<[^>]+>/.test(updatedValue);
        if (isHtmlField) {
          updatedValue = convertTextToHtml(suggestion.new);
        } else {
          updatedValue = suggestion.new.replace(/\n/g, ' ');
        }
        return;
      }

      const isHtmlField = /<[^>]+>/.test(updatedValue);

      if (isHtmlField) {
        // Convert HTML to plain text for analysis
        const plainText = decodeHtmlEntities(stripHtmlTags(updatedValue));
        const normalizedPlainText = normalizeWhitespace(plainText);

        // Check if old value exists in the text (case and whitespace insensitive)
        const matchInfo = findTextIgnoreCase(normalizedPlainText, suggestion.old);

        // Rule 3: No Match Found
        if (!matchInfo) {
          return; // Don't apply suggestion
        }

        // Split into sentences to count matches
        const sentences = splitIntoSentences(plainText);
        const matchingIndices: number[] = [];

        sentences.forEach((sentence, index) => {
          if (normalizeText(sentence).includes(normalizedOld)) {
            matchingIndices.push(index);
          }
        });

        // Rule 2 & 4: Single or Multiple Point Match
        // Replace all occurrences in the text (case-insensitive with flexible whitespace)
        const normalizedOldValue = normalizeWhitespace(suggestion.old);
        const normalizedSearchPattern = normalizedOldValue.split(/\s+/).map(escapeRegex).join('\\s+');

        // Use word boundaries for single-word suggestions to avoid partial matches
        const isSingleWord = !normalizedOldValue.includes(' ');
        const pattern = isSingleWord ? `\\b${normalizedSearchPattern}\\b` : normalizedSearchPattern;

        const regex = new RegExp(pattern, 'gi'); // global and case-insensitive
        const newPlainText = normalizedPlainText.replace(regex, suggestion.new.replace(/\n/g, ' '));

        updatedValue = convertTextToHtml(newPlainText);
      } else {
        // Plain text handling
        const normalizedPlainText = normalizeWhitespace(updatedValue);

        // Check if old value exists in the text (case and whitespace insensitive)
        const matchInfo = findTextIgnoreCase(normalizedPlainText, suggestion.old);

        // Rule 3: No Match Found
        if (!matchInfo) {
          return; // Don't apply suggestion
        }

        // Split into sentences to count matches
        const sentences = splitIntoSentences(updatedValue);
        const matchingIndices: number[] = [];

        sentences.forEach((sentence, index) => {
          if (normalizeText(sentence).includes(normalizedOld)) {
            matchingIndices.push(index);
          }
        });

        // Rule 2 & 4: Single or Multiple Point Match
        // Replace all occurrences (case-insensitive with flexible whitespace)
        const normalizedOldValue = normalizeWhitespace(suggestion.old);
        const normalizedSearchPattern = normalizedOldValue.split(/\s+/).map(escapeRegex).join('\\s+');

        // Use word boundaries for single-word suggestions to avoid partial matches
        const isSingleWord = !normalizedOldValue.includes(' ');
        const pattern = isSingleWord ? `\\b${normalizedSearchPattern}\\b` : normalizedSearchPattern;

        const regex = new RegExp(pattern, 'gi'); // global and case-insensitive
        updatedValue = normalizedPlainText.replace(regex, suggestion.new.replace(/\n/g, ' '));
      }
    } else if (suggestion.old === undefined || suggestion.old === null) {
      // For new summaries (no old value - undefined or null), always treat as HTML field
      // Note: Empty string "" should not reach here due to falsy check above
      const newTextHtml = convertTextToHtml(suggestion.new);
      updatedValue = updatedValue + newTextHtml;
    }
    // If suggestion.old is empty string "", it's handled by the falsy check and skipped
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