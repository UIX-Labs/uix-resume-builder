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

  const activeHeadingText = headings.find(h => h.id === activeId)?.text || headings[0]?.text;

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
        rootMargin: '-100px 0px -70% 0px',
        threshold: 0,
      },
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

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
    <nav className="relative top-0 lg:static w-full rounded-xl border-2 border-white bg-[url('/images/blog/hero-section/Dot-bg.png')] p-4 lg:p-5 bg-gray-100">
      
      <div className="mb-2 lg:mb-4 flex flex-row justify-between items-center gap-4">
        <h3 className="text-sm lg:text-lg font-semibold text-gray-900 shrink-0">In this Article</h3>

        <p className="block lg:hidden text-sm lg:text-base text-black font-medium truncate italic max-w-[200px]">
          {activeHeadingText}
        </p>
      </div>

      <div className="mb-2 lg:mb-4 h-[3px] w-full rounded-full bg-gray-200 overflow-hidden">
        <div 
          className="h-full bg-[#22C55E] transition-all duration-300" 
          style={{ width: `${readProgress * 100}%` }} 
        />
      </div>

      <ul className="hidden lg:block space-y-2 max-h-[70vh] overflow-y-auto scrollbar-hide">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById(heading.id);
                if (el) {
                  const offset = 120; // Increased offset for sticky header
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = el.getBoundingClientRect().top;
                  const elementPosition = elementRect - bodyRect;
                  const offsetPosition = elementPosition - offset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className={cn(
                'block text-base lg:text-lg transition-colors text-left mt-2 lg:mt-4',
                heading.level === 3 && 'pl-3',
                heading.level === 4 && 'pl-6',
                activeId === heading.id ? 'text-black font-semibold' : 'text-gray-400 hover:text-gray-700',
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
