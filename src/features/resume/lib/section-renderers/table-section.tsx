import React from "react";
import { cn } from "@shared/lib/cn";
import * as LucideIcons from "lucide-react";
import { resolvePath } from "../resolve-path";
import { renderDivider } from "../components/Divider";
import {
  hasPendingSuggestions,
  flattenAndFilterItemsWithContext,
} from "../section-utils";
import { renderField } from "../field-renderer";
import {
  getArrayValueSuggestions,
  getSuggestionBackgroundColor,
} from "@features/template-form/lib/get-field-errors";
import { getSuggestionDataAttribute } from "../suggestion-utils";

// Table section renderer (row-based layout with configurable columns)
export function renderTableSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean
): React.ReactNode {
  const items = resolvePath(data, section.listPath, []);

  // Return null if items is not an array or is empty
  if (!Array.isArray(items) || items.length === 0) return null;

  // Filter out items where all values are empty, null, or undefined
  const validItems = items.filter((item: any) => {
    if (!item || typeof item !== "object") return false;

    // Check if at least one field has a non-empty value
    return Object.values(item).some((value: any) => {
      if (!value) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      if (typeof value === "object") {
        const nestedValues = Object.values(value);
        return nestedValues.some(
          (v: any) => v && (typeof v !== "string" || v.trim() !== "")
        );
      }
      return true;
    });
  });

  // Return null if no valid items after filtering
  if (validItems.length === 0) return null;

  const sectionId =
    section.id || section.heading?.path?.split(".").pop() || "table-section";
  const isActive =
    currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();

  // Get section key from listPath (e.g., "experience.items" -> "experience")
  // This is needed for checking suggestions correctly
  const sectionKey = section.listPath?.split(".")[0];
  const sectionSuggestedUpdates = sectionKey ? data[sectionKey]?.suggestedUpdates : undefined;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);

  // Use the sectionSuggestedUpdates for rendering
  const suggestedUpdates = sectionSuggestedUpdates;

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

  // Get column configuration
  const columns = section.columns || [];
  const numColumns = columns.length + (section.headingColumn ? 1 : 0);
  const gridTemplateColumns =
    section.gridTemplateColumns || `repeat(${numColumns}, 1fr)`;

  // Check if this is a single-row section (e.g., badges where all items go in one row)
  const isSingleRow = section.singleRow === true;

  return (
    <div
      data-item="table-section"
      data-canbreak={section.break}
      data-section={sectionId}
      className={cn(shouldBlur && "blur-[2px] pointer-events-none")}
      style={wrapperStyle}
    >
      {/* {shouldHighlight && <SparkleIndicator />} */}

      <div
        data-item="content"
        data-canbreak={section.break ? "true" : undefined}
        className={section.containerClassName}
      >
        {isSingleRow ? (
          // Single row mode: render all items in one row
          <div
            className={cn("grid", section.rowClassName)}
            style={{ gridTemplateColumns }}
          >
            {/* Render heading column */}
            {section.headingColumn && (
              <div className={section.headingColumn.className}>
                {section.heading && (
                  <>
                    <p
                      data-item="heading"
                      className={section.heading.className}
                    >
                      {resolvePath(
                        data,
                        section.heading.path,
                        section.heading.fallback
                      )}
                    </p>
                    {section.heading?.divider &&
                      renderDivider(section.heading.divider)}
                  </>
                )}
              </div>
            )}

            {/* Render content columns with all items */}
            {columns.map((column: any, colIdx: number) => {
              const renderColumnContent = (col: any): React.ReactNode => {
                let content: React.ReactNode = null;

                if (col.type === "badge-list") {
                  // Flatten all items and render as badges
                  const allBadgeItems = flattenAndFilterItemsWithContext(
                    validItems,
                    col.itemPath
                  );

                  // Determine fieldName for suggestions
                  // For simple arrays like "skills.items" with itemPath="name", use itemPath
                  const fieldName = col.itemPath || "items";

                  if (allBadgeItems.length > 0) {
                    const getIconComponent = (iconName?: string) => {
                      if (!iconName) return null;
                      const Icon = (LucideIcons as any)[iconName];
                      return Icon || null;
                    };
                    const IconComponent = col.icon
                      ? getIconComponent(col.icon)
                      : null;

                    content = (
                      <div
                        className={cn(
                          "flex gap-1 flex-wrap",
                          col.containerClassName
                        )}
                      >
                        {allBadgeItems.map(({ value, itemId }, badgeIdx: number) => {
                          const actualValue =
                            typeof value === "object" &&
                            value !== null &&
                            "value" in value
                              ? value.value
                              : value;

                          // Get suggestions for this specific value
                          const valueSuggestions =
                            itemId && fieldName
                              ? getArrayValueSuggestions(
                                  suggestedUpdates,
                                  itemId,
                                  fieldName,
                                  actualValue
                                )
                              : [];

                          const errorBgColor = isThumbnail
                            ? ""
                            : getSuggestionBackgroundColor(valueSuggestions);

                          // Create suggestion data attribute
                          const suggestionData =
                            itemId && fieldName && sectionKey
                              ? getSuggestionDataAttribute(
                                  sectionKey,
                                  itemId,
                                  fieldName,
                                  valueSuggestions,
                                  isThumbnail
                                )
                              : undefined;

                          const hasClickableSuggestions = !!suggestionData;

                          if (IconComponent) {
                            return (
                              <div key={badgeIdx} className={col.itemClassName}>
                                <IconComponent className={col.iconClassName} />
                                <span
                                  className={cn(
                                    col.badgeClassName,
                                    errorBgColor,
                                    hasClickableSuggestions && "cursor-pointer"
                                  )}
                                  data-suggestion={suggestionData}
                                >
                                  {actualValue}
                                </span>
                              </div>
                            );
                          }
                          return (
                            <span
                              key={badgeIdx}
                              className={cn(
                                col.badgeClassName,
                                errorBgColor,
                                hasClickableSuggestions && "cursor-pointer"
                              )}
                              data-suggestion={suggestionData}
                            >
                              {actualValue}
                            </span>
                          );
                        })}
                      </div>
                    );
                  }
                }

                return content;
              };

              return (
                <div
                  key={colIdx}
                  className={column.className}
                  data-canbreak={column.break ? "true" : undefined}
                  data-has-breakable-content={column.break ? "true" : undefined}
                >
                  {renderColumnContent(column)}
                </div>
              );
            })}
          </div>
        ) : (
          // Multi-row mode: each item gets a row
          validItems.map((item: any, itemIdx: number) => {
            // Get itemId for this item
            const itemId = item.itemId || item.id;

            // Handle different column types for a single item
            const renderColumnContent = (column: any): React.ReactNode => {
              let content: React.ReactNode = null;

              if (column.type === "field") {
                content = renderField(
                  { ...column, path: column.path },
                  item,
                  itemId,
                  suggestedUpdates,
                  isThumbnail,
                  undefined,
                  sectionKey || sectionId
                );
              } else if (column.type === "inline-group") {
                const renderedItems = column.items
                  .map((subField: any, subIdx: number) => ({
                    idx: subIdx,
                    element: renderField(
                      { ...subField, path: subField.path },
                      item,
                      itemId,
                      suggestedUpdates,
                      isThumbnail,
                      undefined,
                      sectionKey || sectionId
                    ),
                  }))
                  .filter(
                    ({ element }: { element: React.ReactNode }) =>
                      element !== null &&
                      element !== undefined &&
                      element !== ""
                  );

                if (renderedItems.length > 0) {
                  content = (
                    <div
                      className={column.containerClassName}
                      data-canbreak={column.break ? "true" : undefined}
                      data-has-breakable-content={
                        column.break ? "true" : undefined
                      }
                    >
                      {renderedItems.map(
                        (
                          {
                            element,
                            idx,
                          }: { element: React.ReactNode; idx: number },
                          arrayIdx: number
                        ) => (
                          <React.Fragment key={idx}>
                            {arrayIdx > 0 && column.separator && (
                              <span>{column.separator}</span>
                            )}
                            <span>{element}</span>
                          </React.Fragment>
                        )
                      )}
                    </div>
                  );
                }
              } else if (column.type === "duration") {
                content = renderField(
                  {
                    type: "duration",
                    path: column.path,
                    className: column.className,
                  },
                  item,
                  itemId,
                  suggestedUpdates,
                  isThumbnail,
                  undefined,
                  sectionKey || sectionId
                );
              } else if (column.type === "html") {
                content = renderField(
                  {
                    type: "html",
                    path: column.path,
                    className: column.className,
                  },
                  item,
                  itemId,
                  suggestedUpdates,
                  isThumbnail,
                  undefined,
                  sectionKey || sectionId
                );
              } else if (column.type === "text") {
                content = renderField(
                  {
                    type: "text",
                    path: column.path,
                    className: column.className,
                    fallback: column.fallback,
                  },
                  item,
                  itemId,
                  suggestedUpdates,
                  isThumbnail,
                  undefined,
                  sectionKey || sectionId
                );
              } else if (column.type === "group") {
                // Render a group of fields stacked vertically
                const groupItems = column.items
                  .map((subField: any) => {
                    // Handle inline-group specially to preserve inline layout
                    if (subField.type === "inline-group") {
                      const renderedItems = subField.items
                        .map((inlineSubField: any, idx: number) => ({
                          idx,
                          element: renderField(
                            { ...inlineSubField, path: inlineSubField.path },
                            item,
                            itemId,
                            suggestedUpdates,
                            isThumbnail,
                            undefined,
                            sectionKey || sectionId
                          ),
                        }))
                        .filter(
                          ({ element }: { element: React.ReactNode }) =>
                            element !== null &&
                            element !== undefined &&
                            element !== ""
                        );

                      if (renderedItems.length === 0) return null;

                      const hasContainerClassName =
                        !!subField.containerClassName;
                      const hasSeparator = !!subField.separator;

                      const inlineContent = renderedItems.map(
                        (
                          {
                            element,
                            idx,
                          }: { element: React.ReactNode; idx: number },
                          arrayIdx: number
                        ) => (
                          <React.Fragment key={idx}>
                            {arrayIdx > 0 && hasSeparator && (
                              <span>{subField.separator}</span>
                            )}
                            <span>{element}</span>
                          </React.Fragment>
                        )
                      );

                      // Use containerClassName if provided, otherwise className
                      const wrapperClassName = hasContainerClassName
                        ? subField.containerClassName
                        : subField.className;

                      if (wrapperClassName) {
                        return (
                          <div
                            className={wrapperClassName}
                            data-canbreak={subField.break ? "true" : undefined}
                            data-has-breakable-content={
                              subField.break ? "true" : undefined
                            }
                          >
                            {inlineContent}
                          </div>
                        );
                      }

                      return <>{inlineContent}</>;
                    }
                    // For other field types, use renderField normally
                    return renderField(
                      { ...subField, path: subField.path },
                      item,
                      itemId,
                      suggestedUpdates,
                      isThumbnail,
                      undefined,
                      sectionKey || sectionId
                    );
                  })
                  .filter(
                    (element: React.ReactNode) =>
                      element !== null &&
                      element !== undefined &&
                      element !== ""
                  );

                if (groupItems.length > 0) {
                  content = (
                    <div className={column.className}>{groupItems}</div>
                  );
                }
              } else if (column.type === "link") {
                content = renderField(
                  {
                    type: "link",
                    path: column.path,
                    href: column.href,
                    className: column.className,
                  },
                  item,
                  itemId,
                  suggestedUpdates,
                  isThumbnail,
                  undefined,
                  sectionKey || sectionId
                );
              } else if (column.type === "badge-list") {
                // Render badges from item path (flatten if needed)
                const badgeItems = column.itemPath
                  ? flattenAndFilterItemsWithContext([item], column.itemPath)
                  : (Array.isArray(item) ? item : [item]).filter(
                      (v: any) =>
                        v && (typeof v !== "string" || v.trim() !== "")
                    );

                // Determine fieldName for suggestions
                const fieldName = column.itemPath || "items";

                if (badgeItems.length > 0) {
                  const getIconComponent = (iconName?: string) => {
                    if (!iconName) return null;
                    const Icon = (LucideIcons as any)[iconName];
                    return Icon || null;
                  };
                  const IconComponent = column.icon
                    ? getIconComponent(column.icon)
                    : null;

                  content = (
                    <div
                      className={cn(
                        "flex gap-1 flex-wrap",
                        column.containerClassName
                      )}
                    >
                      {badgeItems.map((badgeItem: any, badgeIdx: number) => {
                        const value =
                          typeof badgeItem === "object" &&
                          badgeItem !== null &&
                          "value" in badgeItem
                            ? badgeItem.value
                            : badgeItem;

                        const badgeItemId = badgeItem?.itemId || itemId;

                        // Get suggestions for this specific value
                        const valueSuggestions =
                          badgeItemId && fieldName
                            ? getArrayValueSuggestions(
                                suggestedUpdates,
                                badgeItemId,
                                fieldName,
                                value
                              )
                            : [];

                        const errorBgColor = isThumbnail
                          ? ""
                          : getSuggestionBackgroundColor(valueSuggestions);

                        // Create suggestion data attribute
                        const suggestionData =
                          badgeItemId && fieldName && sectionKey
                            ? getSuggestionDataAttribute(
                                sectionKey,
                                badgeItemId,
                                fieldName,
                                valueSuggestions,
                                isThumbnail
                              )
                            : undefined;

                        const hasClickableSuggestions = !!suggestionData;

                        if (IconComponent) {
                          return (
                            <div
                              key={badgeIdx}
                              className={column.itemClassName}
                            >
                              <IconComponent className={column.iconClassName} />
                              <span
                                className={cn(
                                  column.badgeClassName,
                                  errorBgColor,
                                  hasClickableSuggestions && "cursor-pointer"
                                )}
                                data-suggestion={suggestionData}
                              >
                                {value}
                              </span>
                            </div>
                          );
                        }
                        return (
                          <span
                            key={badgeIdx}
                            className={cn(
                              column.badgeClassName,
                              errorBgColor,
                              hasClickableSuggestions && "cursor-pointer"
                            )}
                            data-suggestion={suggestionData}
                          >
                            {value}
                          </span>
                        );
                      })}
                    </div>
                  );
                }
              }

              return content;
            };

            return (
              <div
                key={itemIdx}
                data-item="table-row"
                data-has-breakable-content={section.break ? "true" : undefined}
                className={cn("grid", section.rowClassName)}
                style={{ gridTemplateColumns }}
              >
                {/* Render heading column (only for first row) */}
                {section.headingColumn && (
                  <div
                    className={section.headingColumn.className}
                    style={{ gridColumn: 1 }}
                  >
                    {itemIdx === 0 && section.heading && (
                      <>
                        <p
                          data-item="heading"
                          className={section.heading.className}
                        >
                          {resolvePath(
                            data,
                            section.heading.path,
                            section.heading.fallback
                          )}
                        </p>
                        {section.heading?.divider &&
                          renderDivider(section.heading.divider)}
                      </>
                    )}
                  </div>
                )}

                {/* Render content columns for each item */}
                {columns.map((column: any, colIdx: number) => (
                  <div
                    key={`${itemIdx}-${colIdx}`}
                    className={column.className}
                    data-canbreak={column.break ? "true" : undefined}
                    data-has-breakable-content={
                      column.break ? "true" : undefined
                    }
                    style={{
                      gridColumn: section.headingColumn
                        ? colIdx + 2
                        : colIdx + 1,
                    }}
                  >
                    {renderColumnContent(column)}
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>
      {/* Render optional section divider */}
      {section.divider && renderDivider(section.divider)}
    </div>
  );
}
