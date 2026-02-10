import { resolvePath } from './resolve-path';

/**
 * Checks if a value is a renderable primitive (string, number, boolean).
 * Complex objects should not be rendered directly as React children.
 */
export function isRenderablePrimitive(value: any): boolean {
  const type = typeof value;
  return type === 'string' || type === 'number' || type === 'boolean';
}

/**
 * Extracts a renderable value from a potentially complex object.
 * If the value is a primitive, returns it as a string.
 * If it's an object with a 'value' property, extracts that.
 * Otherwise returns null to indicate it cannot be rendered.
 */
export function extractRenderableValue(value: any): string | null {
  if (value == null) return null;

  // If it's already a renderable primitive, convert to string
  if (isRenderablePrimitive(value)) {
    return String(value);
  }

  // If it's an object with a 'value' property, extract it
  if (typeof value === 'object' && 'value' in value) {
    return extractRenderableValue(value.value);
  }

  // Complex object that can't be rendered directly
  return null;
}

export function flattenAndFilterItemsWithContext(
  items: any[],
  itemPath?: string,
  parentId?: string,
): Array<{ value: any; itemId?: string }> {
  const flattenedItems: Array<{ value: any; itemId?: string }> = [];

  items.forEach((item: any) => {
    // Use item's own ID, or fall back to parentId if item is a primitive (string)
    const itemId = item.itemId || item.id || parentId;
    const value = itemPath ? resolvePath(item, itemPath) : item;

    if (Array.isArray(value)) {
      const filtered = value.filter((v: any) => v && (typeof v !== 'string' || v.trim() !== ''));

      flattenedItems.push(
        ...filtered.map((v: any) => {
          return {
            value: v,
            itemId,
          };
        }),
      );
    } else if (value && (typeof value !== 'string' || value.trim() !== '')) {
      flattenedItems.push({ value, itemId });
    }
  });

  return flattenedItems;
}

export function hasPendingSuggestions(suggestedUpdates: any[] | undefined): boolean {
  if (!suggestedUpdates || !Array.isArray(suggestedUpdates)) {
    return false;
  }

  return suggestedUpdates.some((update: any) => {
    if (!update.fields) return false;

    // Check each field in the update
    return Object.values(update.fields).some((fieldData: any) => {
      if (!fieldData.suggestedUpdates || !Array.isArray(fieldData.suggestedUpdates)) {
        return false;
      }

      // Check if there are any valid suggestions (where old !== new)
      return fieldData.suggestedUpdates.some((suggestion: any) => {
        // If old equals new, it's not a valid suggestion
        if (suggestion.old && suggestion.old === suggestion.new) {
          return false;
        }
        return true;
      });
    });
  });
}
