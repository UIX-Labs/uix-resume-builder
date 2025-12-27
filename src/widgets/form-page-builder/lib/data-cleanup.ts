import { normalizeMarkdownContent } from '@shared/lib/markdown';

/**
 * Removes background-color styles from HTML span tags
 * Used when generating PDFs to remove error highlighting
 */
const removeBackgroundColors = (value: string): string => {
  // Remove background-color from inline styles in span tags
  const cleanValue = value.replace(/<span([^>]*)\sstyle\s*=\s*"([^"]*)"/gi, (_match, beforeStyle, styleContent) => {
    // Remove background-color property from style attribute
    const cleanedStyle = styleContent
      .split(';')
      .filter((rule: string) => !rule.trim().toLowerCase().startsWith('background-color'))
      .join(';');

    // If style is empty after removing background-color, remove the style attribute
    if (!cleanedStyle.trim()) {
      return `<span${beforeStyle}`;
    }

    return `<span${beforeStyle} style="${cleanedStyle}"`;
  });

  return cleanValue;
};

export const getCleanDataForRenderer = (
  data: Record<string, unknown>,
  isGeneratingPdf?: boolean,
): Record<string, unknown> => {
  const cleanData: Record<string, unknown> = {};

  Object.keys(data).forEach((key) => {
    const section = data[key];

    // Skip templateId metadata
    if (key === 'templateId') {
      return;
    }

    if (section && typeof section === 'object') {
      const sectionData = { ...(section as Record<string, unknown>) };

      // Keep suggestedUpdates only when not generating PDF
      if (isGeneratingPdf && sectionData.suggestedUpdates) {
        delete sectionData.suggestedUpdates;
      }

      if (Array.isArray(sectionData.items)) {
        sectionData.items = sectionData.items.map((item) => {
          if (typeof item === 'object' && item !== null) {
            const cleanItem = { ...item } as Record<string, unknown>;

            // Process all string fields: convert markdown to HTML, and remove background colors for PDF
            Object.keys(cleanItem).forEach((itemKey) => {
              const value = cleanItem[itemKey];
              if (typeof value === 'string') {
                // Convert markdown to HTML if not already HTML
                const markdownConverted = normalizeMarkdownContent(value);

                // Remove background colors when generating PDF
                const processedValue = isGeneratingPdf ? removeBackgroundColors(markdownConverted) : markdownConverted;

                cleanItem[itemKey] = processedValue;
              } else if (Array.isArray(value)) {
                // Handle array fields (like achievements, interests)
                cleanItem[itemKey] = value.map((v) => {
                  if (typeof v === 'string') {
                    // Convert markdown to HTML if not already HTML
                    const markdownConverted = normalizeMarkdownContent(v);

                    // Remove background colors when generating PDF
                    return isGeneratingPdf ? removeBackgroundColors(markdownConverted) : markdownConverted;
                  }
                  return v;
                });
              }
            });

            return cleanItem;
          }
          return item;
        });
      }

      cleanData[key] = sectionData;
    } else {
      cleanData[key] = section;
    }
  });

  return cleanData;
};

/**
 * Removes HTML span tags with error highlighting styles from a string
 *
 * @param value - The string potentially containing error highlighting HTML
 * @returns The cleaned string without span tags
 */
const removeErrorHighlighting = (value: string): string => {
  let cleanValue = value;

  // Remove spans with style attribute
  cleanValue = cleanValue.replace(/<span[^>]*\sstyle\s*=\s*[^>]*>(.*?)<\/span>/gi, '$1');

  // Remove any remaining spans with text-decoration in inline style
  cleanValue = cleanValue.replace(/<span[^>]*text-decoration[^>]*>(.*?)<\/span>/gi, '$1');

  return cleanValue;
};

/**
 * Strips all HTML tags from a string for content comparison
 *
 * @param value - The string potentially containing HTML tags
 * @returns The string without any HTML tags
 */
