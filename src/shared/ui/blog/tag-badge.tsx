'use client';

import { cn } from '@shared/lib/utils';

interface TagBadgeProps {
  tag: string;
  isActive?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

const TAG_COLORS: Record<string, string> = {
  'Resume Tips': 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
  'Career Advice': 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
  'AI Tools': 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100',
  'Job Search': 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
  ATS: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
  Interview: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100',
  'Career Change': 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
  Keywords: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
  'Professional Development': 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
  Formatting: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100',
};

const DEFAULT_COLOR = 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';

export function TagBadge({ tag, isActive, onClick, size = 'sm' }: TagBadgeProps) {
  const colorClass = TAG_COLORS[tag] || DEFAULT_COLOR;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full border font-medium transition-all duration-200',
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3.5 py-1.5 text-sm',
        colorClass,
        isActive && 'ring-2 ring-offset-1 ring-current shadow-sm',
        onClick ? 'cursor-pointer' : 'cursor-default',
      )}
    >
      {tag}
    </button>
  );
}
