import { renderDivider } from '@features/resume/lib/components/Divider';
import { resolvePath } from '@features/resume/lib/resolve-path';
import {
  extractRenderableValue,
  flattenAndFilterItemsWithContext,
  hasPendingSuggestions,
} from '@features/resume/lib/section-utils';
import { getSuggestionDataAttribute } from '@features/resume/lib/suggestion-utils';
import { getArrayValueSuggestions, getSuggestionBackgroundColor } from '@features/template-form/lib/get-field-errors';
import { cn } from '@shared/lib/cn';
import * as LucideIcons from 'lucide-react';
import type React from 'react';
import type { FieldRenderContext } from '../field-registry';
import { FieldRegistry } from '../field-registry';
import type { SectionRenderContext, SectionRenderer } from '../section-registry';
import type { TableSection } from '../template-config';
import { hasValidItems, filterValidItems } from '../../lib/section-utils';

export const tableSectionRenderer: SectionRenderer<TableSection> = {
  type: 'table-section',

  willRender(section: TableSection, ctx: SectionRenderContext): boolean {
    const items = resolvePath(ctx.data, section.listPath as string, []);
    return hasValidItems(items);
  },

  render(section: TableSection, ctx: SectionRenderContext): React.ReactNode {
    let items = resolvePath(ctx.data, section.listPath as string, []);
    const columns = section.columns || [];

    if (section.id === 'summary' && (!Array.isArray(items) || items.length === 0)) {
      const value = resolvePath(ctx.data, 'personalDetails.items[0].description');
      items = value ? [{ summary: value }] : [];
    }

    if (!Array.isArray(items) || items.length === 0) return null;

    const validItems = filterValidItems(items);
    if (validItems.length === 0) return null;

    const sectionId = section.id || section.heading?.path?.split('.').pop() || 'table-section';
    const isActive = ctx.currentSection && sectionId.toLowerCase() === ctx.currentSection.toLowerCase();

    const sectionKey = (section.listPath as string)?.split('.')[0];
    const sectionSuggestedUpdates = sectionKey ? (ctx.data as any)[sectionKey]?.suggestedUpdates : undefined;
    const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);
    const suggestedUpdates = sectionSuggestedUpdates;

    const shouldBlur = !ctx.isThumbnail && ctx.hasSuggestions && ctx.currentSection && !isActive && hasValidSuggestions;
    const shouldHighlight = !ctx.isThumbnail && ctx.hasSuggestions && isActive && hasValidSuggestions;

    const wrapperStyle: React.CSSProperties = {
      scrollMarginTop: '20px',
      ...(ctx.hasSuggestions && {
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

    const numColumns = columns.length + (section.headingColumn ? 1 : 0);
    const gridTemplateColumns = section.gridTemplateColumns || `repeat(${numColumns}, 1fr)`;
    const isSingleRow = section.singleRow === true;

    const renderColumnContent = (
      column: any,
      item: Record<string, any>,
      itemId: string | undefined,
    ): React.ReactNode => {
      const fieldCtx: FieldRenderContext = {
        data: item,
        itemId,
        suggestedUpdates,
        isThumbnail: ctx.isThumbnail,
        sectionId: sectionKey || sectionId,
      };

      if (
        column.type === 'field' ||
        column.type === 'duration' ||
        column.type === 'html' ||
        column.type === 'text' ||
        column.type === 'link'
      ) {
        return FieldRegistry.renderField(column, fieldCtx);
      }

      if (column.type === 'inline-group') {
        return FieldRegistry.renderField(column, fieldCtx);
      }

      if (column.type === 'group') {
        return FieldRegistry.renderField(column, fieldCtx);
      }

      if (column.type === 'badge-list') {
        const badgeItems = column.itemPath
          ? flattenAndFilterItemsWithContext([item], column.itemPath)
          : (Array.isArray(item) ? item : [item]).filter(
              (v: unknown) => v && (typeof v !== 'string' || v.trim() !== ''),
            );

        const fieldName = column.itemPath || 'items';

        if (badgeItems.length > 0) {
          const getIconComponent = (iconName?: string) => {
            if (!iconName) return null;
            const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
              iconName
            ];
            return Icon || null;
          };
          const IconComponent = column.icon ? getIconComponent(column.icon) : null;

          return (
            <div className={cn('flex gap-1 flex-wrap', column.containerClassName)}>
              {badgeItems.map((badgeItem: any, badgeIdx: number) => {
                const value = extractRenderableValue(badgeItem);
                if (value === null) return null;

                const badgeItemId = badgeItem?.itemId || itemId;
                const valueSuggestions =
                  badgeItemId && fieldName
                    ? getArrayValueSuggestions(suggestedUpdates, badgeItemId, fieldName, value)
                    : [];
                const errorBgColor = ctx.isThumbnail ? '' : getSuggestionBackgroundColor(valueSuggestions);
                const suggestionData =
                  badgeItemId && fieldName && sectionKey
                    ? getSuggestionDataAttribute(sectionKey, badgeItemId, fieldName, valueSuggestions, ctx.isThumbnail)
                    : undefined;
                const hasClickableSuggestions = !!suggestionData;

                if (IconComponent) {
                  return (
                    <div key={badgeIdx} className={column.itemClassName}>
                      <IconComponent className={column.iconClassName} />
                      <span
                        className={cn(column.badgeClassName, errorBgColor, hasClickableSuggestions && 'cursor-pointer')}
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
                    className={cn(column.badgeClassName, errorBgColor, hasClickableSuggestions && 'cursor-pointer')}
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

      return null;
    };

    return (
      <div
        data-item="table-section"
        data-canbreak={section.break}
        data-section={sectionId}
        className={cn(shouldBlur && 'blur-[2px] pointer-events-none')}
        style={wrapperStyle}
      >
        <div
          data-item="content"
          data-canbreak={section.break ? 'true' : undefined}
          className={section.containerClassName}
        >
          {isSingleRow ? (
            <div className={cn('grid', section.rowClassName)} style={{ gridTemplateColumns }}>
              {section.headingColumn && (
                <div className={section.headingColumn.className}>
                  {section.heading && (
                    <>
                      <p data-item="heading" className={section.heading.className}>
                        {resolvePath(ctx.data, section.heading.path as string, section.heading.fallback)}
                      </p>
                      {section.heading?.divider && renderDivider(section.heading.divider)}
                    </>
                  )}
                </div>
              )}

              {columns.map((column: any, colIdx: number) => (
                <div
                  key={colIdx}
                  className={column.className}
                  data-canbreak={column.break ? 'true' : undefined}
                  data-has-breakable-content={column.break ? 'true' : undefined}
                >
                  {column.type === 'badge-list'
                    ? (() => {
                        const allBadgeItems = flattenAndFilterItemsWithContext(validItems, column.itemPath);
                        const fieldName = column.itemPath || 'items';

                        if (allBadgeItems.length === 0) return null;

                        const getIconComponent = (iconName?: string) => {
                          if (!iconName) return null;
                          const Icon = (
                            LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>
                          )[iconName];
                          return Icon || null;
                        };
                        const IconComponent = column.icon ? getIconComponent(column.icon) : null;

                        return (
                          <div className={cn('flex gap-1 flex-wrap', column.containerClassName)}>
                            {allBadgeItems.map(({ value, itemId }, badgeIdx: number) => {
                              const actualValue = extractRenderableValue(value);
                              if (actualValue === null) return null;

                              const valueSuggestions =
                                itemId && fieldName
                                  ? getArrayValueSuggestions(suggestedUpdates, itemId, fieldName, actualValue)
                                  : [];
                              const errorBgColor = ctx.isThumbnail
                                ? ''
                                : getSuggestionBackgroundColor(valueSuggestions);
                              const suggestionData =
                                itemId && fieldName && sectionKey
                                  ? getSuggestionDataAttribute(
                                      sectionKey,
                                      itemId,
                                      fieldName,
                                      valueSuggestions,
                                      ctx.isThumbnail,
                                    )
                                  : undefined;
                              const hasClickableSuggestions = !!suggestionData;

                              if (IconComponent) {
                                return (
                                  <div key={badgeIdx} className={column.itemClassName}>
                                    <IconComponent className={column.iconClassName} />
                                    <span
                                      className={cn(
                                        column.badgeClassName,
                                        errorBgColor,
                                        hasClickableSuggestions && 'cursor-pointer',
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
                                    column.badgeClassName,
                                    errorBgColor,
                                    hasClickableSuggestions && 'cursor-pointer',
                                  )}
                                  data-suggestion={suggestionData}
                                >
                                  {actualValue}
                                </span>
                              );
                            })}
                          </div>
                        );
                      })()
                    : null}
                </div>
              ))}
            </div>
          ) : (
            validItems.map((item: Record<string, any>, itemIdx: number) => {
              const itemId = item.itemId || item.id;

              return (
                <div
                  key={itemIdx}
                  data-item="table-row"
                  data-has-breakable-content={section.break ? 'true' : undefined}
                  className={cn('grid', section.rowClassName)}
                  style={{ gridTemplateColumns }}
                >
                  {section.headingColumn && (
                    <div className={section.headingColumn.className} style={{ gridColumn: 1 }}>
                      {itemIdx === 0 && section.heading && (
                        <>
                          <p data-item="heading" className={section.heading.className}>
                            {resolvePath(ctx.data, section.heading.path as string, section.heading.fallback)}
                          </p>
                          {section.heading?.divider && renderDivider(section.heading.divider)}
                        </>
                      )}
                    </div>
                  )}

                  {columns.map((column: any, colIdx: number) => (
                    <div
                      key={`${itemIdx}-${colIdx}`}
                      className={column.className}
                      data-canbreak={column.break ? 'true' : undefined}
                      data-has-breakable-content={column.break ? 'true' : undefined}
                      style={{
                        gridColumn: section.headingColumn ? colIdx + 2 : colIdx + 1,
                      }}
                    >
                      {renderColumnContent(column, item, itemId)}
                    </div>
                  ))}
                </div>
              );
            })
          )}
          {(section as any).divider && ctx.hasNextSection && (
            <div className="px-8 my-2" data-canbreak="true" data-item="divider">
              {renderDivider((section as any).divider)}
            </div>
          )}
        </div>
      </div>
    );
  },
};
