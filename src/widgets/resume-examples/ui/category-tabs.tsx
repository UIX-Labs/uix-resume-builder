'use client';

import { RESUME_EXAMPLE_CATEGORIES } from '@/data/resume-example-categories';
import { cn } from '@shared/lib/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function CategoryTabs() {
  const pathname = usePathname();
  const activeSlug = pathname.replace('/resume-examples/', '').replace('/resume-examples', '');

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 pb-2 min-w-max">
        <Link
          href="/resume-examples"
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
            !activeSlug || activeSlug === ''
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          )}
        >
          All Examples
        </Link>
        {RESUME_EXAMPLE_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/resume-examples/${cat.slug}`}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
              activeSlug === cat.slug
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            )}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
