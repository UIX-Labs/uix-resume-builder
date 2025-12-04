/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
import dayjs from "dayjs";
import { cn } from "@shared/lib/cn";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import * as LucideIcons from "lucide-react";
import React from "react";
import type { SuggestedUpdates } from "@entities/resume";
import {
  getFieldSuggestions,
  getArrayValueSuggestions,
  getSuggestionBackgroundColor,
} from "@features/template-form/lib/get-field-errors";

// Utility to resolve data paths
function resolvePath(data: any, path: string, fallback?: any): any {
  if (!path) return fallback;

  const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  let result = data;

  for (const key of keys) {
    if (result === null || result === undefined) return fallback;
    result = result[key];
  }

  return result ?? fallback;
}

// Utility to flatten and filter items (handles both nested and flat structures)
function flattenAndFilterItemsWithContext(
  items: any[],
  itemPath?: string,
  parentId?: string
): Array<{ value: any; itemId?: string }> {
  const flattenedItems: Array<{ value: any; itemId?: string }> = [];

  items.forEach((item: any) => {
    // Use item's own ID, or fall back to parentId if item is a primitive (string)
    const itemId = item.itemId || item.id || parentId;
    const value = itemPath ? resolvePath(item, itemPath) : item;

    if (Array.isArray(value)) {
      const filtered = value.filter(
        (v: any) => v && (typeof v !== "string" || v.trim() !== "")
      );

      flattenedItems.push(
        ...filtered.map((v: any) => {
          return {
            value: v,
            itemId,
          };
        })
      );
    } else if (value && (typeof value !== "string" || value.trim() !== "")) {
      flattenedItems.push({ value, itemId });
    }
  });

  return flattenedItems;
}

// Utility to check if a section has pending suggestions
// Returns true if there are any valid suggestions (where old !== new)
export function hasPendingSuggestions(suggestedUpdates: any[] | undefined): boolean {
  if (!suggestedUpdates || !Array.isArray(suggestedUpdates)) {
    return false;
  }

  return suggestedUpdates.some((update: any) => {
    if (!update.fields) return false;

    // Check each field in the update
    return Object.values(update.fields).some((fieldData: any) => {
      if (!fieldData.suggestedUpdates || !Array.isArray(fieldData.suggestedUpdates)) {
        return false;
      }

      // Check if there are any valid suggestions (where old !== new)
      return fieldData.suggestedUpdates.some((suggestion: any) => {
        // If old equals new, it's not a valid suggestion
        if (suggestion.old && suggestion.old === suggestion.new) {
          return false;
        }
        return true;
      });
    });
  });
}

// Utility to check if a specific item has pending suggestions
// Returns true if the item with given itemId has any valid suggestions (where old !== new)
function hasItemPendingSuggestions(
  suggestedUpdates: any[] | undefined,
  itemId: string
): boolean {
  if (!suggestedUpdates || !Array.isArray(suggestedUpdates)) {
    return false;
  }

  // Find the update for this specific item
  const itemUpdate = suggestedUpdates.find(
    (update: any) => update.itemId === itemId
  );

  if (!itemUpdate || !itemUpdate.fields) {
    return false;
  }

  // Check if any field in this item has valid suggestions
  return Object.values(itemUpdate.fields).some((fieldData: any) => {
    if (!fieldData.suggestedUpdates || !Array.isArray(fieldData.suggestedUpdates)) {
      return false;
    }

    // Check if there are any valid suggestions (where old !== new)
    return fieldData.suggestedUpdates.some((suggestion: any) => {
      // If old equals new, it's not a valid suggestion
      if (suggestion.old && suggestion.old === suggestion.new) {
        return false;
      }
      return true;
    });
  });
}

type RenderProps = {
  template: any;
  data: any;
  className?: string;
  currentSection?: string;
  hasSuggestions?: boolean;
   isThumbnail?: boolean;
};

