import type { FieldRenderer, FieldRenderContext } from '../field-registry';
import { FieldRegistry } from '../field-registry';
import { getFieldSuggestions, getSuggestionBackgroundColor } from '@features/template-form/lib/get-field-errors';
import { getSuggestionDataAttribute } from '@features/resume/lib/suggestion-utils';
import { resolvePath } from '@features/resume/lib/resolve-path';
import { cn } from '@shared/lib/cn';
import React from 'react';

export const badgeFieldRenderer: FieldRenderer = {
  type: 'badge',

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

    const iconElement = field.icon ? FieldRegistry.renderField(field.icon, ctx) : null;

    const content = (
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full py-1 px-2',
          field.badgeClassName,
          errorBgColor,
          hasSuggestions && 'cursor-pointer',
        )}
        data-suggestion={suggestionData}
      >
        {iconElement}
        {value}
      </span>
    );

    const href = field.hrefPathWithFallback
      ? resolvePath(ctx.data, field.hrefPathWithFallback.path, field.hrefPathWithFallback.fallback)
      : resolvePath(ctx.data, field.href);

    if (href) {
      return (
        <a href={href} className="hover:opacity-80">
          {content}
        </a>
      );
    }

    return content;
  },
};
