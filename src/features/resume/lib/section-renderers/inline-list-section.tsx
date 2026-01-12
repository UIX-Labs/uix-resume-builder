import type React from "react";
import { cn } from "@shared/lib/cn";
import { resolvePath } from "../resolve-path";
import { renderDivider } from "../components/Divider";
import {
  hasPendingSuggestions,
  flattenAndFilterItemsWithContext,
} from "../section-utils";
import {
  getArrayValueSuggestions,
  getSuggestionBackgroundColor,
} from "@features/template-form/lib/get-field-errors";

/**
 * Generate data-suggestion attribute value for DOM manipulation approach
 * Format: "sectionId|itemId|fieldName|suggestionType"
 * Same as in field-renderer.tsx for consistency
 */
function getSuggestionDataAttribute(
  sectionId: string | undefined,
  itemId: string | undefined,
  fieldName: string | undefined,
  valueSuggestions: any[],
  isThumbnail?: boolean
): string | undefined {
  if (
    isThumbnail ||
    !valueSuggestions.length ||
    !sectionId ||
    !itemId ||
    !fieldName
  ) {
    return undefined;
  }

  // Determine primary suggestion type (priority: spelling > sentence > new)
  let suggestionType: "spelling_error" | "sentence_refinement" | "new_summary" =
    "spelling_error";
  if (valueSuggestions.some((s) => s.type === "spelling_error")) {
    suggestionType = "spelling_error";
  } else if (valueSuggestions.some((s) => s.type === "sentence_refinement")) {
    suggestionType = "sentence_refinement";
  } else if (valueSuggestions.some((s) => s.type === "new_summary")) {
    suggestionType = "new_summary";
  }

  return `${sectionId}|${itemId}|${fieldName}|${suggestionType}`;
}

