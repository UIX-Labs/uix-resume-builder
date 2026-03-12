import { SECTION_TO_FORM_DATA_MAP } from './section-map';

/**
 * Derive the data key for a template section config object,
 * then check whether that section is marked as hidden in the resume data.
 */
export function isSectionHidden(
  section: { id?: string; listPath?: string; heading?: { path?: string } },
  data: Record<string, unknown>,
): boolean {
  let sectionId = section.id;

  if (!sectionId && typeof section.listPath === 'string') {
    sectionId = section.listPath.split('.')[0];
  }
  if (!sectionId && typeof section.heading?.path === 'string') {
    sectionId = section.heading.path.split('.')[0];
  }

  const dataKey = sectionId ? (SECTION_TO_FORM_DATA_MAP[sectionId.toLowerCase()] ?? sectionId) : undefined;
  const dataEntry = dataKey ? data[dataKey] : undefined;
  return !!dataEntry && typeof dataEntry === 'object' && (dataEntry as any).isHidden === true;
}

/**
 * Returns true if an item has at least one non-empty value (recursively checks nested objects).
 */
function isItemNonEmpty(item: Record<string, unknown>): boolean {
  if (!item || typeof item !== 'object') return false;
  return Object.values(item).some((value: unknown) => {
    if (!value) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    if (typeof value === 'object') {
      const nestedValues = Object.values(value as Record<string, unknown>);
      return nestedValues.some((v: unknown) => v && (typeof v !== 'string' || v.trim() !== ''));
    }
    return true;
  });
}

/**
 * Check whether an items array has at least one item with non-empty content.
 */
export function hasValidItems(items: unknown): boolean {
  if (!Array.isArray(items) || items.length === 0) return false;
  return items.some((item) => isItemNonEmpty(item as Record<string, unknown>));
}

/**
 * Filter an items array to only those with non-empty content.
 */
export function filterValidItems(items: Record<string, unknown>[]): Record<string, unknown>[] {
  return items.filter(isItemNonEmpty);
}
