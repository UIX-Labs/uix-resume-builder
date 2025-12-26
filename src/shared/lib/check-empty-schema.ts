import type { ResumeData } from '@entities/resume';

/**
 * Checks if all string fields in the resume data are empty
 * Useful for determining if a user has started filling out their resume
 */
export function isSchemaEmpty(data: Partial<Omit<ResumeData, 'templateId'>>): boolean {
  if (!data || Object.keys(data).length === 0) {
    return true;
  }

  // Check each section
  for (const section of Object.values(data)) {
    if (!section || typeof section !== 'object') {
      continue;
    }

    // Check if section has items
    if ('items' in section && Array.isArray(section.items)) {
      const items = section.items;

      // If no items, consider empty
      if (items.length === 0) {
        continue;
      }

      // Check if items contain any non-empty values
      for (const item of items) {
        if (typeof item === 'string') {
          // For string arrays (interests, achievements)
          if (item.trim() !== '') {
            return false;
          }
        } else if (typeof item === 'object' && item !== null) {
          // For object items
          const hasNonEmptyField = Object.entries(item).some(([key, value]) => {
            // Skip id, title, itemId, rank, ongoing and metadata fields
            if (key === 'id' || key === 'itemId' || key === 'ongoing' || key === 'rank') {
              return false;
            }

            // Check string values
            if (typeof value === 'string') {
              return value.trim() !== '';
            }

            // Check nested objects (like links, duration)
            if (typeof value === 'object' && value !== null) {
              return Object.values(value).some((v) => typeof v === 'string' && v.trim() !== '');
            }

            // Check arrays
            if (Array.isArray(value)) {
              return value.some((v) => typeof v === 'string' && v.trim() !== '');
            }

            return false;
          });

          if (hasNonEmptyField) {
            return false;
          }
        }
      }
    }
  }

  return true;
}
