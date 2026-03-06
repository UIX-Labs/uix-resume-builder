import type { SectionRenderer, SectionRenderContext } from '../section-registry';
import type { ListSection } from '../template-config';
import { FieldRegistry } from '../field-registry';
import type { FieldRenderContext } from '../field-registry';
import { resolvePath } from '@features/resume/lib/resolve-path';
import { renderDivider } from '@features/resume/lib/components/Divider';
import { hasPendingSuggestions } from '@features/resume/lib/section-utils';
import { cn } from '@shared/lib/cn';
import React from 'react';

function renderItemWithRows(
  template: any,
  item: Record<string, unknown>,
  itemId: string | undefined,
  suggestedUpdates: any,
  isThumbnail: boolean | undefined,
  sectionId: string,
): React.ReactNode {
  return template.rows.map((row: any, rowIdx: number) => {
    const hasBreakableCell = row.cells.some((cell: any) => cell.break === true || cell.breakable === true);
    const isRowBreakable = row.break === true || row.breakable === true || hasBreakableCell;

    const fieldCtx: FieldRenderContext = {
      data: item,
      itemId,
      suggestedUpdates,
      isThumbnail,
      sectionId,
    };

    return (
      <div
        key={rowIdx}
        className={row.className}
        data-canbreak={isRowBreakable ? 'true' : undefined}
        data-has-breakable-content={isRowBreakable ? 'true' : undefined}
      >
        {row.cells.map((cell: any, cellIdx: number) => (
          <React.Fragment key={cellIdx}>{FieldRegistry.renderField(cell, fieldCtx)}</React.Fragment>
        ))}
      </div>
    );
  });
}

function renderItemWithFields(
  template: any,
  item: Record<string, unknown>,
  itemId: string | undefined,
  suggestedUpdates: any,
  isThumbnail: boolean | undefined,
  sectionId: string,
): React.ReactNode {
  const fieldCtx: FieldRenderContext = {
    data: item,
    itemId,
    suggestedUpdates,
    isThumbnail,
    sectionId,
  };

  return template.fields.map((field: any, idx: number) => (
    <div
      key={idx}
      data-canbreak={field.break || field.breakable ? 'true' : undefined}
      data-has-breakable-content={field.break || field.breakable ? 'true' : undefined}
    >
      {FieldRegistry.renderField(field, fieldCtx)}
    </div>
  ));
}

export const listSectionRenderer: SectionRenderer<ListSection> = {
  type: 'list-section',

  render(section: ListSection, ctx: SectionRenderContext): React.ReactNode {
    const rawItems = resolvePath(ctx.data, section.listPath as string, []);
    const items = rawItems.map((item: Record<string, unknown>) => ({ ...item }));

    const sectionId = section.id || section.heading?.path?.split('.').pop() || 'list-section';
    const isActive = ctx.currentSection && sectionId.toLowerCase() === ctx.currentSection.toLowerCase();

    const sectionKey = (section.listPath as string)?.split('.')[0];
    const sectionSuggestedUpdates = sectionKey ? (ctx.data as any)[sectionKey]?.suggestedUpdates : undefined;
    const hasValidSuggestions = hasPendingSuggestions(sectionSuggestedUpdates);

    const shouldBlur = !ctx.isThumbnail && ctx.hasSuggestions && ctx.currentSection && !isActive && hasValidSuggestions;
    const shouldHighlight = !ctx.isThumbnail && ctx.hasSuggestions && isActive && hasValidSuggestions;

    function RenderListSectionHeading() {
      return (
        <div className={cn('flex flex-col', section.heading?.className)}>
          {section.heading && (
            <p data-item="heading">{resolvePath(ctx.data, section.heading.path as string, section.heading.fallback)}</p>
          )}
          {section.heading?.divider && renderDivider(section.heading.divider)}
        </div>
      );
    }

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

    const itemWrapperStyle = section.break ? wrapperStyle : {};
    const containerWrapperStyle = section.break ? {} : wrapperStyle;
    const suggestedUpdates = sectionSuggestedUpdates;

    return (
      <div
        data-item="list-section"
        data-canbreak={section.break}
        data-section={sectionId}
        className={shouldBlur ? 'blur-[2px] pointer-events-none' : ''}
        style={containerWrapperStyle}
      >
        {!section.break && <RenderListSectionHeading />}

        <div
          data-item="content"
          data-canbreak={section.break}
          className={(section as any).containerClassName}
          id="teacher-content"
        >
          {items.map((item: Record<string, unknown>, idx: number) => {
            const itemId = (item.itemId || item.id) as string | undefined;
            const formDataSectionKey = sectionKey || sectionId;

            const content = section.itemTemplate.rows
              ? renderItemWithRows(
                  section.itemTemplate,
                  item,
                  itemId,
                  suggestedUpdates,
                  ctx.isThumbnail,
                  formDataSectionKey,
                )
              : renderItemWithFields(
                  section.itemTemplate,
                  item,
                  itemId,
                  suggestedUpdates,
                  ctx.isThumbnail,
                  formDataSectionKey,
                );

            const isItemBreakable = section.break || section.itemTemplate?.break;

            if (section.break && idx === 0) {
              return (
                <div
                  key={idx}
                  className={cn(section.itemTemplate.className, shouldBlur ? 'blur-[2px] pointer-events-none' : '')}
                  style={itemWrapperStyle}
                  data-canbreak={isItemBreakable ? 'true' : undefined}
                  data-has-breakable-content={isItemBreakable ? 'true' : undefined}
                >
                  <RenderListSectionHeading />
                  <div
                    data-canbreak={isItemBreakable ? 'true' : undefined}
                    data-has-breakable-content={isItemBreakable ? 'true' : undefined}
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
                  isItemBreakable && shouldBlur ? 'blur-[2px] pointer-events-none' : '',
                )}
                style={itemWrapperStyle}
                data-canbreak={isItemBreakable ? 'true' : undefined}
                data-has-breakable-content={isItemBreakable ? 'true' : undefined}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};
