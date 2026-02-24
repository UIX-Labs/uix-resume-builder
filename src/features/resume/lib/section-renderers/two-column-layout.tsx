import { cn } from '@shared/lib/cn';
import React from 'react';

export function renderTwoColumnLayout(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
  renderSection?: (
    section: any,
    data: any,
    currentSection?: string,
    hasSuggestions?: boolean,
    isThumbnail?: boolean,
  ) => React.ReactNode,
): React.ReactNode {
  const { leftColumn, rightColumn, className } = section;

  return (
    <div className={cn(className)} data-item="two-column-layout">
      {/* Left Column */}
      {leftColumn && (
        <div className={cn(leftColumn.className)}>
          {leftColumn.sections?.map((subSection: any, idx: number) => {
            const sectionKey = subSection.id || `${subSection.type}-${idx}`;
            return (
              <React.Fragment key={sectionKey}>
                {renderSection?.(subSection, data, currentSection, hasSuggestions, isThumbnail)}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Right Column */}
      {rightColumn.sections?.map((subSection: any, idx: number) => {
        const sectionKey = subSection.id || `${subSection.type}-${idx}`;

        return (
          <React.Fragment key={sectionKey}>
            {renderSection?.(subSection, data, currentSection, hasSuggestions, isThumbnail)}
          </React.Fragment>
        );
      })}
    </div>
  );
}
