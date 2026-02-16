'use client';

import { cn } from '@shared/lib/cn';
import { useEffect, useRef } from 'react';

type BlobConfig = {
  id: string;
  className: string;
};

const BLOBS: BlobConfig[] = [
  // Top left
  { id: 'blob-1', className: 'top-[60px] left-[8%] md:top-[16px] md:left-[450px] size-[18px] bg-[#3B82F6]' },

  // Upper right
  { id: 'blob-2', className: 'top-[140px] right-[10%] md:top-[380px] md:left-[20px] size-[20px] bg-[#22C55E]' },

  // Mid left
  { id: 'blob-3', className: 'top-[260px] left-[12%] md:top-[300px] md:left-[450px] size-[16px] bg-[#F59E0B]' },

  // Mid right
  { id: 'blob-4', className: 'top-[380px] right-[15%] md:top-[550px] md:left-[80%] size-[22px] bg-[#A855F7]' },

  // Bottom center
  { id: 'blob-5', className: 'top-[520px] left-[45%] md:top-[101px] md:left-[257px] size-[18px] bg-[#EF4444]' },
];

export default function HeroConfetti() {
  const blobRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const velocities = blobRefs.current.map(() => ({
      x: (Math.random() - 0.5) * 0.15,
      y: (Math.random() - 0.5) * 0.15,
    }));

    const positions = blobRefs.current.map(() => ({
      x: 0,
      y: 0,
    }));

    let frameId: number;

    const animate = () => {
      blobRefs.current.forEach((blob, id) => {
        if (!blob) return;

        positions[id].x += velocities[id].x;
        positions[id].y += velocities[id].y;

        // tiny invisible movement boundary
        if (Math.abs(positions[id].x) > 15) velocities[id].x *= -1;
        if (Math.abs(positions[id].y) > 15) velocities[id].y *= -1;

        blob.style.transform = `translate(${positions[id].x}px, ${positions[id].y}px)`;
      });

      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="absolute inset-y-0 left-0 w-[35%] overflow-hidden">
      {BLOBS.map((blob, id) => (
        <span
          key={blob.id}
          ref={(el) => {
            if (el) blobRefs.current[id] = el;
          }}
          className={cn('absolute rounded-full opacity-60 blur-[0.5px] will-change-transform', blob.className)}
        />
      ))}
    </div>
  );
}
