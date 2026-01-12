import type React from "react";
import { cn } from "@shared/lib/cn";
import { resolvePath } from "../resolve-path";
import { renderDivider } from "../components/Divider";
import { hasPendingSuggestions } from "../section-utils";
import { renderItemWithRows, renderItemWithFields } from "../field-renderer";

export function renderListSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean
): React.ReactNode {
  const rawItems = resolvePath(data, section.listPath, []);

  const items = rawItems.map((item: any) => ({ ...item }));

  const sectionId =
    section.id || section.heading?.path?.split(".").pop() || "list-section";
  const isActive =
    currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();

  // Get section key from listPath (e.g., "experience.items" -> "experience")
  // This is needed for checking suggestions correctly
  const sectionKey = section.listPath?.split(".")[0];
  const sectionSuggestedUpdates = sectionKey ? data[sectionKey]?.suggestedUpdates : undefined;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);

  const shouldBlur =
    !isThumbnail &&
    hasSuggestions &&
    currentSection &&
    !isActive &&
    hasValidSuggestions;
  const shouldHighlight =
    !isThumbnail && hasSuggestions && isActive && hasValidSuggestions;

  function RenderListSectionHeading() {
    return (
      <div className={cn("flex flex-col", section.heading.className)}>
        {section.heading && (
          <p data-item="heading">
            {resolvePath(data, section.heading.path, section.heading.fallback)}
          </p>
        )}

        {section.heading.divider && renderDivider(section.heading.divider)}
      </div>
    );
  }

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

  const itemWrapperStyle = section.break ? wrapperStyle : {};
  const containerWrapperStyle = section.break ? {} : wrapperStyle;

  // Use the sectionSuggestedUpdates already defined above
  const suggestedUpdates = sectionSuggestedUpdates;

  return (
    <div
      data-item="list-section"
      data-canbreak={section.break}
      data-section={sectionId}
      className={shouldBlur ? "blur-[2px] pointer-events-none" : ""}
      style={containerWrapperStyle}
    >
      {/* {shouldHighlight && <SparkleIndicator />} */}
      {!section.break && <RenderListSectionHeading />}

      <div
        data-item="content"
        data-canbreak={section.break}
        className={section.containerClassName}
        id="teacher-content"
      >
        {items.map((item: any, idx: number) => {
          const itemId = item.itemId || item.id;

          // Use sectionKey (from listPath) instead of sectionId because sectionKey matches formData keys
          // e.g., "skills.items" -> "skills" which matches formData.skills
          const formDataSectionKey = sectionKey || sectionId;

          const content = section.itemTemplate.rows
            ? renderItemWithRows(
                section.itemTemplate,
                item,
                itemId,
                suggestedUpdates,
                isThumbnail,
                formDataSectionKey
              )
            : renderItemWithFields(
                section.itemTemplate,
                item,
                itemId,
                suggestedUpdates,
                isThumbnail,
                formDataSectionKey
              );

          const isItemBreakable = section.break || section.itemTemplate?.break;

          if (isItemBreakable && idx === 0) {
            return (
              <div
                key={idx}
                className={cn(
                  section.itemTemplate.className,
                  shouldBlur ? "blur-[2px] pointer-events-none" : ""
                )}
                style={itemWrapperStyle}
                data-canbreak={isItemBreakable ? "true" : undefined}
                data-has-breakable-content={
                  isItemBreakable ? "true" : undefined
                }
              >
                {/* {shouldHighlight && (
                  <div style={{ position: "relative" }}>
                    <SparkleIndicator />
                  </div>
                )} */}

                <RenderListSectionHeading />

                <div
                  data-canbreak={isItemBreakable ? "true" : undefined}
                  data-has-breakable-content={
                    isItemBreakable ? "true" : undefined
                  }
                >
                  {content}
                </div>
              </div>
            );
          }

          return (
            <div
              key={idx}
              className={cn(
                section.itemTemplate.className,
                isItemBreakable && shouldBlur
                  ? "blur-[2px] pointer-events-none"
                  : ""
              )}
              style={itemWrapperStyle}
              data-canbreak={isItemBreakable ? "true" : undefined}
              data-has-breakable-content={isItemBreakable ? "true" : undefined}
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
