'use client';

import { useState } from 'react';
import { DataTable, type Column } from '@/features/admin/components/data-table';
import { FilterBar } from '@/features/admin/components/filter-bar';
import { CopyButton } from '@/features/admin/components/copy-button';
import { useRoasts } from '@/features/admin/hooks/use-admin-queries';
import type { AdminQueryParams, RoastRow } from '@/features/admin/types/admin.types';
import { fromNow } from '@/features/admin/lib/format-date';

function ActionBadges({ actions }: { actions: RoastRow['actions'] }) {
  const items = [
    { label: 'Share', count: actions.share, color: 'bg-blue-100 text-blue-700' },
    { label: 'Download', count: actions.download, color: 'bg-green-100 text-green-700' },
    { label: 'Fix', count: actions.fix_and_download, color: 'bg-purple-100 text-purple-700' },
    { label: 'Create', count: actions.create_resume, color: 'bg-amber-100 text-amber-700' },
    { label: 'Again', count: actions.roast_another, color: 'bg-gray-100 text-gray-700' },
  ];

  const hasAny = items.some((i) => i.count > 0);
  if (!hasAny) return <span className="text-gray-400 text-xs">No actions</span>;

  return (
    <div className="flex flex-wrap gap-1">
      {items
        .filter((i) => i.count > 0)
        .map((i) => (
          <span
            key={i.label}
            className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium ${i.color}`}
          >
            {i.label}: {i.count}
          </span>
        ))}
    </div>
  );
}

export default function AdminRoastsPage() {
  const [params, setParams] = useState<AdminQueryParams>({ page: 1, limit: 20, sortOrder: 'DESC' });
  const { data, isLoading } = useRoasts(params);
  const [expandedOutput, setExpandedOutput] = useState<string | null>(null);
  const [expandedInput, setExpandedInput] = useState<string | null>(null);

  const handleFilterChange = (newParams: Partial<AdminQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  const columns: Column<RoastRow>[] = [
    {
      key: 'email',
      label: 'Email',
      render: (row) =>
        row.email && !row.isGuest ? <CopyButton text={row.email} /> : <span className="text-gray-400">Guest</span>,
    },
    {
      key: 'isGuest',
      label: 'Type',
      render: (row) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
            row.isGuest ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
          }`}
        >
          {row.isGuest ? 'Guest' : 'Registered'}
        </span>
      ),
    },
    {
      key: 'roastInputMarkdown',
      label: 'Input Resume',
      render: (row) => (
        <div>
          <div className="text-xs text-gray-600 max-w-xs whitespace-pre-wrap">
            {row.roastInputMarkdown
              ? expandedInput === row.resumeId
                ? row.roastInputMarkdown
                : `${row.roastInputMarkdown.slice(0, 100)}...`
              : '—'}
          </div>
          {row.roastInputMarkdown && row.roastInputMarkdown.length > 100 && (
            <button
              type="button"
              onClick={() => setExpandedInput(expandedInput === row.resumeId ? null : row.resumeId)}
              className="text-xs text-blue-600 hover:text-blue-800 mt-1"
            >
              {expandedInput === row.resumeId ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      ),
    },
    {
      key: 'roastOutput',
      label: 'Roast Output',
      render: (row) => (
        <div>
          <div className="text-xs text-gray-600 max-w-xs">
            {row.roastOutput
              ? expandedOutput === row.resumeId
                ? row.roastOutput
                : `${row.roastOutput.slice(0, 100)}...`
              : '—'}
          </div>
          {row.roastOutput && row.roastOutput.length > 100 && (
            <button
              type="button"
              onClick={() => setExpandedOutput(expandedOutput === row.resumeId ? null : row.resumeId)}
              className="text-xs text-blue-600 hover:text-blue-800 mt-1"
            >
              {expandedOutput === row.resumeId ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'User Actions',
      render: (row) => <ActionBadges actions={row.actions} />,
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: (row) => fromNow(row.createdAt),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume Roasts</h2>
      <p className="text-sm text-gray-500 mb-6">
        Total: <span className="font-semibold text-gray-900">{data?.total || 0}</span> resumes roasted
      </p>

      <FilterBar onFilterChange={handleFilterChange} />

      <DataTable
        columns={columns}
        data={data?.data || []}
        total={data?.total || 0}
        page={params.page}
        limit={params.limit}
        isLoading={isLoading}
        onPageChange={(page) => setParams((p) => ({ ...p, page }))}
        onSort={(sortBy, sortOrder) => setParams((p) => ({ ...p, sortBy, sortOrder }))}
        emptyMessage="No roasts yet"
      />
    </div>
  );
}
