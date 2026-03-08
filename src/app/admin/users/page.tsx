'use client';

import { useState } from 'react';
import { DataTable, type Column } from '@/features/admin/components/data-table';
import { FilterBar } from '@/features/admin/components/filter-bar';
import { CopyButton } from '@/features/admin/components/copy-button';
import { useUsers } from '@/features/admin/hooks/use-admin-queries';
import type { AdminQueryParams, UserRow } from '@/features/admin/types/admin.types';
import { fromNow } from '@/features/admin/lib/format-date';

export default function AdminUsersPage() {
  const [params, setParams] = useState<AdminQueryParams>({
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    sortOrder: 'DESC',
    excludeInternal: true,
  });
  const { data, isLoading } = useUsers(params);

  const handleFilterChange = (newParams: Partial<AdminQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams, page: 1 }));
  };

  const columns: Column<UserRow>[] = [
    {
      key: 'name',
      label: 'Name',
      render: (row) => `${row.firstName || ''} ${row.lastName || ''}`.trim() || '—',
    },
    {
      key: 'email',
      label: 'Email',
      render: (row) => <CopyButton text={row.email} />,
    },
    {
      key: 'createdAt',
      label: 'Joined',
      sortable: true,
      render: (row) => fromNow(row.createdAt),
    },
    {
      key: 'updatedAt',
      label: 'Last Active',
      sortable: true,
      render: (row) => fromNow(row.updatedAt),
    },
    {
      key: 'referralCount',
      label: 'Referrals',
      sortable: true,
      render: (row) =>
        row.referralCount > 0 ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {row.referralCount}
          </span>
        ) : (
          <span className="text-gray-400">0</span>
        ),
    },
    {
      key: 'downloads',
      label: 'Downloads',
      sortable: true,
      render: (row) => <span className="font-semibold text-gray-900">{row.downloads}</span>,
    },
    {
      key: 'roastCount',
      label: 'Roasts',
      sortable: true,
      render: (row) => row.roastCount,
    },
    {
      key: 'reviewCount',
      label: 'Reviews',
      sortable: true,
      render: (row) => row.reviewCount,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Users</h2>
      <p className="text-sm text-gray-500 mb-6">All registered users with activity stats</p>

      <FilterBar onFilterChange={handleFilterChange} showInternalFilter />

      <DataTable
        columns={columns}
        data={data?.data || []}
        total={data?.total || 0}
        page={params.page}
        limit={params.limit}
        isLoading={isLoading}
        onPageChange={(page) => setParams((p) => ({ ...p, page }))}
        onSort={(sortBy, sortOrder) => setParams((p) => ({ ...p, sortBy, sortOrder }))}
        emptyMessage="No users found"
      />
    </div>
  );
}
