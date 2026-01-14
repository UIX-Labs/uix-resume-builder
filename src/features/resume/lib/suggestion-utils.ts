/**
 * Generate data-suggestion attribute value for DOM manipulation approach
 * Format: "sectionId|itemId|fieldName|suggestionType"
 *
 * This attribute is used by the click handler to identify which suggestions
 * to show when a user clicks on highlighted text in the resume.
 */
export function getSuggestionDataAttribute(
  sectionId: string | undefined,
  itemId: string | undefined,
  fieldName: string | undefined,
  suggestions: any[],
  isThumbnail?: boolean,
): string | undefined {
  if (isThumbnail || !suggestions.length || !sectionId || !itemId || !fieldName) {
    return undefined;
  }

  // Determine primary suggestion type (priority: spelling > sentence > new)
  let suggestionType: 'spelling_error' | 'sentence_refinement' | 'new_summary' = 'spelling_error';
  if (suggestions.some((s) => s.type === 'spelling_error')) {
    suggestionType = 'spelling_error';
  } else if (suggestions.some((s) => s.type === 'sentence_refinement')) {
    suggestionType = 'sentence_refinement';
  } else if (suggestions.some((s) => s.type === 'new_summary')) {
    suggestionType = 'new_summary';
  }

  return `${sectionId}|${itemId}|${fieldName}|${suggestionType}`;
}
