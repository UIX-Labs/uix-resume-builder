import React from 'react';
import { cn } from '@shared/lib/cn';
import * as LucideIcons from 'lucide-react';
import { resolvePath } from '../resolve-path';
import { SparkleIndicator } from '../components/SparkleIndicator';
import { renderDivider } from '../components/Divider';
import { hasPendingSuggestions, flattenAndFilterItemsWithContext } from '../section-utils';
import { getArrayValueSuggestions, getSuggestionBackgroundColor } from '@features/template-form/lib/get-field-errors';

export function renderBadgeSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
): React.ReactNode {
  const items = resolvePath(data, section.listPath, []);

  if (!Array.isArray(items) || items.length === 0) return null;

  // Extract parent ID for nested items
  let parentId: string | undefined;
  if (section.listPath.includes('[0].items')) {
    const parentPath = section.listPath.replace(/\[0\]\.items$/, '[0]');
    const parentObj = resolvePath(data, parentPath);
    parentId = parentObj?.id || parentObj?.itemId;
  }

  const flattenedItemsWithContext = flattenAndFilterItemsWithContext(items, section.itemPath, parentId);
  if (flattenedItemsWithContext.length === 0) return null;

  const getIconComponent = (iconName?: string) => {
    if (!iconName) return null;
    // @ts-ignore dynamic lookup
    const Icon = LucideIcons[iconName];
    return Icon || null;
  };

  const sectionId =
    section.id ||
    section.heading?.path?.split('.').pop() ||
    'badge-section';

  const IconComponent = section.icon ? getIconComponent(section.icon) : null;

  const isActive =
    currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();

  const isSummaryForPersonalDetails =
    currentSection?.toLowerCase() === 'personaldetails' &&
    sectionId.toLowerCase() === 'summary';

  const dataKey = sectionId.toLowerCase() === 'summary'
    ? 'professionalSummary'
    : sectionId;

  const sectionSuggestedUpdates = data[dataKey]?.suggestedUpdates;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);

  const shouldBlur =
    !isThumbnail &&
    hasSuggestions &&
    currentSection &&
    !isActive &&
    !isSummaryForPersonalDetails &&
    hasValidSuggestions;

  const shouldHighlight =
    !isThumbnail &&
    hasSuggestions &&
    (isActive || isSummaryForPersonalDetails) &&
    hasValidSuggestions;

  const wrapperStyle: React.CSSProperties = {
    scrollMarginTop: '20px',
    ...(hasSuggestions && {
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
      data-item="section"
      data-section={sectionId}
      className={cn(shouldBlur && 'blur-[2px] pointer-events-none')}
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

        {section.heading.divider && renderDivider(section.heading.divider)}
      </div>

      <div className={cn('flex gap-1 flex-wrap mt-2', section.containerClassName)}>
        {flattenedItemsWithContext.map(({ value, itemId }, idx: number) => {
          const valueSuggestions = getArrayValueSuggestions(
            suggestedUpdates,
            itemId,
            fieldName,
            value,
          );

          const errorBgColor = isThumbnail ? '' : getSuggestionBackgroundColor(valueSuggestions);
          const displayValue = `${section.itemPrefix || ''}${value}${section.itemSuffix || ''}`;

          if (IconComponent) {
            return (
              <div key={idx} className={section.itemClassName}>
                <IconComponent className={section.iconClassName} />
                <span className={cn(section.badgeClassName, errorBgColor)}>
                  {displayValue}
                </span>
              </div>
            );
          }

          return (
            <React.Fragment key={idx}>
              <span className={cn(section.badgeClassName, errorBgColor)}>
                {displayValue}
              </span>
              {idx < flattenedItemsWithContext.length - 1 &&
                section.itemSeparator && (
                  <span>{section.itemSeparator}</span>
                )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
