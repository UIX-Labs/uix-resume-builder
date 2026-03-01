import type { FieldRenderer, FieldRenderContext } from '../field-registry';
import { FieldRegistry } from '../field-registry';
import { cn } from '@shared/lib/cn';
import React from 'react';

export const containerFieldRenderer: FieldRenderer = {
  type: 'container',

  render(field: any, ctx: FieldRenderContext): React.ReactNode {
    return (
      <div className={cn(field.className)}>
        {field.children?.map((child: any, idx: number) => (
          <React.Fragment key={idx}>{FieldRegistry.renderField(child, ctx)}</React.Fragment>
        ))}
      </div>
    );
  },
};
