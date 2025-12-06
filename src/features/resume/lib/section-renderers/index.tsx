import React from 'react';
import { renderHeaderSection } from './header-section';
import { renderListSection } from './list-section';
import { renderContentSection } from './content-section';
import { renderInlineListSection } from './inline-list-section';
import { renderBadgeSection } from './badge-section';
import { renderTableSection } from './table-section';
import { renderTwoColumnLayout } from './two-column-layout';

// Main section renderer - routes to appropriate section renderer based on type
export function renderSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
): React.ReactNode {
  // Check if section is hidden
  // Get section ID from different possible sources
  let sectionId = section.id;

  // If no direct ID, try to extract from listPath (e.g., "experience.items" -> "experience")
  if (!sectionId && section.listPath) {
    sectionId = section.listPath.split('.')[0];
  }

  // If still no ID, try to extract from heading path (e.g., "experience.heading" -> "experience")
  if (!sectionId && section.heading?.path) {
    sectionId = section.heading.path.split('.')[0];
  }

  // Map template section IDs to data keys
  // The header and summary sections both store data under 'personalDetails' key
  let dataKey = sectionId;
  if (sectionId === 'header' || sectionId === 'summary') {
    dataKey = 'personalDetails';
  }

  // Check if this section is marked as hidden
  if (dataKey && data[dataKey]?.isHidden === true) {
    return null;
  }

  if (section.type === 'header') return renderHeaderSection(section, data, currentSection, hasSuggestions, isThumbnail);
  if (section.type === 'banner') return renderHeaderSection(section, data, currentSection, hasSuggestions, isThumbnail);
  if (section.type === 'list-section')
    return renderListSection(section, data, currentSection, hasSuggestions, isThumbnail);
  if (section.type === 'two-column-layout')
 return renderTwoColumnLayout(section, data, currentSection, hasSuggestions, isThumbnail, renderSection); 
 if (section.type === 'content-section')
    return renderContentSection(section, data, currentSection, hasSuggestions, isThumbnail);
  if (section.type === 'inline-list-section')
    return renderInlineListSection(section, data, currentSection, hasSuggestions, isThumbnail);
  if (section.type === 'badge-section')
    return renderBadgeSection(section, data, currentSection, hasSuggestions, isThumbnail);
  if (section.type === 'table-section')
    return renderTableSection(section, data, currentSection, hasSuggestions, isThumbnail);
  return null;
}

// Export individual renderers for potential direct use
export {
  renderHeaderSection,
  renderListSection,
  renderContentSection,
  renderInlineListSection,
  renderBadgeSection,
  renderTableSection,
  renderTwoColumnLayout,
};
