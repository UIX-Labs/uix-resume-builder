import type { ResumeData, ResumeDataKey } from '@entities/resume/types/resume-data';
import { isSectionModified } from '@widgets/form-page-builder/lib/data-cleanup';

const whiteList = [
  'personalDetails',
  'professionalSummary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'interests',
  'achievements',
];

// Fields to ignore during comparison (metadata fields)
const ignoredFields = ['id', 'itemId', 'rank', 'title', 'ongoing', 'suggestedUpdates'];

/**
 * Strips HTML tags from a string for comparison
 */
function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]*>/g, '').trim();
}

/**
 * Deep comparison of two values to check if they're equal
 */
function deepEqual(val1: any, val2: any): boolean {
  if (val1 === val2) return true;
  if (val1 == null || val2 == null) return val1 === val2;

  // Compare strings after stripping HTML
  if (typeof val1 === 'string' && typeof val2 === 'string') {
    return stripHtmlTags(val1) === stripHtmlTags(val2);
  }

  if (typeof val1 !== typeof val2) return false;

  if (Array.isArray(val1) && Array.isArray(val2)) {
    if (val1.length !== val2.length) return false;
    return val1.every((item, index) => deepEqual(item, val2[index]));
  }

  if (typeof val1 === 'object' && typeof val2 === 'object') {
    const keys1 = Object.keys(val1).filter(k => !ignoredFields.includes(k));
    const keys2 = Object.keys(val2).filter(k => !ignoredFields.includes(k));

    if (keys1.length !== keys2.length) return false;
    return keys1.every(key => deepEqual(val1[key], val2[key]));
  }

  return false;
}

/**
 * Calculates how many fields are different from mockData in an item
 */
function calculateModifiedFieldsCount(actualItem: any, mockItem: any): number {
  if (typeof actualItem !== 'object' || typeof mockItem !== 'object') {
    return 0;
  }

  let modifiedCount = 0;

  for (const [key, actualValue] of Object.entries(actualItem)) {
    // Skip metadata fields
    if (ignoredFields.includes(key)) continue;

    const mockValue = mockItem[key];

    // If field doesn't exist in mock, it's a new field (counts as modified)
    if (!(key in mockItem)) {
      if (actualValue) modifiedCount++;
      continue;
    }

    // Compare field values
    if (!deepEqual(actualValue, mockValue)) {
      modifiedCount++;
    }
  }

  return modifiedCount;
}

function calculateSectionWeight(value: any) {
  if (typeof value !== 'object') {
    return 1;
  }

  if (['string', 'number'].includes(typeof value)) {
    return 1;
  }

  return Object.keys(value).filter((key) => !ignoredFields.includes(key)).length;
}

function calculateItemWeight(value: any) {
  if (typeof value !== 'object') {
    return value ? 1 : 0;
  }

  return Object.entries(value).filter(([key, value]) => !ignoredFields.includes(key) && value).length;
}

/**
 * Calculates resume completion percentage based on modified sections
 *
 * Logic:
 * 1. If section is NOT modified (identical to mockData) → weight = 0 (doesn't count)
 * 2. If section is empty but mockData exists → weight = 0 (user didn't add content)
 * 3. If section is modified (different from mockData) → calculate weight normally
 * 4. If no mockData exists for section → always calculate weight (no baseline)
 *
 * @param resumeData - Current resume data
 * @param mockData - Mock/template data for comparison
 * @returns Completion percentage (0-100)
 */
export function calculateResumeCompletion(resumeData: ResumeData, mockData?: Record<string, any>) {
  // If no mockData provided, use old logic (backward compatibility)
  if (!mockData) {
    const { total, filled } = Object.entries(resumeData).reduce(
      (acc, cur) => {
        const key = cur[0] as ResumeDataKey;
        const value = cur[1] as ResumeData[ResumeDataKey];

        if (!whiteList.includes(key)) return acc;

        const items = value?.items || [];

        if (items.length > 0) {
          acc.total += calculateSectionWeight(items[0]);
          acc.filled += items.reduce((acc, item) => Math.max(acc, calculateItemWeight(item)), 0);
        }

        return acc;
      },
      { total: 0, filled: 0 },
    );

    return total === 0 ? 0 : (filled / total) * 100;
  }

  // New logic: Field-by-field comparison with mockData
  const { total, filled } = Object.entries(resumeData).reduce(
    (acc, cur) => {
      const key = cur[0] as ResumeDataKey;
      const value = cur[1] as ResumeData[ResumeDataKey];

      if (!whiteList.includes(key)) return acc;

      // Check if this section has been modified compared to mockData
      const isModified = isSectionModified(
        key,
        resumeData as unknown as Record<string, unknown>,
        mockData as Record<string, unknown>
      );

      // If section is not modified (identical to mockData or empty), skip it
      if (!isModified) {
        return acc;
      }

      // Section is modified - compare field by field
      const actualItems = value?.items || [];
      const mockSection = mockData[key];
      const mockItems = mockSection?.items || [];

      if (actualItems.length === 0) {
        return acc;
      }

      // Calculate total fields in the section (from first item)
      const sectionWeight = calculateSectionWeight(actualItems[0]);

      // Calculate how many fields are actually modified (different from mockData)
      let modifiedFieldsCount = 0;

      for (let i = 0; i < actualItems.length; i++) {
        const actualItem = actualItems[i];
        const mockItem = mockItems[i]; // Corresponding mock item

        if (!mockItem) {
          // No mock item to compare - this is a new item, count all filled fields
          modifiedFieldsCount = Math.max(modifiedFieldsCount, calculateItemWeight(actualItem));
        } else {
          // Compare with mock item - count only modified fields
          const modifiedCount = calculateModifiedFieldsCount(actualItem, mockItem);
          modifiedFieldsCount = Math.max(modifiedFieldsCount, modifiedCount);
        }
      }

      acc.total += sectionWeight;
      acc.filled += modifiedFieldsCount;

      return acc;
    },
    { total: 0, filled: 0 },
  );

  // If no sections have been modified, return 0%
  if (total === 0) {
    return 0;
  }

  const percentage = (filled / total) * 100;

  return percentage;
}
