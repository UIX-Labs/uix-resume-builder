'use client';

import { useRouter } from 'next/navigation';
import type { ResumeReviewItemDto } from '@/features/expert-review/api/review-stats';
import { StatusChip } from '@/features/expert-review/ui/status-chip';
import { formatDateShort } from '@shared/lib/date-time';

interface ExpertReviewTableRowProps {
  review: ResumeReviewItemDto;
}

export function ExpertReviewTableRow({ review }: ExpertReviewTableRowProps) {
  const router = useRouter();
  const isReviewDone = review.status === 'Review Done';

  const handleViewSuggestions = () => {
    // Use the same pattern as the roast fix-and-download flow:
    // store resume ID in localStorage so the resume page auto-triggers the analyzer
    localStorage.setItem('pending_analyzer_resume_id', review.resumeId);
    router.push(`/resume/${review.resumeId}`);
  };

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
      <td className="px-4 sm:px-6 py-3 text-[#959DA8] hidden lg:table-cell">{formatDateShort(review.lastModified)}</td>
      <td className="px-4 sm:px-6 py-3">
        {isReviewDone && (
          <button
            type="button"
            onClick={handleViewSuggestions}
            className="px-3 py-1.5 bg-[#005FF2] text-white text-xs font-semibold rounded-lg hover:bg-[#004dc7] transition-colors whitespace-nowrap"
          >
            View Suggestions
          </button>
        )}
      </td>
    </tr>
  );
}
