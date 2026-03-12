'use client';

import { ExpertReviewTable } from './expert-review-table';
import { ExpertReviewTableRowMobile } from './expert-review-table-row-mobile';
import { ExpertReviewTabs } from './expert-review-tabs';
import { ExpertReviewEmptyState } from './expert-review-empty-state';
import type { ResumeReviewItemDto } from '@/features/expert-review/api/review-stats';

interface ExpertReviewTableCardProps {
  reviews: ResumeReviewItemDto[];
  isLoading: boolean;
}

export function ExpertReviewTableCard({ reviews, isLoading }: ExpertReviewTableCardProps) {
  const hasReviews = reviews.length > 0;
  const showEmptyState = isLoading || !hasReviews;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 sm:px-6 pt-4 pb-3">
        <ExpertReviewTabs activeTab="all" />
      </div>

      {/* Mobile: card list */}
      <div className="px-4 pb-4 md:hidden">
        {showEmptyState ? (
          <ExpertReviewEmptyState isLoading={isLoading} colSpan={1} isMobile />
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((review, index) => (
              <ExpertReviewTableRowMobile key={`${review.name}-${review.submitted}-${index}`} review={review} />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block">
        <ExpertReviewTable reviews={reviews} isLoading={isLoading} />
      </div>
    </div>
  );
}
