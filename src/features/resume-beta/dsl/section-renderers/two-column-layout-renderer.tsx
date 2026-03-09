import type { SectionRenderer, SectionRenderContext } from '../section-registry';
import type { TwoColumnLayoutSection } from '../template-config';
import { cn } from '@shared/lib/cn';
import React from 'react';

export const twoColumnLayoutRenderer: SectionRenderer<TwoColumnLayoutSection> = {
  type: 'two-column-layout',

  render(section: TwoColumnLayoutSection, ctx: SectionRenderContext): React.ReactNode {
    const { leftColumn, rightColumn, className } = section;

    return (
      <div className={cn(className)} data-item="two-column-layout">
        {leftColumn && (
          <div className={cn(leftColumn.className)}>
            {leftColumn.sections?.map((subSection: any, idx: number) => (
              <React.Fragment key={idx}>{ctx.renderSection(subSection, ctx)}</React.Fragment>
            ))}
          </div>
        )}

        {rightColumn && (
          <div className={cn(rightColumn.className)}>
            {rightColumn.sections?.map((subSection: any, idx: number) => (
              <React.Fragment key={idx}>{ctx.renderSection(subSection, ctx)}</React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  },
};
