/**
 * Status variant config for expert review.
 * Colors: #257AFF (In Review), #1D3F6D (Review Done)
 */
export const REVIEW_STATUS_VARIANTS = {
  pending: {
    base: 'bg-[#257AFF] text-white shadow-sm',
    hover: 'hover:bg-[#1a6ae6] hover:text-white',
  },
  in_review: {
    base: 'bg-[#257AFF] text-white shadow-sm',
    hover: 'hover:bg-[#1a6ae6] hover:text-white',
  },
  completed: {
    base: 'bg-[#1D3F6D] text-white shadow-sm',
    hover: 'hover:bg-[#153258] hover:text-white',
  },
  default: {
    base: 'bg-gray-100 text-gray-800',
    hover: 'hover:bg-gray-200 hover:text-gray-900',
  },
} as const;

export type ReviewStatusVariantKey = keyof typeof REVIEW_STATUS_VARIANTS;

export function getStatusVariant(status: string): ReviewStatusVariantKey {
  const s = status.toLowerCase();
  if (s.includes('pending')) return 'pending';
  if (s.includes('in review')) return 'in_review';
  if (s.includes('review done')) return 'completed';
  return 'default';
}
