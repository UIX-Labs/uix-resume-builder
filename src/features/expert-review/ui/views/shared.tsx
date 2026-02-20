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
  { name: 'Anmol', company: 'Microsoft', logo: '/images/microsoft-logo.svg', image: '/anmol.svg' },
  { name: 'Akshat', company: 'TikTok', logo: '/images/img2.svg', image: '/images/testinomials-3.png' },
];

export const expertCardPositionClasses = [
  'absolute top-10 right-20 z-10',
  'absolute top-[340px] -left-15 z-10',
  'absolute top-[290px] -right-5 z-10',
] as const;

export function ExpertCard({ name, company, logo, image }: Expert) {
  return (
    <div
      className="flex items-center justify-center shadow-xl overflow-visible"
      style={{
        width: 275,
        height: 224,
        transform: 'scale(var(--expert-card-scale, 1))',
        transformOrigin: 'top left',
      }}
    >
      <div
        className="relative w-[275px] h-[224px] flex items-center overflow-hidden p-1"
        style={{
          background: 'linear-gradient(113.21deg, #91BAF8 -14.58%, #2D4160 21.17%, #000000 93.2%)',
          borderRadius: '0 36px 0 36px',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.2)',
          boxSizing: 'border-box',
          padding: '12px',
        }}
      >
        {/* Profile Image with stylized border - rounded-tr and rounded-bl per design */}
        <div className="relative h-[198px] w-[114px] shrink-0 overflow-visible flex items-start justify-start">
          <div
            className="relative h-full w-full overflow-hidden"
            style={{
              border: '4px solid #FFFFFF5C',
              borderRadius: '0 23px 0 23px',
              boxSizing: 'border-box',
            }}
          >
            <Image src={image} alt={name} fill className="object-cover" style={{ borderRadius: '0 19px 0 19px' }} />
          </div>
        </div>
        <div className="flex min-w-0 flex-col justify-start items-start gap-1.5 px-4">
          <span
            className="text-white/40 font-bold leading-[1] tracking-[-0.26px] truncate text-4xl"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {name}
          </span>
          <p
            className="text-[#E0E0E0] font-light leading-[1] tracking-[-0.18px] text-sm"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            Get expert resume review by professional from{' '}
            <span
              className="font-bold text-white block mt-0.5 text-sm"
              style={{ fontFamily: 'Geist, sans-serif', letterSpacing: '-0.18px' }}
            >
              {company}
            </span>
          </p>
          {/* {logo && (
            <div className="mt-2 w-7 h-7 flex items-center justify-center overflow-hidden">
              <Image src={logo} alt={company} width={18} height={18} className="object-contain" />
            </div>
          )} */}
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
      <X className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );
}
