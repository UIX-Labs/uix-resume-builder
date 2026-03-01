import type { FieldRenderer, FieldRenderContext } from '../field-registry';
import { FieldRegistry } from '../field-registry';
import { getFieldSuggestions, getSuggestionBackgroundColor } from '@features/template-form/lib/get-field-errors';
import { getSuggestionDataAttribute } from '@features/resume/lib/suggestion-utils';
import { cn } from '@shared/lib/cn';
import React from 'react';

export const inlineGroupFieldRenderer: FieldRenderer = {
  type: 'inline-group',

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

    const renderedItems = field.items
      .map((subField: any, idx: number) => ({
        idx,
        element: FieldRegistry.renderField(subField, ctx),
      }))
      .filter(
        ({ element }: { element: React.ReactNode }) => element !== null && element !== undefined && element !== '',
      );

    if (renderedItems.length === 0) return null;

    const hasContainerClassName = !!field.containerClassName;
    const hasSeparator = !!field.separator;

    const content = renderedItems.map(
      ({ element, idx }: { element: React.ReactNode; idx: number }, arrayIdx: number) => (
        <React.Fragment key={idx}>
          {arrayIdx > 0 && hasSeparator && <span>{field.separator}</span>}
          <span>{element}</span>
        </React.Fragment>
      ),
    );

    const wrapperClassName = hasContainerClassName ? field.containerClassName : field.className;

    if (wrapperClassName) {
      return (
        <div
          className={cn(wrapperClassName)}
          data-canbreak={field.break ? 'true' : undefined}
          data-has-breakable-content={field.break ? 'true' : undefined}
        >
          {content}
        </div>
      );
    }

    return (
      <span className={cn(errorBgColor, hasSuggestions && 'cursor-pointer')} data-suggestion={suggestionData}>
        {content}
      </span>
    );
  },
};
