import type { TwoColumnTemplateSection, TemplateSection } from "@features/resume-beta/models/template-types";
import type { CleanedResumeData } from "@features/resume-beta/models/cleaned-data";
import React from 'react';
import { cn } from '@shared/lib/cn';

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
          {leftColumn.sections?.map((subSection: TemplateSection, idx: number) => (
            <React.Fragment key={idx}>
              {renderSection?.(subSection, data, currentSection, hasSuggestions, isThumbnail)}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Right Column */}
      {rightColumn && (
        <div className={cn(rightColumn.className)}>
          {rightColumn.sections?.map((subSection: TemplateSection, idx: number) => (
            <React.Fragment key={idx}>
              {renderSection?.(subSection, data, currentSection, hasSuggestions, isThumbnail)}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
