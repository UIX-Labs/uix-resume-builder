import type { FieldRenderer, FieldRenderContext } from '../field-registry';
import { getFieldSuggestions, getSuggestionBackgroundColor } from '@features/template-form/lib/get-field-errors';
import { getSuggestionDataAttribute } from '@features/resume/lib/suggestion-utils';
import { resolvePath } from '@features/resume/lib/resolve-path';
import { isHtml } from '@shared/lib/markdown';
import { cn } from '@shared/lib/cn';
import React from 'react';

export const textFieldRenderer: FieldRenderer = {
  type: 'text',

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

    const value = field.pathWithFallback
      ? resolvePath(ctx.data, field.pathWithFallback.path, field.pathWithFallback.fallback)
      : resolvePath(ctx.data, field.path, field.fallback);

    if (!value) return null;
    const text = `${field.prefix || ''}${value}${field.suffix || ''}`;
    const hasHtmlTags = isHtml(text);

    if (hasHtmlTags) {
      return (
        <span
          className={cn(field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
          data-suggestion={suggestionData}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for HTML content rendering
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }

    return (
      <span
        className={cn(field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
        data-suggestion={suggestionData}
      >
        {text}
      </span>
    );
  },
};
