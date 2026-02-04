import { cn } from '@shared/lib/cn';
import type React from 'react';

// Render divider (horizontal line under headings)
export function renderDivider(divider: any): React.ReactNode {
  if (!divider) return null;

  if (divider.variant === 'line') {
    return <div data-item="divider" className={cn('w-full bg-zinc-200 h-px', divider.className)} />;
  }
  if (divider.variant === 'pipe') {
    return (
      <span data-item="divider" className={divider.className}>
        |
      </span>
    );
  }
  return null;
}
