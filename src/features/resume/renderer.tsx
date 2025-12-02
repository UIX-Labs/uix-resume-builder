/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
import dayjs from 'dayjs';
import { cn } from '@shared/lib/cn';
import { useLayoutEffect, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import React from 'react';

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
function flattenAndFilterItems(items: any[], itemPath?: string): any[] {
  const flattenedItems: any[] = [];

  items.forEach((item: any) => {
    const value = itemPath ? resolvePath(item, itemPath) : item;

    if (Array.isArray(value)) {
      // Nested structure: item has an items array
      flattenedItems.push(...value.filter((v: any) => v && (typeof v !== 'string' || v.trim() !== '')));
    } else if (value && (typeof value !== 'string' || value.trim() !== '')) {
      // Flat structure: item is a direct value
      flattenedItems.push(value);
    }
  });

  return flattenedItems;
}

// Utility to check if a section has pending suggestions
// Returns true if there are any suggestions with count > 0
function hasPendingSuggestions(suggestedUpdates: any[] | undefined): boolean {
  if (!suggestedUpdates || !Array.isArray(suggestedUpdates)) {
    return false;
  }

  return suggestedUpdates.some((update: any) => {
    if (!update.fields) return false;

    // Check each field in the update
    return Object.values(update.fields).some((fieldData: any) => {
      if (!fieldData.fieldCounts) return false;

      // Check if any count is greater than 0
      return Object.values(fieldData.fieldCounts).some((count: any) => count > 0);
    });
  });
}

// Utility to check if a specific item has pending suggestions
// Returns true if the item with given itemId has any suggestions with count > 0
function hasItemPendingSuggestions(suggestedUpdates: any[] | undefined, itemId: string): boolean {
  if (!suggestedUpdates || !Array.isArray(suggestedUpdates)) {
    return false;
  }

  // Find the update for this specific item
  const itemUpdate = suggestedUpdates.find((update: any) => update.itemId === itemId);

  if (!itemUpdate || !itemUpdate.fields) {
    return false;
  }

  // Check if any field in this item has suggestions with count > 0
  return Object.values(itemUpdate.fields).some((fieldData: any) => {
    if (!fieldData.fieldCounts) return false;

    // Check if any count is greater than 0
    return Object.values(fieldData.fieldCounts).some((count: any) => count > 0);
  });
}

type RenderProps = {
  template: any;
  data: any;
  className?: string;
  currentSection?: string;
  hasSuggestions?: boolean;
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
}: RenderProps) {
  const [pages, setPages] = useState<React.ReactNode[][]>([]);
  const dummyContentRef = useRef<HTMLDivElement>(null);

  const { page } = template;
  const sections = template.sections || [];

  const PAGE_HEIGHT = 1122;
  const PAGE_PADDING = page.padding ?? 24;
  const MAX_HEIGHT = PAGE_HEIGHT - PAGE_PADDING * 2;

  // Paginate content
  useLayoutEffect(() => {
    const container = dummyContentRef.current;
    if (!container) return;

    const newPages: React.ReactNode[][] = [];
    let currentPage: React.ReactNode[] = [];
    newPages.push(currentPage);

    const containerTop = container.getBoundingClientRect().top;
    let currentPageTop = containerTop;

    function helper(container: HTMLElement) {
      const children = Array.from(container.children) as HTMLElement[];

      if (children.length === 0) {
        return;
      }

      for (let i = 0; i < children.length; i++) {
        const el = children[i];
        el.style.display = '';

        const elRect = el.getBoundingClientRect();
        const elTop = elRect.top;
        const elBottom = elRect.bottom;
        const canBreak = el.getAttribute('data-canbreak') === 'true';

        if (canBreak) {
          helper(el);
        } else {
          // Check if element would exceed max height from current page start
          if (elBottom - currentPageTop > MAX_HEIGHT && currentPage.length > 0) {
            currentPage = [];
            newPages.push(currentPage);
            currentPageTop = elTop; // New page starts at this element's top
          }

          currentPage.push(el.cloneNode(true) as unknown as React.ReactNode);
        }
      }
    }

    helper(container);

    setPages(newPages);
  }, [template, data, currentSection, hasSuggestions]);

  return (
    <>
      <div
        ref={dummyContentRef}
        className="bg-white border-[3px] outline-[3px] outline-blue-400 rounded-[18px] mb-5"
        style={{
          position: 'absolute',
          visibility: 'hidden',
          fontFamily: page.fontFamily,
          pointerEvents: 'none',
          width: '21cm',
          padding: PAGE_PADDING,
        }}
      >
        {sections.map((section: any, idx: number) => (
          <React.Fragment key={idx}>
            {renderSection(section, data, currentSection,  hasSuggestions)}
          </React.Fragment>
        ))}
      </div>

      {pages.map((blocks, index) => (
        <div
          key={index}
          className={cn(
            'bg-white mb-5',

            page.className,
            className,
          )}
          style={{
            padding: PAGE_PADDING,
            background: page.background ?? 'white',
            fontFamily: page.fontFamily,
            width: '21cm',
            height: '29.7cm',
          }}
        >
          {blocks.map((node, i) => {
            // Remove top margin from first element on subsequent pages
            if (index > 0 && i === 0) {
              const modifiedNode = (node as any).cloneNode(true);
              modifiedNode.style.marginTop = '0';
              return <div key={i} dangerouslySetInnerHTML={{ __html: modifiedNode.outerHTML }} />;
            }
            return <div key={i} dangerouslySetInnerHTML={{ __html: (node as any).outerHTML }} />;
          })}
        </div>
      ))}
    </>
  );
}

