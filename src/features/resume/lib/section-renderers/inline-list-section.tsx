import React from 'react';
import { cn } from '@shared/lib/cn';
import { resolvePath } from '../resolve-path';
import { SparkleIndicator } from '../components/SparkleIndicator';
import { renderDivider } from '../components/Divider';
import {
  hasPendingSuggestions,
  flattenAndFilterItemsWithContext,
} from '../section-utils';
import {
  getArrayValueSuggestions,
  getSuggestionBackgroundColor,
} from '@features/template-form/lib/get-field-errors';

export function renderInlineListSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
): React.ReactNode {
  const items = resolvePath(data, section.listPath, []);

  if (!Array.isArray(items) || items.length === 0) return null;

  let parentId: string | undefined;

  if (section.listPath.includes('[0].items')) {
    const parentPath = section.listPath.replace(/\[0\]\.items$/, '[0]');
    const parentObj = resolvePath(data, parentPath);
    parentId = parentObj?.id || parentObj?.itemId;
  }

  const flattenedItemsWithContext = flattenAndFilterItemsWithContext(
    items,
    section.itemPath,
    parentId,
  );

  if (flattenedItemsWithContext.length === 0) return null;

  const sectionId =
    section.id ||
    section.heading?.path?.split('.').pop() ||
    'inline-list-section';

  const isActive =
    currentSection &&
    sectionId.toLowerCase() === currentSection.toLowerCase();

  const dataKey =
    sectionId.toLowerCase() === 'summary'
      ? 'professionalSummary'
      : sectionId;

  const sectionSuggestedUpdates = data[dataKey]?.suggestedUpdates;

  const hasValidSuggestions =
    hasPendingSuggestions(sectionSuggestedUpdates);

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


  const sectionKey = section.listPath?.split('.')[0];

  const fieldName = section.listPath.includes('[0].')
    ? section.listPath.split('[0].').pop()
    : section.itemPath;

  const suggestedUpdates = sectionKey
    ? (data[sectionKey] as any)?.suggestedUpdates
    : undefined;


  return (
    <div
      data-break={section.break}
      data-section={sectionId}
      className={cn(
        shouldBlur && 'blur-[2px] pointer-events-none',
      )}
      style={wrapperStyle}
    >
      {shouldHighlight && <SparkleIndicator />}

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

      <div data-item="content" data-break={section.break}>
        {flattenedItemsWithContext.map(
          ({ value, itemId }, idx: number) => {
            const valueSuggestions = getArrayValueSuggestions(
              suggestedUpdates,
              itemId,
              fieldName,
              value,
            );

            const errorBgColor = isThumbnail
              ? ''
              : getSuggestionBackgroundColor(
                  valueSuggestions,
                );

            return (
              <span key={idx}>
                <span
                  className={cn(
                    section.itemClassName,
                    errorBgColor,
                  )}
                >
                  {value}
                </span>

                {idx <
                  flattenedItemsWithContext.length - 1 &&
                  section.itemSeparator && (
                    <span>{section.itemSeparator}</span>
                  )}
              </span>
            );
          },
        )}
      </div>
    </div>
  );
}