const stripHtmlTags = (value: string): string => {
  return value.replace(/<[^>]*>/g, '').trim();
};

/**
 * Deep comparison of two values, ignoring metadata fields
 */
const deepEqual = (value1: unknown, value2: unknown): boolean => {
  // Handle primitives
  if (value1 === value2) return true;

  // Handle null/undefined
  if (value1 == null || value2 == null) return value1 === value2;

  // Handle different types
  if (typeof value1 !== typeof value2) return false;

  // Handle arrays
  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) return false;
    return value1.every((item, index) => deepEqual(item, value2[index]));
  }

  // Handle objects
  if (typeof value1 === 'object' && typeof value2 === 'object') {
    const obj1 = value1 as Record<string, unknown>;
    const obj2 = value2 as Record<string, unknown>;

    // Ignore metadata and ID fields during comparison
    const ignoredKeys = ['suggestedUpdates', 'updatedAt', 'isHidden', 'id', 'itemId', 'templateId'];
    const keys1 = Object.keys(obj1).filter((key) => !ignoredKeys.includes(key));
    const keys2 = Object.keys(obj2).filter((key) => !ignoredKeys.includes(key));

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => {
      const val1 = obj1[key];
      const val2 = obj2[key];

      // Clean string values before comparison - strip HTML tags and error highlighting
      if (typeof val1 === 'string' && typeof val2 === 'string') {
        const clean1 = stripHtmlTags(removeErrorHighlighting(val1));
        const clean2 = stripHtmlTags(removeErrorHighlighting(val2));
        return clean1 === clean2;
      }

      return deepEqual(val1, val2);
    });
  }

  return false;
};

export interface SectionChangeInfo {
  hasChanges: boolean;
  changedSections: string[];
  sectionDetails: Record<
    string,
    {
      isChanged: boolean;
      previousValue?: unknown;
      currentValue?: unknown;
    }
  >;
}

export const isSectionModified = (
  sectionKey: string,
  currentData: Record<string, unknown>,
  referenceData: Record<string, unknown>,
): boolean => {
  const currentSection = currentData[sectionKey];
  const referenceSection = referenceData[sectionKey];

  return !deepEqual(currentSection, referenceSection);
};

export const syncMockDataWithActualIds = (
  actualData: Record<string, unknown>,
  mockData: Record<string, unknown>,
): Record<string, unknown> => {
  const synced: Record<string, unknown> = { ...mockData };

  // Sync top-level templateId
  if (actualData.templateId) {
    synced.templateId = actualData.templateId;
  }

  // Sync each section's ID and itemIds
  Object.keys(mockData).forEach((sectionKey) => {
    if (sectionKey === 'templateId' || sectionKey === 'updatedAt') {
      return;
    }

    const mockSection = mockData[sectionKey];
    const actualSection = actualData[sectionKey];

    if (!mockSection || typeof mockSection !== 'object') {
      return;
    }

    const syncedSection = { ...mockSection } as Record<string, unknown>;

    // Sync section ID
    if (actualSection && typeof actualSection === 'object') {
      const actualSectionObj = actualSection as Record<string, unknown>;

      if (actualSectionObj.id) {
        syncedSection.id = actualSectionObj.id;
      }

      // Sync itemIds in items array
      const actualItems = actualSectionObj.items;
      if (Array.isArray(syncedSection.items) && Array.isArray(actualItems)) {
        syncedSection.items = syncedSection.items.map((mockItem, index) => {
          if (typeof mockItem === 'object' && mockItem !== null) {
            const actualItem = actualItems[index];
            if (actualItem && typeof actualItem === 'object' && actualItem !== null) {
              const actualItemObj = actualItem as Record<string, unknown>;
              return {
                ...mockItem,
                itemId: actualItemObj.itemId || (mockItem as Record<string, unknown>).itemId,
              };
            }
          }
          return mockItem;
        });
      }
    }

    synced[sectionKey] = syncedSection;
  });

  return synced;
};
