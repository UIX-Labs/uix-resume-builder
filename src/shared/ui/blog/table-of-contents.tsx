// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { cn } from '@shared/lib/utils';

// /* ------------------------------------------------------------------ */
// /*  Types                                                              */
// /* ------------------------------------------------------------------ */
// interface TOCItem {
//   id: string;
//   text: string;
//   level: number;
// }

// interface TableOfContentsProps {
//   headings: TOCItem[];
// }

// interface CurvePoint {
//   id: string;
//   x: number;
//   y: number;
// }

// /* ------------------------------------------------------------------ */
// /*  SVG constants                                                      */
// /* ------------------------------------------------------------------ */
// const SVG_W = 22;
// const DOT_R = 2.5;
// const ACTIVE_DOT_R = 4;

// /* ------------------------------------------------------------------ */
// /*  Compute x offset for each heading — deeper levels curve further    */
// /* ------------------------------------------------------------------ */
// function xForLevel(level: number, index: number): number {
//   const base = level === 2 ? 7 : level === 3 ? 12 : 16;
//   const nudge = index % 2 === 0 ? -1.5 : 1.5;
//   return base + nudge;
// }

// /* ------------------------------------------------------------------ */
// /*  Generate a smooth cubic-bezier SVG path through points             */
// /* ------------------------------------------------------------------ */
// function smoothCurvePath(pts: { x: number; y: number }[]): string {
//   if (pts.length < 2) return '';
//   let d = `M ${pts[0].x} ${pts[0].y}`;
//   for (let i = 0; i < pts.length - 1; i++) {
//     const p0 = pts[i];
//     const p1 = pts[i + 1];
//     const midY = (p0.y + p1.y) / 2;
//     d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
//   }
//   return d;
// }

// /* ------------------------------------------------------------------ */
// /*  Sample a rendered <path> to find arc-length at each point          */
// /* ------------------------------------------------------------------ */
// function computeSegments(
//   pathEl: SVGPathElement,
//   points: CurvePoint[],
// ): {
//   totalLen: number;
//   segments: Map<string, { start: number; end: number; at: number }>;
// } {
//   const totalLen = pathEl.getTotalLength();
//   const SAMPLES = 600;
//   const step = totalLen / SAMPLES;

//   // Find arc-length closest to each point
//   const lengthAt = new Map<string, number>();
//   for (const pt of points) {
//     let bestLen = 0;
//     let bestDist = Number.POSITIVE_INFINITY;
//     for (let l = 0; l <= totalLen; l += step) {
//       const p = pathEl.getPointAtLength(l);
//       const dist = Math.hypot(p.x - pt.x, p.y - pt.y);
//       if (dist < bestDist) {
//         bestDist = dist;
//         bestLen = l;
//       }
//     }
//     lengthAt.set(pt.id, bestLen);
//   }

//   // Each segment spans halfway to its neighbours
//   const segments = new Map<string, { start: number; end: number; at: number }>();
//   for (let i = 0; i < points.length; i++) {
//     const cur = lengthAt.get(points[i].id) ?? 0;
//     const prev = i > 0 ? (lengthAt.get(points[i - 1].id) ?? 0) : 0;
//     const next = i < points.length - 1 ? (lengthAt.get(points[i + 1].id) ?? totalLen) : totalLen;
//     segments.set(points[i].id, {
//       start: (prev + cur) / 2,
//       end: (cur + next) / 2,
//       at: cur,
//     });
//   }

//   return { totalLen, segments };
// }

// /* ------------------------------------------------------------------ */
// /*  ProgressRing — animated reading-progress in header                 */
// /* ------------------------------------------------------------------ */
// function ProgressRing({ progress }: { progress: number }) {
//   const r = 9;
//   const c = 2 * Math.PI * r;

//   return (
//     <svg width="24" height="24" viewBox="0 0 24 24" className="shrink-0" aria-label="Reading progress">
//       <title>Reading progress</title>
//       <circle cx="12" cy="12" r={r} fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-200" />
//       <motion.circle
//         cx="12"
//         cy="12"
//         r={r}
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2.5"
//         strokeLinecap="round"
//         className="text-blue-600"
//         strokeDasharray={c}
//         style={{ rotate: '-90deg', transformOrigin: 'center' }}
//         initial={false}
//         animate={{ strokeDashoffset: c - progress * c }}
//         transition={{ duration: 0.3, ease: 'easeOut' }}
//       />
//       <motion.circle
//         cx="12"
//         cy="12"
//         r="2.5"
//         fill="currentColor"
//         className="text-blue-600"
//         initial={{ scale: 0 }}
//         animate={{ scale: progress > 0 ? 1 : 0 }}
//         transition={{ type: 'spring', stiffness: 400, damping: 20 }}
//       />
//     </svg>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  CurvePath — the animated SVG curve + dots + active highlight       */
// /* ------------------------------------------------------------------ */
// function CurvePath({ points, activeId }: { points: CurvePoint[]; activeId: string }) {
//   const bgRef = useRef<SVGPathElement>(null);
//   const [totalLen, setTotalLen] = useState(0);
//   const [segments, setSegments] = useState<Map<string, { start: number; end: number; at: number }>>(new Map());

