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
  { name: 'Akshat', company: 'TikTok', logo: '/images/img2.svg', image: '/images/testinomials-3.png' },
];

/** Staggered layout: [top-right, middle-left, middle-right] */
export const expertCardPositionClasses = [
  'absolute top-0 right-0',
  'absolute top-[250px] left-0',
  'absolute top-[350px] right-0',
] as const;

export function ExpertCard({ name, company, logo, image }: Expert) {
  return (
    <div
      className="flex items-center justify-center rounded-tr-[36px] rounded-bl-[36px] shadow-xl overflow-hidden border-1 border-[#FFFFFF5C]"
      style={{
        width: '275px',
        height: '224px',
        // background: 'var(--expert-card-gradient)',
        transform: 'scale(var(--expert-card-scale, 1))',
        transformOrigin: 'top left',
      }}
    >
      <div className="relative w-[265px] h-[214px] rounded-tr-[36px] rounded-bl-[36px] bg-[#1a1c26] flex overflow-hidden">
        <div className="relative h-[198px] w-[114px] ml-1 my-auto shrink-0 overflow-hidden rounded-tr-[24px] rounded-bl-[24px] border-3 border-[#FFFFFF5C]">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 px-4 pr-4">
          <span
            className="text-white font-bold leading-[1] tracking-[-0.26px] truncate"
            style={{ fontFamily: 'Geist, sans-serif', fontSize: '32px' }}
          >
            {name}
          </span>
          <p
            className="text-[#E0E0E0] font-normal leading-[1.2] tracking-[-0.18px] text-sm"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            Get expert resume review by professional from{' '}
            <span className="font-bold text-white block mt-0.5" style={{ fontSize: '14px' }}>
              {company}
            </span>
          </p>
          {/* <div className="mt-2 w-7 h-7 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <Image src={logo} alt={company} width={18} height={18} className="object-contain" />
          </div> */}
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
      className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-50 min-w-10 min-h-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-expert-bg border-2 border-white flex items-center justify-center text-white hover:bg-expert-bg-hover active:bg-expert-bg-hover transition-colors touch-manipulation cursor-pointer"
    >
      <X className="w-6 h-6 sm:w-7 sm:h-7" />
    </button>
  );
}
