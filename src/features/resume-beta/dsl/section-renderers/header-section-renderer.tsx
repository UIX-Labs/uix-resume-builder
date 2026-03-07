import type { SectionRenderer, SectionRenderContext } from '../section-registry';
import type { HeaderSection } from '../template-config';
import { FieldRegistry } from '../field-registry';
import { resolvePath } from '@features/resume/lib/resolve-path';
import { hasPendingSuggestions } from '@features/resume/lib/section-utils';
import { getFieldSuggestions, getSuggestionBackgroundColor } from '@features/template-form/lib/get-field-errors';
import { cn } from '@shared/lib/cn';
import React from 'react';

interface HeaderField {
  type?: string;
  path?: string;
  fallback?: string;
  className?: string;
  href?: string;
  separator?: string;
  items?: HeaderField[];
  [key: string]: unknown;
}

export const headerSectionRenderer: SectionRenderer<HeaderSection> = {
  type: 'header',

  render(section: HeaderSection, ctx: SectionRenderContext): React.ReactNode {
    const fields = section.fields as Record<string, HeaderField>;
    const { className, id } = section;

    const hasGenericFields = Object.values(fields).some(
      (field: HeaderField) => field?.type && ['image', 'group', 'text'].includes(field.type),
    );

    const sectionId = id || 'header-section';

    const personalDetailsSuggestions = ctx.data.personalDetails?.suggestedUpdates;
    const professionalSummarySuggestions = ctx.data.professionalSummary?.suggestedUpdates;
    const hasValidPersonalDetailsSuggestions = hasPendingSuggestions(personalDetailsSuggestions);
    const hasValidSummarySuggestions = hasPendingSuggestions(professionalSummarySuggestions);
    const hasValidSuggestions = hasValidPersonalDetailsSuggestions || hasValidSummarySuggestions;

    const personalDetailsItem = ctx.data.personalDetails?.items?.[0];
    const personalDetailsItemId =
      personalDetailsItem && typeof personalDetailsItem === 'object'
        ? ((personalDetailsItem as unknown as Record<string, unknown>).itemId as string | undefined) ||
          ((personalDetailsItem as unknown as Record<string, unknown>).id as string | undefined)
        : undefined;

    const getFieldErrorBgColor = (fieldName: string): string => {
      if (ctx.isThumbnail) return '';
      const suggestions = getFieldSuggestions(personalDetailsSuggestions, personalDetailsItemId, fieldName);
      return getSuggestionBackgroundColor(suggestions);
    };

    const isPersonalDetailsRelated =
      sectionId.toLowerCase() === 'header' ||
      sectionId.toLowerCase() === 'header-section' ||
      sectionId.toLowerCase() === 'profile-picture';
    const isActive = ctx.currentSection && sectionId.toLowerCase() === ctx.currentSection.toLowerCase();

    const currentSectionLower = ctx.currentSection?.toLowerCase();
    const isMergedSectionActive =
      isPersonalDetailsRelated &&
      (currentSectionLower === 'personaldetails' ||
        currentSectionLower === 'summary' ||
        currentSectionLower === 'header' ||
        currentSectionLower === 'header-section' ||
        currentSectionLower === 'profile-picture');

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

    const fieldCtx = {
      data: ctx.data as Record<string, unknown>,
      itemId: personalDetailsItemId,
      suggestedUpdates: personalDetailsSuggestions,
      isThumbnail: ctx.isThumbnail,
      skipImageFallbacks: ctx.skipImageFallbacks,
      sectionId: 'personalDetails',
    };

    if (hasGenericFields) {
      return (
        <div
          className={cn(className, shouldBlur && 'blur-[2px] pointer-events-none')}
          data-section={sectionId}
          style={wrapperStyle}
        >
          {Object.keys(fields).map((key) => (
            <React.Fragment key={key}>{FieldRegistry.renderField(fields[key], fieldCtx)}</React.Fragment>
          ))}
        </div>
      );
    }

    return (
      <div
        className={cn(className, shouldBlur && 'blur-[2px] pointer-events-none')}
        data-section={sectionId}
        style={wrapperStyle}
      >
        {fields.nameTitle ? (
          <div className={fields.nameTitle.className}>
            {fields.name && (
              <p className={cn(fields.name.className, getFieldErrorBgColor('fullName'))}>
                {resolvePath(ctx.data, fields.name.path || '', fields.name.fallback)}
              </p>
            )}
            {fields.title?.path && (
              <p className={cn(fields.title.className, getFieldErrorBgColor('jobTitle'))}>
                {resolvePath(ctx.data, fields.title.path)}
              </p>
            )}
            {fields.description?.path && (
              <div
                className={cn(fields.description.className, getFieldErrorBgColor('description'))}
                // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for HTML content rendering
                dangerouslySetInnerHTML={{
                  __html: resolvePath(ctx.data, fields.description.path, fields.description.fallback) || '',
                }}
              />
            )}
          </div>
        ) : (
          <>
            {fields.name && (
              <p className={cn(fields.name.className, getFieldErrorBgColor('fullName'))}>
                {resolvePath(ctx.data, fields.name.path || '', fields.name.fallback)}
              </p>
            )}
            {fields.title?.path && (
              <p className={cn(fields.title.className, getFieldErrorBgColor('jobTitle'))}>
                {resolvePath(ctx.data, fields.title.path)}
              </p>
            )}
            {fields.description?.path && (
              <div
                className={cn(fields.description.className, getFieldErrorBgColor('description'))}
                // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for HTML content rendering
                dangerouslySetInnerHTML={{
                  __html: resolvePath(ctx.data, fields.description.path, fields.description.fallback) || '',
                }}
              />
            )}
          </>
        )}

        {fields.contact &&
          fields.contact.type === 'contact-grid' &&
          FieldRegistry.renderField(fields.contact, fieldCtx)}

        {fields.contact?.items && (
          <div className={fields.contact.className}>
            {(() => {
              const validItems = fields.contact.items
                .map((item: HeaderField, idx: number) => {
                  const value = resolvePath(ctx.data, item.path || '', item.fallback);
                  if (!value) return null;
                  const fieldName = item.path?.split('.').pop() || '';
                  return { item, value, originalIdx: idx, fieldName };
                })
                .filter(
                  (entry): entry is { item: HeaderField; value: string; originalIdx: number; fieldName: string } =>
                    entry !== null,
                );
              return validItems.map((entry, arrayIdx: number) => {
                const { item, value, originalIdx, fieldName } = entry;
                const showSeparator = arrayIdx > 0 && fields.contact.separator;
                const errorBgColor = getFieldErrorBgColor(fieldName);
                if (item.type === 'link') {
                  const itemHref = item.href || '';
                  const href = itemHref.startsWith('mailto:')
                    ? itemHref.replace('{{value}}', value)
                    : resolvePath(ctx.data, itemHref);
                  const linkProps = itemHref.startsWith('mailto:')
                    ? {}
                    : { target: '_blank' as const, rel: 'noopener noreferrer' };
                  return (
                    <span key={originalIdx}>
                      {showSeparator && fields.contact.separator}
                      <a href={href} className={cn(item.className, errorBgColor)} {...linkProps}>
                        {value}
                      </a>
                    </span>
                  );
                }
                return (
                  <span key={originalIdx}>
                    {showSeparator && fields.contact.separator}
                    <span className={cn(item.className, errorBgColor)}>{value}</span>
                  </span>
                );
              });
            })()}
          </div>
        )}

        {fields.address && (
          <p className={cn(fields.address.className, getFieldErrorBgColor('address'))}>
            {resolvePath(ctx.data, fields.address.path || '', fields.address.fallback)}
          </p>
        )}
      </div>
    );
  },
};

// Banner uses the same renderer as header
export const bannerSectionRenderer: SectionRenderer<HeaderSection> = {
  type: 'banner',
  render: headerSectionRenderer.render,
};
