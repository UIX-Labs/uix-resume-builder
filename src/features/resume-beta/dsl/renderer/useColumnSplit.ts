// ---------------------------------------------------------------------------
// useColumnSplit — splits template sections into left/right/banner buckets
// ---------------------------------------------------------------------------

import { useMemo } from 'react';
import type { ColumnConfig, TypedTemplateConfig, TypedTemplateSection } from '../template-config';

export interface ColumnSplitResult {
  columnConfig: ColumnConfig;
  leftItems: TypedTemplateSection[];
  rightItems: TypedTemplateSection[];
  bannerItems: TypedTemplateSection[];
}

const DEFAULT_COLUMN_CONFIG: ColumnConfig = {
  spacing: '0px',
  left: { width: '100%' },
  right: { width: '0%' },
};

export function useColumnSplit(template: TypedTemplateConfig): ColumnSplitResult {
  return useMemo(() => {
    if (!template.columns) {
      return {
        columnConfig: DEFAULT_COLUMN_CONFIG,
        leftItems: template.sections,
        rightItems: [],
        bannerItems: [],
      };
    }

    const bannerItems = template.sections.filter((s) => s.type === 'banner');
    const leftItems = template.sections.filter((s) => s.column === 'left' && s.type !== 'banner');
    const rightItems = template.sections.filter((s) => s.column === 'right' && s.type !== 'banner');

    return {
      columnConfig: template.columns,
      leftItems,
      rightItems,
      bannerItems,
    };
  }, [template]);
}
