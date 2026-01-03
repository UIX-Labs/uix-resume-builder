import type { ResumeData } from '../types/resume-data';
import { getResumeData, getResumeEmptyData } from '../api';

// Deep merge utility to fill missing fields from source into target
function deepMerge(target: any, source: any): any {
  if (source === null || source === undefined) return target;
  if (target === null || target === undefined) return source;

  const result = { ...target };

  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = result[key];

    if (key === 'items' && Array.isArray(sourceValue)) {
      result[key] = mergeItemsArray(targetValue, sourceValue);
    } else if (Array.isArray(sourceValue)) {
      result[key] = targetValue ?? sourceValue;
    } else if (typeof sourceValue === 'object' && sourceValue !== null) {
      result[key] = deepMerge(targetValue, sourceValue);
    } else {
      result[key] = targetValue ?? sourceValue;
    }
  }

  return result;
}

function mergeItemsArray(targetItems: any, sourceItems: any[]): any[] {
  if (!Array.isArray(targetItems) || targetItems.length === 0) {
    return sourceItems;
  }

  const emptyItemTemplate = sourceItems[0];

  return targetItems.map((item: any) => {
    // Don't merge string arrays (interests/achievements)
    if (typeof emptyItemTemplate === 'string') return item;
    // Recursively merge object items to fill missing nested fields
    return deepMerge(item, emptyItemTemplate);
  });
}

function mergeResumeData(actualData: any, emptyData: any): ResumeData & { isAnalyzed?: boolean } {
  const mergedRes: ResumeData & { isAnalyzed?: boolean } = {
    ...actualData,
    templateId: actualData.templateId || '',
    isAnalyzed: actualData.isAnalyzed,
  };

  Object.keys(emptyData).forEach((key) => {
    const resumeKey = key as keyof typeof emptyData;
    mergedRes[resumeKey] = deepMerge(actualData[resumeKey], emptyData[resumeKey]);
  });

  return mergedRes;
}

export async function fetchAndMergeResumeData(id: string) {
  const [actualData, emptyData] = await Promise.all([getResumeData(id), getResumeEmptyData()]);

  return mergeResumeData(actualData, emptyData);
}
