import type { FieldRenderer } from '../field-registry';
import * as LucideIcons from 'lucide-react';
import React from 'react';

export const iconFieldRenderer: FieldRenderer = {
  type: 'icon',

  render(field: any): React.ReactNode {
    const IconComponent = (
      LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>
    )[field.name!];
    if (!IconComponent) return null;
    return <IconComponent size={field.size || 16} className={field.className} />;
  },
};
