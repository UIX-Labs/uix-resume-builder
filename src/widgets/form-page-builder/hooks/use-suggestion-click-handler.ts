import { useEffect, useRef } from 'react';

export interface SuggestionClickParams {
  sectionId: string;
  itemId: string;
  fieldName: string;
  suggestionType: 'spelling_error' | 'sentence_refinement' | 'new_summary';
}

interface UseSuggestionClickHandlerProps {
  containerRef: React.RefObject<HTMLElement>;
  onSuggestionClick: (params: SuggestionClickParams) => void;
  enabled?: boolean;
}

/**
 * Hook for handling click events on suggestion elements via DOM manipulation
 * Uses event delegation to handle clicks on elements with data-suggestion attribute
 */
export function useSuggestionClickHandler({
  containerRef,
  onSuggestionClick,
  enabled = true,
}: UseSuggestionClickHandlerProps) {
  const handlerRef = useRef(onSuggestionClick);

  // Keep handler ref up to date
  useEffect(() => {
    handlerRef.current = onSuggestionClick;
  }, [onSuggestionClick]);

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find closest element with data-suggestion attribute
      // This handles clicks on nested elements (e.g., clicking on text inside a span)
      const suggestionElement = target.closest('[data-suggestion]') as HTMLElement | null;
      if (!suggestionElement) return;

      const suggestionData = suggestionElement.getAttribute('data-suggestion');
      if (!suggestionData) return;

      try {
        // Parse suggestion data: "sectionId|itemId|fieldName|suggestionType"
        const parts = suggestionData.split('|');
        if (parts.length !== 4) {
          console.warn('Invalid suggestion data format:', suggestionData);
          return;
        }

        const [sectionId, itemId, fieldName, suggestionType] = parts;

        // Validate suggestion type
        if (
          suggestionType !== 'spelling_error' &&
          suggestionType !== 'sentence_refinement' &&
          suggestionType !== 'new_summary'
        ) {
          console.warn('Invalid suggestion type:', suggestionType);
          return;
        }

        // Prevent default link behavior if clicking on a link with suggestions
        if (target.tagName === 'A' || target.closest('a')) {
          e.preventDefault();
        }

        // Call the handler
        handlerRef.current({
          sectionId,
          itemId,
          fieldName,
          suggestionType: suggestionType as 'spelling_error' | 'sentence_refinement' | 'new_summary',
        });
      } catch (error) {
        console.error('Error parsing suggestion data:', error);
      }
    };

    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, [containerRef, enabled]);
}



