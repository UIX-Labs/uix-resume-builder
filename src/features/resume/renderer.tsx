/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
import dayjs from 'dayjs';
import { cn } from '@shared/lib/cn';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import React from 'react';
import type { SuggestedUpdates } from '@entities/resume';
import {
  getFieldSuggestions,
  getArrayValueSuggestions,
  getSuggestionBackgroundColor,
} from '@features/template-form/lib/get-field-errors';

// Utility to resolve data paths
function resolvePath(data: any, path: string, fallback?: any): any {
  if (!path) return fallback;

  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
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
  parentId?: string,
): Array<{ value: any; itemId?: string }> {
  const flattenedItems: Array<{ value: any; itemId?: string }> = [];

  items.forEach((item: any) => {
    // Use item's own ID, or fall back to parentId if item is a primitive (string)
    const itemId = item.itemId || item.id || parentId;
    const value = itemPath ? resolvePath(item, itemPath) : item;

    if (Array.isArray(value)) {
      const filtered = value.filter((v: any) => v && (typeof v !== 'string' || v.trim() !== ''));

      flattenedItems.push(
        ...filtered.map((v: any) => {
          return {
            value: v,
            itemId,
          };
        }),
      );
    } else if (value && (typeof value !== 'string' || value.trim() !== '')) {
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
        position: 'absolute',
        top: '-25px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#02A44F',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(2, 164, 79, 0.3)',
        zIndex: 10,
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="white" />
        <path d="M18 4L18.75 6.25L21 7L18.75 7.75L18 10L17.25 7.75L15 7L17.25 6.25L18 4Z" fill="white" />
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
  const [pages, setPages] = useState<[React.ReactNode[], React.ReactNode[]][]>([]);
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
      const pageMax = COLUMN_MAX[columnName];
      const pageMaxFirst = pageMax - bHeight;

      // Create a test container to measure actual heights
      const testContainer = document.createElement('div');
      testContainer.style.position = 'absolute';
      testContainer.style.visibility = 'hidden';
      testContainer.style.width = columnEl.style.width || getComputedStyle(columnEl).width;
      testContainer.style.left = '-9999px';
      testContainer.className = columnEl.className;
      document.body.appendChild(testContainer);

      let currentColumnPage: React.ReactNode[] = [];
      outPages.push(currentColumnPage);

      function processChildren(parentEl: HTMLElement) {
        const children = Array.from(parentEl.children) as HTMLElement[];

        for (const child of children) {
          const canBreak = child.getAttribute('data-canbreak') === 'true';

          if (canBreak) {
            // For breakable containers, process their children recursively
            processChildren(child);
            continue;
          }

          // Clone and measure the actual height
          const clone = child.cloneNode(true) as HTMLElement;
          testContainer.innerHTML = '';
          testContainer.appendChild(clone);

          const isFirstPage = outPages.length === 1;
          const currentMax = isFirstPage ? pageMaxFirst : pageMax;

          const cloneHeight = clone.getBoundingClientRect().height;
          const computedStyle = window.getComputedStyle(clone);
          const marginTop = parseFloat(computedStyle.marginTop) || 0;
          const marginBottom = parseFloat(computedStyle.marginBottom) || 0;
          const totalHeight = cloneHeight + marginTop + marginBottom;

          // Calculate current page height
          testContainer.innerHTML = '';
          currentColumnPage.forEach((node: any) => {
            const nodeClone =
              typeof node === 'string'
                ? document.createRange().createContextualFragment(node).firstChild
                : node.cloneNode(true);
            if (nodeClone) testContainer.appendChild(nodeClone as Node);
          });

          const currentHeight = testContainer.getBoundingClientRect().height;

          // Check if we need a new page
          if (currentHeight + totalHeight + 25 > currentMax && currentColumnPage.length > 0) {
            // Adding 20px to account for margin and padding for safer side and not to exceed the page height
            // Start new page
            currentColumnPage = [];
            outPages.push(currentColumnPage);
          }

          // Add element to current page
          currentColumnPage.push(child.cloneNode(true) as React.ReactNode);
        }
      }

      processChildren(columnEl);

      // Cleanup
      document.body.removeChild(testContainer);
    }

    if (leftCol) paginateOneColumn(leftCol, 'left', leftPages, calculatedBannerHeight);
    if (rightCol) paginateOneColumn(rightCol, 'right', rightPages, calculatedBannerHeight);

    const totalPages = Math.max(leftPages.length, rightPages.length);
    const merged: [React.ReactNode[], React.ReactNode[]][] = [];

    for (let i = 0; i < totalPages; i++) {
      merged.push([leftPages[i] || [], rightPages[i] || []]);
    }

    setPages(merged);
  }, [template, data, currentSection, hasSuggestions, isThumbnail]);

  const { columnConfig, leftItems, rightItems, bannerItems } = useMemo(() => {
    if (!template.columns) {
      return {
        columnConfig: {
          spacing: '0px',
          left: {
            width: '100%',
          },
          right: {
            width: '0%',
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
  const leftColumnClassName = columnConfig.left.className || '';
  const rightColumnClassName = columnConfig.right.className || '';

  const baseStyle = {
    width: '21cm',
    padding: PAGE_PADDING,
    gridTemplateColumns: `calc(${leftWidth} - ${spacing}) calc(${rightWidth} - ${spacing})`,
    gap: spacing,
  };

  return (
    <>
      <div
        ref={dummyContentRef}
        className="mb-5 grid"
        style={{
          ...baseStyle,
          position: 'absolute',
          visibility: 'hidden',
        }}
      >
        {bannerItems.length > 0 && (
          <div style={{ gridColumn: '1 / -1' }} data-section-type="banner">
            {bannerItems.map((s: any, i: number) => (
              <React.Fragment key={i}>
                {renderSection(s, data, currentSection, hasSuggestions, isThumbnail)}
              </React.Fragment>
            ))}
          </div>
        )}
        <div className={cn('flex flex-col', leftColumnClassName)} data-column="left">
          {leftItems.map((s: any, i: number) => (
            <React.Fragment key={i}>
              {renderSection(s, data, currentSection, hasSuggestions, isThumbnail)}
            </React.Fragment>
          ))}
        </div>
        <div className={cn('flex flex-col', rightColumnClassName)} data-column="right">
          {rightItems.map((s: any, i: number) => (
            <React.Fragment key={i}>
              {renderSection(s, data, currentSection, hasSuggestions, isThumbnail)}
            </React.Fragment>
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
            <div
              className={cn('flex flex-col', leftColumnClassName)}
              style={{ gridRow: index === 0 && bannerItems.length > 0 ? '2' : '1' }}
            >
              {leftColumn.map((node: any, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: node.outerHTML }} className={node.containerClassName} />
              ))}
            </div>
            <div
              className={cn('flex flex-col', rightColumnClassName)}
              style={{ gridRow: index === 0 && bannerItems.length > 0 ? '2' : '1' }}
            >
              {rightColumn.map((node: any, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: node.outerHTML }} className={node.containerClassName} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

// Main section renderer
function renderSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
): React.ReactNode {
  // Check if section is hidden
  // Get section ID from different possible sources
  let sectionId = section.id;

  // If no direct ID, try to extract from listPath (e.g., "experience.items" -> "experience")
  if (!sectionId && section.listPath) {
    sectionId = section.listPath.split('.')[0];
  }

  // If still no ID, try to extract from heading path (e.g., "experience.heading" -> "experience")
  if (!sectionId && section.heading?.path) {
    sectionId = section.heading.path.split('.')[0];
  }

  // Map template section IDs to data keys
  // The header and summary sections both store data under 'personalDetails' key
  let dataKey = sectionId;
  if (sectionId === 'header' || sectionId === 'summary') {
    dataKey = 'personalDetails';
  }

  // Check if this section is marked as hidden
  if (dataKey && data[dataKey]?.isHidden === true) {
    return null;
  }

  if (section.type === 'header') return renderHeaderSection(section, data, currentSection, hasSuggestions, isThumbnail);
  if (section.type === 'banner') return renderHeaderSection(section, data, currentSection, hasSuggestions, isThumbnail);
  if (section.type === 'list-section')
    return renderListSection(section, data, currentSection, hasSuggestions, isThumbnail);
  if (section.type === 'two-column-layout')
    return renderTwoColumnLayout(section, data, currentSection, hasSuggestions, isThumbnail);
  if (section.type === 'content-section')
    return renderContentSection(section, data, currentSection, hasSuggestions, isThumbnail);
  if (section.type === 'inline-list-section')
    return renderInlineListSection(section, data, currentSection, hasSuggestions, isThumbnail);
  if (section.type === 'badge-section')
    return renderBadgeSection(section, data, currentSection, hasSuggestions, isThumbnail);
  if (section.type === 'table-section')
    return renderTableSection(section, data, currentSection, hasSuggestions, isThumbnail);
  return null;
}

// Render divider (horizontal line under headings)
function renderDivider(divider: any): React.ReactNode {
  if (!divider) return null;

  if (divider.variant === 'line') {
    return <div data-item="divider" className={cn('w-full bg-zinc-200 h-px', divider.className)} />;
  }
  if (divider.variant === 'pipe') {
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

  // Highlight header when personalDetails is selected
  const isPersonalDetailsActive = currentSection?.toLowerCase() === 'personaldetails' && isHeader;

  const shouldBlur =
    !isThumbnail && hasSuggestions && currentSection && !isActive && !isPersonalDetailsActive && hasValidSuggestions;
  const shouldHighlight =
    !isThumbnail && hasSuggestions && (isActive || isPersonalDetailsActive) && hasValidSuggestions;

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

      {fields.contact && fields.contact.type === 'contact-grid' && <>{renderField(fields.contact, data)}</>}

      {/* Handle legacy contact structure */}
      {fields.contact && (
        <div className={fields.contact.className}>
          {(() => {
            // Filter out items with no value first
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
                return (
                  <span key={originalIdx}>
                    {showSeparator && fields.contact.separator}
                    <a href={href} className={item.className}>
                      {value}
                    </a>
                  </span>
                );
              }
              return (
                <span key={originalIdx}>
                  {showSeparator && fields.contact.separator}
                  <span className={item.className}>{value}</span>
                </span>
              );
            });
          })()}
        </div>
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
  const items = resolvePath(data, section.listPath, []);

  // Return null if items is not an array or is empty
  if (!Array.isArray(items) || items.length === 0) return null;

  // Filter out items where all values are empty, null, or undefined
  const validItems = items.filter((item: any) => {
    if (!item || typeof item !== 'object') return false;

    // Check if at least one field has a non-empty value
    return Object.values(item).some((value: any) => {
      if (!value) return false;
      if (typeof value === 'string' && value.trim() === '') return false;
      if (typeof value === 'object') {
        // For nested objects (like duration), check if they have valid values
        const nestedValues = Object.values(value);
        return nestedValues.some((v: any) => v && (typeof v !== 'string' || v.trim() !== ''));
      }
      return true;
    });
  });

  // Return null if no valid items after filtering
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
        {items.map((item: any, idx: number) => {
          const itemId = item.itemId || item.id;
          return (
            <div
              key={idx}
              className={cn(
                section.itemTemplate.className,
                section.break && shouldBlur ? 'blur-[2px] pointer-events-none' : '',
              )}
              style={itemWrapperStyle}
            >
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
            <React.Fragment key={idx}>
              {renderSection(subSection, data, currentSection, hasSuggestions, isThumbnail)}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Right Column */}
      {rightColumn && (
        <div className={cn(rightColumn.className)}>
          {rightColumn.sections?.map((subSection: any, idx: number) => (
            <React.Fragment key={idx}>
              {renderSection(subSection, data, currentSection, hasSuggestions, isThumbnail)}
            </React.Fragment>
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
        <React.Fragment key={cellIdx}>{renderField(cell, item, itemId, suggestedUpdates, isThumbnail)}</React.Fragment>
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
    <div key={idx}>{renderField(field, item, itemId, suggestedUpdates, isThumbnail)}</div>
  ));
}

function renderField(
  field: any,
  data: any,
  itemId?: string,
  suggestedUpdates?: SuggestedUpdates,
  isThumbnail?: boolean,
): React.ReactNode {
  // Get suggestions for this specific field if we have the context
  const fieldPath = field.path?.split('.').pop(); // Get the field name from path like "experience.items[0].description"
  const errorSuggestions = fieldPath ? getFieldSuggestions(suggestedUpdates, itemId, fieldPath) : [];
  const errorBgColor = isThumbnail ? '' : getSuggestionBackgroundColor(errorSuggestions);

  if (field.type === 'container') {
    return (
      <div className={field.className}>
        {field.children?.map((child: any, idx: number) => (
          <React.Fragment key={idx}>{renderField(child, data, itemId, suggestedUpdates, isThumbnail)}</React.Fragment>
        ))}
      </div>
    );
  }

  // Handle badge type
  if (field.type === 'badge') {
    const value = field.pathWithFallback
      ? resolvePath(data, field.pathWithFallback.path, field.pathWithFallback.fallback)
      : resolvePath(data, field.path, field.fallback);

    const href = field.hrefPathWithFallback
      ? resolvePath(data, field.hrefPathWithFallback.path, field.hrefPathWithFallback.fallback)
      : resolvePath(data, field.href);

    if (!value) return null;

    const iconElement = field.icon ? renderField(field.icon, data) : null;

    const content = (
      <span className={cn('inline-flex items-center gap-1 rounded-full py-1 px-2', field.badgeClassName)}>
        {iconElement}
        {value}
      </span>
    );

    if (href) {
      return (
        <a href={href} className="hover:opacity-80">
          {content}
        </a>
      );
    }

    return content;
  }

  // Handle text type with pathWithFallback
  if (field.type === 'text') {
    const value = field.pathWithFallback
      ? resolvePath(data, field.pathWithFallback.path, field.pathWithFallback.fallback)
      : resolvePath(data, field.path, field.fallback);

    if (!value) return null;
    const text = `${field.prefix || ''}${value}${field.suffix || ''}`;
    return <span className={field.className}>{text}</span>;
  }

  if (field.type === 'contact-grid') {
    return (
      <div className={field.className}>
        {field.heading && (
          <div className={field.heading.className}>
            <p>{resolvePath(data, field.heading.path, field.heading.fallback)}</p>
            {field.heading.divider && renderDivider(field.heading.divider)}
          </div>
        )}
        {field.items?.map((subField: any, idx: number) => (
          <React.Fragment key={idx}>{renderField(subField, data)}</React.Fragment>
        ))}
      </div>
    );
  }

  if (field.type === 'horizontal-group') {
    return (
      <div className={cn('flex flex-row items-center', field.className)}>
        {field.items.map((subField: any, idx: number) => (
          <React.Fragment key={idx}>
            {idx > 0 && field.separator && <span>{field.separator}</span>}
            {renderField(subField, data, itemId, suggestedUpdates, isThumbnail)}
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (field.type === 'inline-group') {
  // Render all items and filter out null/empty values
  const renderedItems = field.items
    .map((subField: any, idx: number) => ({
      idx,
      element: renderField(subField, data, itemId, suggestedUpdates, isThumbnail),
    }))
    .filter(
      ({ element }: { element: React.ReactNode }) =>
        element !== null && element !== undefined && element !== '',
    );

  // Nothing to show
  if (renderedItems.length === 0) return null;

  const hasContainerClassName = !!field.containerClassName;
  const hasSeparator = !!field.separator;

  // Build content with optional separators
  const content = renderedItems.map(
    ({ element, idx }: { element: React.ReactNode; idx: number }, arrayIdx: number) => (
      <React.Fragment key={idx}>
        {arrayIdx > 0 && hasSeparator && <span>{field.separator}</span>}
        <span>{element}</span>
      </React.Fragment>
    ),
  );

  // Decide wrapper class
  const wrapperClassName = hasContainerClassName ? field.containerClassName : field.className;

  // Wrap in a div if a className exists
  if (wrapperClassName) {
    return <div className={wrapperClassName}>{content}</div>;
  }

  // Otherwise return just the content
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
          <React.Fragment key={idx}>
            {renderField(subField, data, itemId, suggestedUpdates, isThumbnail)}
          </React.Fragment>
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
    const renderedItems = field.items.map((subField: any, idx: number) => ({
      idx,
      element: renderField(subField, data, itemId, suggestedUpdates, isThumbnail),
      isIcon: subField.type === 'icon',
      subField,
    }));

    const hasValidValues = renderedItems.some(
      (item: any) => !item.isIcon && item.element !== null && item.element !== undefined && item.element !== '',
    );

    if (!hasValidValues) return null;

    const itemsToRender = renderedItems.filter(
      (item: any) => item.isIcon || (item.element !== null && item.element !== undefined && item.element !== ''),
    );

    if (itemsToRender.length === 0) return null;

    return (
      <div className={field.className}>
        {itemsToRender.map(({ element, idx }: { element: React.ReactNode; idx: number }, arrayIdx: number) => (
          <span key={idx} className={field.items[idx].className}>
            {arrayIdx > 0 && field.separator}
            {element}
          </span>
        ))}
      </div>
    );
  }

  if (field.type === 'duration') {
    const duration = resolvePath(data, field.path, field.fallback);
    if (!duration) return null;

    if (duration.startDate && duration.endDate) {
      const start = dayjs(duration.startDate).format('MMM YYYY');
      const end = dayjs(duration.endDate).format('MMM YYYY');
      return <span className={field.className}>{`${start} - ${end}`}</span>;
    }

    if (duration.startDate && duration.ongoing) {
      const start = dayjs(duration.startDate).format('MMM YYYY');
      return <span className={field.className}>{`${start} - Present`}</span>;
    }

    return null;
  }

  if (field.type === 'html') {
    const value = resolvePath(data, field.path, field.fallback);
    if (!value) return null;
    return <div className={field.className} dangerouslySetInnerHTML={{ __html: value }} />;
  }

  if (field.type === 'link') {
    const value = resolvePath(data, field.path, field.fallback);
    if (!value) return null;

    let href = field.href;
    if (href && href.includes('{{value}}')) {
      href = href.replace('{{value}}', value);
    } else {
      href = resolvePath(data, field.href);
    }

    if (!href) return null;
    return (
      <a href={href} className={field.className}>
        {value}
      </a>
    );
  }

  const value = resolvePath(data, field.path, field.fallback);
  if (!value) return null;

  const text = `${field.prefix || ''}${value}${field.suffix || ''}`;
  return <span className={field.className}>{text}</span>;
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

  // Check for empty values including empty strings
  if (!value || (typeof value === 'string' && value.trim() === '')) return null;

  const sectionId = section.id || section.heading?.path?.split('.').pop() || 'content-section';
  const isActive = currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();

  // Highlight summary section when personalDetails is selected
  const isSummaryForPersonalDetails =
    currentSection?.toLowerCase() === 'personaldetails' && sectionId.toLowerCase() === 'summary';

  const dataKey = sectionId.toLowerCase() === 'summary' ? 'professionalSummary' : sectionId;
  const sectionSuggestedUpdates = data[dataKey]?.suggestedUpdates;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);

  const shouldBlur =
    !isThumbnail &&
    hasSuggestions &&
    currentSection &&
    !isActive &&
    !isSummaryForPersonalDetails &&
    hasValidSuggestions;
  const shouldHighlight =
    !isThumbnail && hasSuggestions && (isActive || isSummaryForPersonalDetails) && hasValidSuggestions;

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
      data-break={section.break}
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

  // Return null if items is not an array or is empty
  if (!Array.isArray(items) || items.length === 0) return null;

  // Flatten nested items structure if needed
  const flattenedItems = flattenAndFilterItemsWithContext(items, section.itemPath);

  // Return null if no valid items after flattening
  if (flattenedItems.length === 0) return null;

  const sectionId = section.id || section.heading?.path?.split('.').pop() || 'inline-list-section';
  const isActive = currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();

  const dataKey = sectionId.toLowerCase() === 'summary' ? 'professionalSummary' : sectionId;
  const sectionSuggestedUpdates = data[dataKey]?.suggestedUpdates;
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
        {section.showBullet ? (
          <ul className={cn('list-disc list-outside pl-6', section.containerClassName)}>
            {flattenedItems.map((item: any, idx: number) => {
              const value = typeof item === 'object' && item !== null && 'value' in item ? item.value : item;
              return (
                <li key={idx} className={cn(section.itemClassName, 'list-item')}>
                  {value}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={section.containerClassName}>
            {flattenedItems.map((item: any, idx: number) => {
              const value = typeof item === 'object' && item !== null && 'value' in item ? item.value : item;
              return (
                <span key={idx}>
                  <span className={section.itemClassName}>{value}</span>
                  {idx < flattenedItems.length - 1 && section.itemSeparator && <span>{section.itemSeparator}</span>}
                </span>
              );
            })}
          </div>
        )}
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

  // Return null if items is not an array or is empty
  if (!Array.isArray(items) || items.length === 0) return null;

  // Flatten nested items structure if needed
  const flattenedItems = flattenAndFilterItemsWithContext(items, section.itemPath);

  // Return null if no valid items after flattening
  if (flattenedItems.length === 0) return null;

  // Icon component mapping
  const getIconComponent = (iconName?: string) => {
    if (!iconName) return null;

    // @ts-ignore - Dynamic icon access
    const Icon = LucideIcons[iconName];
    return Icon || null;
  };

  const IconComponent = section.icon ? getIconComponent(section.icon) : null;

  const sectionId = section.id || section.heading?.path?.split('.').pop() || 'badge-section';
  const isActive = currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();

  // Highlight summary section when personalDetails is selected
  const isSummaryForPersonalDetails =
    currentSection?.toLowerCase() === 'personaldetails' && sectionId.toLowerCase() === 'summary';

  const dataKey = sectionId.toLowerCase() === 'summary' ? 'professionalSummary' : sectionId;
  const sectionSuggestedUpdates = data[dataKey]?.suggestedUpdates;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);

  const shouldBlur =
    !isThumbnail &&
    hasSuggestions &&
    currentSection &&
    !isActive &&
    !isSummaryForPersonalDetails &&
    hasValidSuggestions;
  const shouldHighlight =
    !isThumbnail && hasSuggestions && (isActive || isSummaryForPersonalDetails) && hasValidSuggestions;

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
        {flattenedItems.map((item: any, idx: number) => {
          const value = typeof item === 'object' && item !== null && 'value' in item ? item.value : item;
          if (IconComponent) {
            return (
              <div key={idx} className={section.itemClassName}>
                <IconComponent className={section.iconClassName} />
                <span className={section.badgeClassName}>{value}</span>
              </div>
            );
          }

          // Default rendering without icon
          return (
            <span key={idx}>
              <span className={section.badgeClassName}>{value}</span>
              {idx < flattenedItems.length - 1 && section.itemSeparator && <span>{section.itemSeparator}</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// Table section renderer (row-based layout with configurable columns)
function renderTableSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
): React.ReactNode {
  const items = resolvePath(data, section.listPath, []);

  // Return null if items is not an array or is empty
  if (!Array.isArray(items) || items.length === 0) return null;

  // Filter out items where all values are empty, null, or undefined
  const validItems = items.filter((item: any) => {
    if (!item || typeof item !== 'object') return false;

    // Check if at least one field has a non-empty value
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

  // Return null if no valid items after filtering
  if (validItems.length === 0) return null;

  const sectionId = section.id || section.heading?.path?.split('.').pop() || 'table-section';
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

  // Get column configuration
  const columns = section.columns || [];
  const numColumns = columns.length + (section.headingColumn ? 1 : 0);
  const gridTemplateColumns = section.gridTemplateColumns || `repeat(${numColumns}, 1fr)`;

  // Check if this is a single-row section (e.g., badges where all items go in one row)
  const isSingleRow = section.singleRow === true;

  return (
    <div
      data-item="table-section"
      data-canbreak={section.break}
      data-section={sectionId}
      className={cn(shouldBlur && 'blur-[2px] pointer-events-none', section.className)}
      style={wrapperStyle}
    >
      {shouldHighlight && <SparkleIndicator />}

      <div
        data-item="content"
        data-canbreak={section.break ? 'true' : undefined}
        className={section.containerClassName}
      >
        {isSingleRow ? (
          // Single row mode: render all items in one row
          <div className={cn('grid', section.rowClassName)} style={{ gridTemplateColumns }}>
            {/* Render heading column */}
            {section.headingColumn && (
              <div className={section.headingColumn.className}>
                {section.heading && (
                  <>
                    <p data-item="heading" className={section.heading.className}>
                      {resolvePath(data, section.heading.path, section.heading.fallback)}
                    </p>
                    {section.heading?.divider && renderDivider(section.heading.divider)}
                  </>
                )}
              </div>
            )}

            {/* Render content columns with all items */}
            {columns.map((column: any, colIdx: number) => {
              const renderColumnContent = (col: any): React.ReactNode => {
                let content: React.ReactNode = null;

                if (col.type === 'badge-list') {
                  // Flatten all items and render as badges
                  const allBadgeItems = flattenAndFilterItemsWithContext(validItems, col.itemPath);

                  if (allBadgeItems.length > 0) {
                    const getIconComponent = (iconName?: string) => {
                      if (!iconName) return null;
                      const Icon = (LucideIcons as any)[iconName];
                      return Icon || null;
                    };
                    const IconComponent = col.icon ? getIconComponent(col.icon) : null;

                    content = (
                      <div className={cn('flex gap-1 flex-wrap', col.containerClassName)}>
                        {allBadgeItems.map((item: any, badgeIdx: number) => {
                          const value =
                            typeof item === 'object' && item !== null && 'value' in item ? item.value : item;
                          if (IconComponent) {
                            return (
                              <div key={badgeIdx} className={col.itemClassName}>
                                <IconComponent className={col.iconClassName} />
                                <span className={col.badgeClassName}>{value}</span>
                              </div>
                            );
                          }
                          return (
                            <span key={badgeIdx} className={col.badgeClassName}>
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
                <div key={colIdx} className={column.className}>
                  {renderColumnContent(column)}
                </div>
              );
            })}
          </div>
        ) : (
          // Multi-row mode: each item gets a row
          validItems.map((item: any, itemIdx: number) => {
            // Handle different column types for a single item
            const renderColumnContent = (column: any): React.ReactNode => {
              let content: React.ReactNode = null;

              if (column.type === 'field') {
                content = renderField({ ...column, path: column.path }, item);
              } else if (column.type === 'inline-group') {
                const renderedItems = column.items
                  .map((subField: any, subIdx: number) => ({
                    idx: subIdx,
                    element: renderField({ ...subField, path: subField.path }, item, undefined, undefined, isThumbnail),
                  }))
                  .filter(
                    ({ element }: { element: React.ReactNode }) =>
                      element !== null && element !== undefined && element !== '',
                  );

                if (renderedItems.length > 0) {
                  content = (
                    <div className={column.containerClassName}>
                      {renderedItems.map(
                        ({ element, idx }: { element: React.ReactNode; idx: number }, arrayIdx: number) => (
                          <React.Fragment key={idx}>
                            {arrayIdx > 0 && column.separator && <span>{column.separator}</span>}
                            <span>{element}</span>
                          </React.Fragment>
                        ),
                      )}
                    </div>
                  );
                }
              } else if (column.type === 'duration') {
                content = renderField(
                  { type: 'duration', path: column.path, className: column.className },
                  item,
                  undefined,
                  undefined,
                  isThumbnail,
                );
              } else if (column.type === 'html') {
                content = renderField(
                  { type: 'html', path: column.path, className: column.className },
                  item,
                  undefined,
                  undefined,
                  isThumbnail,
                );
              } else if (column.type === 'text') {
                content = renderField(
                  { type: 'text', path: column.path, className: column.className, fallback: column.fallback },
                  item,
                  undefined,
                  undefined,
                  isThumbnail,
                );
              } else if (column.type === 'group') {
                // Render a group of fields stacked vertically
                const groupItems = column.items
                  .map((subField: any) => {
                    // Handle inline-group specially to preserve inline layout
                    if (subField.type === 'inline-group') {
                      const renderedItems = subField.items
                        .map((inlineSubField: any, idx: number) => ({
                          idx,
                          element: renderField(
                            { ...inlineSubField, path: inlineSubField.path },
                            item,
                            undefined,
                            undefined,
                            isThumbnail,
                          ),
                        }))
                        .filter(
                          ({ element }: { element: React.ReactNode }) =>
                            element !== null && element !== undefined && element !== '',
                        );

                      if (renderedItems.length === 0) return null;

                      const hasContainerClassName = !!subField.containerClassName;
                      const hasSeparator = !!subField.separator;

                      const inlineContent = renderedItems.map(
                        ({ element, idx }: { element: React.ReactNode; idx: number }, arrayIdx: number) => (
                          <React.Fragment key={idx}>
                            {arrayIdx > 0 && hasSeparator && <span>{subField.separator}</span>}
                            <span>{element}</span>
                          </React.Fragment>
                        ),
                      );

                      // Use containerClassName if provided, otherwise className
                      const wrapperClassName = hasContainerClassName ? subField.containerClassName : subField.className;

                      if (wrapperClassName) {
                        return <div className={wrapperClassName}>{inlineContent}</div>;
                      }

                      return <>{inlineContent}</>;
                    }
                    // For other field types, use renderField normally
                    return renderField({ ...subField, path: subField.path }, item);
                  })
                  .filter((element: React.ReactNode) => element !== null && element !== undefined && element !== '');

                if (groupItems.length > 0) {
                  content = <div className={column.className}>{groupItems}</div>;
                }
              } else if (column.type === 'link') {
                content = renderField(
                  { type: 'link', path: column.path, href: column.href, className: column.className },
                  item,
                );
              } else if (column.type === 'badge-list') {
                // Render badges from item path (flatten if needed)
                const badgeItems = column.itemPath
                  ? flattenAndFilterItemsWithContext([item], column.itemPath)
                  : (Array.isArray(item) ? item : [item]).filter(
                      (v: any) => v && (typeof v !== 'string' || v.trim() !== ''),
                    );

                if (badgeItems.length > 0) {
                  const getIconComponent = (iconName?: string) => {
                    if (!iconName) return null;
                    const Icon = (LucideIcons as any)[iconName];
                    return Icon || null;
                  };
                  const IconComponent = column.icon ? getIconComponent(column.icon) : null;

                  content = (
                    <div className={cn('flex gap-1 flex-wrap', column.containerClassName)}>
                      {badgeItems.map((item: any, badgeIdx: number) => {
                        const value = typeof item === 'object' && item !== null && 'value' in item ? item.value : item;
                        if (IconComponent) {
                          return (
                            <div key={badgeIdx} className={column.itemClassName}>
                              <IconComponent className={column.iconClassName} />
                              <span className={column.badgeClassName}>{value}</span>
                            </div>
                          );
                        }
                        return (
                          <span key={badgeIdx} className={column.badgeClassName}>
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
                className={cn('grid', section.rowClassName)}
                style={{ gridTemplateColumns }}
              >
                {/* Render heading column (only for first row) */}
                {section.headingColumn && (
                  <div className={section.headingColumn.className}>
                    {itemIdx === 0 && section.heading && (
                      <>
                        <p data-item="heading" className={section.heading.className}>
                          {resolvePath(data, section.heading.path, section.heading.fallback)}
                        </p>
                        {section.heading?.divider && renderDivider(section.heading.divider)}
                      </>
                    )}
                  </div>
                )}

                {/* Render content columns for each item */}
                {columns.map((column: any, colIdx: number) => (
                  <div key={`${itemIdx}-${colIdx}`} className={column.className}>
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

// Thumbnail generation
import html2canvas from 'html2canvas';

export type ThumbnailOptions = {
  width?: number;
  height?: number;
  aspectRatio?: number;
  backgroundColor?: string;
};

export async function generateThumbnail(element: HTMLElement, options: ThumbnailOptions = {}): Promise<string | null> {
  const { backgroundColor = 'white' } = options;

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

    return canvas.toDataURL('image/png', 1);
  } catch (error) {
    console.error('Failed to generate thumbnail:', error);
    return null;
  }
}
