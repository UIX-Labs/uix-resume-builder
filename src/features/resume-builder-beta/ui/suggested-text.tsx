'use client';

import { memo, useMemo } from 'react';
import type { SuggestedUpdateField } from '@entities/resume/types/resume-data';
import { SuggestionHighlight } from '../templates/primitives/suggestion-highlight';

interface SuggestedTextProps {
  /** The plain text to render (NOT html — for html use SuggestedRichText). */
  text: string;
  /** Suggestion data for this specific field. */
  fieldSuggestions?: SuggestedUpdateField;
  /** Called when the user clicks Accept on a suggestion. */
  onAccept?: (index: number, newValue: string) => void;
  /** Called when the user clicks Dismiss on a suggestion. */
  onDismiss?: (index: number) => void;
  className?: string;
}

/**
 * Renders text with Grammarly-style inline underlines for any suggestions.
 * Matches `old` text within the value to find where to place underlines.
 * If no suggestions, renders children as-is with zero overhead.
 */
export const SuggestedText = memo(function SuggestedText({
  text,
  fieldSuggestions,
  onAccept,
  onDismiss,
  className,
}: SuggestedTextProps) {
  const parts = useMemo(() => {
    if (!fieldSuggestions?.suggestedUpdates?.length || !text) return null;

    // Build a list of match ranges
    const matches: {
      start: number;
      end: number;
      suggestionIndex: number;
      type: SuggestedUpdateField['suggestedUpdates'][number]['type'];
      newValue: string;
    }[] = [];

    for (let i = 0; i < fieldSuggestions.suggestedUpdates.length; i++) {
      const s = fieldSuggestions.suggestedUpdates[i];
      if (!s.old) continue;

      const idx = text.indexOf(s.old);
      if (idx === -1) continue;

      matches.push({
        start: idx,
        end: idx + s.old.length,
        suggestionIndex: i,
        type: s.type,
        newValue: s.new,
      });
    }

    if (matches.length === 0) return null;

    // Sort by position
    matches.sort((a, b) => a.start - b.start);

    // Build segments
    const segments: React.ReactNode[] = [];
    let cursor = 0;

    for (const match of matches) {
      // Skip overlapping matches
      if (match.start < cursor) continue;

      // Plain text before this match
      if (match.start > cursor) {
        segments.push(text.slice(cursor, match.start));
      }

      // Highlighted match
      const matchedText = text.slice(match.start, match.end);
      segments.push(
        <SuggestionHighlight
          key={`s-${match.suggestionIndex}`}
          type={match.type}
          suggestedText={match.newValue}
          onAccept={() => onAccept?.(match.suggestionIndex, match.newValue)}
          onDismiss={() => onDismiss?.(match.suggestionIndex)}
        >
          {matchedText}
        </SuggestionHighlight>,
      );

      cursor = match.end;
    }

    // Remaining text
    if (cursor < text.length) {
      segments.push(text.slice(cursor));
    }

    return segments;
  }, [text, fieldSuggestions, onAccept, onDismiss]);

  if (!parts) {
    return <span className={className}>{text}</span>;
  }

  return <span className={className}>{parts}</span>;
});