// Main section renderer
function renderSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
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

  if (section.type === 'header')
    return renderHeaderSection(section, data, currentSection, hasSuggestions);
  if (section.type === 'list-section')
    return renderListSection(section, data, currentSection, hasSuggestions);
  if (section.type === 'two-column-layout')
    return renderTwoColumnLayout(section, data, currentSection,  hasSuggestions);
  if (section.type === 'content-section')
    return renderContentSection(section, data, currentSection,  hasSuggestions);
  if (section.type === 'inline-list-section')
    return renderInlineListSection(section, data, currentSection,  hasSuggestions);
  if (section.type === 'badge-section')
    return renderBadgeSection(section, data, currentSection,  hasSuggestions);
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
): React.ReactNode {
  const { fields, className, id } = section;

  const hasGenericFields = Object.values(fields).some(
    (field: any) => field?.type && ['image', 'group', 'text'].includes(field.type),
  );

  const sectionId = id || 'header-section';
  const isHeader = sectionId.toLowerCase() === 'header' || sectionId.toLowerCase() === 'header-section';
  const isActive = currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();

  // Highlight header when personalDetails is selected
  const isPersonalDetailsActive = currentSection?.toLowerCase() === 'personaldetails' && isHeader;

  // Get section-wise suggested updates from data
  const dataKey = 'personalDetails';
  const sectionSuggestedUpdates = data[dataKey]?.suggestedUpdates;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);

  const shouldBlur = hasSuggestions && currentSection && !isActive && !isPersonalDetailsActive && hasValidSuggestions;
  const shouldHighlight = hasSuggestions && hasValidSuggestions && (isActive || isPersonalDetailsActive);

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
          <React.Fragment key={key}>{renderField(fields[key], data)}</React.Fragment>
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
                    <React.Fragment key={subIdx}>{renderField(subItem, data)}</React.Fragment>
                  ))}
                </div>
              );
            }
            return (
              <div key={idx} className={item.className}>
                {renderField(item, data)}
              </div>
            );
          })}
        </div>
      )}

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
                  {value}
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

  // Get section-wise suggested updates from data
  const sectionSuggestedUpdates = data[sectionId]?.suggestedUpdates;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);

  const shouldBlur = hasSuggestions && currentSection && !isActive && hasValidSuggestions;

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

  // Function to get wrapper style for an item
  const getItemWrapperStyle = (itemHasSuggestions: boolean): React.CSSProperties => {
    return {
      scrollMarginTop: '20px',
      ...(hasSuggestions && {
        transition: 'filter 0.3s ease, background-color 0.3s ease, border 0.3s ease',
      }),
      ...(hasSuggestions && isActive && itemHasSuggestions && {
        backgroundColor: 'rgba(200, 255, 230, 0.35)',
        border: '2px solid rgba(0, 168, 107, 0.4)',
        borderRadius: '12px',
        padding: '16px',
        position: 'relative',
        marginBottom: '16px',
      }),
    };
  };

  return (
    <div
      data-item="list-section"
      data-canbreak={section.break}
      data-section={sectionId}
      className={shouldBlur ? 'blur-[2px] pointer-events-none' : ''}
      style={{ scrollMarginTop: '20px' }}
    >
      {!section.break && <RenderListSectionHeading />}

      <div data-item="content" data-canbreak={section.break} className={section.containerClassName}>
        {validItems.map((item: any, idx: number) => {
          // Get the item ID (could be 'id', 'itemId', or generate from index)
          const itemId = item.id || item.itemId || `item-${idx}`;

          // Check if this specific item has pending suggestions
          const itemHasSuggestions = hasItemPendingSuggestions(sectionSuggestedUpdates, itemId);

          return (
            <div
              key={idx}
              className={cn(
                section.itemTemplate.className,
                section.break && shouldBlur ? 'blur-[2px] pointer-events-none' : '',
              )}
              style={getItemWrapperStyle(itemHasSuggestions)}
            >
              {hasSuggestions && isActive && itemHasSuggestions && <SparkleIndicator />}
              {section.break && idx === 0 && <RenderListSectionHeading />}
              {section.itemTemplate.rows
                ? renderItemWithRows(section.itemTemplate, item)
                : renderItemWithFields(section.itemTemplate, item)}
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
): React.ReactNode {
  const { leftColumn, rightColumn, className } = section;

  return (
    <div className={cn(className)} data-item="two-column-layout">
      {/* Left Column */}
      {leftColumn && (
        <div className={cn(leftColumn.className)}>
          {leftColumn.sections?.map((subSection: any, idx: number) => (
            <React.Fragment key={idx}>
              {renderSection(subSection, data, currentSection,  hasSuggestions)}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Right Column */}
      {rightColumn && (
        <div className={cn(rightColumn.className)}>
          {rightColumn.sections?.map((subSection: any, idx: number) => (
            <React.Fragment key={idx}>
              {renderSection(subSection, data, currentSection,  hasSuggestions)}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

function renderItemWithRows(template: any, item: any): React.ReactNode {
  return template.rows.map((row: any, rowIdx: number) => (
    <div key={rowIdx} className={row.className}>
      {row.cells.map((cell: any, cellIdx: number) => (
        <div key={cellIdx}>{renderField(cell, item)}</div>
      ))}
    </div>
  ));
}

function renderItemWithFields(template: any, item: any): React.ReactNode {
  return template.fields.map((field: any, idx: number) => (
    <React.Fragment key={idx}>{renderField(field, item)}</React.Fragment>
  ));
}

function renderField(field: any, data: any): React.ReactNode {
  if (field.type === 'inline-group') {
    // Filter out items with no value first
    const renderedItems = field.items
      .map((subField: any, idx: number) => ({
        idx,
        element: renderField(subField, data),
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

    return (
      <img
        src={src || field.fallback}
        alt={field.alt || 'Image'}
        className={cn(field.className)}   
      />
    );
  }

  if (field.type === 'group') {
    return (
      <div className={field.className}>
        {field.items.map((subField: any, idx: number) => (
          <React.Fragment key={idx}>{renderField(subField, data)}</React.Fragment>
        ))}
      </div>
    );
  }

  if (field.type === 'text') {
    const value = resolvePath(data, field.path, field.fallback);
    if (!value) return null;
    return <p className={field.className}>{value}</p>;
  }

  if (field.type === 'skillLevel') {
    const value = resolvePath(data, field.path, field.fallback);


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
            {renderField(subField, data)}
          </span>
        ))}
      </>
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
    const href = resolvePath(data, field.href);
    if (!value || !href) return null;
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
): React.ReactNode {
  const value = resolvePath(data, section.content.path, section.content.fallback);

  // Check for empty values including empty strings
  if (!value || (typeof value === 'string' && value.trim() === '')) return null;

  const sectionId = section.id || section.heading?.path?.split('.').pop() || 'content-section';
  const isActive = currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();

  // Highlight summary section when personalDetails is selected
  const isSummaryForPersonalDetails =
    currentSection?.toLowerCase() === 'personaldetails' && sectionId.toLowerCase() === 'summary';

  // Get section-wise suggested updates from data
  // Summary section maps to personalDetails or professionalSummary data
  const dataKey = sectionId.toLowerCase() === 'summary' ? 'professionalSummary' : sectionId;
  const sectionSuggestedUpdates = data[dataKey]?.suggestedUpdates;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);

  const shouldBlur = hasSuggestions && currentSection && !isActive && !isSummaryForPersonalDetails && hasValidSuggestions;
  const shouldHighlight = hasSuggestions && hasValidSuggestions && (isActive || isSummaryForPersonalDetails);

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
): React.ReactNode {
  const items = resolvePath(data, section.listPath, []);

  // Return null if items is not an array or is empty
  if (!Array.isArray(items) || items.length === 0) return null;

  // Flatten nested items structure if needed
  const flattenedItems = flattenAndFilterItems(items, section.itemPath);

  // Return null if no valid items after flattening
  if (flattenedItems.length === 0) return null;

  const sectionId = section.id || section.heading?.path?.split('.').pop() || 'inline-list-section';
  const isActive = currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();

  // Get section-wise suggested updates from data
  const sectionSuggestedUpdates = data[sectionId]?.suggestedUpdates;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);

  const shouldBlur = hasSuggestions && currentSection && !isActive && hasValidSuggestions;
  const shouldHighlight = hasSuggestions && hasValidSuggestions && isActive;

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
        {flattenedItems.map((value: any, idx: number) => (
          <span key={idx}>
            <span className={section.itemClassName}>{value}</span>
            {idx < flattenedItems.length - 1 && section.itemSeparator && <span>{section.itemSeparator}</span>}
          </span>
        ))}
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
): React.ReactNode {
  const items = resolvePath(data, section.listPath, []);

  // Return null if items is not an array or is empty
  if (!Array.isArray(items) || items.length === 0) return null;

  // Flatten nested items structure if needed
  const flattenedItems = flattenAndFilterItems(items, section.itemPath);

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

  // Get section-wise suggested updates from data
  const sectionSuggestedUpdates = data[sectionId]?.suggestedUpdates;
  const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);

  const shouldBlur = hasSuggestions && currentSection && !isActive && hasValidSuggestions;
  const shouldHighlight = hasSuggestions && hasValidSuggestions && isActive;

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
        {flattenedItems.map((value: any, idx: number) => {
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
