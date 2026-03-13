'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DataTable, type Column } from '@/features/admin/components/data-table';
import { FilterBar } from '@/features/admin/components/filter-bar';
import {
  useResumeExamples,
  useDeleteResumeExample,
  useToggleResumeExamplePublish,
} from '@/features/admin/hooks/use-admin-queries';
import type { AdminQueryParams, AdminResumeExample } from '@/features/admin/types/admin.types';

export default function AdminResumeExamplesPage() {
  const router = useRouter();
  const [params, setParams] = useState<AdminQueryParams>({ page: 1, limit: 20, sortOrder: 'ASC' });
  const { data, isLoading } = useResumeExamples(params);
  const deleteMutation = useDeleteResumeExample();
  const togglePublishMutation = useToggleResumeExamplePublish();

  const handleFilterChange = (newParams: Partial<AdminQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this resume example?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const columns: Column<AdminResumeExample>[] = [
    {
      key: 'thumbnail',
      label: 'Preview',
      render: (row) => (
        <div className="w-12 h-16 rounded border border-gray-200 overflow-hidden bg-gray-100">
          {row.publicThumbnail?.url ? (
            // biome-ignore lint/performance/noImgElement: dynamic image source
            <img src={row.publicThumbnail.url} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">N/A</div>
          )}
        </div>
      ),
    },
    {
      key: 'title',
      label: 'Title',
      render: (row) => (
        <div>
          <div className="font-medium text-sm">{row.title}</div>
          <div className="text-xs text-gray-500 font-mono">{row.slug}</div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (row) => <span className="text-xs text-gray-600">{row.categoryName || '—'}</span>,
    },
    {
      key: 'role',
      label: 'Role',
      render: (row) => <span className="text-xs text-gray-600">{row.role || '—'}</span>,
    },
    {
      key: 'layout',
      label: 'Layout',
      render: (row) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
          {row.layout}
        </span>
      ),
    },
    { key: 'rank', label: 'Rank', sortable: true },
    {
      key: 'isPublished',
      label: 'Status',
      render: (row) => (
        <button
          type="button"
          onClick={() => togglePublishMutation.mutate(row.id)}
          disabled={togglePublishMutation.isPending}
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
            row.isPublished
              ? 'bg-green-50 text-green-700 hover:bg-green-100'
              : 'bg-red-50 text-red-700 hover:bg-red-100'
          }`}
        >
          {row.isPublished ? 'Published' : 'Draft'}
        </button>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.push(`/admin/resume-examples/edit/${row.id}`)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => handleDelete(row.id)}
            className="text-xs text-red-600 hover:text-red-800 font-medium"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resume Examples</h2>
          <p className="text-sm text-gray-500 mt-1">
            Total: <span className="font-semibold text-gray-900">{data?.total || 0}</span> examples
            {' · '}
            <Link href="/admin/resume-examples/categories" className="text-blue-600 hover:text-blue-800 font-medium">
              Manage Categories
            </Link>
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push('/admin/resume-examples/create')}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create New Example
        </button>
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
        emptyMessage="No resume examples found"
      />
    </div>
  );
}
