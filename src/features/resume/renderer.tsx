/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
import dayjs from 'dayjs';
import { cn } from '@shared/lib/cn';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import React from 'react';
import { FieldErrorBadges } from '@features/template-form/ui/error-badges';
import { SuggestionType } from '@entities/resume';

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

function flattenAndFilterItems(items: any[], itemPath?: string): any[] {
  const flattenedItems: any[] = [];

  items.forEach((item: any) => {
    const value = itemPath ? resolvePath(item, itemPath) : item;

    if (Array.isArray(value)) {
      
      flattenedItems.push(...value.filter((v: any) => v && (typeof v !== 'string' || v.trim() !== '')));
    } else if (value && (typeof value !== 'string' || value.trim() !== '')) {
      // Flat structure: item is a direct value
      flattenedItems.push(value);
    }
  });

  return flattenedItems;
}

type RenderProps = {
  template: any;
  data: any;
  className?: string;
  currentSection?: string;
  hasSuggestions?: boolean;
  onApplyBadgeSuggestions?: (data: {
    itemId: string;
    sectionKey: string;
    suggestions: Array<{ old?: string; new: string; type: SuggestionType; fieldName?: string }>;
  }) => void;
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

type ItemBadgeData = {
  itemId: string;
  sectionKey: string;
  fieldName: string; // Field this badge belongs to
  spellingCount: number;
  sentenceCount: number;
  newSummaryCount: number;
  suggestions?: Array<{ old?: string; new: string; type: SuggestionType; fieldName: string }>; // Full suggestion data for this field
};

// Component to render badges as overlays positioned next to items
function BadgeOverlay({ badgeData, onApplyBadgeSuggestions }: {
  badgeData: ItemBadgeData[];
  onApplyBadgeSuggestions?: (data: {
    itemId: string;
    sectionKey: string;
    suggestions: Array<{ old?: string; new: string; type: SuggestionType; fieldName?: string }>;
  }) => void;
}) {
  const [badgePositions, setBadgePositions] = useState<Map<string, DOMRect>>(new Map());
  const [activeOverlay, setActiveOverlay] = useState<{ itemId: string; sectionKey: string; fieldName: string; suggestionType: SuggestionType } | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());

  useLayoutEffect(() => {
    const positions = new Map<string, DOMRect>();

    badgeData.forEach((badge) => {
      // Find the specific field element using itemId and fieldName
      const badgeKey = `${badge.itemId}-${badge.fieldName}`;
      const element = document.querySelector(
        `[data-item-id="${badge.itemId}"][data-field-name="${badge.fieldName}"]`
      ) as HTMLElement;

      if (element) {
        // Get position relative to the document
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        // Store absolute position
        positions.set(badgeKey, {
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft,
          bottom: rect.bottom + scrollTop,
          right: rect.right + scrollLeft,
          width: rect.width,
          height: rect.height,
        } as DOMRect);
      }
    });

    setBadgePositions(positions);
  }, [badgeData]);

  const handleBadgeClick = (itemId: string, sectionKey: string, fieldName: string, suggestionType: SuggestionType) => {
    console.log('Badge clicked:', { itemId, sectionKey, fieldName, suggestionType });
    setActiveOverlay({ itemId, sectionKey, fieldName, suggestionType });
    setSelectedIndices(new Set()); // Reset selection when opening new overlay
  };

  const handleCloseOverlay = () => {
    setActiveOverlay(null);
    setSelectedIndices(new Set());
  };

  // Get suggestions for active overlay - match both itemId and fieldName for field-specific suggestions
  const activeBadge = activeOverlay ? badgeData.find(b => b.itemId === activeOverlay.itemId && b.fieldName === activeOverlay.fieldName) : null;

  console.log(activeBadge,"activeBadge")
  const filteredSuggestions = activeBadge?.suggestions?.filter(
    (s) => s.type === activeOverlay?.suggestionType
  ) || [];

  console.log(filteredSuggestions,"foler")

  const toggleSelection = (index: number) => {
    const newSelected = new Set(selectedIndices);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedIndices(newSelected);
  };

  const handleApplySingle = (suggestion: any) => {
    if (activeOverlay && onApplyBadgeSuggestions) {
      onApplyBadgeSuggestions({
        itemId: activeOverlay.itemId,
        sectionKey: activeOverlay.sectionKey,
        suggestions: [suggestion],
      });
    }
    handleCloseOverlay();
  };

  const handleApplySelected = () => {
    if (activeOverlay && onApplyBadgeSuggestions && selectedIndices.size > 0) {
      const selectedSuggestions = filteredSuggestions.filter((_, idx) => selectedIndices.has(idx));
      onApplyBadgeSuggestions({
        itemId: activeOverlay.itemId,
        sectionKey: activeOverlay.sectionKey,
        suggestions: selectedSuggestions,
      });
      handleCloseOverlay();
    }
  };

  return (
    <>
      {badgeData.map((badge) => {
        const badgeKey = `${badge.itemId}-${badge.fieldName}`;
        const position = badgePositions.get(badgeKey);
        if (!position) return null;

        return (
          <div
            key={badgeKey}
            style={{
              position: 'absolute',
              top: position.bottom + 4,
              left: position.left,
              zIndex: 10,
            }}
          >
            <FieldErrorBadges
              spellingCount={badge.spellingCount}
              sentenceCount={badge.sentenceCount}
              newSummaryCount={badge.newSummaryCount}
              onBadgeClick={(suggestionType) => handleBadgeClick(badge.itemId, badge.sectionKey, badge.fieldName, suggestionType)}
            />
          </div>
        );
      })}

      {/* Suggestion Overlay Modal */}
      {activeOverlay && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
          }}
          onClick={handleCloseOverlay}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflow: 'auto',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
                Suggestions for {activeOverlay.fieldName}
              </h3>
              <button
                onClick={handleCloseOverlay}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', textTransform: 'capitalize' }}>
                {activeOverlay.suggestionType.replace('_', ' ')}
              </h4>

              {filteredSuggestions.length > 0 ? (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {filteredSuggestions.map((suggestion: any, idx: number) => (
                      <div key={idx} style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px', position: 'relative' }}>
                        {/* Checkbox for selection */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                          <input
                            type="checkbox"
                            checked={selectedIndices.has(idx)}
                            onChange={() => toggleSelection(idx)}
                            style={{ marginTop: '4px', cursor: 'pointer', width: '16px', height: '16px' }}
                          />
                          <div style={{ flex: 1 }}>
                            {suggestion.old && (
                              <div style={{ marginBottom: '8px' }}>
                                <strong style={{ fontSize: '12px', color: '#DC2626' }}>Original:</strong>
                                <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>{suggestion.old}</p>
                              </div>
                            )}
                            <div>
                              <strong style={{ fontSize: '12px', color: '#10B981' }}>Suggested:</strong>
                              <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>{suggestion.new}</p>
                            </div>
                            {suggestion.reason && (
                              <div style={{ marginTop: '8px', fontSize: '12px', color: '#6B7280' }}>
                                <em>Reason: {suggestion.reason}</em>
                              </div>
                            )}
                            {suggestion.fieldName && (
                              <div style={{ marginTop: '8px', fontSize: '11px', color: '#9CA3AF' }}>
                                Field: {suggestion.fieldName}
                              </div>
                            )}
                          </div>
                          {/* Individual Apply button */}
                          <button
                            onClick={() => handleApplySingle(suggestion)}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#10B981',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '12px',
                              cursor: 'pointer',
                              fontWeight: 600,
                            }}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bulk Apply button */}
                  {selectedIndices.size > 0 && (
                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={handleApplySelected}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#005FF2',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '14px',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                      >
                        Apply Selected ({selectedIndices.size})
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p style={{ color: '#6B7280', fontSize: '14px' }}>No suggestions available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ResumeRenderer({ template, data, className, currentSection, hasSuggestions = false, onApplyBadgeSuggestions }: RenderProps) {
  const [pages, setPages] = useState<[React.ReactNode[], React.ReactNode[]][]>([]);
  const [badgeData, setBadgeData] = useState<ItemBadgeData[]>([]);
  const dummyContentRef = useRef<HTMLDivElement>(null);


  console.log(badgeData,"badgeData")

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

    const leftCol = container.querySelector('[data-column="left"]') as HTMLElement | null;
    const rightCol = container.querySelector('[data-column="right"]') as HTMLElement | null;

    const leftPages: React.ReactNode[][] = [];
    const rightPages: React.ReactNode[][] = [];

    function paginateOneColumn(columnEl: HTMLElement, columnName: 'left' | 'right', outPages: React.ReactNode[][]) {
      let currentColumnPage: React.ReactNode[] = [];
      outPages.push(currentColumnPage);

      const pageMax = COLUMN_MAX[columnName];
      let pageTop: number | null = null;

      function walk(el: HTMLElement) {
        const children = Array.from(el.children) as HTMLElement[];
        if (!children.length) return;

        for (const child of children) {
          child.style.display = '';

          const rect = child.getBoundingClientRect();
          const canBreak = child.getAttribute('data-canbreak') === 'true';

          if (pageTop == null) {
            pageTop = rect.top;
          }

          if (canBreak) {
            walk(child);
            continue;
          }

          const childBottom = rect.bottom;
          const usedHeight = childBottom - pageTop;

          if (usedHeight > pageMax && currentColumnPage.length > 0) {
            currentColumnPage = [];
            outPages.push(currentColumnPage);
            pageTop = rect.top;
          }

          currentColumnPage.push(child.cloneNode(true) as React.ReactNode);
        }
      }

      walk(columnEl);
    }

    if (leftCol) paginateOneColumn(leftCol, 'left', leftPages);
    if (rightCol) paginateOneColumn(rightCol, 'right', rightPages);

    // Extract badge data from fields with data-field-name
    const badges: ItemBadgeData[] = [];
    const fieldElements = container.querySelectorAll('[data-field-name][data-item-id][data-section-key]');

    fieldElements.forEach((element) => {
      const itemId = element.getAttribute('data-item-id');
      const sectionKey = element.getAttribute('data-section-key');
      const fieldName = element.getAttribute('data-field-name');

      if (!itemId || !sectionKey || !fieldName) return;

      // Get suggestions for this specific field
      const itemUpdate = data?.[sectionKey]?.suggestedUpdates?.find((update: any) => update.itemId === itemId);
      const fieldData = itemUpdate?.fields?.[fieldName];

      if (!fieldData?.suggestedUpdates || fieldData.suggestedUpdates.length === 0) return;

      const fieldSuggestions: Array<{ old?: string; new: string; type: SuggestionType; fieldName: string }> =
        fieldData.suggestedUpdates.map((suggestion: any) => ({
          ...suggestion,
          fieldName,
        }));

      // Count by type
      let spellingCount = 0;
      let sentenceCount = 0;
      let newSummaryCount = 0;

      fieldSuggestions.forEach((suggestion) => {
        if (suggestion.type === 'spelling_error') {
          spellingCount++;
        } else if (suggestion.type === 'sentence_refinement') {
          sentenceCount++;
        } else if (suggestion.type === 'new_summary') {
          newSummaryCount++;
        }
      });

      if (spellingCount > 0 || sentenceCount > 0 || newSummaryCount > 0) {
        badges.push({
          itemId,
          sectionKey,
          fieldName,
          spellingCount,
          sentenceCount,
          newSummaryCount,
          suggestions: fieldSuggestions,
        });
      }
    });

    const totalPages = Math.max(leftPages.length, rightPages.length);
    const merged: [React.ReactNode[], React.ReactNode[]][] = [];

    for (let i = 0; i < totalPages; i++) {
      merged.push([leftPages[i] || [], rightPages[i] || []]);
    }
    console.log(badges,"badges")

    setPages(merged);
    setBadgeData(badges);
  }, [template, data, currentSection, hasSuggestions]);

  const { columnConfig, leftItems, rightItems } = useMemo(() => {
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
      };
    }

    const leftItems = template.sections.filter((s: any) => s.column === 'left');
    const rightItems = template.sections.filter((s: any) => s.column === 'right');

    return {
      columnConfig: template.columns,
      leftItems,
      rightItems,
    };
  }, [template]);

  const leftWidth = columnConfig.left.width;
  const rightWidth = columnConfig.right.width;
  const spacing = columnConfig.spacing;
  const leftColumnClassName = columnConfig.left.className || '';
  const rightColumnClassName = columnConfig.right.className || '';
  const fontFamily = page.fontFamily || undefined;

  const baseStyle = {
    width: '21cm',
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
          position: 'absolute',
          visibility: 'hidden',
        }}
      >
        <div className={cn('flex flex-col', leftColumnClassName)} data-column="left">
          {leftItems.map((s, i) => (
            <React.Fragment key={i}>{renderSection(s, data, currentSection, hasSuggestions)}</React.Fragment>
          ))}
        </div>
        <div className={cn('flex flex-col', rightColumnClassName)} data-column="right">
          {rightItems.map((s, i) => (
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
            style={{ ...baseStyle, height: '29.7cm', backgroundColor: page.background || 'white' }}
          >
            <div className={cn('flex flex-col', leftColumnClassName)}>
              {leftColumn.map((node: any, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
              ))}
            </div>
            <div className={cn('flex flex-col', rightColumnClassName)}>
              {rightColumn.map((node: any, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Render badges outside pagination as overlays */}
      {hasSuggestions && <BadgeOverlay badgeData={badgeData} onApplyBadgeSuggestions={onApplyBadgeSuggestions} />}
    </>
  );
}

// Main section renderer
function renderSection(section: any, data: any, currentSection?: string, hasSuggestions?: boolean): React.ReactNode {
 
  let sectionId = section.id;

  if (!sectionId && section.listPath) {
    sectionId = section.listPath.split('.')[0];
  }

  if (!sectionId && section.heading?.path) {
    sectionId = section.heading.path.split('.')[0];
  }


  let dataKey = sectionId;
  if (sectionId === 'header' || sectionId === 'summary') {
    dataKey = 'personalDetails';
  }

  if (dataKey && data[dataKey]?.isHidden === true) {
    return null;
  }

  if (section.type === 'header') return renderHeaderSection(section, data, currentSection, hasSuggestions);
  if (section.type === 'list-section') return renderListSection(section, data, currentSection, hasSuggestions);
  if (section.type === 'two-column-layout') return renderTwoColumnLayout(section, data, currentSection, hasSuggestions);
  if (section.type === 'content-section') return renderContentSection(section, data, currentSection, hasSuggestions);
  if (section.type === 'inline-list-section')
    return renderInlineListSection(section, data, currentSection, hasSuggestions);
  if (section.type === 'badge-section') return renderBadgeSection(section, data, currentSection, hasSuggestions);
  return null;
}

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


  const isPersonalDetailsActive = currentSection?.toLowerCase() === 'personaldetails' && isHeader;

  const shouldBlur = hasSuggestions && currentSection && !isActive && !isPersonalDetailsActive;
  const shouldHighlight = hasSuggestions && (isActive || isPersonalDetailsActive);

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

  const shouldBlur = hasSuggestions && currentSection && !isActive;
  const shouldHighlight = hasSuggestions && isActive;

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

          // Get error counts across all fields for this item
          const errorCounts = (() => {
            const counts = { spellingCount: 0, sentenceCount: 0, newSummaryCount: 0 };

            if (!data?.[sectionKey]?.suggestedUpdates || !itemId) {
              return counts;
            }

            // Find the item's suggestions
            const itemUpdate = data[sectionKey].suggestedUpdates.find((update: any) => update.itemId === itemId);

            if (!itemUpdate?.fields) {
              return counts;
            }

            // Count errors across all fields
            Object.values(itemUpdate.fields).forEach((fieldData: any) => {
              const suggestions = fieldData?.suggestedUpdates || [];
              suggestions.forEach((suggestion: any) => {
                // Skip suggestions where old === new (no actual change)
                if (suggestion.old && suggestion.old === suggestion.new) {
                  return;
                }

                if (suggestion.type === 'spelling_error') {
                  counts.spellingCount++;
                } else if (suggestion.type === 'sentence_refinement') {
                  counts.sentenceCount++;
                } else if (suggestion.type === 'new_summary') {
                  counts.newSummaryCount++;
                }
              });
            });

            return counts;
          })();

 

          return (
            <div
              key={idx}
              data-item-id={itemId}
              data-section-key={sectionKey}
              data-spelling-count={errorCounts.spellingCount}
              data-sentence-count={errorCounts.sentenceCount}
              data-new-summary-count={errorCounts.newSummaryCount}
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
                      ? renderItemWithRows(section.itemTemplate, item, itemId, sectionKey)
                      : renderItemWithFields(section.itemTemplate, item, itemId, sectionKey)}
                  </div>
                </>
              ) : (
                <>
                  {section.itemTemplate.rows
                    ? renderItemWithRows(section.itemTemplate, item, itemId, sectionKey)
                    : renderItemWithFields(section.itemTemplate, item, itemId, sectionKey)}
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
): React.ReactNode {
  const { leftColumn, rightColumn, className } = section;

  return (
    <div className={cn(className)} data-item="two-column-layout">
      {/* Left Column */}
      {leftColumn && (
        <div className={cn(leftColumn.className)}>
          {leftColumn.sections?.map((subSection: any, idx: number) => (
            <React.Fragment key={idx}>{renderSection(subSection, data, currentSection, hasSuggestions)}</React.Fragment>
          ))}
        </div>
      )}

      {/* Right Column */}
      {rightColumn && (
        <div className={cn(rightColumn.className)}>
          {rightColumn.sections?.map((subSection: any, idx: number) => (
            <React.Fragment key={idx}>{renderSection(subSection, data, currentSection, hasSuggestions)}</React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

function renderItemWithRows(template: any, item: any, itemId?: string, sectionKey?: string): React.ReactNode {
  return template.rows.map((row: any, rowIdx: number) => (
    <div key={rowIdx} className={row.className}>
      {row.cells.map((cell: any, cellIdx: number) => {
        const fieldName = cell.path?.split('.').pop() || cell.type || `cell-${cellIdx}`;
        return (
          <div
            key={cellIdx}
            data-field-name={fieldName}
            data-item-id={itemId}
            data-section-key={sectionKey}
          >
            {renderField(cell, item)}
          </div>
        );
      })}
    </div>
  ));
}

function renderItemWithFields(template: any, item: any, itemId?: string, sectionKey?: string): React.ReactNode {
  return template.fields.map((field: any, idx: number) => {
    const fieldName = field.path?.split('.').pop() || field.type || `field-${idx}`;

    return (
      <div
        key={idx}
        data-field-name={fieldName}
        data-item-id={itemId}
        data-section-key={sectionKey}
      >
        {renderField(field, item)}
      </div>
    );
  });
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

    return <img src={src || field.fallback} alt={field.alt || 'Image'} className={cn(field.className)} />;
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
            {renderField(subField, data)}
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
    return <div className={field.className} dangerouslySetInnerHTML={{ __html: value }} />;
  }

  if (field.type === 'link') {
    const value = resolvePath(data, field.path, field.fallback);
    const href = resolvePath(data, field.href);
    if (!value || !href) return null;
    return (
      <a href={href} className={field.className} target="_blank" rel="noopener noreferrer">
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

  const shouldBlur = hasSuggestions && currentSection && !isActive && !isSummaryForPersonalDetails;
  const shouldHighlight = hasSuggestions && (isActive || isSummaryForPersonalDetails);

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

  const shouldBlur = hasSuggestions && currentSection && !isActive;
  const shouldHighlight = hasSuggestions && isActive;

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

  const shouldBlur = hasSuggestions && currentSection && !isActive;
  const shouldHighlight = hasSuggestions && isActive;

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
          const displayValue = `${section.itemPrefix || ''}${value}${section.itemSuffix || ''}`;

          if (IconComponent) {
            return (
              <div key={idx} className={section.itemClassName}>
                <IconComponent className={section.iconClassName} />
                <span className={section.badgeClassName}>{displayValue}</span>
              </div>
            );
          }

          // Default rendering without icon
          return (
            <React.Fragment key={idx}>
              <span className={section.badgeClassName}>{displayValue}</span>
              {idx < flattenedItems.length - 1 && section.itemSeparator && <span>{section.itemSeparator}</span>}
            </React.Fragment>
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
