import type { FieldRenderer, FieldRenderContext } from '../field-registry';
import { getFieldSuggestions, getSuggestionBackgroundColor } from '@features/template-form/lib/get-field-errors';
import { getSuggestionDataAttribute } from '@features/resume/lib/suggestion-utils';
import { resolvePath } from '@features/resume/lib/resolve-path';
import { cn } from '@shared/lib/cn';
import React from 'react';

export const htmlFieldRenderer: FieldRenderer = {
  type: 'html',

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
    if (!value) return null;

    return (
      <div
        className={cn(field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for HTML content rendering
        dangerouslySetInnerHTML={{ __html: value }}
        data-canbreak={field.break !== false ? 'true' : undefined}
        data-has-breakable-content={field.break !== false ? 'true' : undefined}
        data-suggestion={suggestionData}
      />
    );
  },
};
