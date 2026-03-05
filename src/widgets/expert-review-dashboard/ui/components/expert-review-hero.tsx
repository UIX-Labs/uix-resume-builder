'use client';

import { Button } from '@shared/ui/button';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { experts } from '@/features/expert-review/ui/views/shared';

const CTA_BUTTON_CLASS =
  'bg-[#257AFF] hover:bg-[#1a6ae6] text-white font-semibold min-h-11 h-11 px-6 rounded-full text-base flex items-center justify-center gap-2 border border-white/20 shadow-sm transition-colors';

interface ExpertReviewHeroProps {
  userName: string;
  onUploadClick: () => void;
}

export function ExpertReviewHero({ userName, onUploadClick }: ExpertReviewHeroProps) {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div>
        <h2 className="text-2xl md:text-4xl font-semibold leading-tight tracking-[-0.03em] text-neutral-900 mb-1">
          Welcome, {userName}
        </h2>
        <p className="text-base text-[#959DA8]">Track the status of all your submitted resumes</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 gap-3">
        <div className="shrink-0">
          <p className="text-base font-medium text-neutral-700 leading-tight">start getting reviewed by experts</p>
          <p className="text-sm text-neutral-600 mt-0.5">from google, zepto, uber</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 shrink-0">
            {experts.slice(0, 3).map((expert) => (
              <div
                key={expert.name}
                className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100 ring-2 ring-white shadow-sm"
              >
                <Image src={expert.image} alt={expert.name} fill className="object-cover" />
              </div>
            ))}
          </div>
          <Button onClick={onUploadClick} className={CTA_BUTTON_CLASS}>
            Upload Resume
            <Upload className="w-5 h-5 shrink-0" />
          </Button>
        </div>
      </div>
    </div>
  );
}
