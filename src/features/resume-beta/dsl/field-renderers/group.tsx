import type { FieldRenderer, FieldRenderContext } from '../field-registry';
import { FieldRegistry } from '../field-registry';
import React from 'react';

export const groupFieldRenderer: FieldRenderer = {
  type: 'group',

  render(field: any, ctx: FieldRenderContext): React.ReactNode {
    return (
      <div className={field.className}>
        {field.items?.map((subField: any, idx: number) => (
          <React.Fragment key={idx}>{FieldRegistry.renderField(subField, ctx)}</React.Fragment>
        ))}
      </div>
    );
  },
};
