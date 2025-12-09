import { QueryClient } from "@tanstack/react-query";
import { hasPendingSuggestions } from "@features/resume/renderer";
import type { ResumeData } from "@entities/resume";

/**
 * Checks if all suggestions are applied across all sections
 */
export function hasAllSuggestionsApplied(
  formData: Omit<ResumeData, "templateId"> | null | undefined
): boolean {
  if (!formData) return true;

  return !Object.values(formData).some((section) => {
    if (
      section &&
      typeof section === "object" &&
      "suggestedUpdates" in section
    ) {
      const suggestedUpdates = (section as { suggestedUpdates?: unknown[] })
        .suggestedUpdates;
      return hasPendingSuggestions(suggestedUpdates as any[] | undefined);
    }
    return false;
  });
}

/**
 * Invalidates queries conditionally based on suggestion state
 */
export function invalidateQueriesIfAllSuggestionsApplied(
  queryClient: QueryClient,
  formData: Omit<ResumeData, "templateId"> | null | undefined,
  resumeId: string
): void {
  const allSuggestionsApplied = hasAllSuggestionsApplied(formData);

  // Only invalidate queries if all suggestions are applied
  // This prevents breaking the yellow/pending icons when user has partial suggestions
  if (allSuggestionsApplied) {
    queryClient.invalidateQueries({ queryKey: ["resumes"] });
    queryClient.invalidateQueries({ queryKey: ["resume-data", resumeId] });
  }
}

