/**
 * Shared text utility functions for HTML processing and text normalization
 * Used across suggestion helpers, error highlighting, and data cleanup
 */

/**
 * Decodes HTML entities in a string
 */
export const decodeHtmlEntities = (str: string): string => {
  if (!str) return '';
  return str.replace(/&[#\w]+;/g, (entity) => {
    const entities: Record<string, string> = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&apos;': "'",
      '&nbsp;': ' ',
    };
    return entities[entity] || entity;
  });
};

/**
 * Strips HTML tags from a string and converts to plain text
 * Properly handles <br> tags by converting them to spaces
 */
export const stripHtmlTags = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/<br\s*\/?>/gi, ' ') // Convert <br> tags to spaces FIRST
    .replace(/<\/p>\s*<p[^>]*>/gi, ' ') // Convert paragraph breaks to spaces
    .replace(/<[^>]*>/g, ''); // Remove all remaining HTML tags
};

/**
 * Normalizes whitespace: converts multiple spaces, tabs, newlines to single space
 */
export const normalizeWhitespace = (str: string): string => {
  if (!str) return '';
  return str.replace(/\s+/g, ' ').trim();
};

/**
 * Normalizes text for comparison: removes HTML tags, entities, bullets, spaces, and hyphens for accurate matching
 */
export const normalizeText = (str: string): string => {
  if (!str) return '';
  return (
    stripHtmlTags(str) // Remove HTML tags using proper function
      .replace(/&[#\w]+;/g, (entity) => {
        // Decode HTML entities
        const entities: Record<string, string> = {
          '&amp;': '&',
          '&lt;': '<',
          '&gt;': '>',
          '&quot;': '"',
          '&#39;': "'",
          '&apos;': "'",
          '&nbsp;': ' ',
        };
        return entities[entity] || entity;
      })
      .replace(/[•\-\*◦▪▫►▸]/g, '') // Remove bullet characters and hyphens
      .replace(/\s+/g, '') // Remove ALL spaces for comparison
      .toLowerCase() // Convert to lowercase for case-insensitive comparison
      .trim()
  );
};

/**
 * Escapes special regex characters in a string
 */
export const escapeRegex = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Finds text in a case-insensitive and whitespace-insensitive manner
 * Returns the actual matched text from the source, or null if not found
 */
export const findTextIgnoreCase = (source: string, search: string): { match: string; index: number } | null => {
  if (!source || !search) return null;

  // Normalize both for comparison
  const normalizedSource = normalizeWhitespace(source);
  const normalizedSearch = normalizeWhitespace(search);

  // Create case-insensitive regex with flexible whitespace
  const searchPattern = normalizedSearch
    .split(/\s+/)
    .map(escapeRegex)
    .join('\\s+');

  const regex = new RegExp(searchPattern, 'i');
  const match = normalizedSource.match(regex);

  if (match && match.index !== undefined) {
    return { match: match[0], index: match.index };
  }

  return null;
};
