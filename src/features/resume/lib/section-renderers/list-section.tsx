import React from 'react';
import { cn } from '@shared/lib/cn';
import { resolvePath } from '../resolve-path';
import { SparkleIndicator } from '../components/SparkleIndicator';
import { renderDivider } from '../components/Divider';
import { hasPendingSuggestions } from '../section-utils';
import { renderItemWithRows, renderItemWithFields } from '../field-renderer';

export function renderListSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
): React.ReactNode {
  const rawItems = resolvePath(data, section.listPath, []);

  const items = rawItems.map((item: any) => ({ ...item }));

  if (!Array.isArray(items) || items.length === 0) return null;

  const sectionId =
    section.id ||
    section.heading?.path?.split('.').pop() ||
    'list-section';

  const isActive =
    currentSection &&
    sectionId.toLowerCase() === currentSection.toLowerCase();

  const sectionSuggestedUpdates = data[sectionId]?.suggestedUpdates;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);

  const shouldBlur =
    !isThumbnail &&
    hasSuggestions &&
    currentSection &&
    !isActive &&
    hasValidSuggestions;

  const shouldHighlight =
    !isThumbnail &&
    hasSuggestions &&
    isActive &&
    hasValidSuggestions;

  function RenderListSectionHeading() {
    return (
      <div className={cn('flex flex-col', section.heading.className)}>
        {section.heading && (
          <p data-item="heading">
            {resolvePath(
              data,
              section.heading.path,
              section.heading.fallback,
            )}
          </p>
        )}

        {section.heading.divider &&
          renderDivider(section.heading.divider)}
      </div>
    );
  }

  const wrapperStyle: React.CSSProperties = {
    scrollMarginTop: '20px',
    ...(hasSuggestions && {
      transition:
        'filter 0.3s ease, background-color 0.3s ease, border 0.3s ease',
    }),
    ...(shouldHighlight && {
      backgroundColor: 'rgba(200, 255, 230, 0.35)',
      border: '2px solid rgba(0, 168, 107, 0.4)',
      borderRadius: '12px',
      padding: '16px',
      position: 'relative',
    }),
  };

  const itemWrapperStyle = section.break ? wrapperStyle : {};
  const containerWrapperStyle = section.break ? {} : wrapperStyle;

  // Extract the section key from listPath (example: "experience.items" → "experience")
  const sectionKey = section.listPath?.split('.')[0];

  const suggestedUpdates = sectionKey
    ? (data[sectionKey] as any)?.suggestedUpdates
    : undefined;

  return (
    <div
      data-item="list-section"
      data-canbreak={section.break}
      data-section={sectionId}
      className={shouldBlur ? 'blur-[2px] pointer-events-none' : ''}
      style={containerWrapperStyle}
    >
      {shouldHighlight && <SparkleIndicator />}

      {!section.break && <RenderListSectionHeading />}

      <div
        data-item="content"
        data-canbreak={section.break}
        className={section.containerClassName}
      >
        {items.map((item: any, idx: number) => {
          const itemId = item.itemId || item.id;

          const content = section.itemTemplate.rows
            ? renderItemWithRows(
                section.itemTemplate,
                item,
                itemId,
                suggestedUpdates,
                isThumbnail,
              )
            : renderItemWithFields(
                section.itemTemplate,
                item,
                itemId,
                suggestedUpdates,
                isThumbnail,
              );

          if (section.break && idx === 0) {
            return (
              <div
                key={idx}
                className={cn(
                  section.itemTemplate.className,
                  shouldBlur ? 'blur-[2px] pointer-events-none' : '',
                )}
                style={itemWrapperStyle}
              >
                {shouldHighlight && (
                  <div style={{ position: 'relative' }}>
                    <SparkleIndicator />
                  </div>
                )}

                <RenderListSectionHeading />

                <div className={section.itemTemplate.className}>
                  {content}
                </div>
              </div>
            );
          }
          return (
            <div
              key={idx}
              className={cn(
                section.itemTemplate.className,
                section.break && shouldBlur
                  ? 'blur-[2px] pointer-events-none'
                  : '',
              )}
              style={itemWrapperStyle}
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