// Reusable sparkle indicator badge for highlighted sections
function SparkleIndicator() {
  return (
    <div
      style={{
        position: "absolute",
        top: "-25px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#02A44F",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(2, 164, 79, 0.3)",
        zIndex: 10,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
          fill="white"
        />
        <path
          d="M18 4L18.75 6.25L21 7L18.75 7.75L18 10L17.25 7.75L15 7L17.25 6.25L18 4Z"
          fill="white"
        />
      </svg>
    </div>
  );
}
export function ResumeRenderer({
  template,
  data,
  className,
  currentSection,
  hasSuggestions = false,
  isThumbnail = false,
}: RenderProps) {
  const [pages, setPages] = useState<[React.ReactNode[], React.ReactNode[]][]>(
    []
  );
  const dummyContentRef = useRef<HTMLDivElement>(null);

  const { page } = template;

  const PAGE_HEIGHT = 1122;
  const PAGE_PADDING = page.padding ?? 24;

  // NEW: dynamic max height per column
  const DEFAULT_MAX = PAGE_HEIGHT - PAGE_PADDING * 2;
  const COLUMN_MAX = {
    left: DEFAULT_MAX,
    right: DEFAULT_MAX,
  };

  useLayoutEffect(() => {
    const container = dummyContentRef.current;
    if (!container) return;

    const bannerEl = container.querySelector('[data-section-type="banner"]') as HTMLElement | null;
    const calculatedBannerHeight = bannerEl ? bannerEl.offsetHeight : 0;

    const leftCol = container.querySelector('[data-column="left"]') as HTMLElement | null;
    const rightCol = container.querySelector('[data-column="right"]') as HTMLElement | null;

    const leftPages: React.ReactNode[][] = [];
    const rightPages: React.ReactNode[][] = [];

    function paginateOneColumn(
      columnEl: HTMLElement,
      columnName: 'left' | 'right',
      outPages: React.ReactNode[][],
      bHeight: number,
    ) {
      let currentColumnPage: React.ReactNode[] = [];
      outPages.push(currentColumnPage);

      const pageMaxFull = COLUMN_MAX[columnName];
      const pageMaxFirst = pageMaxFull - bHeight;

      let pageTop: number | null = null;

      function walk(el: HTMLElement) {
        const children = Array.from(el.children) as HTMLElement[];
        if (!children.length) return;

        for (const child of children) {
          child.style.display = "";

          const rect = child.getBoundingClientRect();
          const canBreak = child.getAttribute("data-canbreak") === "true";

          if (pageTop == null) {
            pageTop = rect.top;
          }

          if (canBreak) {
            walk(child);
            continue;
          }

          const childBottom = rect.bottom;
          const usedHeight = childBottom - pageTop;

          const isFirstPage = outPages.length === 1;
          const currentMax = isFirstPage ? pageMaxFirst : pageMaxFull;

          if (usedHeight > currentMax && currentColumnPage.length > 0) {
            currentColumnPage = [];
            outPages.push(currentColumnPage);
            pageTop = rect.top;
          }

          currentColumnPage.push(child.cloneNode(true) as unknown as React.ReactNode);
        }
      }

      walk(columnEl);
    }

    if (leftCol) paginateOneColumn(leftCol, 'left', leftPages, calculatedBannerHeight);
    if (rightCol) paginateOneColumn(rightCol, 'right', rightPages, calculatedBannerHeight);

    const totalPages = Math.max(leftPages.length, rightPages.length);
    const merged: [React.ReactNode[], React.ReactNode[]][] = [];

    for (let i = 0; i < totalPages; i++) {
      merged.push([leftPages[i] || [], rightPages[i] || []]);
    }

    setPages(merged);
  }, [template, data, currentSection, hasSuggestions,isThumbnail]);

  const { columnConfig, leftItems, rightItems, bannerItems } = useMemo(() => {
    if (!template.columns) {
      return {
        columnConfig: {
          spacing: "0px",
          left: {
            width: "100%",
          },
          right: {
            width: "0%",
          },
        },

        leftItems: template.sections,
        rightItems: [],
        bannerItems: [],
      };
    }

    const bannerItems = template.sections.filter((s: any) => s.type === 'banner');
    const leftItems = template.sections.filter((s: any) => s.column === 'left' && s.type !== 'banner');
    const rightItems = template.sections.filter((s: any) => s.column === 'right' && s.type !== 'banner');

    return {
      columnConfig: template.columns,
      leftItems,
      rightItems,
      bannerItems,
    };
  }, [template]);

  const leftWidth = columnConfig.left.width;
  const rightWidth = columnConfig.right.width;
  const spacing = columnConfig.spacing;
  const leftColumnClassName = columnConfig.left.className || "";
  const rightColumnClassName = columnConfig.right.className || "";
  const fontFamily = page.fontFamily || undefined;

  const baseStyle = {
    width: "21cm",
    padding: PAGE_PADDING,
    gridTemplateColumns: `calc(${leftWidth}) calc(${rightWidth})`,
    gap: spacing,
    fontFamily: fontFamily,
  };

  return (
    <>
      <div
        ref={dummyContentRef}
        className="mb-5 grid"
        style={{
          ...baseStyle,
          position: "absolute",
          visibility: "hidden",
        }}
      >
        {bannerItems.length > 0 && (
          <div style={{ gridColumn: '1 / -1' }} data-section-type="banner">
            {bannerItems.map((s: any, i: number) => (
              <React.Fragment key={i}>{renderSection(s, data, currentSection, hasSuggestions)}</React.Fragment>
            ))}
          </div>
        )}
        <div className={cn('flex flex-col', leftColumnClassName)} data-column="left">
          {leftItems.map((s: any, i: number) => (
            <React.Fragment key={i}>{renderSection(s, data, currentSection, hasSuggestions)}</React.Fragment>
          ))}
        </div>
        <div className={cn('flex flex-col', rightColumnClassName)} data-column="right">
          {rightItems.map((s: any, i: number) => (
            <React.Fragment key={i}>{renderSection(s, data, currentSection, hasSuggestions)}</React.Fragment>
          ))}
        </div>
      </div>

      {pages.map((columns, index) => {
        const [leftColumn, rightColumn] = columns;
        return (
          <div
            key={index}
            className={cn('grid mb-5', page.className, className)}
            style={{
              ...baseStyle,
              height: '29.7cm',
              backgroundColor: page.background || 'white',
              gridTemplateRows: index === 0 && bannerItems.length > 0 ? 'auto 1fr' : '1fr',
            }}
          >
            {index === 0 && bannerItems.length > 0 && (
              <div
                style={{
                  gridColumn: '1 / -1',
                  gridRow: '1',
                  marginLeft: `-${PAGE_PADDING}px`,
                  marginRight: `-${PAGE_PADDING}px`,
                  marginTop: `-${PAGE_PADDING}px`,
                }}
              >
                {bannerItems.map((s: any, i: number) => (
                  <React.Fragment key={i}>{renderSection(s, data, currentSection, hasSuggestions)}</React.Fragment>
                ))}
              </div>
            )}
            <div className={cn('flex flex-col', leftColumnClassName)} style={{ gridRow: index === 0 && bannerItems.length > 0 ? '2' : '1' }}>
              {leftColumn.map((node: any, i) => (
                <div
                  key={i}
                  dangerouslySetInnerHTML={{ __html: node.outerHTML }}
                  className={node.containerClassName}
                />
              ))}
            </div>
            <div className={cn('flex flex-col', rightColumnClassName)} style={{ gridRow: index === 0 && bannerItems.length > 0 ? '2' : '1' }}>
              {rightColumn.map((node: any, i) => (
                <div
                  key={i}
                  dangerouslySetInnerHTML={{ __html: node.outerHTML }}
                  className={node.containerClassName}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

// Main section renderer
function renderSection(section: any, data: any, currentSection?: string, hasSuggestions?: boolean, isThumbnail?: boolean): React.ReactNode {
  // Check if section is hidden
  // Get section ID from different possible sources
  let sectionId = section.id;

  // If no direct ID, try to extract from listPath (e.g., "experience.items" -> "experience")
  if (!sectionId && section.listPath) {
    sectionId = section.listPath.split(".")[0];
  }

  // If still no ID, try to extract from heading path (e.g., "experience.heading" -> "experience")
  if (!sectionId && section.heading?.path) {
    sectionId = section.heading.path.split(".")[0];
  }

  // Map template section IDs to data keys
  // The header and summary sections both store data under 'personalDetails' key
  let dataKey = sectionId;
  if (sectionId === "header" || sectionId === "summary") {
    dataKey = "personalDetails";
  }

  // Check if this section is marked as hidden
  if (dataKey && data[dataKey]?.isHidden === true) {
    return null;
  }

  if (section.type === 'header') return renderHeaderSection(section, data, currentSection, hasSuggestions);
  if (section.type === 'banner') return renderHeaderSection(section, data, currentSection, hasSuggestions);
  if (section.type === 'list-section') return renderListSection(section, data, currentSection, hasSuggestions);
  if (section.type === 'two-column-layout') return renderTwoColumnLayout(section, data, currentSection, hasSuggestions);
  if (section.type === 'content-section') return renderContentSection(section, data, currentSection, hasSuggestions);
  if (section.type === 'inline-list-section')
    return renderInlineListSection(section, data, currentSection, hasSuggestions);
  if (section.type === 'badge-section') return renderBadgeSection(section, data, currentSection, hasSuggestions);
  return null;


}

// Render divider (horizontal line under headings)
function renderDivider(divider: any): React.ReactNode {
  if (!divider) return null;

  if (divider.variant === "line") {
    return (
      <div
        data-item="divider"
        className={cn("w-full bg-zinc-200 h-px", divider.className)}
      />
    );
  }
  if (divider.variant === "pipe") {
    return (
      <span data-item="divider" className={divider.className}>
        |
      </span>
    );
  }
  return null;
}

// Header section renderer
function renderHeaderSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
): React.ReactNode {
  const { fields, className, id } = section;



  const hasGenericFields = Object.values(fields).some(
    (field: any) => field?.type && ['image', 'group', 'text'].includes(field.type),
  );

  const sectionId = id || 'header-section';

    const dataKey = 'personalDetails';
  const sectionSuggestedUpdates = data[dataKey]?.suggestedUpdates;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);
  const isHeader = sectionId.toLowerCase() === 'header' || sectionId.toLowerCase() === 'header-section';
  const isActive = currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();


  const isPersonalDetailsActive = currentSection?.toLowerCase() === 'personaldetails' && isHeader;

  const shouldBlur = !isThumbnail && hasSuggestions && currentSection && !isActive && !isPersonalDetailsActive && hasValidSuggestions;
  const shouldHighlight = !isThumbnail && hasSuggestions && (isActive || isPersonalDetailsActive) && hasValidSuggestions;

  const wrapperStyle: React.CSSProperties = {
    scrollMarginTop: '20px',
    ...(hasSuggestions && {
      transition: 'filter 0.3s ease, background-color 0.3s ease, border 0.3s ease',
    }),
    ...(shouldHighlight && {
      backgroundColor: 'rgba(200, 255, 230, 0.35)',
      border: '2px solid rgba(0, 168, 107, 0.4)',
      borderRadius: '12px',
      padding: '16px',
      position: 'relative',
    }),
  };

  if (hasGenericFields) {
    return (
      <div
        className={cn(className, shouldBlur && 'blur-[2px] pointer-events-none')}
        data-section={sectionId}
        style={wrapperStyle}
      >
        {shouldHighlight && <SparkleIndicator />}
        {Object.keys(fields).map((key) => (
          <React.Fragment key={key}>{renderField(fields[key], data, undefined, undefined, isThumbnail)}</React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(className, shouldBlur && 'blur-[2px] pointer-events-none')}
      data-section={sectionId}
      style={wrapperStyle}
    >
      {shouldHighlight && <SparkleIndicator />}
      {fields.nameTitle ? (
        <div className={fields.nameTitle.className}>
          {fields.name && (
            <p className={fields.name.className}>{resolvePath(data, fields.name.path, fields.name.fallback)}</p>
          )}
          {fields.title && fields.title.path && (
            <p className={fields.title.className}>{resolvePath(data, fields.title.path)}</p>
          )}
          {fields.description && fields.description.path && (
            <div
              className={fields.description.className}
              dangerouslySetInnerHTML={{
                __html: resolvePath(data, fields.description.path, fields.description.fallback) || '',
              }}
            />
          )}
        </div>
      ) : (
        <>
          {fields.name && (
            <p className={fields.name.className}>{resolvePath(data, fields.name.path, fields.name.fallback)}</p>
          )}
          {fields.title && fields.title.path && (
            <p className={fields.title.className}>{resolvePath(data, fields.title.path)}</p>
          )}
          {fields.description && fields.description.path && (
            <div
              className={fields.description.className}
              dangerouslySetInnerHTML={{
                __html: resolvePath(data, fields.description.path, fields.description.fallback) || '',
              }}
            />
          )}
        </>
      )}

      {fields.contact && fields.contact.type === 'contact-grid' && (
        <div className={fields.contact.className}>
          {fields.contact.items.map((item: any, idx: number) => {
            if (item.type === 'inline-group-with-icon') {
              return (
                <div key={idx} className={item.className}>
                  {item.items.map((subItem: any, subIdx: number) => (
                    <React.Fragment key={subIdx}>{renderField(subItem, data, undefined, undefined, isThumbnail)}</React.Fragment>
                  ))}
                </div>
              );
            }
            return (
              <div key={idx} className={item.className}>
                {renderField(item, data, undefined, undefined, isThumbnail)}
              </div>
            );
          })}
        </div>
      )}

      {fields.contact && (
        <div className={fields.contact.className}>
          {(() => {
   
            const validItems = fields.contact.items
              .map((item: any, idx: number) => {
                const value = resolvePath(data, item.path, item.fallback);
                if (!value) return null;
                return { item, value, originalIdx: idx };
              })
              .filter((entry: any) => entry !== null);
            return validItems.map((entry: any, arrayIdx: number) => {
              const { item, value, originalIdx } = entry;
              const showSeparator = arrayIdx > 0 && fields.contact.separator;
              if (item.type === 'link') {
                const href = item.href.startsWith('mailto:')
                  ? item.href.replace('{{value}}', value)
                  : resolvePath(data, item.href);

                // Don't use target="_blank" for mailto links
                const linkProps = item.href.startsWith('mailto:')
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' };
                return (
                  <span key={originalIdx}>
                    {showSeparator && fields.contact.separator}
                    <a href={href} className={item.className} {...linkProps}>
                      {value}
                    </a>
                  </span>
                );
              }
              return (
                <React.Fragment key={originalIdx}>
                  {showSeparator && fields.contact.separator}
                  <span className={item.className}>{value}</span>
                </React.Fragment>
              );
            });
          })()}
        </div>
      )}

      {fields.address && (
        <p className={fields.address.className}>{resolvePath(data, fields.address.path, fields.address.fallback)}</p>
      )}
    </div>
  );
}


// List section renderer (education, experience, projects, certifications)
function renderListSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
): React.ReactNode {
  const rawItems = resolvePath(data, section.listPath, []);

const items = rawItems.map((item: any) => {
  return {
    ...item,
  };
});

if (!Array.isArray(items) || items.length === 0) return null;

  const validItems = items.filter((item: any) => {
    if (!item || typeof item !== 'object') return false;

    return Object.values(item).some((value: any) => {
      if (!value) return false;
      if (typeof value === 'string' && value.trim() === '') return false;
      if (typeof value === 'object') {
        const nestedValues = Object.values(value);
        return nestedValues.some((v: any) => v && (typeof v !== 'string' || v.trim() !== ''));
      }
      return true;
    });
  });

  if (validItems.length === 0) return null;


  const sectionId = section.id || section.heading?.path?.split('.').pop() || 'list-section';
  const isActive = currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();
  const sectionSuggestedUpdates = data[sectionId]?.suggestedUpdates;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);


  const shouldBlur = !isThumbnail && hasSuggestions && currentSection && !isActive && hasValidSuggestions;
  const shouldHighlight = !isThumbnail && hasSuggestions && isActive && hasValidSuggestions;

  function RenderListSectionHeading() {
    return (
      <div className={cn('flex flex-col', section.heading.className)}>
        {section.heading && (
          <p data-item="heading">{resolvePath(data, section.heading.path, section.heading.fallback)}</p>
        )}

        {section.heading.divider && renderDivider(section.heading.divider)}
      </div>
    );
  }

  const wrapperStyle: React.CSSProperties = {
    scrollMarginTop: '20px',
    ...(hasSuggestions && {
      transition: 'filter 0.3s ease, background-color 0.3s ease, border 0.3s ease',
    }),
    ...(shouldHighlight && {
      backgroundColor: 'rgba(200, 255, 230, 0.35)',
      border: '2px solid rgba(0, 168, 107, 0.4)',
      borderRadius: '12px',
      padding: '16px',
      position: 'relative',
    }),
  };


  const isTwoColumnLayout = section.className && section.className.includes('justify-between');

  if (isTwoColumnLayout) {
    return (
      <div data-item="list-section" className={cn(section.className)}>
        {/* Left column: Heading */}
        <div className={cn('flex-shrink-0', section.heading.className)}>
          {section.heading && (
            <p data-item="heading">{resolvePath(data, section.heading.path, section.heading.fallback)}</p>
          )}
        </div>

        {/* Right column: Content */}
        <div data-item="content" className={cn('flex-1', section.containerClassName)}>
          {validItems.map((item: any, idx: number) => (
            <div key={idx} className={section.itemTemplate.className}>
              {section.itemTemplate.rows
                ? renderItemWithRows(section.itemTemplate, item)
                : renderItemWithFields(section.itemTemplate, item)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const itemWrapperStyle = section.break ? wrapperStyle : {};
  const containerWrapperStyle = section.break ? {} : wrapperStyle;

  // Get section key from listPath (e.g., "experience.items" -> "experience")
  const sectionKey = section.listPath?.split('.')[0];

  // Get suggestedUpdates from the data for this section
  const suggestedUpdates = sectionKey ? (data[sectionKey] as any)?.suggestedUpdates : undefined;

  return (
    <div
      data-item="list-section"
      data-canbreak={section.break}
      data-section={sectionId}
      className={shouldBlur ? 'blur-[2px] pointer-events-none' : ''}
      style={containerWrapperStyle}
    >
      {shouldHighlight && <SparkleIndicator />}
      {!section.break && <RenderListSectionHeading />}

      <div data-item="content" data-canbreak={section.break} className={section.containerClassName}>
        {validItems.map((item: any, idx: number) => {
          const itemId = item.itemId || item.id;

          return (
            <div
              key={idx}
              className={cn(
                section.break && idx === 0 ? '' : section.itemTemplate.className,
                section.break && shouldBlur ? 'blur-[2px] pointer-events-none' : '',
              )}
              style={itemWrapperStyle}
            >
              {section.break && idx === 0 && shouldHighlight && (
                <div style={{ position: 'relative' }}>
                  <SparkleIndicator />
                </div>
              )}
              {section.break && idx === 0 ? (
                <>
                  <RenderListSectionHeading />
                  <div className={section.itemTemplate.className}>
                    {section.itemTemplate.rows
                      ? renderItemWithRows(section.itemTemplate, item, itemId, suggestedUpdates, isThumbnail)
                      : renderItemWithFields(section.itemTemplate, item, itemId, suggestedUpdates, isThumbnail)}
                  </div>
                </>
              ) : (
                <>
                  {section.itemTemplate.rows
                    ? renderItemWithRows(section.itemTemplate, item, itemId, suggestedUpdates, isThumbnail)
                    : renderItemWithFields(section.itemTemplate, item, itemId, suggestedUpdates, isThumbnail)}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


// Two-column layout renderer
function renderTwoColumnLayout(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
): React.ReactNode {
  const { leftColumn, rightColumn, className } = section;

  return (
    <div className={cn(className)} data-item="two-column-layout">
      {/* Left Column */}
      {leftColumn && (
        <div className={cn(leftColumn.className)}>
          {leftColumn.sections?.map((subSection: any, idx: number) => (
            <React.Fragment key={idx}>{renderSection(subSection, data, currentSection, hasSuggestions, isThumbnail)}</React.Fragment>
          ))}
        </div>
      )}

      {/* Right Column */}
      {rightColumn && (
        <div className={cn(rightColumn.className)}>
          {rightColumn.sections?.map((subSection: any, idx: number) => (
            <React.Fragment key={idx}>{renderSection(subSection, data, currentSection, hasSuggestions, isThumbnail)}</React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}


function renderItemWithRows(
  template: any,
  item: any,
  itemId?: string,
  suggestedUpdates?: SuggestedUpdates,
  isThumbnail?: boolean,
): React.ReactNode {
  return template.rows.map((row: any, rowIdx: number) => (
    <div key={rowIdx} className={row.className}>
      {row.cells.map((cell: any, cellIdx: number) => (
        <div key={cellIdx}>
          {renderField(cell, item, itemId, suggestedUpdates, isThumbnail)}
        </div>
      ))}
    </div>
  ));
}

function renderItemWithFields(
  template: any,
  item: any,
  itemId?: string,
  suggestedUpdates?: SuggestedUpdates,
  isThumbnail?: boolean,
): React.ReactNode {
  return template.fields.map((field: any, idx: number) => (
    <div key={idx}>
      {renderField(field, item, itemId, suggestedUpdates, isThumbnail)}
    </div>
  ));
}

function renderField(field: any, data: any, itemId?: string, suggestedUpdates?: SuggestedUpdates, isThumbnail?: boolean): React.ReactNode {
  // Get suggestions for this specific field if we have the context
  const fieldPath = field.path?.split('.').pop(); // Get the field name from path like "experience.items[0].description"
  const errorSuggestions = fieldPath ? getFieldSuggestions(suggestedUpdates, itemId, fieldPath) : [];
  const errorBgColor = isThumbnail ? '' : getSuggestionBackgroundColor(errorSuggestions);

  if (field.type === 'inline-group') {
    // Filter out items with no value first
    const renderedItems = field.items
      .map((subField: any, idx: number) => ({
        idx,
        element: renderField(subField, data, itemId, suggestedUpdates, isThumbnail),
      }))
      .filter(
        ({ element }: { element: React.ReactNode }) => element !== null && element !== undefined && element !== '',
      );

    if (renderedItems.length === 0) return null;

    const hasClassName = !!field.className;
    const hasSeparator = !!field.separator;

    const content = renderedItems.map(
      ({ element, idx }: { element: React.ReactNode; idx: number }, arrayIdx: number) => (
        <React.Fragment key={idx}>
          {arrayIdx > 0 && hasSeparator && <span>{field.separator}</span>}
          <span>{element}</span>
        </React.Fragment>
      ),
    );

    // Use div wrapper when className is provided
    if (hasClassName) {
      return <div className={field.className}>{content}</div>;
    }

    // No className, use fragment
    return <>{content}</>;
  }

  if (field.type === 'icon') {
    const IconComponent = (LucideIcons as any)[field.name];
    if (!IconComponent) return null;
    return <IconComponent size={field.size || 16} className={field.className} />;
  }

  if (field.type === 'image') {
    const src = resolvePath(data, field.path, field.fallback);
    if (!src && !field.fallback) return null;

    return <img src={src || field.fallback} alt={field.alt || 'Image'} className={cn(field.className)} />;
  }

  if (field.type === 'group') {
    return (
      <div className={field.className}>
        {field.items.map((subField: any, idx: number) => (
          <React.Fragment key={idx}>{renderField(subField, data, itemId, suggestedUpdates, isThumbnail)}</React.Fragment>
        ))}
      </div>
    );
  }

  if (field.type === 'text') {
    const value = resolvePath(data, field.path, field.fallback);
    if (!value) return null;
    return <p className={cn(field.className, errorBgColor)}>{value}</p>;
  }

  if (field.type === 'skillLevel') {
    const value = resolvePath(data, field.path, field.fallback);
    if (!value) return null;

    const levelMap: Record<string, number> = {
      Beginner: 2,
      Intermediate: 3,
      Expert: 5,
    };

    const circleCount = levelMap[value] || 3;

    return (
      <div className={cn('flex gap-1', field.className)}>
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className={cn('w-2 h-2 rounded-full border border-black', index < circleCount ? 'bg-black' : 'bg-gray-400')}
          />
        ))}
      </div>
    );
  }

  if (field.type === 'inline-group-with-icon') {
    return (
      <>
        {field.items.map((subField: any, idx: number) => (
          <span key={idx}>
            {idx > 0 && field.separator}
            {renderField(subField, data, itemId, suggestedUpdates, isThumbnail)}
          </span>
        ))}
      </>
    );
  }

  if (field.type === 'duration') {
    const duration = resolvePath(data, field.path);
    if (!duration) return null;

    const formatDate = (dateString: string): string => {
      if (!dateString || dateString.trim() === '') return '';

      const parsed = dayjs(dateString);
      if (!parsed.isValid()) return '';

      // If year-only, keep as-is
      if (/^\d{4}$/.test(dateString.trim())) return dateString.trim();

      // If already in YYYY-MM format (month-year only), format as MMM YYYY
      if (/^\d{4}-\d{2}$/.test(dateString.trim())) {
        return parsed.format('MMM YYYY');
      }

      // For full dates YYYY-MM-DD, format as MMM YYYY
      return parsed.format('MMM YYYY');
    };

    if (duration.startDate && duration.endDate) {
      const start = formatDate(duration.startDate);
      const end = formatDate(duration.endDate);
      return <span className={field.className}>{`${start} - ${end}`}</span>;
    }

    if (duration.startDate && duration.ongoing) {
      const start = formatDate(duration.startDate);
      return <span className={field.className}>{`${start} - Present`}</span>;
    }

    return null;
  }

  if (field.type === 'html') {
    const value = resolvePath(data, field.path, field.fallback);
    if (!value) return null;
    return <div className={cn(field.className, )} dangerouslySetInnerHTML={{ __html: value }} />;
  }

  if (field.type === 'link') {
    const value = resolvePath(data, field.path, field.fallback);
    const href = resolvePath(data, field.href);
    if (!value || !href) return null;
    return (
      <a href={href} className={cn(field.className, errorBgColor)} target="_blank" rel="noopener noreferrer">
        {value}
      </a>
    );
  }

  const value = resolvePath(data, field.path, field.fallback);
  if (!value) return null;

  const text = `${field.prefix || ''}${value}${field.suffix || ''}`;
  return <span className={cn(field.className, errorBgColor)}>{text}</span>;
}

// Content section renderer (summary)
function renderContentSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
): React.ReactNode {
  const value = resolvePath(data, section.content.path, section.content.fallback);



  const sectionId = section.id || section.heading?.path?.split('.').pop() || 'content-section';
  const isActive = currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();

  // Highlight summary section when personalDetails is selected
  const isSummaryForPersonalDetails =
    currentSection?.toLowerCase() === 'personaldetails' && sectionId.toLowerCase() === 'summary';

      const dataKey = sectionId.toLowerCase() === 'summary' ? 'professionalSummary' : sectionId;
  const sectionSuggestedUpdates = data[dataKey]?.suggestedUpdates;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);


  const shouldBlur = !isThumbnail && hasSuggestions && currentSection && !isActive && !isSummaryForPersonalDetails && hasValidSuggestions;
  const shouldHighlight = !isThumbnail && hasSuggestions && (isActive || isSummaryForPersonalDetails) && hasValidSuggestions;

  const wrapperStyle: React.CSSProperties = {
    scrollMarginTop: '20px',
    ...(hasSuggestions && {
      transition: 'filter 0.3s ease, background-color 0.3s ease, border 0.3s ease',
    }),
    ...(shouldHighlight && {
      backgroundColor: 'rgba(200, 255, 230, 0.35)',
      border: '2px solid rgba(0, 168, 107, 0.4)',
      borderRadius: '12px',
      padding: '16px',
      position: 'relative',
    }),
  };

  return (
    <div
      className={cn(section.className, shouldBlur && 'blur-[2px] pointer-events-none')}
      data-section={sectionId}
      style={wrapperStyle}
    >
      {shouldHighlight && <SparkleIndicator />}
      {section.heading && (
        <p className={section.heading.className}>{resolvePath(data, section.heading.path, section.heading.fallback)}</p>
      )}

      {section.divider && renderDivider(section.divider)}

      {section.content.type === 'html' ? (
        <div className={section.content.className} dangerouslySetInnerHTML={{ __html: value }} />
      ) : (
        <p className={section.content.className}>{value}</p>
      )}
    </div>
  );
}

// Inline list section renderer (skills)
function renderInlineListSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
): React.ReactNode {
  const items = resolvePath(data, section.listPath, []);



  // Extract parent ID if listPath points to nested items (e.g., 'achievements.items[0].items')
  let parentId: string | undefined;
  if (section.listPath.includes('[0].items')) {
    const parentPath = section.listPath.replace(/\[0\]\.items$/, '[0]');
    const parentObj = resolvePath(data, parentPath);
    parentId = parentObj?.id || parentObj?.itemId;
  }

  // Flatten nested items structure with context (itemId) for suggestion checking
  const flattenedItemsWithContext = flattenAndFilterItemsWithContext(items, section.itemPath, parentId);





  const sectionId = section.id || section.heading?.path?.split('.').pop() || 'inline-list-section';
  const isActive = currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();

    const sectionSuggestedUpdates = data[sectionId]?.suggestedUpdates;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);

  const shouldBlur = !isThumbnail && hasSuggestions && currentSection && !isActive && hasValidSuggestions;
  const shouldHighlight = !isThumbnail && hasSuggestions && isActive && hasValidSuggestions;

  const wrapperStyle: React.CSSProperties = {
    scrollMarginTop: '20px',
    ...(hasSuggestions && {
      transition: 'filter 0.3s ease, background-color 0.3s ease, border 0.3s ease',
    }),
    ...(shouldHighlight && {
      backgroundColor: 'rgba(200, 255, 230, 0.35)',
      border: '2px solid rgba(0, 168, 107, 0.4)',
      borderRadius: '12px',
      padding: '16px',
      position: 'relative',
    }),
  };
  const sectionKey = section.listPath?.split('.')[0];

  const fieldName = section.listPath.includes('[0].')
    ? section.listPath.split('[0].').pop()
    : section.itemPath;

  const suggestedUpdates = sectionKey ? (data[sectionKey] as any)?.suggestedUpdates : undefined;

  return (
    <div
      data-break={section.break}
      data-section={sectionId}
      className={cn(shouldBlur && 'blur-[2px] pointer-events-none')}
      style={wrapperStyle}
    >
      {shouldHighlight && <SparkleIndicator />}
      <div className={cn('flex flex-col', section.heading.className)}>
        {section.heading && (
          <p data-item="heading">{resolvePath(data, section.heading.path, section.heading.fallback)}</p>
        )}

        {section.heading.divider && renderDivider(section.heading.divider)}
      </div>

      <div data-item="content" data-break={section.break}>
        {flattenedItemsWithContext.map(({ value, itemId }, idx: number) => {
          // Get suggestions for this specific value
          const valueSuggestions = getArrayValueSuggestions(suggestedUpdates, itemId, fieldName, value);
          const errorBgColor = isThumbnail ? '' : getSuggestionBackgroundColor(valueSuggestions);


          return (
            <span key={idx}>
              <span className={cn(section.itemClassName, errorBgColor)}>{value}</span>
              {idx < flattenedItemsWithContext.length - 1 && section.itemSeparator && (
                <span>{section.itemSeparator}</span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// Badge section renderer (interests, achievements)
function renderBadgeSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
): React.ReactNode {
  const items = resolvePath(data, section.listPath, []);


  // Extract parent ID if listPath points to nested items (e.g., 'achievements.items[0].items')
  let parentId: string | undefined;
  if (section.listPath.includes('[0].items')) {
    const parentPath = section.listPath.replace(/\[0\]\.items$/, '[0]');
    const parentObj = resolvePath(data, parentPath);
    parentId = parentObj?.id || parentObj?.itemId;
  }

  // Flatten nested items structure with context (itemId) for suggestion checking
  const flattenedItemsWithContext = flattenAndFilterItemsWithContext(items, section.itemPath, parentId);



  // Icon component mapping
  const getIconComponent = (iconName?: string) => {
    if (!iconName) return null;

    // @ts-ignore - Dynamic icon access
    const Icon = LucideIcons[iconName];
    return Icon || null;
  };
   const sectionId = section.id || section.heading?.path?.split('.').pop() || 'badge-section';

  const IconComponent = section.icon ? getIconComponent(section.icon) : null;

    const sectionSuggestedUpdates = data[sectionId]?.suggestedUpdates;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);


  const isActive = currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();

  const shouldBlur = !isThumbnail && hasSuggestions && currentSection && !isActive && hasValidSuggestions;
  const shouldHighlight = !isThumbnail && hasSuggestions && isActive && hasValidSuggestions;

  const wrapperStyle: React.CSSProperties = {
    scrollMarginTop: '20px',
    ...(hasSuggestions && {
      transition: 'filter 0.3s ease, background-color 0.3s ease, border 0.3s ease',
    }),
    ...(shouldHighlight && {
      backgroundColor: 'rgba(200, 255, 230, 0.35)',
      border: '2px solid rgba(0, 168, 107, 0.4)',
      borderRadius: '12px',
      padding: '16px',
      position: 'relative',
    }),
  };

  const sectionKey = section.listPath?.split('.')[0];

  // Extract the actual field name from listPath
  // For 'achievements.items[0].items', fieldName should be 'items'
  // For other cases, use section.itemPath
  const fieldName = section.listPath.includes('[0].')
    ? section.listPath.split('[0].').pop()
    : section.itemPath;

  const suggestedUpdates = sectionKey ? (data[sectionKey] as any)?.suggestedUpdates : undefined;

  return (
    <div
      data-break={section.break}
      data-item="section"
      data-section={sectionId}
      className={cn(shouldBlur && 'blur-[2px] pointer-events-none')}
      style={wrapperStyle}
    >
      {shouldHighlight && <SparkleIndicator />}
      <div className={cn('flex flex-col', section.heading.className)}>
        {section.heading && (
          <p data-item="heading">{resolvePath(data, section.heading.path, section.heading.fallback)}</p>
        )}

        {section.heading.divider && renderDivider(section.heading.divider)}
      </div>

      <div className={cn('flex gap-1 flex-wrap mt-2', section.containerClassName)}>
        {flattenedItemsWithContext.map(({ value, itemId }, idx: number) => {
          // Get suggestions for this specific value
          const valueSuggestions = getArrayValueSuggestions(suggestedUpdates, itemId, fieldName, value);
          const errorBgColor = isThumbnail ? '' : getSuggestionBackgroundColor(valueSuggestions);
          const displayValue = `${section.itemPrefix || ''}${value}${section.itemSuffix || ''}`;

          if (IconComponent) {
            return (
              <div key={idx} className={section.itemClassName}>
                <IconComponent className={section.iconClassName} />
                <span className={cn(section.badgeClassName, errorBgColor)}>{displayValue}</span>
              </div>
            );
          }

          // Default rendering without icon
          return (
            <React.Fragment key={idx}>
              <span className={cn(section.badgeClassName, errorBgColor)}>{displayValue}</span>
              {idx < flattenedItemsWithContext.length - 1 && section.itemSeparator && <span>{section.itemSeparator}</span>}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// Thumbnail generation
import html2canvas from "html2canvas";

export type ThumbnailOptions = {
  width?: number;
  height?: number;
  aspectRatio?: number;
  backgroundColor?: string;
};

export async function generateThumbnail(
  element: HTMLElement,
  options: ThumbnailOptions = {}
): Promise<string | null> {
  const { backgroundColor = "white" } = options;

  try {
    const canvasPromise = html2canvas(element, {
      useCORS: true,
      allowTaint: false,
      backgroundColor: backgroundColor,
      logging: false,
      width: element.clientWidth,
      height: element.clientHeight,
      scale: 0.6,
    });

    const canvas = await canvasPromise;

    return canvas.toDataURL("image/png", 1);
  } catch (error) {
    console.error("Failed to generate thumbnail:", error);
    return null;
  }
}
