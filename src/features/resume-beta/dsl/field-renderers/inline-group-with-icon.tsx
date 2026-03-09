import type { FieldRenderer, FieldRenderContext } from '../field-registry';
import { FieldRegistry } from '../field-registry';
import { isNil } from '@shared/lib/guards';
import { cn } from '@shared/lib/cn';
import React from 'react';

export const inlineGroupWithIconFieldRenderer: FieldRenderer = {
  type: 'inline-group-with-icon',

  render(field: any, ctx: FieldRenderContext): React.ReactNode {
    const renderedItems = field.items.map((subField: any, idx: number) => ({
      idx,
      element: FieldRegistry.renderField(subField, ctx),
      isIcon: subField.type === 'icon',
      subField,
    }));

    const hasValidValues = renderedItems.some(
      ({ isIcon, element }: { isIcon: boolean; element: React.ReactNode }) =>
        !isIcon && !isNil(element) && element !== '',
    );

    if (!hasValidValues) return null;

    const itemsToRender = renderedItems.filter(
      ({ isIcon, element }: { isIcon: boolean; element: React.ReactNode }) =>
        isIcon || (!isNil(element) && element !== ''),
    );

    if (itemsToRender.length === 0) return null;

    return (
      <div className={field.className}>
        {itemsToRender.map(({ element, idx }: { element: React.ReactNode; idx: number }, arrayIdx: number) => (
          <span key={idx} className={cn(field.items[idx].className)}>
            {arrayIdx > 0 && field.separator}
            {element}
          </span>
        ))}
      </div>
    );
  },
};
