import React from 'react';
import { cn } from '@shared/lib/cn';
import { resolvePath } from '../resolve-path';
import { SparkleIndicator } from '../components/SparkleIndicator';
import { renderDivider } from '../components/Divider';
import { hasPendingSuggestions } from '../section-utils';

export function renderContentSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
): React.ReactNode {
  const value = resolvePath(data, section.content.path, section.content.fallback);

  // Check for empty values including empty strings
  if (!value || (typeof value === 'string' && value.trim() === '')) return null;

  const sectionId = section.id || section.heading?.path?.split('.').pop() || 'content-section';
  const sectionIdLower = sectionId.toLowerCase();
  const currentSectionLower = currentSection?.toLowerCase();
  const isActive = currentSection && sectionIdLower === currentSectionLower;
  const isSummarySection = sectionIdLower === 'summary';

  // For summary section, check both professionalSummary and personalDetails suggestions (merged logic)
  let hasValidSuggestions = false;
  if (isSummarySection) {
    const professionalSummarySuggestions = data['professionalSummary']?.suggestedUpdates;
    const personalDetailsSuggestions = data['personalDetails']?.suggestedUpdates;
    hasValidSuggestions = hasPendingSuggestions(professionalSummarySuggestions) || hasPendingSuggestions(personalDetailsSuggestions);
  } else {
    const sectionSuggestedUpdates = data[sectionId]?.suggestedUpdates;
    hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);
  }

  // Highlight summary section when personalDetails, summary, or header is selected (merged sections)
  const isMergedSectionActive = isSummarySection && (
    currentSectionLower === 'personaldetails' ||
    currentSectionLower === 'summary' ||
    currentSectionLower === 'header' ||
    currentSectionLower === 'header-section'
  );

  const shouldBlur =
    !isThumbnail &&
    hasSuggestions &&
    currentSection &&
    !isActive &&
    !isMergedSectionActive &&
    hasValidSuggestions;

  const shouldHighlight =
    !isThumbnail && hasSuggestions && (isActive || isMergedSectionActive) && hasValidSuggestions;

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

  return (
    <div
      className={cn(section.className, shouldBlur && 'blur-[2px] pointer-events-none')}
      data-section={sectionId}
      data-break={section.break}
      style={wrapperStyle}
    >
      {shouldHighlight && <SparkleIndicator />}
      {section.heading && (
        <p className={section.heading.className}>{resolvePath(data, section.heading.path, section.heading.fallback)}</p>
      )}

      {section.divider && renderDivider(section.divider)}

      {section.content.type === 'html' ? (
        <div className={section.content.className} dangerouslySetInnerHTML={{ __html: value }} />
      ) : (
        <p className={section.content.className}>{value}</p>
      )}
    </div>
  );
}
