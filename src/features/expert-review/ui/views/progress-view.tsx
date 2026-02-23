'use client';

import { FileText, X } from 'lucide-react';
import { CloseButton } from './shared';

interface ProgressViewProps {
  fileName: string;
  progress: number;
  onCancel: () => void;
  onClose: () => void;
}

export function ProgressView({ fileName, progress, onCancel, onClose }: ProgressViewProps) {
  return (
    <div className="relative w-full min-h-[min(100dvh-2rem,653px)] sm:min-h-[653px] flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-transparent text-white overflow-hidden">
      <CloseButton onClick={onClose} />

      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-10 w-full max-w-xl px-2 sm:px-4">
        <h2
          className="text-expert-heading font-semibold text-[28px] sm:text-[40px] md:text-[56px] leading-[1] tracking-[-0.18px] text-center align-bottom"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          Resume Uploading
        </h2>

        <div className="w-full bg-white border-2 border-expert-border rounded-2xl sm:rounded-[28px] p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 relative shadow-xl">
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 min-w-10 min-h-10 text-black/70 hover:text-black active:text-black transition-colors touch-manipulation"
            aria-label="Cancel upload"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 sm:gap-6 pr-10 sm:pr-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-expert-border/10 flex items-center justify-center text-expert-border flex-shrink-0">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="flex flex-col items-start flex-1 min-w-0">
              <span
                className="text-black font-semibold text-base sm:text-xl truncate w-full text-left"
                style={{ fontFamily: 'Geist, sans-serif' }}
              >
                {fileName || 'Resume.pdf'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="w-full h-2.5 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-expert-border rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span
                className="text-expert-progress-muted font-normal text-sm sm:text-base leading-[22px] tracking-[-0.18px]"
                style={{ fontFamily: 'Geist, sans-serif' }}
              >
                4MB
              </span>
              <span className="text-black font-semibold text-lg sm:text-xl" style={{ fontFamily: 'Geist, sans-serif' }}>
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
