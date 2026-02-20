'use client';

import { Download } from 'lucide-react';
import { Button } from '@shared/ui/button';
import { cn } from '@shared/lib/utils';
import Image from 'next/image';

export interface MobileDownloadButtonProps {
  /** Downloads remaining */
  downloadsLeft: number;
  /** Total downloads allowed */
  downloadsAllowed: number;
  /** Whether the PDF is currently being generating */
  isGenerating?: boolean;
  /** Click handler for the download action */
  onClick: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the user is logged in (to show/hide count badge) */
  isLoggedIn?: boolean;
}

export function MobileDownloadButton({
  downloadsLeft,
  downloadsAllowed,
  isGenerating = false,
  onClick,
  className,
  isLoggedIn = false,
}: MobileDownloadButtonProps) {
  const isLocked = downloadsLeft === 0;
  const downloadsDone = downloadsAllowed - downloadsLeft;

  return (
    <Button
      type="button"
      onClick={onClick}
      className={cn(
        'relative flex-1 h-12 text-[15px] font-semibold rounded-xl text-white flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-hover',
        className,
      )}
    >
      {isLoggedIn && !isLocked && !isGenerating && (
        <div className="absolute -top-2 -left-2  flex items-center justify-center  px-1.5 rounded-full bg-gradient-to-r from-blue-600 to-dark-900 border-2 border-white z-10">
          <span className="text-xs font-semibold text-white">
            {downloadsDone}/{downloadsAllowed}
          </span>
        </div>
      )}

      {isLoggedIn && isLocked && (
        <div className="absolute -top-2 -left-2 flex items-center justify-center w-[28px] h-[28px] rounded-full bg-gradient-to-r from-error-500 to-error-600 border-2 border-white z-10">
          <Image src="/images/lock.svg" alt="Locked" width={14} height={14} className="text-white" />
        </div>
      )}

      {isGenerating ? (
        <span className="text-xs font-semibold">Generating...</span>
      ) : (
        <>
          <Download className="w-5 h-5" />
          <span>PDF</span>
        </>
      )}
    </Button>
  );
}
