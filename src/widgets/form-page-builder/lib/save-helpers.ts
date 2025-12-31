import type { ResumeData, ResumeDataKey } from "@entities/resume";
import { isSectionModified } from "./data-cleanup";

const SECTION_KEYS: ResumeDataKey[] = [
  "personalDetails",
  "experience",
  "education",
  "skills",
  "projects",
  "certifications",
  "interests",
  "achievements",
];

/**
 * Saves the current section and any other sections that have been modified
 * compared to the last saved state (resumeData from API)
 */
export async function saveSectionWithSuggestions(
  currentStep: string,
  formData: Omit<ResumeData, "templateId">,
  save: (params: { type: string; data: any; updatedAt: number }) => void,
  resumeData?: Omit<ResumeData, "templateId">
): Promise<void> {
  const sectionsToSave = new Set<string>([currentStep]);

  // If we have resumeData, find all sections that have been modified
  if (resumeData) {
    SECTION_KEYS.forEach((key) => {
      if (
        isSectionModified(
          key,
          formData as Record<string, unknown>,
          resumeData as Record<string, unknown>
        )
      ) {
        sectionsToSave.add(key);
      }
    });
  }

  // Save each modified section
  sectionsToSave.forEach((sectionKey) => {
    const sectionData = formData[sectionKey as keyof typeof formData];
    if (sectionData) {
      save({
        type: sectionKey,
        data: sectionData,
        updatedAt: Date.now(),
      });
    }
  });
}
