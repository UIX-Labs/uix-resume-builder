'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { REFERRAL_CONSTANTS } from '@features/referral-flow/constants';
import { cn } from '@shared/lib/utils';
import { Button } from '@shared/ui/button';

interface ReferralShareCardProps {
  referralLink: string;
  isLoading?: boolean;
}

export default function ReferralShareCard({ referralLink, isLoading = false }: ReferralShareCardProps) {
  const [_copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Referral link copied!');
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="flex-1 bg-background-white rounded-3xl p-7 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-[609px]">
        <div className="flex flex-col items-center gap-1 mb-6">
          <h3 className="text-base md:text-xl font-semibold leading-[1.2] tracking-[-0.03em] text-center text-sidebar-nav-active">
            {REFERRAL_CONSTANTS.SHARE_TITLE}
          </h3>
          <p className="text-xs md:text-[13px] font-normal leading-[1.38] text-center text-text-muted">
            {REFERRAL_CONSTANTS.SHARE_DESCRIPTION}
          </p>
        </div>

        <div className="w-full h-16 rounded-[20px] flex items-center justify-between px-4 md:px-8 bg-blue-light-bg">
          <span className="text-xs md:text-base font-normal leading-[1.375] tracking-[-0.011em] truncate text-text-muted">
            {isLoading ? 'Loading referral link...' : referralLink}
          </span>
          <Button
            type="button"
            onClick={handleCopyLink}
            disabled={isLoading}
            variant="ghost"
            className={cn(
              'pr-5 md:px-5 py-3 rounded-[12px] text-base font-semibold leading-[1.375] tracking-[-0.011em]',
              'text-blue-500 ',
            )}
          >
            {REFERRAL_CONSTANTS.COPY_BUTTON_TEXT}
          </Button>
        </div>
      </div>
    </div>
  );
}