//   const pathD = smoothCurvePath(points);
//   const svgH = points.length > 0 ? Math.max(...points.map((p) => p.y)) + 12 : 0;

//   // Measure path segments after the <path> renders
//   useEffect(() => {
//     if (!bgRef.current || points.length < 2) return;
//     const result = computeSegments(bgRef.current, points);
//     setTotalLen(result.totalLen);
//     setSegments(result.segments);
//   }, [pathD, points]);

//   if (points.length < 2 || !pathD) return null;

//   const activeSeg = segments.get(activeId);
//   const activePoint = points.find((p) => p.id === activeId);
//   const segLen = activeSeg ? activeSeg.end - activeSeg.start : 0;

//   return (
//     <svg
//       width={SVG_W}
//       height={svgH}
//       className="absolute left-0 top-0 pointer-events-none"
//       style={{ overflow: 'visible' }}
//       aria-hidden="true"
//     >
//       {/* Background curve — thin, faint */}
//       <path ref={bgRef} d={pathD} fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="1.5" strokeLinecap="round" />

//       {/* Active segment highlight — same curve, dashed to only show segment */}
//       {activeSeg && totalLen > 0 && (
//         <motion.path
//           d={pathD}
//           fill="none"
//           stroke="rgb(37, 99, 235)"
//           strokeWidth="2.5"
//           strokeLinecap="round"
//           strokeDasharray={`${segLen} ${totalLen}`}
//           initial={false}
//           animate={{ strokeDashoffset: -activeSeg.start }}
//           transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//         />
//       )}

//       {/* Dot at every heading — grows when active */}
//       {points.map((pt) => {
//         const isActive = pt.id === activeId;
//         return (
//           <motion.circle
//             key={pt.id}
//             cx={pt.x}
//             cy={pt.y}
//             initial={false}
//             animate={{
//               r: isActive ? ACTIVE_DOT_R : DOT_R,
//               fill: isActive ? 'rgb(37, 99, 235)' : 'rgba(0,0,0,0.14)',
//             }}
//             transition={{ type: 'spring', stiffness: 400, damping: 25 }}
//           />
//         );
//       })}

//       {/* Active-dot pulse ring */}
//       {activePoint && (
//         <motion.circle
//           key={`pulse-${activeId}`}
//           cx={activePoint.x}
//           cy={activePoint.y}
//           fill="none"
//           stroke="rgb(37, 99, 235)"
//           strokeWidth="1.2"
//           initial={{ r: ACTIVE_DOT_R, opacity: 0.6 }}
//           animate={{ r: ACTIVE_DOT_R + 10, opacity: 0 }}
//           transition={{
//             duration: 1.4,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: 'easeOut',
//           }}
//         />
//       )}
//     </svg>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  Main component                                                     */
// /* ------------------------------------------------------------------ */
// export function TableOfContents({ headings }: TableOfContentsProps) {
//   const [activeId, setActiveId] = useState('');
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [readProgress, setReadProgress] = useState(0);
//   const [curvePoints, setCurvePoints] = useState<CurvePoint[]>([]);

//   const scrollRef = useRef<HTMLDivElement>(null);
//   const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
//   const isScrollingRef = useRef(false);
//   const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   /* ---- page-scroll progress -------------------------------------- */
//   useEffect(() => {
//     const onScroll = () => {
//       const top = window.scrollY;
//       const max = document.documentElement.scrollHeight - window.innerHeight;
//       setReadProgress(max > 0 ? Math.min(top / max, 1) : 0);
//     };
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   /* ---- intersection observer for active heading ------------------ */
//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       (entries) => {
//         // Skip observer updates while a click-triggered scroll is in flight
//         if (isScrollingRef.current) return;
//         for (const e of entries) {
//           if (e.isIntersecting) setActiveId(e.target.id);
//         }
//       },
//       { rootMargin: '-80px 0px -80% 0px', threshold: 0 },
//     );
//     for (const h of headings) {
//       const el = document.getElementById(h.id);
//       if (el) obs.observe(el);
//     }
//     return () => obs.disconnect();
//   }, [headings]);

//   /* ---- measure item positions to build curve points -------------- */
//   useEffect(() => {
//     if (!isExpanded) return;

//     const measure = () => {
//       const pts: CurvePoint[] = [];
//       headings.forEach((h, i) => {
//         const el = itemRefs.current.get(h.id);
//         if (!el) return;
//         // offsetTop is relative to the offsetParent (the position:relative wrapper)
//         const y = el.offsetTop + el.offsetHeight / 2;
//         pts.push({ id: h.id, x: xForLevel(h.level, i), y });
//       });
//       setCurvePoints(pts);
//     };

