'use client';

import { RESUME_EXAMPLE_CATEGORIES } from '@/data/resume-example-categories';
import { cn } from '@shared/lib/cn';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function CategoryTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const activeSlug = pathname.replace('/resume-examples/', '').replace('/resume-examples', '');

  const handleCategoryClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    startTransition(() => {
      router.push(href, { scroll: false });
    });
  };

  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
        Browse by Category
        {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />}
      </h2>
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 pb-2 min-w-max">
          <Link
            href="/resume-examples"
            onClick={(e) => handleCategoryClick(e, '/resume-examples')}
            prefetch
            className={cn(
              'inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer',
              !activeSlug || activeSlug === ''
                ? 'bg-[rgb(0,95,242)] hover:bg-[rgb(0,81,213)] text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-800',
            )}
          >
            All Examples
          </Link>
          {RESUME_EXAMPLE_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/resume-examples/${cat.slug}`}
              onClick={(e) => handleCategoryClick(e, `/resume-examples/${cat.slug}`)}
              prefetch
              className={cn(
                'inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer',
                activeSlug === cat.slug
                  ? 'bg-[rgb(0,95,242)] hover:bg-[rgb(0,81,213)] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-800',
            )}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
