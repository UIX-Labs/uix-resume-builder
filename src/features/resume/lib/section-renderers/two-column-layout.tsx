import type { CleanedResumeData } from '@features/resume-beta/models/cleaned-data';
import type { TemplateSection, TwoColumnTemplateSection } from '@features/resume-beta/models/template-types';
import { cn } from '@shared/lib/cn';
import React from 'react';

export function renderTwoColumnLayout(
  section: TwoColumnTemplateSection,
  data: CleanedResumeData,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
  renderSection?: (
    section: TemplateSection,
    data: CleanedResumeData,
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
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              <React.Fragment key={idx}>
                {renderSection?.(subSection, data, currentSection, hasSuggestions, isThumbnail)}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Right Column */}
      {rightColumn.sections?.map((subSection: any, idx: number) => {
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: static list
          <React.Fragment key={idx}>
            {renderSection?.(subSection, data, currentSection, hasSuggestions, isThumbnail)}
          </React.Fragment>
        );
      })}
    </div>
  );
}
