'use client';

import { Button } from '@shared/ui/button';
import { CloseButton } from './shared';

interface SuccessViewProps {
  onDashboard: () => void;
  onClose: () => void;
}

export function SuccessView({ onDashboard, onClose }: SuccessViewProps) {
  return (
    <div className="relative w-full min-h-[min(100dvh-2rem,653px)] sm:min-h-[653px] flex flex-col justify-center p-6 sm:p-8 md:p-12 bg-transparent text-white overflow-hidden">
      <CloseButton onClick={onClose} />

      <div className="relative z-10 flex flex-col gap-6 sm:gap-8 max-w-xl mx-4 sm:mx-8 md:ml-16">
        <h2
          className="text-expert-heading font-semibold text-[28px] sm:text-[40px] md:text-[56px] leading-[1] tracking-[-0.18px] whitespace-nowrap"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          Resume submitted for review
        </h2>
        <p
          className="text-expert-subheading font-normal text-sm sm:text-base leading-[22px] tracking-[-0.18px] max-w-xl"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          Our experts are reviewing your resume. You'll receive the feedback on your email within{' '}
          <span className="text-expert-heading font-normal">3 days</span>.
        </p>
        <Button
          onClick={onDashboard}
          variant="outline"
          className="w-full sm:w-fit self-start border-2 border-white bg-transparent text-white rounded-expert-button px-5 py-3 min-h-12 h-11 font-semibold text-base sm:text-lg leading-[1.333em] tracking-tight hover:bg-white/10 hover:text-white hover:border-white touch-manipulation"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
