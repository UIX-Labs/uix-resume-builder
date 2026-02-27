'use client';

import { X } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { Button } from '@shared/ui/button';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { cn } from '@shared/lib/utils';

interface DownloadsEarnedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  signUpBonus: number;
  friendsJoinedBonus: number;
  remaining: number;
}

export function DownloadsEarnedModal({
  open,
  onOpenChange,
  signUpBonus,
  friendsJoinedBonus,
  remaining,
}: DownloadsEarnedModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (isMobile) return;
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    },
    [onOpenChange, isMobile],
  );

  useEffect(() => {
    if (!open) return;

    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (isMobile) {
        document.body.style.overflow = '';
      }
    };
  }, [open, handleClickOutside, isMobile]);

  if (!open) return null;

  return (
    <>
      {isMobile && <div className="fixed inset-0 z-50 bg-black/50 animate-in fade-in-0 duration-200" />}

      <div
        ref={modalRef}
        className={cn(
          'z-50 bg-background-white rounded-[16px] border border-modal-border shadow-[0_6px_14px_0_rgba(0,0,0,0.05)] animate-in fade-in-0 duration-200',
          isMobile
            ? 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] slide-in-from-bottom-4'
            : 'absolute -top-50 -left-5.5 w-[270px] zoom-in-95',
        )}
      >
        <div className="relative bg-modal-header-bg h-10 rounded-t-[16px] flex items-center px-4">
          <h3 className="text-lg font-semibold leading-[1.33] tracking-[-0.014em] text-dark-900">Downloads Earned</h3>
          <Button
            onClick={() => onOpenChange(false)}
            variant="ghost"
            size="icon"
            className="absolute right-[16px] top-[6px] w-7 h-7 rounded-full bg-black hover:bg-black/90 transition-colors"
            aria-label="Close"
          >
            <X className="w-[10.89px] h-[10.89px] text-white" />
          </Button>
        </div>

        <div className="px-4 pb-4 pt-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-base font-normal leading-[1.375] tracking-[-0.011em] text-dark-900">
              Sign Up Bonus
            </span>
            <div className="flex items-center justify-center px-2 py-1 bg-gradient-to-r from-gradient-coral to-dark-900 rounded-lg min-w-[32px]">
              <span className="text-xs font-bold leading-[1.3] text-white">{signUpBonus}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-base font-normal leading-[1.375] tracking-[-0.011em] text-dark-900">
              Friends Joined Bonus
            </span>
            <div className="flex items-center justify-center px-2 py-1 bg-gradient-to-r from-gradient-coral to-dark-900 rounded-lg min-w-[32px]">
              <span className="text-xs font-bold leading-[1.3] text-white">{friendsJoinedBonus}</span>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="inline-flex items-center justify-center px-3 py-1 bg-gradient-to-r from-gradient-coral to-dark-900 rounded-[24px]">
              <span className="text-xs font-semibold leading-[1.5] text-blue-text-light">Remaning : {remaining}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
