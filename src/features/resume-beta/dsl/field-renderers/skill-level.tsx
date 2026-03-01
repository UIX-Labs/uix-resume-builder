import type { FieldRenderer, FieldRenderContext } from '../field-registry';
import { getFieldSuggestions, getSuggestionBackgroundColor } from '@features/template-form/lib/get-field-errors';
import { getSuggestionDataAttribute } from '@features/resume/lib/suggestion-utils';
import { resolvePath } from '@features/resume/lib/resolve-path';
import { cn } from '@shared/lib/cn';
import React from 'react';

export const skillLevelFieldRenderer: FieldRenderer = {
  type: 'skillLevel',

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

    const levelMap: Record<string, number> = {
      Beginner: 2,
      Intermediate: 3,
      Expert: 5,
    };

    const circleCount = levelMap[value] || 3;

    return (
      <div
        className={cn('flex gap-1', field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
        data-suggestion={suggestionData}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className={cn('w-2 h-2 rounded-full border border-black', index < circleCount ? 'bg-black' : 'bg-gray-400')}
          />
        ))}
      </div>
    );
  },
};
