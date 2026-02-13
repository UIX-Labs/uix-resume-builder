'use client';

import { cn } from '@shared/lib/utils';
import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');
  const [readProgress, setReadProgress] = useState(0);

  /* ---- Active section detection ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      },
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  /* ---- Reading progress bar ---- */
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      setReadProgress(max > 0 ? Math.min(top / max, 1) : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="rounded-xl border-2 border-white bg-[url('/images/blog/hero-section/Dot-bg.png')] p-5 shadow-sm">
      {/* mobile view*/}
      <div className="mb-4 flex flex-row justify-between">
        <h3 className="text-lg font-semibold text-gray-900">In this Article</h3>

        <p className="block lg:hidden text-lg text-gray-500">Keep It Clear and Easy to Scan</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 h-[3px] w-full rounded-full bg-gray-200 overflow-hidden">
        <div className="h-full bg-[#22C55E] transition-all duration-300" style={{ width: `${readProgress * 100}%` }} />
      </div>

      {/* Links */}
      <ul className="hidden lg:block space-y-2">
        {/* Title */}
        {/* <h3 className="text-sm font-semibold text-gray-900 mb-4">In this Article</h3> */}
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              type="button"
              onClick={(e) => {
                const el = document.getElementById(heading.id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className={cn(
                'block text-lg transition-colors text-left mt-4',
                heading.level === 3 && 'pl-3',
                heading.level === 4 && 'pl-6',
                activeId === heading.id ? 'text-black font-medium' : 'text-gray-400 hover:text-gray-700',
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
