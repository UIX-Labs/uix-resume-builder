'use client';

import { cn } from '@shared/lib/cn';
import { useEffect, useRef } from 'react';

type BlobConfig = {
  id: string;
  className: string;
  color: string;
};

const BLOBS: BlobConfig[] = [
  // 1. Blue - Top Left
  {
    id: 'blue-blob',
    color: '#46A6FF',
    className: 'top-[5%] left-[10%] md:top-[100px] md:left-[257px] size-[12px] md:size-[18px]',
  },

  // 2. Yellow - Top Right
  {
    id: 'yellow-blob',
    color: '#FBC05A',
    className: 'top-[12%] left-[85%] md:top-[200px] md:left-[460px] size-[12px] md:size-[18px]',
  },

  // 3. Dark Green - Mid Right (now higher on mobile)
  {
    id: 'green-blob',
    color: '#4B7A42',
    className: 'top-[25%] left-[75%] md:top-[380px] md:left-[600px] size-[12px] md:size-[18px]',
  },

  // 4. Red/Pink - Mid Left (now higher on mobile)
  {
    id: 'pink-blob',
    color: '#D34966',
    className: 'top-[32%] left-[8%] md:top-[440px] md:left-[65px] size-[12px] md:size-[18px]',
  },

  // 5. Purple - Center (stays above the fold on mobile)
  {
    id: 'purple-blob',
    color: '#861F97',
    className: 'top-[40%] left-[45%] md:top-[600px] md:left-[257px] size-[12px] md:size-[18px]',
  },
];

export default function HeroConfetti() {
  const blobRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Increased range to 8px for more noticeable "active" movement
    const range = 8;

    const velocities = BLOBS.map(() => ({
      // Increased velocity to 0.15 for more lively motion
      x: (Math.random() - 0.5) * 0.15,
      y: (Math.random() - 0.5) * 0.15,
    }));

    const positions = BLOBS.map(() => ({ x: 0, y: 0 }));
    let frameId: number;

    const animate = () => {
      blobRefs.current.forEach((blob, id) => {
        if (!blob) return;

        positions[id].x += velocities[id].x;
        positions[id].y += velocities[id].y;

        if (Math.abs(positions[id].x) > range) velocities[id].x *= -1;
        if (Math.abs(positions[id].y) > range) velocities[id].y *= -1;

        blob.style.transform = `translate3d(${positions[id].x}px, ${positions[id].y}px, 0)`;
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

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
