'use client';

import type { ResumeReviewItemDto } from '@/features/expert-review/api/review-stats';
import { ExpertReviewEmptyState } from './expert-review-empty-state';
import { ExpertReviewTableRow } from './expert-review-table-row';

interface ExpertReviewTableProps {
  reviews: ResumeReviewItemDto[];
  isLoading: boolean;
}

const TABLE_COLUMNS = [
  { key: 'name', label: 'Name', className: '' },
  { key: 'status', label: 'Status', className: '' },
  { key: 'reviewer', label: 'Reviewer', className: 'hidden md:table-cell' },
  { key: 'submitted', label: 'Submitted', className: 'hidden sm:table-cell' },
  { key: 'lastModified', label: 'Last Modified', className: 'hidden lg:table-cell' },
  { key: 'actions', label: '', className: '' },
] as const;

function TableHeader() {
  return (
    <thead>
      <tr className="border-b border-gray-100 bg-gray-50/50">
        {TABLE_COLUMNS.map((col) => (
          <th key={col.key} className={`px-4 sm:px-6 py-3 text-left font-medium text-neutral-700 ${col.className}`}>
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export function ExpertReviewTable({ reviews, isLoading }: ExpertReviewTableProps) {
  const hasReviews = reviews.length > 0;
  const showEmptyState = isLoading || !hasReviews;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <TableHeader />
        <tbody>
          {showEmptyState ? (
            <ExpertReviewEmptyState isLoading={isLoading} colSpan={TABLE_COLUMNS.length} />
          ) : (
            reviews.map((review, index) => (
              <ExpertReviewTableRow key={`${review.name}-${review.submitted}-${index}`} review={review} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
