'use client';

import type { ResumeReviewItemDto } from '@/features/expert-review/api/review-stats';
import { getReviewerLinkedInUrl } from '@/features/expert-review/lib/reviewer-linkedin';
import { StatusChip } from '@/features/expert-review/ui/status-chip';
import { LinkedInIcon } from '@shared/icons';

interface ExpertReviewTableRowProps {
  review: ResumeReviewItemDto;
}

export function ExpertReviewTableRow({ review }: ExpertReviewTableRowProps) {
  const linkedInUrl = review.reviewer ? getReviewerLinkedInUrl(review.reviewer) : null;

  return (
    <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-100/80 transition-colors duration-150">
      <td className="px-4 sm:px-6 py-3 font-medium text-neutral-900 truncate max-w-[200px]">{review.name}</td>
      <td className="px-4 sm:px-6 py-3">
        <StatusChip status={review.status} />
      </td>
      <td className="px-4 sm:px-6 py-3 hidden md:table-cell truncate max-w-[150px]">
        {review.reviewer ? (
          linkedInUrl ? (
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-neutral-900 text-xs font-medium hover:bg-gray-200 transition-colors"
            >
              {review.reviewer}
              <LinkedInIcon width={14} height={14} color="#0A66C2" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-neutral-900 text-xs font-medium">
              {review.reviewer}
              <LinkedInIcon width={14} height={14} color="#0A66C2" />
            </span>
          )
        ) : (
          <span className="text-[#959DA8]">—</span>
        )}
      </td>
      <td className="px-4 sm:px-6 py-3 text-[#959DA8] hidden sm:table-cell">{review.submitted}</td>
      <td className="px-4 sm:px-6 py-3 text-[#959DA8] hidden lg:table-cell">{review.lastModified}</td>
      <td className="px-4 sm:px-6 py-3" />
    </tr>
  );
}
