'use client';

import { X } from 'lucide-react';
import Image from 'next/image';

export interface Expert {
  name: string;
  company: string;
  logo: string;
  image: string;
}

export const experts: Expert[] = [
  { name: 'Aman', company: 'Udaan', logo: '/images/img.svg', image: '/images/intro.png' },
  // { name: 'Anmol', company: 'Microsoft', logo: '/images/microsoft-logo.svg', image: '/images/profileimg.jpeg' },
  { name: 'Akshat', company: 'TikTok', logo: '/images/img2.svg', image: '/images/testinomials-3.png' },
];

/** Staggered layout: [top-right, middle-left, middle-right] */
export const expertCardPositionClasses = [
  'absolute top-0 right-0',
  'absolute top-[220px] left-0',
  'absolute top-[250px] right-0',
] as const;

export function ExpertCard({ name, company, logo, image }: Expert) {
  return (
    <div
      className="flex overflow-hidden rounded-tr-[36px] rounded-bl-[36px] shadow-xl"
      style={{
        fontFamily: 'Geist, sans-serif',
        width: 'var(--expert-card-width)',
        height: 'var(--expert-card-height)',
        background: 'var(--expert-card-gradient)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)',
      }}
    >
      <div className="relative h-full w-[120px] shrink-0 overflow-hidden rounded-bl-[36px]">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-4 py-3">
        <span
          className="text-expert-card-name font-bold leading-[1] tracking-[-0.26px]"
          style={{ fontFamily: 'Geist, sans-serif', fontSize: '32px' }}
        >
          {name}
        </span>
        <p
          className="text-expert-card-text font-light leading-[1] tracking-[-0.18px]"
          style={{ fontFamily: 'Geist, sans-serif', fontSize: '14px' }}
        >
          Get expert resume review by professional from{' '}
          <span className="font-bold text-white" style={{ fontWeight: 700, fontSize: '14px' }}>
            {company}
          </span>
        </p>
        <div className="mt-1.5 flex items-center">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-expert-logo-bg">
            <Image src={logo} alt={company} width={14} height={14} className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className="absolute top-4 right-4 sm:top-2 sm:right-2 z-50 min-w-12 min-h-12 w-12 h-12 rounded-full bg-expert-bg border-2 border-white flex items-center justify-center text-white hover:bg-expert-bg-hover active:bg-expert-bg-hover transition-colors touch-manipulation"
    >
      <X className="w-6 h-6 sm:w-7 sm:h-7" />
    </button>
  );
}
