import { mockData } from '@shared/constants/mockData';
import type { ResumeDataKey } from '@entities/resume/types/resume-data';

/**
 * Fields to ignore during comparison (auto-generated or metadata fields)
 */
const IGNORED_FIELDS = new Set([
  'id',
  'itemId',
  'suggestedUpdates',
  'updatedAt',
  'createdAt',
  'rank',
]);

/**
 * Deep comparison of two values, ignoring specified fields
 */
function deepEqual(value1: any, value2: any, ignoredFields = IGNORED_FIELDS): boolean {
  // Handle null/undefined
  if (value1 === value2) return true;
  if (value1 == null || value2 == null) return false;

  // Handle different types
  if (typeof value1 !== typeof value2) return false;

  // Handle primitives
  if (typeof value1 !== 'object') return value1 === value2;

  // Handle arrays
  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) return false;

    return value1.every((item, index) => deepEqual(item, value2[index], ignoredFields));
  }

  // Handle arrays vs objects mismatch
  if (Array.isArray(value1) !== Array.isArray(value2)) return false;

  // Handle objects
  const keys1 = Object.keys(value1).filter(key => !ignoredFields.has(key));
  const keys2 = Object.keys(value2).filter(key => !ignoredFields.has(key));

  // Check if both objects have same number of non-ignored keys
  if (keys1.length !== keys2.length) return false;

  // Check if all keys match
  const allKeys = new Set([...keys1, ...keys2]);

  return Array.from(allKeys).every(key => {
    if (ignoredFields.has(key)) return true;
    return deepEqual(value1[key], value2[key], ignoredFields);
  });
}

/**
 * Checks if a section has been modified compared to mockData
 *
 * @param sectionKey - The section key (e.g., 'experience', 'skills')
 * @param currentData - The current section data to compare
 * @returns true if the section has been modified, false otherwise
 *
 * @example
 * ```ts
 * const isModified = isSectionModified('experience', formData.experience);
 * if (isModified) {
 *   console.log('Experience section has been modified');
 * }
 * ```
 */
export function isSectionModified(
  sectionKey: ResumeDataKey,
  currentData: any
): boolean {
  // If no current data exists, consider it as not modified from mock
  if (!currentData) return false;

  // Get the corresponding mock data for this section
  const mockSectionData = mockData[sectionKey];

  // If no mock data exists for this section, consider it modified
  if (!mockSectionData) return true;

  // Perform deep comparison, ignoring metadata fields
  const isEqual = deepEqual(currentData, mockSectionData);

  // Return true if modified (not equal to mock)
  return !isEqual;
}

/**
 * Checks if any section in the resume data has been modified
 *
 * @param resumeData - The complete resume data object
 * @returns An object with section keys and their modification status
 *
 * @example
 * ```ts
 * const modifiedSections = getModifiedSections(formData);
 * // { experience: true, skills: false, ... }
 * ```
 */
export function getModifiedSections(resumeData: Record<string, any>): Record<string, boolean> {
  const sections: ResumeDataKey[] = [
    'experience',
    'skills',
    'projects',
    'personalDetails',
    'professionalSummary',
    'education',
    'certifications',
    'interests',
    'achievements',
  ];

  const result: Record<string, boolean> = {};

  sections.forEach(section => {
    result[section] = isSectionModified(section, resumeData[section]);
  });

  return result;
}

/**
 * Checks if the entire resume has any modifications
 *
 * @param resumeData - The complete resume data object
 * @returns true if any section has been modified
 *
 * @example
 * ```ts
 * const hasChanges = hasAnyModifications(formData);
 * if (hasChanges) {
 *   console.log('Resume has unsaved changes');
 * }
 * ```
 */
export function hasAnyModifications(resumeData: Record<string, any>): boolean {
  const modifiedSections = getModifiedSections(resumeData);
  return Object.values(modifiedSections).some(isModified => isModified);
}
