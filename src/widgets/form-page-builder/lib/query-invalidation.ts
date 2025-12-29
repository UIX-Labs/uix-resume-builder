import { QueryClient } from "@tanstack/react-query";
import { hasPendingSuggestions } from "@features/resume/renderer";
import type { ResumeData, ResumeDataKey } from "@entities/resume";

/**
 * Checks if all suggestions are applied across all sections
 */
export function hasAllSuggestionsApplied(formData: Omit<ResumeData, 'templateId'> | null | undefined): boolean {
  if (!formData) return true;

  return !Object.values(formData).some((section) => {
    if (section && typeof section === 'object' && 'suggestedUpdates' in section) {
      const suggestedUpdates = (section as { suggestedUpdates?: unknown[] }).suggestedUpdates;
      return hasPendingSuggestions(suggestedUpdates as any[] | undefined);
    }
    return false;
  });
}

/**
 * Updates React Query cache optimistically after save
 * This prevents unnecessary getById calls by updating cache directly
 */
export function updateResumeDataCacheOptimistically(
  queryClient: QueryClient,
  resumeId: string,
  section: ResumeDataKey,
  sectionData: ResumeData[ResumeDataKey]
): void {
  queryClient.setQueryData(
    ["resume-data", resumeId],
    (old: ResumeData | undefined) => {
      if (!old) return old;
      return {
        ...old,
        [section]: sectionData,
        updatedAt: new Date().toISOString(),
      };
    }
  );
}

/**
 * Invalidates queries conditionally based on suggestion state
 * Only invalidates the resumes list (for icon updates), NOT resume-data
 * This prevents unnecessary getById calls after user saves
 */
export function invalidateQueriesIfAllSuggestionsApplied(
  queryClient: QueryClient,
  formData: Omit<ResumeData, 'templateId'> | null | undefined,
  resumeId: string,
): void {
  const allSuggestionsApplied = hasAllSuggestionsApplied(formData);

  // Only invalidate queries if all suggestions are applied
  // This prevents breaking the yellow/pending icons when user has partial suggestions
  if (allSuggestionsApplied) {
    // Only invalidate resumes list to update icons - NOT resume-data
    // We already have the latest data in local state, no need to refetch
    queryClient.invalidateQueries({ queryKey: ["resumes"] });
    // REMOVED: queryClient.invalidateQueries({ queryKey: ["resume-data", resumeId] });
  }
}
