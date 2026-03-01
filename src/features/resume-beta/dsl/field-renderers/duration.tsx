import type { FieldRenderer, FieldRenderContext } from '../field-registry';
import { getFieldSuggestions, getSuggestionBackgroundColor } from '@features/template-form/lib/get-field-errors';
import { getSuggestionDataAttribute } from '@features/resume/lib/suggestion-utils';
import { resolvePath } from '@features/resume/lib/resolve-path';
import { cn } from '@shared/lib/cn';
import dayjs from 'dayjs';
import React from 'react';

export const durationFieldRenderer: FieldRenderer = {
  type: 'duration',

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

    const duration = resolvePath(ctx.data, field.path, field.fallback);
    if (!duration) return null;

    if (duration.startDate && duration.endDate) {
      const start = dayjs(duration.startDate).format('MMM YYYY');
      const end = dayjs(duration.endDate).format('MMM YYYY');
      return (
        <span
          className={cn(field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
          data-suggestion={suggestionData}
        >{`${start} - ${end}`}</span>
      );
    }

    if (duration.startDate && duration.ongoing) {
      const start = dayjs(duration.startDate).format('MMM YYYY');
      return (
        <span
          className={cn(field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
          data-suggestion={suggestionData}
        >{`${start} - Present`}</span>
      );
    }

    return null;
  },
};
