'use client';

import { GripVertical } from 'lucide-react';
import { useBuilderMeta } from '../../models/builder-context';

export function ResizerHandle() {
  const { startResizing, leftWidth } = useBuilderMeta();

  return (
    <div
      role="slider"
      aria-orientation="vertical"
      aria-label="Resize panels"
      aria-valuemin={20}
      aria-valuemax={70}
      aria-valuenow={Math.round(leftWidth)}
      tabIndex={0}
      className="w-3 cursor-col-resize flex items-center justify-center bg-gray-200 active:bg-blue-100 transition-colors z-50 shrink-0"
      onMouseDown={startResizing}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          startResizing();
        }
      }}
    >
      <div className="w-2 h-12 bg-gray-300 rounded-full flex items-center justify-center">
        <GripVertical className="w-2 h-2 text-gray-500" />
      </div>
    </div>
  );
}
