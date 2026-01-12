import type React from "react";
import { cn } from "@shared/lib/cn";
import { resolvePath } from "../resolve-path";
import { renderDivider } from "../components/Divider";
import { hasPendingSuggestions } from "../section-utils";
import {
  getFieldSuggestions,
  getSuggestionBackgroundColor,
} from "@features/template-form/lib/get-field-errors";
import { getSuggestionDataAttribute } from "../suggestion-utils";

export function renderContentSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean
): React.ReactNode {
  const value = resolvePath(
    data,
    section.content.path,
    section.content.fallback
  );

  // Check for empty values including empty strings
  if (!value || (typeof value === "string" && value.trim() === "")) return null;

  const sectionId =
    section.id || section.heading?.path?.split(".").pop() || "content-section";
  const sectionIdLower = sectionId.toLowerCase();
  const currentSectionLower = currentSection?.toLowerCase();
  const isActive = currentSection && sectionIdLower === currentSectionLower;
  const isSummarySection = sectionIdLower === "summary";

  // Determine the data key for suggestions and formData
  // For summary sections, content might be in personalDetails (description field)
  // Extract section key from content path
  let formDataSectionKey: string | undefined;
  let itemId: string | undefined;
  let fieldName: string | undefined;

  if (section.content.path) {
    // Extract section key from path (e.g., "personalDetails.items[0].description" -> "personalDetails")
    const pathParts = section.content.path.split(".");
    formDataSectionKey = pathParts[0];

    // Get field name (last part of path, e.g., "description")
    fieldName = pathParts[pathParts.length - 1];

    // Get itemId from first item in the section
    // Check if path contains "items[0]" pattern (e.g., "personalDetails.items[0].description")
    if (section.content.path.includes("items[0]") && formDataSectionKey) {
      const sectionData = data[formDataSectionKey];
      const firstItem = sectionData?.items?.[0];
      itemId = firstItem?.itemId || firstItem?.id;
    }
  }

  // Fallback for summary sections or if itemId is not set
  if (isSummarySection && (!formDataSectionKey || !itemId)) {
    if (!formDataSectionKey) {
      formDataSectionKey = "personalDetails";
    }
    if (!fieldName) {
      fieldName = "description";
    }
    if (!itemId) {
      const sectionData = data[formDataSectionKey];
      const firstItem = sectionData?.items?.[0];
      itemId = firstItem?.itemId || firstItem?.id;
    }
  }

  // Get suggestions for this field
  let fieldSuggestions: any[] = [];
  if (formDataSectionKey && itemId && fieldName) {
    const sectionSuggestedUpdates = data[formDataSectionKey]?.suggestedUpdates;
    fieldSuggestions = getFieldSuggestions(
      sectionSuggestedUpdates,
      itemId,
      fieldName
    );
  }

  const errorBgColor = isThumbnail
    ? ""
    : getSuggestionBackgroundColor(fieldSuggestions);

  // Create suggestion data attribute
  const suggestionData = getSuggestionDataAttribute(
    formDataSectionKey,
    itemId,
    fieldName,
    fieldSuggestions,
    isThumbnail
  );

  const hasClickableSuggestions = !!suggestionData;

  // Check for valid suggestions using the actual formDataSectionKey
  // This ensures we check the correct section where suggestions are stored
  let hasValidSuggestions = false;
  if (formDataSectionKey) {
    const sectionSuggestedUpdates = data[formDataSectionKey]?.suggestedUpdates;
    hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);
  }

  // Highlight summary section when personalDetails, summary, or header is selected (merged sections)
  const isMergedSectionActive =
    isSummarySection &&
    (currentSectionLower === "personaldetails" ||
      currentSectionLower === "summary" ||
      currentSectionLower === "header" ||
      currentSectionLower === "header-section");

  const shouldBlur =
    !isThumbnail &&
    hasSuggestions &&
    currentSection &&
    !isActive &&
    !isMergedSectionActive &&
    hasValidSuggestions;

  const shouldHighlight =
    !isThumbnail &&
    hasSuggestions &&
    (isActive || isMergedSectionActive) &&
    hasValidSuggestions;

  const wrapperStyle: React.CSSProperties = {
    scrollMarginTop: "20px",
    ...(hasSuggestions && {
      transition:
        "filter 0.3s ease, background-color 0.3s ease, border 0.3s ease",
    }),
    ...(shouldHighlight && {
      backgroundColor: "rgba(200, 255, 230, 0.35)",
      border: "2px solid rgba(0, 168, 107, 0.4)",
      borderRadius: "12px",
      padding: "16px",
      position: "relative",
    }),
  };

  return (
    <div
      className={cn(
        section.className,
        shouldBlur && "blur-[2px] pointer-events-none"
      )}
      data-section={sectionId}
      data-canbreak={section.break ? "true" : undefined}
      data-has-breakable-content={section.break ? "true" : undefined}
      style={wrapperStyle}
    >
      {/* {shouldHighlight && <SparkleIndicator />} */}
      {section.heading && (
        <p className={section.heading.className}>
          {resolvePath(data, section.heading.path, section.heading.fallback)}
        </p>
      )}

      {section.divider && renderDivider(section.divider)}

      {section.content.type === "html" ? (
        <div
          className={cn(
            section.content.className,
            errorBgColor,
            hasClickableSuggestions && "cursor-pointer"
          )}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for HTML content rendering
          dangerouslySetInnerHTML={{ __html: value }}
          data-canbreak={section.break ? "true" : undefined}
          data-suggestion={suggestionData}
        />
      ) : (
        <p
          className={cn(
            section.content.className,
            errorBgColor,
            hasClickableSuggestions && "cursor-pointer"
          )}
          data-suggestion={suggestionData}
        >
          {value}
        </p>
      )}
    </div>
  );
}
