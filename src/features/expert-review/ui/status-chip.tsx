'use client';

import { cn } from '@shared/lib/utils';
import { REVIEW_STATUS_VARIANTS, getStatusVariant, type ReviewStatusVariantKey } from '../lib/status-variants';

const CHIP_BASE =
  'inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 cursor-default';

interface StatusChipProps {
  status: string;
  className?: string;
  variant?: ReviewStatusVariantKey;
}

/**
 * Reusable status chip with hover states.
 * Uses variant mapping from status string; override with variant prop when needed.
 */
export function StatusChip({ status, className, variant }: StatusChipProps) {
  const key = variant ?? getStatusVariant(status);
  const config = REVIEW_STATUS_VARIANTS[key] ?? REVIEW_STATUS_VARIANTS.default;

  return (
    <span className={cn(CHIP_BASE, config.base, config.hover, className)} title={status} role="status">
      {status}
    </span>
  );
}
