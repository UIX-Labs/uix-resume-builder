'use client';

import type { ResumeReviewItemDto } from '@/features/expert-review/api/review-stats';
import { StatusChip } from '@/features/expert-review/ui/status-chip';

interface ExpertReviewTableRowProps {
  review: ResumeReviewItemDto;
  onEdit?: (review: ResumeReviewItemDto) => void;
  onDownload?: (review: ResumeReviewItemDto) => void;
}

// const ICON_BUTTON_CLASS = 'p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors';

export function ExpertReviewTableRow({ review, onEdit, onDownload }: ExpertReviewTableRowProps) {
  return (
    <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
      <td className="px-4 sm:px-6 py-3 font-medium text-neutral-900 truncate max-w-[200px]">{review.name}</td>
      <td className="px-4 sm:px-6 py-3">
        <StatusChip status={review.status} />
      </td>
      <td className="px-4 sm:px-6 py-3 text-[#959DA8] hidden md:table-cell truncate max-w-[150px]">
        {review.reviewer || '—'}
      </td>
      <td className="px-4 sm:px-6 py-3 text-[#959DA8] hidden sm:table-cell">{review.submitted}</td>
      <td className="px-4 sm:px-6 py-3 text-[#959DA8] hidden lg:table-cell">{review.lastModified}</td>
      {/* <td className="px-4 sm:px-6 py-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit?.(review)}
            className={cn(ICON_BUTTON_CLASS)}
            aria-label="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onDownload?.(review)}
            className={cn(ICON_BUTTON_CLASS)}
            aria-label="Download"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </td> */}
    </tr>
  );
}
