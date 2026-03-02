'use client';

import { List } from 'lucide-react';
import { cn } from '@shared/lib/utils';

interface ExpertReviewTabsProps {
  activeTab?: 'all';
}

export function ExpertReviewTabs({ activeTab = 'all' }: ExpertReviewTabsProps) {
  return (
    <div className="border-b border-gray-200 mb-0">
      <button
        type="button"
        className={cn(
          'flex items-center gap-2 px-0 pb-3 text-sm font-medium transition-colors',
          activeTab === 'all'
            ? 'text-expert-primary border-b-2 border-expert-primary'
            : 'text-[#959DA8] border-b-2 border-transparent hover:text-neutral-700',
        )}
      >
        <List className="w-4 h-4" />
        All resumes
      </button>
    </div>
  );
}
