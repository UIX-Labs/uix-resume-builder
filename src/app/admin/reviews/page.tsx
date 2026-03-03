'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable, type Column } from '@/features/admin/components/data-table';
import { FilterBar } from '@/features/admin/components/filter-bar';
import { CopyButton } from '@/features/admin/components/copy-button';
import { useReviews } from '@/features/admin/hooks/use-admin-queries';
import type { AdminQueryParams, ReviewRow } from '@/features/admin/types/admin.types';
import { fromNow } from '@/features/admin/lib/format-date';

export default function AdminReviewsPage() {
  const [params, setParams] = useState<AdminQueryParams>({ page: 1, limit: 20, sortOrder: 'DESC' });
  const { data, isLoading } = useReviews(params);
  const router = useRouter();

  const handleFilterChange = (newParams: Partial<AdminQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  const columns: Column<ReviewRow>[] = [
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
    { key: 'title', label: 'Resume Title' },
    {
      key: 'isReviewDone',
      label: 'Status',
      render: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
            row.isReviewDone ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
          }`}
        >
          {row.isReviewDone ? 'Completed' : 'Pending'}
        </span>
      ),
    },
    {
      key: 'reviewer',
      label: 'Reviewer',
      render: (row) => <span className="text-sm text-gray-700 font-medium">{row.reviewer || '—'}</span>,
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: (row) => fromNow(row.createdAt),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <button
          type="button"
          onClick={() => router.push(`/admin/reviews/${row.resumeId}`)}
          className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Review
        </button>
      ),
    },
  ];

  const pending = data?.data?.filter((r) => !r.isReviewDone).length || 0;
  const completed = data?.data?.filter((r) => r.isReviewDone).length || 0;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume Reviews</h2>
      <div className="flex gap-4 text-sm text-gray-500 mb-6">
        <span>
          Total: <span className="font-semibold text-gray-900">{data?.total || 0}</span>
        </span>
        <span>
          Pending: <span className="font-semibold text-orange-600">{pending}</span>
        </span>
        <span>
          Completed: <span className="font-semibold text-green-600">{completed}</span>
        </span>
      </div>

      <FilterBar onFilterChange={handleFilterChange} showStatusFilter />

      <DataTable
        columns={columns}
        data={data?.data || []}
        total={data?.total || 0}
        page={params.page}
        limit={params.limit}
        isLoading={isLoading}
        onPageChange={(page) => setParams((p) => ({ ...p, page }))}
        onSort={(sortBy, sortOrder) => setParams((p) => ({ ...p, sortBy, sortOrder }))}
        emptyMessage="No review requests yet"
      />
    </div>
  );
}
