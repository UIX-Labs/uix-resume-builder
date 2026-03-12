// ---------------------------------------------------------------------------
// MeasurementContainer — hidden div for DOM measurement
//
// Renders all sections into a hidden, position-absolute container so the
// pagination engine can measure their actual rendered heights.
// ---------------------------------------------------------------------------

import { cn } from '@shared/lib/cn';
import React from 'react';
import type { SectionRenderContext } from '../section-registry';
import { SectionRegistry } from '../section-registry';
import type { TypedTemplateSection } from '../template-config';

interface MeasurementContainerProps {
  leftItems: TypedTemplateSection[];
  rightItems: TypedTemplateSection[];
  bannerItems: TypedTemplateSection[];
  ctx: SectionRenderContext;
  leftColumnClassName: string;
  rightColumnClassName: string;
  baseStyle: React.CSSProperties;
}

export const MeasurementContainer = React.forwardRef<HTMLDivElement, MeasurementContainerProps>(
  function MeasurementContainer(
    { leftItems, rightItems, bannerItems, ctx, leftColumnClassName, rightColumnClassName, baseStyle },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-resume-measurement="true"
        className="mb-5 grid"
        style={{
          ...baseStyle,
          position: 'absolute',
          visibility: 'hidden',
        }}
      >
        {bannerItems.length > 0 && (
          <div style={{ gridColumn: '1 / -1' }} data-section-type="banner">
            {bannerItems.map((s, i) => (
              <React.Fragment key={i}>{SectionRegistry.renderSection(s, ctx)}</React.Fragment>
            ))}
          </div>
        )}

        <div className={cn('flex flex-col', leftColumnClassName)} data-column="left">
          {leftItems.map((s, i) => {
            const hasNextSection =
              i < leftItems.length - 1 &&
              leftItems.slice(i + 1).some((next) => SectionRegistry.willSectionRender(next, ctx));
            return (
              <React.Fragment key={i}>{SectionRegistry.renderSection(s, { ...ctx, hasNextSection })}</React.Fragment>
            );
          })}
        </div>

        <div className={cn('flex flex-col', rightColumnClassName)} data-column="right">
          {rightItems.map((s, i) => {
            const hasNextSection =
              i < rightItems.length - 1 &&
              rightItems.slice(i + 1).some((next) => SectionRegistry.willSectionRender(next, ctx));
            return (
              <React.Fragment key={i}>{SectionRegistry.renderSection(s, { ...ctx, hasNextSection })}</React.Fragment>
            );
          })}
        </div>
      </div>
    );
  },
);
