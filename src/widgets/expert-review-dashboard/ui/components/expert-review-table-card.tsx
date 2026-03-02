'use client';

import { ExpertReviewTable } from './expert-review-table';
import { ExpertReviewTabs } from './expert-review-tabs';
import type { ResumeReviewItemDto } from '@/features/expert-review/api/review-stats';

interface ExpertReviewTableCardProps {
  reviews: ResumeReviewItemDto[];
  isLoading: boolean;
}

export function ExpertReviewTableCard({ reviews, isLoading }: ExpertReviewTableCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 sm:px-6 pt-4 pb-3">
        <ExpertReviewTabs activeTab="all" />
      </div>
      <ExpertReviewTable reviews={reviews} isLoading={isLoading} />
    </div>
  );
}
