import React from 'react';
import { cn } from '@shared/lib/cn';

export function renderTwoColumnLayout(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
  renderSection?: (section: any, data: any, currentSection?: string, hasSuggestions?: boolean, isThumbnail?: boolean) => React.ReactNode,
): React.ReactNode {
  const { leftColumn, rightColumn, className } = section;

  return (
    <div className={cn(className)} data-item="two-column-layout">
      {/* Left Column */}
      {leftColumn && (
        <div className={cn(leftColumn.className)}>
          {leftColumn.sections?.map((subSection: any, idx: number) => (
            <React.Fragment key={idx}>
              {renderSection?.(subSection, data, currentSection, hasSuggestions, isThumbnail)}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Right Column */}
      {rightColumn && (
        <div className={cn(rightColumn.className)}>
          {rightColumn.sections?.map((subSection: any, idx: number) => (
             <React.Fragment key={idx}>
              {renderSection?.(subSection, data, currentSection, hasSuggestions, isThumbnail)}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
