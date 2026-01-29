import type React from 'react';
import { resolvePath } from '../resolve-path';
import { renderBadgeSection } from './badge-section';
import { renderContentSection } from './content-section';
import { renderHeaderSection } from './header-section';
import { renderInlineListSection } from './inline-list-section';
import { renderListSection } from './list-section';
import { renderTableSection } from './table-section';
import { renderTwoColumnLayout } from './two-column-layout';

// Helper function to check if a section will render (has content and is not hidden)
export function willSectionRender(section: any, data: any): boolean {
  // Get section ID from different possible sources
  let sectionId = section.id;

  if (!sectionId && section.listPath) {
    sectionId = section.listPath.split('.')[0];
  }

  if (!sectionId && section.heading?.path) {
    sectionId = section.heading.path.split('.')[0];
  }

  // Map template section IDs to data keys
  let dataKey = sectionId;
  if (sectionId === 'header' || sectionId === 'summary') {
    dataKey = 'personalDetails';
  }

  // Check if section is hidden
  if (dataKey && data[dataKey]?.isHidden === true) {
    return false;
  }

  // For table-section, check if it has valid items
  if (section.type === 'table-section') {
    const items = resolvePath(data, section.listPath, []);
    if (!Array.isArray(items) || items.length === 0) return false;

    const validItems = items.filter((item: any) => {
      if (!item || typeof item !== 'object') return false;
      return Object.values(item).some((value: any) => {
        if (!value) return false;
        if (typeof value === 'string' && value.trim() === '') return false;
        if (typeof value === 'object') {
          const nestedValues = Object.values(value);
          return nestedValues.some((v: any) => v && (typeof v !== 'string' || v.trim() !== ''));
        }
        return true;
      });
    });

    return validItems.length > 0;
  }
  if (section.type === 'content-section') {
    const value = resolvePath(data, section.content?.path, section.content?.fallback);
    return value && (typeof value !== 'string' || value.trim() !== '');
  }
  return true;
}

// Main section renderer - routes to appropriate section renderer based on type
export function renderSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
  skipImageFallbacks?: boolean,
  hasNextSection?: boolean,
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

  if (section.type === 'header')
    return renderHeaderSection(section, data, currentSection, hasSuggestions, isThumbnail, skipImageFallbacks);
  if (section.type === 'banner')
    return renderHeaderSection(section, data, currentSection, hasSuggestions, isThumbnail, skipImageFallbacks);

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
    return renderTableSection(section, data, currentSection, hasSuggestions, isThumbnail, hasNextSection);
  return null;
}

// Export individual renderers for potential direct use
export {
  renderBadgeSection,
  renderContentSection,
  renderHeaderSection,
  renderInlineListSection,
  renderListSection,
  renderTableSection,
  renderTwoColumnLayout,
};
