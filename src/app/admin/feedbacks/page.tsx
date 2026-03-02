'use client';

import { useState } from 'react';
import { DataTable, type Column } from '@/features/admin/components/data-table';
import { FilterBar } from '@/features/admin/components/filter-bar';
import { CopyButton } from '@/features/admin/components/copy-button';
import { useFeedbacks } from '@/features/admin/hooks/use-admin-queries';
import type { AdminQueryParams, FeedbackRow } from '@/features/admin/types/admin.types';

function StarRating({ rating }: { rating: number | null }) {
  if (rating === null) return <span className="text-gray-400">—</span>;
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function AdminFeedbacksPage() {
  const [params, setParams] = useState<AdminQueryParams>({ page: 1, limit: 20, sortOrder: 'DESC' });
  const { data, isLoading } = useFeedbacks(params);

  const handleFilterChange = (newParams: Partial<AdminQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  const columns: Column<FeedbackRow>[] = [
    {
      key: 'email',
      label: 'Email',
      render: (row) => <CopyButton text={row.email} />,
    },
    {
      key: 'name',
      label: 'Name',
      render: (row) => `${row.firstName || ''} ${row.lastName || ''}`.trim() || '—',
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      render: (row) => <StarRating rating={row.rating} />,
    },
    {
      key: 'feedback',
      label: 'Feedback',
      render: (row) => (
        <div className="max-w-xs">
          {row.questions?.map((q, i) => (
            <div key={i} className="text-xs text-gray-600">
              {q.answer?.join(', ') || '—'}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: (row) => (row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '—'),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Feedbacks</h2>
      <p className="text-sm text-gray-500 mb-6">
        Total: <span className="font-semibold text-gray-900">{data?.total || 0}</span> users gave feedback
      </p>

      <FilterBar onFilterChange={handleFilterChange} showRatingFilter />

      <DataTable
        columns={columns}
        data={data?.data || []}
        total={data?.total || 0}
        page={params.page}
        limit={params.limit}
        isLoading={isLoading}
        onPageChange={(page) => setParams((p) => ({ ...p, page }))}
        onSort={(sortBy, sortOrder) => setParams((p) => ({ ...p, sortBy, sortOrder }))}
        emptyMessage="No feedbacks yet"
      />
    </div>
  );
}