export function renderInlineListSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean
): React.ReactNode {
  const items = resolvePath(data, section.listPath, []);
  let parentId: string | undefined;
  // Extract parent itemId for nested paths like "interests.items[0].items"
  if (section.listPath?.includes("[0].items")) {
    // Get parent path by removing everything after [0].
    // e.g., "interests.items[0].items" -> "interests.items[0]"
    const parentPath = section.listPath.replace(/\[0\]\.items$/, "[0]");
    const parentObj = resolvePath(data, parentPath);
    parentId = parentObj?.itemId || parentObj?.id;
  }

  const flattenedItemsWithContext = flattenAndFilterItemsWithContext(
    items,
    section.itemPath,
    parentId
  );

  const sectionId =
    section.id ||
    section.heading?.path?.split(".").pop() ||
    "inline-list-section";
  const isActive =
    currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();

  const dataKey =
    sectionId.toLowerCase() === "summary" ? "professionalSummary" : sectionId;
  const sectionSuggestedUpdates = data[dataKey]?.suggestedUpdates;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);

  const shouldBlur =
    !isThumbnail &&
    hasSuggestions &&
    currentSection &&
    !isActive &&
    hasValidSuggestions;
  const shouldHighlight =
    !isThumbnail && hasSuggestions && isActive && hasValidSuggestions;

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

  // Get section key from listPath (e.g., "interests.items[0].items" -> "interests")
  // This matches formData keys - same pattern as list-section
  const sectionKey = section.listPath?.split(".")[0];

  // Extract field name for suggestions lookup
  // The fieldName should be the property within each item that has suggestions
  // For nested arrays like "interests.items[0].items", fieldName is "items" (the nested array)
  // For simple arrays like "skills.items" with itemPath="name", fieldName is "name" (the property)
  let fieldName: string | undefined;

  if (section.itemPath) {
    // If itemPath is specified (e.g., "name" for skills), use it as fieldName
    // This is the property within each item that has suggestions
    fieldName = section.itemPath;
  } else if (section.listPath?.includes("[0].")) {
    // Nested path like "interests.items[0].items" -> "items" (the nested array)
    const parts = section.listPath.split("[0].");
    fieldName = parts[parts.length - 1];
  } else if (section.listPath?.includes(".")) {
    // Path like "interests.items" without itemPath -> default to "items"
    fieldName = "items";
  } else {
    // No listPath, use itemPath as fallback
    fieldName = section.itemPath;
  }

  const suggestedUpdates = sectionKey
    ? (data[sectionKey] as any)?.suggestedUpdates
    : undefined;

  return (
    <div
      data-break={section.break}
      data-canbreak={section.breakable ? "true" : undefined}
      data-has-breakable-content={section.breakable ? "true" : undefined}
      data-section={sectionId}
      className={cn(shouldBlur && "blur-[2px] pointer-events-none")}
      style={wrapperStyle}
    >
      {/* {shouldHighlight && <SparkleIndicator />} */}
      <div className={cn("flex flex-col", section.heading.className)}>
        {section.heading && (
          <p data-item="heading">
            {resolvePath(data, section.heading.path, section.heading.fallback)}
          </p>
        )}

        {section.heading.divider && renderDivider(section.heading.divider)}
      </div>

      <div
        data-item="content"
        data-break={section.break}
        data-canbreak={section.breakable ? "true" : undefined}
      >
        {section.showBullet ? (
          <ul
            className={cn(
              "list-disc list-outside pl-6",
              section.containerClassName
            )}
          >
            {flattenedItemsWithContext.map(({ value, itemId }, idx: number) => {
              const actualValue =
                typeof value === "object" && value !== null && "value" in value
                  ? value.value
                  : value;

              // Ensure itemId is present (it should come from flattenAndFilterItemsWithContext)
              // If not present, use parentId we extracted earlier
              const finalItemId = itemId || parentId;

              const valueSuggestions =
                finalItemId && fieldName
                  ? getArrayValueSuggestions(
                      suggestedUpdates,
                      finalItemId,
                      fieldName,
                      actualValue
                    )
                  : [];

              const errorBgColor = isThumbnail
                ? ""
                : getSuggestionBackgroundColor(valueSuggestions);

              // Use sectionKey (which maps to formData) - same pattern as list-section
              const formDataSectionKey = sectionKey || dataKey;

              // Create suggestion data attribute if we have all required values
              const suggestionData =
                finalItemId && fieldName && formDataSectionKey
                  ? getSuggestionDataAttribute(
                      formDataSectionKey,
                      finalItemId,
                      fieldName,
                      valueSuggestions,
                      isThumbnail
                    )
                  : undefined;

              const hasClickableSuggestions = !!suggestionData;

              return (
                <li
                  key={idx}
                  className={cn(
                    section.itemClassName,

                    errorBgColor,
                    hasClickableSuggestions && "cursor-pointer",
                    "list-item"
                  )}
                  data-suggestion={suggestionData}
                >
                  {actualValue}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={section.containerClassName}>
            {flattenedItemsWithContext.map(({ value, itemId }, idx: number) => {
              const actualValue =
                typeof value === "object" && value !== null && "value" in value
                  ? value.value
                  : value;

              // Ensure itemId is present (it should come from flattenAndFilterItemsWithContext)
              // If not present, use parentId we extracted earlier
              const finalItemId = itemId || parentId;

              const valueSuggestions =
                finalItemId && fieldName
                  ? getArrayValueSuggestions(
                      suggestedUpdates,
                      finalItemId,
                      fieldName,
                      actualValue
                    )
                  : [];

              const errorBgColor = isThumbnail
                ? ""
                : getSuggestionBackgroundColor(valueSuggestions);

              // Use sectionKey (which maps to formData) - same pattern as list-section
              const formDataSectionKey = sectionKey || dataKey;

              // Create suggestion data attribute if we have all required values
              const suggestionData =
                finalItemId && fieldName && formDataSectionKey
                  ? getSuggestionDataAttribute(
                      formDataSectionKey,
                      finalItemId,
                      fieldName,
                      valueSuggestions,
                      isThumbnail
                    )
                  : undefined;
              const hasClickableSuggestions = !!suggestionData;

              return (
                <span key={idx}>
                  <span
                    className={cn(
                      section.itemClassName,
                      errorBgColor,
                      hasClickableSuggestions && "cursor-pointer"
                    )}
                    data-suggestion={suggestionData}
                  >
                    {value}
                  </span>
                  {idx < flattenedItemsWithContext.length - 1 &&
                    section.itemSeparator && (
                      <span>{section.itemSeparator}</span>
                    )}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
