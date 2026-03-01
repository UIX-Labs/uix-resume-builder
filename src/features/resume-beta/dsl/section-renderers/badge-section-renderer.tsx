import type { SectionRenderer, SectionRenderContext } from '../section-registry';
import type { BadgeSection } from '../template-config';
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
import * as LucideIcons from 'lucide-react';
import React from 'react';

export const badgeSectionRenderer: SectionRenderer<BadgeSection> = {
  type: 'badge-section',

  render(section: BadgeSection, ctx: SectionRenderContext): React.ReactNode {
    const isBreakable = section.break === true || section.breakable === true;
    const items = resolvePath(ctx.data, section.listPath as string, []);
    let parentId: string | undefined;

    if ((section.listPath as string)?.includes('[0].')) {
      const parentPath = (section.listPath as string).replace(/\[0\]\..*$/, '[0]');
      const parentObj = resolvePath(ctx.data, parentPath);
      parentId = parentObj?.itemId || parentObj?.id;
    }

    const flattenedItemsWithContext = flattenAndFilterItemsWithContext(items, (section as any).itemPath, parentId);

    const getIconComponent = (iconName?: string) => {
      if (!iconName) return null;
      const Icon = (LucideIcons as any)[iconName];
      return Icon || null;
    };

    const IconComponent = section.icon ? getIconComponent(section.icon) : null;

    const sectionId = section.id || section.heading?.path?.split('.').pop() || 'badge-section';
    const isActive = ctx.currentSection && sectionId.toLowerCase() === ctx.currentSection.toLowerCase();

    const isSummaryForPersonalDetails =
      ctx.currentSection?.toLowerCase() === 'personaldetails' && sectionId.toLowerCase() === 'summary';

    const dataKey = sectionId.toLowerCase() === 'summary' ? 'professionalSummary' : sectionId;
    const sectionSuggestedUpdates = (ctx.data as any)[dataKey]?.suggestedUpdates;
    const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);

    const shouldBlur =
      !ctx.isThumbnail &&
      ctx.hasSuggestions &&
      ctx.currentSection &&
      !isActive &&
      !isSummaryForPersonalDetails &&
      hasValidSuggestions;
    const shouldHighlight =
      !ctx.isThumbnail && ctx.hasSuggestions && (isActive || isSummaryForPersonalDetails) && hasValidSuggestions;

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

    const sectionKey = (section.listPath as string)?.split('.')[0];

    let fieldName: string | undefined;
    if ((section as any).itemPath) {
      fieldName = (section as any).itemPath;
    } else if ((section.listPath as string)?.includes('[0].')) {
      const parts = (section.listPath as string).split('[0].');
      fieldName = parts[parts.length - 1];
    } else if ((section.listPath as string)?.includes('.')) {
      fieldName = 'items';
    } else {
      fieldName = (section as any).itemPath;
    }

    const suggestedUpdates = sectionKey ? (ctx.data as any)[sectionKey]?.suggestedUpdates : undefined;

    return (
      <div
        data-canbreak={isBreakable ? 'true' : undefined}
        data-item="section"
        data-section={sectionId}
        data-has-breakable-content={isBreakable ? 'true' : undefined}
        className={cn(shouldBlur && 'blur-[2px] pointer-events-none')}
        style={wrapperStyle}
      >
        <div className={cn('flex flex-col', section.heading?.className)}>
          {section.heading && (
            <p data-item="heading">{resolvePath(ctx.data, section.heading.path as string, section.heading.fallback)}</p>
          )}
          {section.heading?.divider && renderDivider(section.heading.divider)}
        </div>

        <div
          className={section.containerClassName || 'flex flex-col gap-2 mt-2'}
          data-canbreak={isBreakable ? 'true' : undefined}
          data-has-breakable-content={isBreakable ? 'true' : undefined}
        >
          {flattenedItemsWithContext.map(({ value, itemId }, idx: number) => {
            const actualValue = extractRenderableValue(value);
            if (actualValue === null) return null;

            const finalItemId = itemId || parentId;
            const valueSuggestions =
              finalItemId && fieldName
                ? getArrayValueSuggestions(suggestedUpdates, finalItemId, fieldName, actualValue)
                : [];
            const errorBgColor = ctx.isThumbnail ? '' : getSuggestionBackgroundColor(valueSuggestions);

            const displayValue = `${section.itemPrefix || ''}${actualValue}${section.itemSuffix || ''}`;
            const html = normalizeMarkdownContent(displayValue);

            const formDataSectionKey =
              sectionKey || (dataKey.toLowerCase() === 'summary' ? 'professionalSummary' : dataKey);
            const suggestionData =
              finalItemId && fieldName && formDataSectionKey
                ? getSuggestionDataAttribute(
                    formDataSectionKey as string,
                    finalItemId,
                    fieldName,
                    valueSuggestions,
                    ctx.isThumbnail,
                  )
                : undefined;
            const hasClickableSuggestions = !!suggestionData;

            if (IconComponent) {
              return (
                <div
                  key={idx}
                  className={(section as any).itemClassName}
                  data-canbreak={isBreakable ? 'true' : undefined}
                >
                  <IconComponent className={(section as any).iconClassName} />
                  <span
                    className={cn(section.badgeClassName, errorBgColor, hasClickableSuggestions && 'cursor-pointer')}
                    data-suggestion={suggestionData}
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for HTML content rendering
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </div>
              );
            }

            return (
              <span key={idx} data-canbreak={isBreakable ? 'true' : undefined}>
                <span
                  className={cn(section.badgeClassName, errorBgColor, hasClickableSuggestions && 'cursor-pointer')}
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
      </div>
    );
  },
};
