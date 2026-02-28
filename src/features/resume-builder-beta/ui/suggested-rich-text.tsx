'use client';

import { memo, useRef, useEffect, useCallback } from 'react';
import type { SuggestedUpdateField } from '@entities/resume/types/resume-data';
import { SuggestionType } from '@entities/resume/types/resume-data';
import { cn } from '@shared/lib/utils';

const UNDERLINE_CLASS: Record<SuggestionType, string> = {
  [SuggestionType.SPELLING_ERROR]:
    'decoration-red-500 decoration-dotted underline decoration-2 underline-offset-2 cursor-pointer',
  [SuggestionType.SENTENCE_REFINEMENT]:
    'decoration-blue-500 decoration-wavy underline decoration-1 underline-offset-2 cursor-pointer',
  [SuggestionType.NEW_SUMMARY]:
    'decoration-green-500 decoration-dashed underline decoration-2 underline-offset-2 cursor-pointer',
};

interface SuggestedRichTextProps {
  html?: string;
  fieldSuggestions?: SuggestedUpdateField;
  onAccept?: (index: number, newValue: string) => void;
  onDismiss?: (index: number) => void;
  className?: string;
  breakable?: boolean;
}

/**
 * Renders HTML content with Grammarly-style suggestion underlines injected via DOM.
 * Uses a ref-based approach: renders the HTML, then walks the DOM to wrap matched text
 * nodes with underline spans. This avoids dangerouslySetInnerHTML re-parsing issues.
 */
export const SuggestedRichText = memo(function SuggestedRichText({
  html,
  fieldSuggestions,
  onAccept,
  onDismiss,
  className,
  breakable = false,
}: SuggestedRichTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply suggestion underlines after each render
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !fieldSuggestions?.suggestedUpdates?.length) return;

    const updates = fieldSuggestions.suggestedUpdates;
    const textContent = el.textContent ?? '';

    for (let i = 0; i < updates.length; i++) {
      const s = updates[i];
      if (!s.old) continue;

      // Walk text nodes to find the match
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let node: Text | null;
      let found = false;

      while ((node = walker.nextNode() as Text | null)) {
        const idx = node.textContent?.indexOf(s.old) ?? -1;
        if (idx === -1) continue;

        // Split the text node and wrap the match
        const before = node.splitText(idx);
        const match = before.splitText(s.old.length);

        const wrapper = document.createElement('span');
        wrapper.className = cn('relative inline group', UNDERLINE_CLASS[s.type]);
        wrapper.setAttribute('data-suggestion-idx', String(i));

        // Popover (shown on hover via CSS group-hover)
        const popover = document.createElement('span');
        popover.className = cn(
          'absolute left-0 top-full z-50 mt-1',
          'hidden group-hover:flex flex-col gap-1.5',
          'w-max max-w-xs p-2.5 rounded-lg shadow-lg',
          'bg-white border border-gray-200',
          'text-xs text-gray-700',
        );
        popover.innerHTML = `
          <span class="font-medium text-gray-900">Suggestion:</span>
          <span class="italic">${escapeHtml(s.new)}</span>
          <span class="flex gap-1.5 mt-1">
            <button type="button" data-action="accept" data-idx="${i}" class="px-2 py-0.5 rounded bg-green-600 text-white text-[10px] font-medium hover:bg-green-700">Accept</button>
            <button type="button" data-action="dismiss" data-idx="${i}" class="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-medium hover:bg-gray-200">Dismiss</button>
          </span>
        `;

        before.parentNode?.replaceChild(wrapper, before);
        wrapper.appendChild(document.createTextNode(s.old));
        wrapper.appendChild(popover);

        found = true;
        break;
      }
    }

    // Handle button clicks via event delegation
    function handleClick(e: Event) {
      const target = e.target as HTMLElement;
      const action = target.getAttribute('data-action');
      const idx = target.getAttribute('data-idx');
      if (!action || idx === null) return;

      const i = parseInt(idx, 10);
      const s = updates[i];
      if (!s) return;

      if (action === 'accept') {
        onAccept?.(i, s.new);
      } else if (action === 'dismiss') {
        onDismiss?.(i);
      }
    }

    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [html, fieldSuggestions, onAccept, onDismiss]);

  if (!html) return null;

  return (
    <div
      ref={containerRef}
      className={cn(className)}
      data-breakable={breakable ? 'true' : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
