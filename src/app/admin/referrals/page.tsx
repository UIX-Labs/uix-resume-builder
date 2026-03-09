'use client';

import { useState } from 'react';
import { DataTable, type Column } from '@/features/admin/components/data-table';
import { FilterBar } from '@/features/admin/components/filter-bar';
import { CopyButton } from '@/features/admin/components/copy-button';
import { useReferrals } from '@/features/admin/hooks/use-admin-queries';
import type { AdminQueryParams, ReferralRow } from '@/features/admin/types/admin.types';
import { fromNow } from '@/features/admin/lib/format-date';

export default function AdminReferralsPage() {
  const [params, setParams] = useState<AdminQueryParams>({
    page: 1,
    limit: 20,
    sortBy: 'referredAt',
    sortOrder: 'DESC',
  });
  const { data, isLoading } = useReferrals(params);

  const handleFilterChange = (newParams: Partial<AdminQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams, page: 1 }));
  };

  const columns: Column<ReferralRow>[] = [
    {
      key: 'referrer',
      label: 'Referrer',
      render: (row) => (
        <div>
          <div className="text-sm text-gray-900">
            {`${row.referrerFirstName || ''} ${row.referrerLastName || ''}`.trim() || '—'}
          </div>
          <CopyButton text={row.referrerEmail} />
        </div>
      ),
    },
    {
      key: 'referred',
      label: 'Referred User',
      render: (row) => (
        <div>
          <div className="text-sm text-gray-900">
            {`${row.referredFirstName || ''} ${row.referredLastName || ''}`.trim() || '—'}
          </div>
          <CopyButton text={row.referredEmail} />
        </div>
      ),
    },
    {
      key: 'referredAt',
      label: 'Date',
      sortable: true,
      render: (row) => (
        <div>
          <div className="text-sm text-gray-900">
            {new Date(row.referredAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
          <div className="text-xs text-gray-500">{fromNow(row.referredAt)}</div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: () => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Completed
        </span>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Referrals</h2>
      <p className="text-sm text-gray-500 mb-6">User referral tracking</p>

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
        emptyMessage="No referrals yet"
      />
    </div>
  );
}
