'use client';

import { cn } from '@shared/lib/cn';
import { useEffect, useMemo, useRef } from 'react';

type BlobConfig = {
  id: string;
  color: string;
  className: string;
};

const BLOBS: BlobConfig[] = [
  {
    id: 'blue-blob',
    color: '#46A6FF',
    className: 'top-[5%] left-[10%] md:top-[100px] md:left-[257px] size-[12px] md:size-[18px]',
  },
  {
    id: 'yellow-blob',
    color: '#FBC05A',
    className: 'top-[12%] left-[85%] md:top-[200px] md:left-[460px] size-[12px] md:size-[18px]',
  },
  {
    id: 'green-blob',
    color: '#4B7A42',
    className: 'top-[25%] left-[75%] md:top-[380px] md:left-[600px] size-[12px] md:size-[18px]',
  },
  {
    id: 'pink-blob',
    color: '#D34966',
    className: 'top-[32%] left-[8%] md:top-[450px] md:left-[65px] size-[12px] md:size-[18px]',
  },
  {
    id: 'purple-blob',
    color: '#861F97',
    className: 'top-[40%] left-[45%] md:top-[500px] md:left-[257px] size-[12px] md:size-[18px]',
  },
];

export default function HeroConfetti() {
  const blobRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Use useMemo so velocities don't reset on every re-render
  const velocities = useMemo(
    () =>
      BLOBS.map(() => ({
        x: (Math.random() - 0.5) * 0.15,
        y: (Math.random() - 0.5) * 0.15,
      })),
    [],
  );

  const positions = useMemo(() => BLOBS.map(() => ({ x: 0, y: 0 })), []);

  useEffect(() => {
    let frameId: number;

    const animate = () => {
      blobRefs.current.forEach((blob, id) => {
        if (!blob) return;

        // Update positions based on velocity
        positions[id].x += velocities[id].x;
        positions[id].y += velocities[id].y;

        // Boundary checks (reverse direction if limit hit)
        if (Math.abs(positions[id].x) > 15) velocities[id].x *= -1;
        if (Math.abs(positions[id].y) > 15) velocities[id].y *= -1;

        // Apply transform
        blob.style.transform = `translate3d(${positions[id].x}px, ${positions[id].y}px, 0)`;
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [velocities, positions]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {BLOBS.map((blob, id) => (
        <span
          key={blob.id}
          ref={(el) => {
            blobRefs.current[id] = el;
          }}
          style={{ backgroundColor: blob.color }}
          className={cn('absolute rounded-full opacity-100 will-change-transform', blob.className)}
        />
      ))}
    </div>
  );
}
