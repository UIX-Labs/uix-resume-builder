'use client';

import { useState } from 'react';
import { DataTable, type Column } from '@/features/admin/components/data-table';
import { FilterBar } from '@/features/admin/components/filter-bar';
import { CopyButton } from '@/features/admin/components/copy-button';
import { useRoasts } from '@/features/admin/hooks/use-admin-queries';
import type { AdminQueryParams, RoastRow } from '@/features/admin/types/admin.types';

export default function AdminRoastsPage() {
  const [params, setParams] = useState<AdminQueryParams>({ page: 1, limit: 20, sortOrder: 'DESC' });
  const { data, isLoading } = useRoasts(params);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleFilterChange = (newParams: Partial<AdminQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  const columns: Column<RoastRow>[] = [
    {
      key: 'email',
      label: 'Email',
      render: (row) => (row.email ? <CopyButton text={row.email} /> : <span className="text-gray-400">Guest</span>),
    },
    {
      key: 'name',
      label: 'Name',
      render: (row) => `${row.firstName || ''} ${row.lastName || ''}`.trim() || '—',
    },
    { key: 'title', label: 'Resume Title' },
    {
      key: 'roastOutput',
      label: 'Roast Output',
      render: (row) => (
        <div>
          <div className="text-xs text-gray-600 max-w-xs">
            {row.roastOutput
              ? expandedRow === row.resumeId
                ? row.roastOutput
                : `${row.roastOutput.slice(0, 100)}...`
              : '—'}
          </div>
          {row.roastOutput && row.roastOutput.length > 100 && (
            <button
              onClick={() => setExpandedRow(expandedRow === row.resumeId ? null : row.resumeId)}
              className="text-xs text-blue-600 hover:text-blue-800 mt-1"
            >
              {expandedRow === row.resumeId ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
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
