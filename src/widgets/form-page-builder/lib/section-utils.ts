import { Education } from "@shared/icons/education";
import { Experience } from "@shared/icons/experience";
import { PersonalInfo } from "@shared/icons/personal-info";
import { ProfessionalSummary } from "@shared/icons/prof-summary";
import { Skills } from "@shared/icons/skills";
import { Achievements } from "@shared/icons/achievements";

export const SECTION_ICONS = {
  personalDetails: PersonalInfo,
  professionalSummary: ProfessionalSummary,
  experience: Experience,
  education: Education,
  skills: Skills,
  achievements: Achievements,
} as const;

// Check if a section has content (excluding suggestedUpdates field)
export function sectionHasContent(sectionData: unknown): boolean {
  if (!sectionData || typeof sectionData !== "object") {
    return false;
  }

  const entries = Object.entries(sectionData as Record<string, unknown>).filter(
    ([key]) => key !== "suggestedUpdates" && key !== "isHidden"
  );

  return entries.some(([, value]) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object")
      return Object.keys(value as Record<string, unknown>).length > 0;
    return true;
  });
}

// Check if any section in resume data has Builder Intelligence suggestions
export function hasBuilderIntelligenceRun(resumeData: any): boolean {
  if (!resumeData) return false;

  return Object.values(resumeData).some((section) => {
    return (
      section &&
      typeof section === "object" &&
      "suggestedUpdates" in section &&
      Array.isArray(
        (section as { suggestedUpdates?: unknown[] }).suggestedUpdates
      ) &&
      (section as { suggestedUpdates?: unknown[] }).suggestedUpdates!.length > 0
    );
  });
}

// Get suggested updates array from section data
export function getSuggestedUpdates(sectionData: unknown): any[] | undefined {
  if (!sectionData || typeof sectionData !== "object") return undefined;

  if ("suggestedUpdates" in sectionData) {
    return (sectionData as { suggestedUpdates?: any[] }).suggestedUpdates;
  }

  return undefined;
}
