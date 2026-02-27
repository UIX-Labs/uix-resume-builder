'use client';

import { toast } from 'sonner';
import { Copy } from 'lucide-react';
import { REFERRAL_CONSTANTS } from '@features/referral-flow/constants';
import { cn } from '@shared/lib/utils';
import { Button } from '@shared/ui/button';
import { InviteEmailModal } from './invite-email-modal';
import { useState } from 'react';

interface ReferralShareCardProps {
  referralLink: string;
  isLoading?: boolean;
}

export default function ReferralShareCard({ referralLink, isLoading = false }: ReferralShareCardProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success('Referral link copied!');
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="flex-1 bg-background-white rounded-3xl p-3 md:p-7 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-[609px]">
        <div className="flex flex-col items-center gap-1 mb-6">
          <h3 className="text-base md:text-xl font-semibold leading-[1.2] tracking-[-0.03em] text-center text-sidebar-nav-active">
            {REFERRAL_CONSTANTS.SHARE_TITLE}
          </h3>
          <p className="text-xs md:text-[13px] font-normal leading-[1.38] text-center text-text-muted">
            {REFERRAL_CONSTANTS.SHARE_DESCRIPTION}
          </p>
        </div>

        <div className="w-full flex items-center gap-3 md:gap-5">
          <Button
            type="button"
            onClick={() => setIsEmailModalOpen(true)}
            disabled={isLoading}
            className={cn(
              'h-16 w-1/2 md:w-[195px] rounded-lg md:rounded-[20px] text-base font-semibold leading-[1.375] tracking-[-0.011em]',
              'bg-blue-600 text-white hover:bg-blue-600 transition-colors',
              'flex-shrink-0',
            )}
          >
            Invite via Email
          </Button>

          <div className="hidden md:block h-[37px] w-px bg-gray-200 flex-shrink-0" />

          <div className="w-1/2 md:flex-1 md:max-w-[397px] h-16 rounded-lg md:rounded-[20px] flex items-center justify-between px-4  bg-blue-light-bg overflow-hidden">
            <span className="hidden md:block text-xs md:text-base font-normal leading-[1.375] tracking-[-0.011em] truncate text-text-muted mr-2">
              {isLoading ? 'Loading referral link...' : referralLink}
            </span>
            <Button
              type="button"
              onClick={handleCopyLink}
              disabled={isLoading}
              variant="ghost"
              className={cn(
                'py-3 rounded-xl md:rounded-[12px] text-base font-semibold leading-[1.375] tracking-[-0.011em]',
                'text-blue-500 hover:bg-blue-50 transition-colors',
                'flex-shrink-0 flex items-center gap-2',
              )}
            >
              {REFERRAL_CONSTANTS.COPY_BUTTON_TEXT}
              <Copy className="md:hidden size-5" />
            </Button>
          </div>
        </div>
      </div>

      <InviteEmailModal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />
    </div>
  );
}
