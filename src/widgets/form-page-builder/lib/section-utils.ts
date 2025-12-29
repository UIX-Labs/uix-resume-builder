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

/**
 * Checks if a single section is empty
 * Returns true if section has no meaningful data
 */
export function isSectionEmpty(section: unknown): boolean {
  if (!section || typeof section !== "object") {
    return true;
  }

  const sectionObj = section as Record<string, unknown>;

  if ("items" in sectionObj && Array.isArray(sectionObj.items)) {
    const items = sectionObj.items;

    if (items.length === 0) {
      return true;
    }

    // Check if items contain any non-empty values
    // If ANY item has ANY non-empty field, return false
    // Only return true if ALL items are empty
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (typeof item === "string" && item.trim() !== "") {
        return false;
      } else if (typeof item === "object" && item !== null) {
        const hasNonEmptyField = Object.entries(
          item as Record<string, unknown>
        ).some(([key, value]) => {
          // Skip id, title, itemId, rank, ongoing and metadata fields
          if (
            key === "id" ||
            key === "itemId" ||
            key === "ongoing" ||
            key === "rank" ||
            key === "title"
          ) {
            return false;
          }

          if (typeof value === "string") {
            return value.trim() !== "";
          }

          if (typeof value === "object" && value !== null) {
            return Object.values(value as Record<string, unknown>).some(
              (v) => typeof v === "string" && (v as string).trim() !== ""
            );
          }

          if (Array.isArray(value)) {
            return value.some(
              (v) => typeof v === "string" && (v as string).trim() !== ""
            );
          }

          return false;
        });

        // If this item has any non-empty field, the section is not empty
        if (hasNonEmptyField) {
          return false;
        }
      }
    }
  }

  return true;
}

/**
 * Syncs IDs from actual section to mock section
 * Preserves actual IDs while using mock data content
 */
export function syncSectionIds(
  actualSection: Record<string, unknown> | null | undefined,
  mockSection: Record<string, unknown> | null | undefined
): Record<string, unknown> | null | undefined {
  if (!actualSection || !mockSection) {
    return mockSection;
  }

  const synced = { ...mockSection };

  // Sync section ID
  if (actualSection.id) {
    synced.id = actualSection.id;
  }

  // Sync itemIds in items array
  if (Array.isArray(synced.items) && Array.isArray(actualSection.items)) {
    synced.items = synced.items.map(
      (mockItem: Record<string, unknown>, index: number) => {
        if (typeof mockItem === "object" && mockItem !== null) {
          const actualItem = (actualSection.items as Record<string, unknown>[])[
            index
          ];
          if (
            actualItem &&
            typeof actualItem === "object" &&
            actualItem !== null
          ) {
            return {
              ...mockItem,
              itemId: actualItem.itemId || mockItem.itemId,
            };
          }
        }
        return mockItem;
      }
    );
  }

  return synced;
}
