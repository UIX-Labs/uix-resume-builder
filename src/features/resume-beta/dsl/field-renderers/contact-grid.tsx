import type { FieldRenderer, FieldRenderContext } from '../field-registry';
import { FieldRegistry } from '../field-registry';
import { resolvePath } from '@features/resume/lib/resolve-path';
import { renderDivider } from '@features/resume/lib/components/Divider';
import React from 'react';

export const contactGridFieldRenderer: FieldRenderer = {
  type: 'contact-grid',

  render(field: any, ctx: FieldRenderContext): React.ReactNode {
    return (
      <div className={field.className}>
        {field.heading && (
          <div className={field.heading.className}>
            <p>{resolvePath(ctx.data, field.heading.path, field.heading.fallback)}</p>
            {field.heading.divider && renderDivider(field.heading.divider)}
          </div>
        )}
        {field.items?.map((subField: any, idx: number) => (
          <React.Fragment key={idx}>{FieldRegistry.renderField(subField, ctx)}</React.Fragment>
        ))}
      </div>
    );
  },
};
