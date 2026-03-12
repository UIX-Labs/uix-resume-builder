'use client';

import { useState } from 'react';
import type { AdminQueryParams } from '../types/admin.types';

interface FilterBarProps {
  onFilterChange: (params: Partial<AdminQueryParams>) => void;
  showStatusFilter?: boolean;
  statusOptions?: { label: string; value: string }[];
  showRatingFilter?: boolean;
  showInternalFilter?: boolean;
  placeholder?: string;
}

export function FilterBar({
  onFilterChange,
  showStatusFilter,
  statusOptions = [
    { label: 'All', value: '' },
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' },
  ],
  showRatingFilter,
  showInternalFilter,
  placeholder = 'Search by email...',
}: FilterBarProps) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showInternal, setShowInternal] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ search: value || undefined, page: 1 });
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onFilterChange({ status: value || undefined, page: 1 });
  };

  return (
    <div className="flex flex-wrap gap-3 items-center mb-4">
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {showStatusFilter && (
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      <input
        type="date"
        value={dateFrom}
        onChange={(e) => {
          setDateFrom(e.target.value);
          onFilterChange({ dateFrom: e.target.value || undefined, page: 1 });
        }}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="From"
      />
      <input
        type="date"
        value={dateTo}
        onChange={(e) => {
          setDateTo(e.target.value);
          onFilterChange({ dateTo: e.target.value || undefined, page: 1 });
        }}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="To"
      />

      {showRatingFilter && (
        <select
          onChange={(e) => {
            const val = e.target.value;
            if (val === '') {
              onFilterChange({ ratingMin: undefined, ratingMax: undefined, page: 1 });
            } else {
              const num = parseInt(val, 10);
              onFilterChange({ ratingMin: num, ratingMax: num, page: 1 });
            }
          }}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Ratings</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Star{r !== 1 ? 's' : ''}
            </option>
          ))}
        </select>
      )}

      {showInternalFilter && (
        <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-gray-600 ml-auto select-none">
          <input
            type="checkbox"
            checked={showInternal}
            onChange={(e) => {
              setShowInternal(e.target.checked);
              onFilterChange({ excludeInternal: !e.target.checked, page: 1 });
            }}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
          />
          Show internal accounts
        </label>
      )}
    </div>
  );
}
