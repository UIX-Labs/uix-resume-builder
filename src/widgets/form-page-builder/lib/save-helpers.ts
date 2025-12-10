import { hasPendingSuggestions } from "@features/resume/renderer";
import type { ResumeData } from "@entities/resume";

/**
 * Finds all sections that have pending suggestions
 */
export function getSectionsWithSuggestions(
  formData: Omit<ResumeData, "templateId">,
  excludeSection?: string
): Array<{ type: string; data: any }> {
  const sectionsToSave: Array<{ type: string; data: any }> = [];

  Object.keys(formData).forEach((sectionKey) => {
    // Skip excluded section and metadata fields
    if (
      sectionKey === excludeSection ||
      sectionKey === "templateId" ||
      sectionKey === "updatedAt"
    ) {
      return;
    }

    const sectionData = formData[sectionKey as keyof typeof formData];

    // Check if this section has suggestions
    if (
      sectionData &&
      typeof sectionData === "object" &&
      "suggestedUpdates" in sectionData
    ) {
      const suggestedUpdates = (sectionData as { suggestedUpdates?: unknown[] })
        .suggestedUpdates;

      // If section has pending suggestions, include it
      if (hasPendingSuggestions(suggestedUpdates as any[] | undefined)) {
        sectionsToSave.push({
          type: sectionKey,
          data: sectionData,
        });
      }
    }
  });

  return sectionsToSave;
}

/**
 * Saves a section and all other sections with suggestions
 */
export async function saveSectionWithSuggestions(
  currentStep: string,
  formData: Omit<ResumeData, "templateId">,
  save: (params: { type: string; data: any; updatedAt: number }) => void
): Promise<void> {
  // Save current section
  save({
    type: currentStep,
    data: formData[currentStep],
    updatedAt: Date.now(),
  });

  // Get all sections with suggestions (excluding current section)
  const sectionsToSave = getSectionsWithSuggestions(formData, currentStep);

  // Save all sections with suggestions
  // Note: save function is synchronous but triggers async API calls internally
  sectionsToSave.forEach(({ type, data }) => {
    save({
      type: type as any,
      data: data,
      updatedAt: Date.now(),
    });
  });

  // Small delay to ensure saves are processed
  await new Promise((resolve) => setTimeout(resolve, 100));
}

