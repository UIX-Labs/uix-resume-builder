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

interface ExpertCardProps extends Expert {
  variant?: 'default' | 'light';
}

export function ExpertCard({ name, company, logo: _logo, image, variant = 'default' }: ExpertCardProps) {
  if (variant === 'light') {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
        <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-lg">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-neutral-900 text-lg">{name}</span>
          <p className="text-sm text-gray-600">
            Get expert resume review by professional from <span className="font-semibold text-neutral-900">{company}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center shadow-xl overflow-hidden border border-white/40 w-[275px] h-[224px] rounded-tr-[36px] rounded-bl-[36px] origin-top-left [transform:scale(var(--expert-card-scale,1))]">
      <div
        className="relative w-[275px] h-[224px] flex items-center overflow-visible p-3 rounded-tr-[36px] rounded-bl-[36px] box-border bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/expert-card-bg.png'), radial-gradient(ellipse 80% 60% at 100% 0%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 0% 100%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
          backgroundSize: 'cover, 100% 100%, 100% 100%',
          backgroundPosition: 'center, top right, bottom left',
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
        }}
      >
        {/* Profile Image with stylized border - rounded-tr and rounded-bl per design */}
        <div className="relative h-[198px] w-[114px] shrink-0 overflow-visible flex items-start justify-start">
          <div className="relative h-full w-full overflow-hidden border-4 border-[#FFFFFF5C] rounded-tr-[23px] rounded-bl-[23px] box-border">
            <Image src={image} alt={name} fill className="object-cover rounded-tr-[19px] rounded-bl-[19px]" />
          </div>
        </div>
        <div className="flex min-w-0 flex-col justify-start items-start gap-1.5 px-4">
          <span className="text-white/40 font-bold leading-[1] tracking-[-0.26px] truncate text-4xl font-[Geist,sans-serif]">
            {name}
          </span>
          <p className="text-[#E0E0E0] font-light leading-[1] tracking-[-0.18px] text-sm font-[Geist,sans-serif]">
            Get expert resume review by professional from{' '}
            <span className="font-bold text-white block mt-0.5 text-sm tracking-[-0.18px] font-[Geist,sans-serif]">
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
      <X className="w-6 h-6 sm:w-7 sm:h-7" />
    </button>
  );
}
