import type { SectionRenderer, SectionRenderContext } from '../section-registry';
import type { ContentSection } from '../template-config';
import { resolvePath } from '@features/resume/lib/resolve-path';
import { renderDivider } from '@features/resume/lib/components/Divider';
import { hasPendingSuggestions } from '@features/resume/lib/section-utils';
import { getFieldSuggestions, getSuggestionBackgroundColor } from '@features/template-form/lib/get-field-errors';
import { getSuggestionDataAttribute } from '@features/resume/lib/suggestion-utils';
import { isHtml } from '@shared/lib/markdown';
import { cn } from '@shared/lib/cn';
import React from 'react';

export const contentSectionRenderer: SectionRenderer<ContentSection> = {
  type: 'content-section',

  willRender(section: ContentSection, ctx: SectionRenderContext): boolean {
    const value = resolvePath(ctx.data, section.content?.path as string, section.content?.fallback);
    return value && (typeof value !== 'string' || value.trim() !== '');
  },

  render(section: ContentSection, ctx: SectionRenderContext): React.ReactNode {
    const value = resolvePath(ctx.data, section.content.path as string, section.content.fallback);
    if (!value || (typeof value === 'string' && value.trim() === '')) return null;

    const sectionId = section.id || section.heading?.path?.split('.').pop() || 'content-section';
    const sectionIdLower = sectionId.toLowerCase();
    const currentSectionLower = ctx.currentSection?.toLowerCase();
    const isActive = ctx.currentSection && sectionIdLower === currentSectionLower;
    const isSummarySection = sectionIdLower === 'summary';

    let formDataSectionKey: string | undefined;
    let itemId: string | undefined;
    let fieldName: string | undefined;

    if (section.content.path) {
      const pathParts = (section.content.path as string).split('.');
      formDataSectionKey = pathParts[0];
      fieldName = pathParts[pathParts.length - 1];

      if ((section.content.path as string).includes('items[0]') && formDataSectionKey) {
        const sectionData = (ctx.data as any)[formDataSectionKey];
        const firstItem = sectionData?.items?.[0];
        itemId = firstItem?.itemId || firstItem?.id;
      }
    }

    if (isSummarySection && (!formDataSectionKey || !itemId)) {
      if (!formDataSectionKey) formDataSectionKey = 'personalDetails';
      if (!fieldName) fieldName = 'description';
      if (!itemId) {
        const sectionData = (ctx.data as any)[formDataSectionKey];
        const firstItem = sectionData?.items?.[0];
        itemId = firstItem?.itemId || firstItem?.id;
      }
    }

    let fieldSuggestions: ReturnType<typeof getFieldSuggestions> = [];
    if (formDataSectionKey && itemId && fieldName) {
      const sectionSuggestedUpdates = (ctx.data as any)[formDataSectionKey]?.suggestedUpdates;
      fieldSuggestions = getFieldSuggestions(sectionSuggestedUpdates, itemId, fieldName);
    }

    const errorBgColor = ctx.isThumbnail ? '' : getSuggestionBackgroundColor(fieldSuggestions);
    const suggestionData = getSuggestionDataAttribute(
      formDataSectionKey,
      itemId,
      fieldName,
      fieldSuggestions,
      ctx.isThumbnail,
    );
    const hasClickableSuggestions = !!suggestionData;

    let hasValidSuggestions = false;
    if (formDataSectionKey) {
      const sectionSuggestedUpdates = (ctx.data as any)[formDataSectionKey]?.suggestedUpdates;
      hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);
    }

    const isMergedSectionActive =
      isSummarySection &&
      (currentSectionLower === 'personaldetails' ||
        currentSectionLower === 'summary' ||
        currentSectionLower === 'header' ||
        currentSectionLower === 'header-section');

    const shouldBlur =
      !ctx.isThumbnail &&
      ctx.hasSuggestions &&
      ctx.currentSection &&
      !isActive &&
      !isMergedSectionActive &&
      hasValidSuggestions;
    const shouldHighlight =
      !ctx.isThumbnail && ctx.hasSuggestions && (isActive || isMergedSectionActive) && hasValidSuggestions;

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

    return (
      <div
        className={cn(section.className, shouldBlur && 'blur-[2px] pointer-events-none')}
        data-section={sectionId}
        data-canbreak={section.break ? 'true' : undefined}
        data-has-breakable-content={section.break ? 'true' : undefined}
        style={wrapperStyle}
      >
        {section.heading && (
          <p className={section.heading.className}>
            {resolvePath(ctx.data, section.heading.path as string, section.heading.fallback)}
          </p>
        )}

        {section.divider && renderDivider(section.divider)}

        {section.content.type === 'html' || (typeof value === 'string' && isHtml(value)) ? (
          <div
            className={cn(section.content.className, errorBgColor, hasClickableSuggestions && 'cursor-pointer')}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for HTML content rendering
            dangerouslySetInnerHTML={{ __html: value }}
            data-canbreak={section.break ? 'true' : undefined}
            data-suggestion={suggestionData}
          />
        ) : (
          <p
            className={cn(section.content.className, errorBgColor, hasClickableSuggestions && 'cursor-pointer')}
            data-suggestion={suggestionData}
          >
            {value}
          </p>
        )}
      </div>
    );
  },
};
