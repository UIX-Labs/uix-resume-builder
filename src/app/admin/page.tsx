'use client';

import { StatCard } from '@/features/admin/components/stat-card';
import { useOverviewStats } from '@/features/admin/hooks/use-admin-queries';

export default function AdminOverviewPage() {
  const { data: stats, isLoading } = useOverviewStats();

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-20 mb-3" />
              <div className="h-8 bg-gray-200 rounded w-16 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard label="Total Users" total={stats.users.total} daily={stats.users.daily} weekly={stats.users.weekly} />
        <StatCard
          label="Downloads"
          total={stats.downloads.total}
          daily={stats.downloads.daily}
          weekly={stats.downloads.weekly}
        />
        <StatCard
          label="Reviews"
          total={stats.reviews.total}
          daily={stats.reviews.daily}
          weekly={stats.reviews.weekly}
        />
        <StatCard
          label="Feedbacks"
          total={stats.feedbacks.total}
          daily={stats.feedbacks.daily}
          weekly={stats.feedbacks.weekly}
        />
        <StatCard label="Roasts" total={stats.roasts.total} daily={stats.roasts.daily} weekly={stats.roasts.weekly} />
      </div>

      {/* Review breakdown */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-gray-500">Pending Reviews</div>
          <div className="text-2xl font-bold text-orange-600 mt-1">{stats.reviews.pending}</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-gray-500">Completed Reviews</div>
          <div className="text-2xl font-bold text-green-600 mt-1">{stats.reviews.completed}</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-gray-500">Review Completion Rate</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">
            {stats.reviews.total > 0 ? `${Math.round((stats.reviews.completed / stats.reviews.total) * 100)}%` : '—'}
          </div>
        </div>
      </div>
    </div>
  );
}
