import type { FieldRenderer, FieldRenderContext } from '../field-registry';
import { getFieldSuggestions, getSuggestionBackgroundColor } from '@features/template-form/lib/get-field-errors';
import { getSuggestionDataAttribute } from '@features/resume/lib/suggestion-utils';
import { resolvePath } from '@features/resume/lib/resolve-path';
import { cn } from '@shared/lib/cn';
import React from 'react';

export const linkFieldRenderer: FieldRenderer = {
  type: 'link',

  render(field: any, ctx: FieldRenderContext): React.ReactNode {
    const fieldPath = field.path?.split('.').pop();
    const errorSuggestions = fieldPath ? getFieldSuggestions(ctx.suggestedUpdates, ctx.itemId, fieldPath) : [];
    const errorBgColor = ctx.isThumbnail ? '' : getSuggestionBackgroundColor(errorSuggestions);
    const suggestionData = getSuggestionDataAttribute(
      ctx.sectionId,
      ctx.itemId,
      fieldPath,
      errorSuggestions,
      ctx.isThumbnail,
    );
    const hasSuggestions = !!suggestionData;

    const value = resolvePath(ctx.data, field.path, field.fallback);
    if (!value || (typeof value === 'string' && value.trim() === '')) return null;

    let href = field.href;

    if (href?.includes('{{value}}')) {
      href = href.replace('{{value}}', value);
    } else {
      href = resolvePath(ctx.data, field.href);
      if (!href || (typeof href === 'string' && href.trim() === '')) return null;
    }

    const isValidUrl =
      href &&
      typeof href === 'string' &&
      (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:'));

    if (!isValidUrl) {
      href = '/error/invalid-link';
    }

    return (
      <a
        href={href}
        className={cn(field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
        target="_blank"
        rel="noopener noreferrer"
        data-suggestion={suggestionData}
        onClick={(e) => {
          if (suggestionData) {
            e.preventDefault();
          }
        }}
      >
        {value}
      </a>
    );
  },
};
