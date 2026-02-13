import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@shared/lib/utils';

interface DashboardChipProps {
  className?: string;
}

export function DashboardChip({ className }: DashboardChipProps) {
  return (
    <div className={cn('absolute top-3 z-20 left-1/2 -translate-x-1/2', className)}>
      <Link
        href="/dashboard"
        className="bg-[#253130] rounded-xl px-3 py-1 flex items-center gap-1 hover:bg-[#2d3a39] transition-colors cursor-pointer"
      >
        <HomeIcon size={16} className="text-white" />
        <span className="text-white text-[10px] font-semibold leading-[1.2em]">Dashboard</span>
      </Link>
    </div>
  );
}
