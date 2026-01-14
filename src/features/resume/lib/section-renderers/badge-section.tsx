import type React from 'react';
import { cn } from '@shared/lib/cn';
import * as LucideIcons from 'lucide-react';
import { resolvePath } from '../resolve-path';
import { renderDivider } from '../components/Divider';
import { hasPendingSuggestions, flattenAndFilterItemsWithContext, extractRenderableValue } from '../section-utils';
import { getArrayValueSuggestions, getSuggestionBackgroundColor } from '@features/template-form/lib/get-field-errors';
import { getSuggestionDataAttribute } from '../suggestion-utils';

export function renderBadgeSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
): React.ReactNode {
  const items = resolvePath(data, section.listPath, []);
  let parentId: string | undefined;
  // Extract parent itemId for nested paths like "interests.items[0].items"
  if (section.listPath?.includes('[0].')) {
    // Get parent path by removing everything after [0].
    // e.g., "interests.items[0].items" -> "interests.items[0]"
    const parentPath = section.listPath.replace(/\[0\]\..*$/, '[0]');
    const parentObj = resolvePath(data, parentPath);
    parentId = parentObj?.itemId || parentObj?.id;
  }

  // Flatten nested items structure if needed
  const flattenedItemsWithContext = flattenAndFilterItemsWithContext(items, section.itemPath, parentId);

  // Icon component mapping
  const getIconComponent = (iconName?: string) => {
    if (!iconName) return null;

    // @ts-ignore - Dynamic icon access
    const Icon = LucideIcons[iconName];
    return Icon || null;
  };

  const IconComponent = section.icon ? getIconComponent(section.icon) : null;

  const sectionId = section.id || section.heading?.path?.split('.').pop() || 'badge-section';
  const isActive = currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();

  // Highlight summary section when personalDetails is selected
  const isSummaryForPersonalDetails =
    currentSection?.toLowerCase() === 'personaldetails' && sectionId.toLowerCase() === 'summary';

  const dataKey = sectionId.toLowerCase() === 'summary' ? 'professionalSummary' : sectionId;
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
    !isThumbnail && hasSuggestions && (isActive || isSummaryForPersonalDetails) && hasValidSuggestions;

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

  // Get section key from listPath (e.g., "interests.items[0].items" -> "interests")
  // This matches formData keys
  const sectionKey = section.listPath?.split('.')[0];

  // Extract field name for suggestions lookup
  // The fieldName should be the property within each item that has suggestions
  // For nested arrays like "interests.items[0].items", fieldName is "items" (the nested array)
  // For simple arrays like "skills.items" with itemPath="name", fieldName is "name" (the property)
  let fieldName: string | undefined;

  if (section.itemPath) {
    // If itemPath is specified (e.g., "name" for skills), use it as fieldName
    // This is the property within each item that has suggestions
    fieldName = section.itemPath;
  } else if (section.listPath?.includes('[0].')) {
    // Nested path like "interests.items[0].items" -> "items" (the nested array)
    const parts = section.listPath.split('[0].');
    fieldName = parts[parts.length - 1];
  } else if (section.listPath?.includes('.')) {
    // Path like "interests.items" without itemPath -> default to "items"
    fieldName = 'items';
  } else {
    // No listPath, use itemPath as fallback
    fieldName = section.itemPath;
  }

  const suggestedUpdates = sectionKey ? (data[sectionKey] as any)?.suggestedUpdates : undefined;
  return (
    <div
      data-canbreak={section.break}
      data-item="section"
      data-section={sectionId}
      data-has-breakable-content={section.breakable ? 'true' : 'false'}
      className={cn(shouldBlur && 'blur-[2px] pointer-events-none')}
      style={wrapperStyle}
    >
      {/* {shouldHighlight && <SparkleIndicator />} */}
      <div className={cn('flex flex-col', section.heading.className)}>
        {section.heading && (
          <p data-item="heading">{resolvePath(data, section.heading.path, section.heading.fallback)}</p>
        )}

        {section.heading.divider && renderDivider(section.heading.divider)}
      </div>

      <div className={section.containerClassName || 'flex flex-col gap-2 mt-2'} data-canbreak={section.break}>
        {flattenedItemsWithContext.map(({ value, itemId }, idx: number) => {
          // Extract renderable value - will return null for complex objects
          const actualValue = extractRenderableValue(value);

          // Skip rendering if we can't extract a renderable value
          if (actualValue === null) {
            return null;
          }

          // Ensure itemId is present (it should come from flattenAndFilterItemsWithContext)
          // For badge sections, itemId should be from the parent item (interests.items[0].itemId)
          // If not present, use parentId we extracted earlier
          const finalItemId = itemId || parentId;

          const valueSuggestions =
            finalItemId && fieldName
              ? getArrayValueSuggestions(suggestedUpdates, finalItemId, fieldName, actualValue)
              : [];

          const errorBgColor = isThumbnail ? '' : getSuggestionBackgroundColor(valueSuggestions);

          const displayValue = `${section.itemPrefix || ''}${actualValue}${section.itemSuffix || ''}`;

          // Use sectionKey (which maps to formData) - same pattern as list-section
          // e.g., "interests", "achievements" which matches formData keys
          const formDataSectionKey =
            sectionKey || (dataKey.toLowerCase() === 'summary' ? 'professionalSummary' : dataKey);

          // Create suggestion data attribute if we have all required values
          const suggestionData =
            finalItemId && fieldName && formDataSectionKey
              ? getSuggestionDataAttribute(
                  formDataSectionKey as string,
                  finalItemId,
                  fieldName,
                  valueSuggestions,
                  isThumbnail,
                )
              : undefined;
          const hasClickableSuggestions = !!suggestionData;

          // If icon exists
          if (IconComponent) {
            return (
              <div key={idx} className={section.itemClassName} data-canbreak={section.break ? 'true' : undefined}>
                <IconComponent className={section.iconClassName} />
                <span
                  className={cn(section.badgeClassName, errorBgColor, hasClickableSuggestions && 'cursor-pointer')}
                  data-suggestion={suggestionData}
                >
                  {displayValue}
                </span>
              </div>
            );
          }

          // Default rendering without icon
          return (
            <span key={idx} data-canbreak={section.break ? 'true' : undefined}>
              <span
                className={cn(section.badgeClassName, errorBgColor, hasClickableSuggestions && 'cursor-pointer')}
                data-suggestion={suggestionData}
              >
                {displayValue}
              </span>

              {idx < flattenedItemsWithContext.length - 1 && section.itemSeparator && (
                <span>{section.itemSeparator}</span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
