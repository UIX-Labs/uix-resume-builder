import type { FieldRenderer, FieldRenderContext } from '../field-registry';
import { FieldRegistry } from '../field-registry';
import { cn } from '@shared/lib/cn';
import React from 'react';

export const horizontalGroupFieldRenderer: FieldRenderer = {
  type: 'horizontal-group',

  render(field: any, ctx: FieldRenderContext): React.ReactNode {
    return (
      <div className={cn('flex flex-row items-center', field.className)}>
        {field.items.map((subField: any, idx: number) => (
          <React.Fragment key={idx}>
            {idx > 0 && field.separator && <span>{field.separator}</span>}
            {FieldRegistry.renderField(subField, ctx)}
          </React.Fragment>
        ))}
      </div>
    );
  },
};