//     // Wait one frame so items are laid out
//     const raf = requestAnimationFrame(measure);

//     // Remeasure on resize
//     const ro = new ResizeObserver(measure);
//     if (scrollRef.current) ro.observe(scrollRef.current);

//     return () => {
//       cancelAnimationFrame(raf);
//       ro.disconnect();
//     };
//   }, [headings, isExpanded]);

//   /* ---- auto-scroll active item into view in sidebar -------------- */
//   useEffect(() => {
//     if (!activeId || !scrollRef.current) return;
//     const li = itemRefs.current.get(activeId);
//     if (!li) return;
//     const container = scrollRef.current;
//     const liRect = li.getBoundingClientRect();
//     const cRect = container.getBoundingClientRect();
//     if (liRect.top < cRect.top || liRect.bottom > cRect.bottom) {
//       li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//     }
//   }, [activeId]);

//   /* ---- ref callback ---------------------------------------------- */
//   const setItemRef = useCallback(
//     (id: string) => (el: HTMLLIElement | null) => {
//       if (el) itemRefs.current.set(id, el);
//       else itemRefs.current.delete(id);
//     },
//     [],
//   );

//   if (headings.length === 0) return null;

//   return (
//     <nav className="rounded-xl border border-gray-200 bg-white shadow-sm">
//       {/* Header */}
//       <button
//         type="button"
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="flex w-full items-center justify-between px-5 py-4"
//       >
//         <span className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-gray-500">
//           <ProgressRing progress={readProgress} />
//           On this page
//         </span>
//         <motion.span
//           className="text-gray-400"
//           animate={{ rotate: isExpanded ? 0 : -90 }}
//           transition={{ duration: 0.2 }}
//         >
//           <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-label="Toggle contents">
//             <title>Toggle contents</title>
//             <path
//               d="M2.5 4.5L6 8L9.5 4.5"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </motion.span>
//       </button>

//       {/* Expandable body */}
//       <AnimatePresence initial={false}>
//         {isExpanded && (
//           <motion.div
//             key="toc-body"
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.25, ease: 'easeInOut' }}
//             className="overflow-hidden"
//           >
//             {/* Scrollable container — SVG + list scroll together */}
//             <div
//               ref={scrollRef}
//               className="relative max-h-[calc(100vh-16rem)] overflow-y-auto scroll-smooth px-5 pb-4 scrollbar-thin"
//             >
//               {/* The position:relative wrapper so offsetTop works */}
//               <div className="relative" style={{ paddingLeft: SVG_W + 4 }}>
//                 {/* Curved SVG line overlaying the left edge */}
//                 <CurvePath points={curvePoints} activeId={activeId} />

//                 {/* Heading links */}
//                 <ul className="space-y-0.5">
//                   {headings.map((heading, index) => (
//                     <motion.li
//                       key={heading.id}
//                       ref={setItemRef(heading.id)}
//                       initial={{ opacity: 0, x: -6 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{
//                         duration: 0.2,
//                         delay: index * 0.03,
//                         ease: 'easeOut',
//                       }}
//                     >
//                       <a
//                         href={`#${heading.id}`}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           const el = document.getElementById(heading.id);
//                           if (el) {
//                             // Lock observer so it won't fight the animation
//                             isScrollingRef.current = true;
//                             if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);

//                             setActiveId(heading.id);
//                             window.history.replaceState(null, '', `#${heading.id}`);
//                             el.scrollIntoView({ behavior: 'smooth', block: 'start' });

//                             // Unlock after scroll settles
//                             scrollTimerRef.current = setTimeout(() => {
//                               isScrollingRef.current = false;
//                             }, 850);
//                           }
//                         }}
//                         className={cn(
//                           'block rounded-md py-1.5 text-[13px] leading-snug transition-colors duration-200',
//                           heading.level === 3 && 'pl-3',
//                           heading.level === 4 && 'pl-6',
//                           activeId === heading.id ? 'font-medium text-blue-700' : 'text-gray-500 hover:text-gray-800',
//                         )}
//                       >
//                         {heading.text}
//                       </a>
//                     </motion.li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }


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
      }
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
      const max =
        document.documentElement.scrollHeight - window.innerHeight;

      setReadProgress(max > 0 ? Math.min(top / max, 1) : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      {/* Progress Bar */}
      <div className="mb-4 h-[3px] w-full rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-[#22C55E] transition-all duration-300"
          style={{ width: `${readProgress * 100}%` }}
        />
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        In this Article
      </h3>

      {/* Links */}
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(heading.id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className={cn(
                'block text-sm transition-colors',
                heading.level === 3 && 'pl-3',
                heading.level === 4 && 'pl-6',
                activeId === heading.id
                  ? 'text-black font-medium'
                  : 'text-gray-400 hover:text-gray-700'
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}


