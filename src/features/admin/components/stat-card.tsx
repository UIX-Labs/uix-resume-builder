'use client';

interface StatCardProps {
  label: string;
  total: number;
  daily: number;
  weekly?: number;
  icon?: React.ReactNode;
}

export function StatCard({ label, total, daily, weekly, icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        {icon && <span className="text-gray-400">{icon}</span>}
      </div>
      <div className="text-3xl font-bold text-gray-900">{total.toLocaleString()}</div>
      <div className="mt-2 flex items-center gap-3">
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
            daily > 0 ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'
          }`}
        >
          {daily > 0 ? `+${daily}` : daily} today
        </span>
        {weekly !== undefined && <span className="text-xs text-gray-400">{weekly} this week</span>}
      </div>
    </div>
  );
}
