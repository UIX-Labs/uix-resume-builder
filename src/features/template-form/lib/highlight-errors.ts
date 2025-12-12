import type { SuggestedUpdates, SuggestionType } from '@entities/resume';
import { getFieldSuggestions } from './get-field-errors';
import { stripHtmlTags, normalizeWhitespace, normalizeText, escapeRegex } from '@shared/lib/text-utils';

function getUnderlineColor(type: SuggestionType): string {
  const colors = {
    spelling_error: '#D97706', // Orange
    sentence_refinement: '#DC2626', // Red
    new_summary: '#10B981', // Green
  };
  return colors[type];
}

export function highlightErrorsInHTML(
  htmlContent: string,
  suggestedUpdates: SuggestedUpdates | undefined,
  itemId: string,
  fieldName: string,
): string {
  if (!htmlContent || !suggestedUpdates) return htmlContent;

  const suggestions = getFieldSuggestions(suggestedUpdates, itemId, fieldName);

  if (!suggestions || suggestions.length === 0) return htmlContent;

  // Extract plain text for comparison
  const plainText = stripHtmlTags(htmlContent);
  const normalizedPlainText = normalizeText(plainText);

  let highlightedContent = htmlContent;

  suggestions.forEach((suggestion) => {
    // Skip if no old value or empty
    if (!suggestion.old || !suggestion.old.trim()) return;

    const color = getUnderlineColor(suggestion.type);

    // Normalize old text for comparison
    const normalizedOld = normalizeText(suggestion.old);

    // Check if the old value exists in the content (case and whitespace insensitive)
    if (!normalizedPlainText.includes(normalizedOld)) {
      return; // Skip this suggestion if not found
    }

    // OPTIMIZATION: If the entire content matches, wrap everything
    if (normalizedOld === normalizedPlainText) {
      highlightedContent = `<span style="text-decoration: underline; text-decoration-color: ${color}; text-decoration-thickness: 2px; text-underline-offset: 2px;">${highlightedContent}</span>`;
      return;
    }

    // Create a flexible regex pattern that handles:
    // 1. Case-insensitive matching
    // 2. Whitespace variations (multiple spaces, tabs, newlines)
    // 3. Multiple HTML tags between words (e.g., </p><p> for paragraph breaks)
    const normalizedOldValue = normalizeWhitespace(suggestion.old);
    const words = normalizedOldValue.split(/\s+/).map(escapeRegex);

    // For very long texts (>50 words), use a simpler approach
    if (words.length > 50) {
      // Just try to find and highlight the plain text within HTML
      // This avoids regex complexity issues with very long patterns
      const plainOldText = stripHtmlTags(suggestion.old);
      if (plainText.toLowerCase().includes(plainOldText.toLowerCase())) {
        highlightedContent = `<span style="text-decoration: underline; text-decoration-color: ${color}; text-decoration-thickness: 2px; text-underline-offset: 2px;">${highlightedContent}</span>`;
        return;
      }
    }

    // Pattern allows multiple HTML tags and flexible whitespace between words
    // Changed from ? (0 or 1) to * (0 or more) to handle </p><p> paragraph breaks
    const pattern = words.join('(?:\\s*(?:<[^>]*>)*\\s*)');

    const regex = new RegExp(pattern, 'gi'); // global and case-insensitive

    const match = highlightedContent.match(regex);

    if (match) {
      // Replace only the first occurrence to avoid nested spans
      highlightedContent = highlightedContent.replace(
        regex,
        `<span style="text-decoration: underline; text-decoration-color: ${color}; text-decoration-thickness: 2px; text-underline-offset: 2px;">$&</span>`
      );
    }
  });

  return highlightedContent;
}

export function highlightErrorsInText(
  textContent: string,
  suggestedUpdates: SuggestedUpdates | undefined,
  itemId: string,
  fieldName: string,
): { hasErrors: boolean; style?: React.CSSProperties } {
  if (!textContent || !suggestedUpdates) {
    return { hasErrors: false };
  }

  const suggestions = getFieldSuggestions(suggestedUpdates, itemId, fieldName);

  if (!suggestions || suggestions.length === 0) {
    return { hasErrors: false };
  }
  const firstError = suggestions.find((s) => s.old);

  if (!firstError) {
    return { hasErrors: false };
  }

  const color = getUnderlineColor(firstError.type);

  return {
    hasErrors: true,
    style: {
      textDecoration: 'underline',
      textDecorationColor: color,
      textDecorationThickness: '2px',
      textUnderlineOffset: '2px',
    },
  };
}
