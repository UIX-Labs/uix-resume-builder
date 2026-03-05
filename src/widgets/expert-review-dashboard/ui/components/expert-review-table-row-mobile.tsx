'use client';

import type { ResumeReviewItemDto } from '@/features/expert-review/api/review-stats';
import { getReviewerLinkedInUrl } from '@/features/expert-review/lib/reviewer-linkedin';
import { StatusChip } from '@/features/expert-review/ui/status-chip';
import { LinkedInIcon } from '@shared/icons';

interface ExpertReviewTableRowMobileProps {
  review: ResumeReviewItemDto;
}

export function ExpertReviewTableRowMobile({ review }: ExpertReviewTableRowMobileProps) {
  const linkedInUrl = review.reviewer ? getReviewerLinkedInUrl(review.reviewer) : null;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-4 transition-colors duration-150 hover:bg-gray-50/50 hover:border-gray-200">
      <div className="flex items-start justify-between gap-2">
        <StatusChip status={review.status} />
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
        ) : null}
      </div>

      <h3 className="text-base font-semibold text-neutral-900 truncate">{review.name}</h3>

      <div className="text-xs text-[#959DA8] space-y-0.5">
        <p>Submitted: {review.submitted}</p>
        <p>Last Modified: {review.lastModified || 'N/A'}</p>
      </div>
    </div>
  );
}
