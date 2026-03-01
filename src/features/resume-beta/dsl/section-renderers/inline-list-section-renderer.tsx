import type { SectionRenderer, SectionRenderContext } from '../section-registry';
import type { InlineListSection } from '../template-config';
import { resolvePath } from '@features/resume/lib/resolve-path';
import { renderDivider } from '@features/resume/lib/components/Divider';
import {
  hasPendingSuggestions,
  flattenAndFilterItemsWithContext,
  extractRenderableValue,
} from '@features/resume/lib/section-utils';
import { getArrayValueSuggestions, getSuggestionBackgroundColor } from '@features/template-form/lib/get-field-errors';
import { getSuggestionDataAttribute } from '@features/resume/lib/suggestion-utils';
import { normalizeMarkdownContent } from '@shared/lib/markdown';
import { cn } from '@shared/lib/cn';
import React from 'react';

export const inlineListSectionRenderer: SectionRenderer<InlineListSection> = {
  type: 'inline-list-section',

  render(section: InlineListSection, ctx: SectionRenderContext): React.ReactNode {
    const isBreakable = section.break === true || section.breakable === true;
    const items = resolvePath(ctx.data, section.listPath as string, []);
    let parentId: string | undefined;

    if ((section.listPath as string)?.includes('[0].items')) {
      const parentPath = (section.listPath as string).replace(/\[0\]\.items$/, '[0]');
      const parentObj = resolvePath(ctx.data, parentPath);
      parentId = parentObj?.itemId || parentObj?.id;
    }

    const flattenedItemsWithContext = flattenAndFilterItemsWithContext(
      items,
      section.itemPath as string | undefined,
      parentId,
    );

    const sectionId = section.id || section.heading?.path?.split('.').pop() || 'inline-list-section';
    const isActive = ctx.currentSection && sectionId.toLowerCase() === ctx.currentSection.toLowerCase();

    const sectionKey = (section.listPath as string)?.split('.')[0];
    const sectionSuggestedUpdates = sectionKey ? (ctx.data as any)[sectionKey]?.suggestedUpdates : undefined;
    const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);

    const shouldBlur = !ctx.isThumbnail && ctx.hasSuggestions && ctx.currentSection && !isActive && hasValidSuggestions;
    const shouldHighlight = !ctx.isThumbnail && ctx.hasSuggestions && isActive && hasValidSuggestions;

    const wrapperStyle: React.CSSProperties = {
      scrollMarginTop: '20px',
      ...(ctx.hasSuggestions && {
        transition: 'filter 0.3s ease, background-color 0.3s ease, border 0.3s ease',
      }),
      ...(shouldHighlight && {
        backgroundColor: 'rgba(200, 255, 230, 0.35)',
        border: '2px solid rgba(0, 168, 107, 0.4)',
        borderRadius: '12px',
        padding: '16px',
        position: 'relative',
      }),
    };

    let fieldName: string | undefined;
    if (section.itemPath) {
      fieldName = section.itemPath as string;
    } else if ((section.listPath as string)?.includes('[0].')) {
      const parts = (section.listPath as string).split('[0].');
      fieldName = parts[parts.length - 1];
    } else if ((section.listPath as string)?.includes('.')) {
      fieldName = 'items';
    } else {
      fieldName = section.itemPath as string | undefined;
    }

    const suggestedUpdates = sectionSuggestedUpdates;

    return (
      <div
        data-break={section.break}
        data-canbreak={isBreakable ? 'true' : undefined}
        data-has-breakable-content={isBreakable ? 'true' : undefined}
        data-section={sectionId}
        className={cn(shouldBlur && 'blur-[2px] pointer-events-none')}
        style={wrapperStyle}
      >
        <div className={cn('flex flex-col', section.heading?.className)}>
          {section.heading && (
            <p data-item="heading">{resolvePath(ctx.data, section.heading.path as string, section.heading.fallback)}</p>
          )}
          {section.heading?.divider && renderDivider(section.heading.divider)}
        </div>

        <div data-item="content" data-break={section.break} data-canbreak={isBreakable ? 'true' : undefined}>
          {section.showBullet ? (
            <ul className={cn('list-disc list-outside pl-6', section.containerClassName)}>
              {flattenedItemsWithContext.map(({ value, itemId }, idx: number) => {
                const actualValue = extractRenderableValue(value);
                if (actualValue === null) return null;
                const html = normalizeMarkdownContent(actualValue);
                const finalItemId = itemId || parentId;
                const valueSuggestions =
                  finalItemId && fieldName
                    ? getArrayValueSuggestions(suggestedUpdates, finalItemId, fieldName, actualValue)
                    : [];
                const errorBgColor = ctx.isThumbnail ? '' : getSuggestionBackgroundColor(valueSuggestions);
                const formDataSectionKey = sectionKey || sectionId;
                const suggestionData =
                  finalItemId && fieldName && formDataSectionKey
                    ? getSuggestionDataAttribute(
                        formDataSectionKey,
                        finalItemId,
                        fieldName,
                        valueSuggestions,
                        ctx.isThumbnail,
                      )
                    : undefined;
                const hasClickableSuggestions = !!suggestionData;

                return (
                  <li
                    key={idx}
                    className={cn(
                      section.itemClassName,
                      errorBgColor,
                      hasClickableSuggestions && 'cursor-pointer',
                      'list-item',
                    )}
                    data-suggestion={suggestionData}
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for HTML content rendering
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                );
              })}
            </ul>
          ) : (
            <div className={section.containerClassName}>
              {flattenedItemsWithContext.map(({ value, itemId }, idx: number) => {
                const actualValue = extractRenderableValue(value);
                if (actualValue === null) return null;
                const html = normalizeMarkdownContent(actualValue);
                const finalItemId = itemId || parentId;
                const valueSuggestions =
                  finalItemId && fieldName
                    ? getArrayValueSuggestions(suggestedUpdates, finalItemId, fieldName, actualValue)
                    : [];
                const errorBgColor = ctx.isThumbnail ? '' : getSuggestionBackgroundColor(valueSuggestions);
                const formDataSectionKey = sectionKey || sectionId;
                const suggestionData =
                  finalItemId && fieldName && formDataSectionKey
                    ? getSuggestionDataAttribute(
                        formDataSectionKey,
                        finalItemId,
                        fieldName,
                        valueSuggestions,
                        ctx.isThumbnail,
                      )
                    : undefined;
                const hasClickableSuggestions = !!suggestionData;

                return (
                  <span key={idx}>
                    <span
                      className={cn(section.itemClassName, errorBgColor, hasClickableSuggestions && 'cursor-pointer')}
                      data-suggestion={suggestionData}
                      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for HTML content rendering
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                    {idx < flattenedItemsWithContext.length - 1 && section.itemSeparator && (
                      <span>{section.itemSeparator}</span>
                    )}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  },
};
