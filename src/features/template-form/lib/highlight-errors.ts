import type { SuggestedUpdates, SuggestionType } from '@entities/resume';
import { getFieldSuggestions } from './get-field-errors';

function getUnderlineColor(type: SuggestionType): string {
  const colors = {
    spelling_error: '#D97706', // Orange
    sentence_refinement: '#DC2626', // Red
    new_summary: '#10B981', // Green
  };
  return colors[type];
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  const plainText = tempDiv.textContent || tempDiv.innerText || '';

  let highlightedContent = htmlContent;

  suggestions.forEach((suggestion) => {
    if (!suggestion.old) return;

    const color = getUnderlineColor(suggestion.type);

    const plainOldText = suggestion.old.replace(/<[^>]*>/g, '').trim();

    if (!plainText.includes(plainOldText)) {
      return;
    }

    const escapedText = escapeRegex(plainOldText);

    const words = escapedText.split(/\s+/);
    const pattern = words.map((word) => `${word}`).join('(?:\\s*(?:<[^>]*>)?\\s*)');

    const regex = new RegExp(pattern, 'i');

    const match = highlightedContent.match(regex);

    if (match) {
      highlightedContent = highlightedContent.replace(
        regex,
        `<span style="text-decoration: underline; text-decoration-color: ${color}; text-decoration-thickness: 2px; text-underline-offset: 2px;">$&</span>`,
      );
    } else {
      console.log('⚠️ No regex match found for:', plainOldText.substring(0, 50));
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
