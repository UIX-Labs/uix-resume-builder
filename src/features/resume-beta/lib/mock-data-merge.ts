import mockData from '../../../../mock-data.json';
import { syncMockDataWithActualIds } from '@widgets/form-page-builder/lib/data-cleanup';

/**
 * Checks if a field value is empty
 */
export function isFieldEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) {
    if (value.length === 0) return true;
    return value.every((item) => typeof item === 'string' && item.trim() === '');
  }
  if (typeof value === 'object') {
    return Object.entries(value).every(([key, val]) => {
      if (key === 'ongoing') return true;
      return isFieldEmpty(val);
    });
  }
  return false;
}

/**
 * Deep merges form item with mock item, using mock values as fallback for empty fields
 */
export function mergeItemWithMockFallback(
  formItem: Record<string, unknown>,
  mockItem: Record<string, unknown>,
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...formItem };

  for (const [key, mockValue] of Object.entries(mockItem)) {
    if (key === 'id' || key === 'itemId') continue;

    const formValue = formItem[key];

    if (isFieldEmpty(formValue) && !isFieldEmpty(mockValue)) {
      merged[key] = mockValue;
    }
  }

  return merged;
}

/**
 * Gets data for the renderer by merging form data with mock data.
 * For create mode: uses mock data as fallback for empty fields.
 * For edit mode: uses form data directly.
 */
export function getRendererDataWithMockFallback(
  formData: Record<string, unknown>,
  isCreateMode: boolean,
): Record<string, unknown> {
  if (!isCreateMode) {
    return formData;
  }

  const mergedData: Record<string, unknown> = {};
  const mockDataTyped = mockData as Record<string, unknown>;

  const allKeys = new Set([...Object.keys(formData), ...Object.keys(mockDataTyped)]);

  for (const sectionKey of allKeys) {
    if (sectionKey === 'templateId' || sectionKey === 'updatedAt') {
      mergedData[sectionKey] = formData[sectionKey];
      continue;
    }

    const formSection = formData[sectionKey] as Record<string, unknown> | undefined;
    const mockSection = mockDataTyped[sectionKey] as Record<string, unknown> | undefined;

    if (!formSection) {
      if (mockSection) {
        const syncedMock = syncMockDataWithActualIds({ [sectionKey]: formSection }, { [sectionKey]: mockSection });
        mergedData[sectionKey] = syncedMock[sectionKey];
      }
      continue;
    }

    if (!mockSection) {
      mergedData[sectionKey] = formSection;
      continue;
    }

    const mergedSection: Record<string, unknown> = {
      ...formSection,
    };

    if ('id' in formSection) mergedSection.id = formSection.id;
    if ('isHidden' in formSection) mergedSection.isHidden = formSection.isHidden;
    if ('suggestedUpdates' in formSection) mergedSection.suggestedUpdates = formSection.suggestedUpdates;

    const formItems = formSection.items as Array<Record<string, unknown>> | undefined;
    const mockItems = mockSection.items as Array<Record<string, unknown>> | undefined;

    if (Array.isArray(mockItems)) {
      const maxLength = Math.max(formItems?.length || 0, mockItems.length);

      mergedSection.items = Array.from({ length: maxLength }, (_, index) => {
        const formItem = formItems?.[index];
        const mockItem = mockItems[index];

        if (!formItem) {
          return mockItem;
        }

        if (!mockItem) {
          return formItem;
        }

        if (typeof formItem === 'string') {
          return isFieldEmpty(formItem) ? mockItem : formItem;
        }

        if (typeof formItem !== 'object' || formItem === null) {
          return mockItem;
        }

        const merged = mergeItemWithMockFallback(
          formItem as Record<string, unknown>,
          mockItem as Record<string, unknown>,
        );

        if ((formItem as Record<string, unknown>).itemId) {
          merged.itemId = (formItem as Record<string, unknown>).itemId;
        }

        return merged;
      });
    }

    mergedData[sectionKey] = mergedSection;
  }

  return mergedData;
}
