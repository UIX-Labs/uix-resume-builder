import { Download } from 'lucide-react';
import { Button } from '@shared/ui/button';
import { cn } from '@shared/lib/utils';
import Image from 'next/image';
import { DownloadsTooltip } from './downloads-tooltip';

export interface DownloadButtonProps {
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
  /** Sign up bonus count for tooltip */
  signUpBonus?: number;
  /** Friends joined bonus count for tooltip */
  friendsBonus?: number;
  /** Whether the user is logged in (to show/hide tooltip and badges) */
  isLoggedIn?: boolean;
}

export function DownloadButton({
  downloadsLeft,
  downloadsAllowed,
  isGenerating = false,
  onClick,
  className,
  disabled = false,
  signUpBonus = 3,
  friendsBonus,
  isLoggedIn = false,
}: DownloadButtonProps) {
  const isLocked = downloadsLeft === 0;
  const downloadsDone = downloadsAllowed - downloadsLeft;

  return (
    <div className="group relative inline-block">
      {isLoggedIn && !isLocked && (
        <DownloadsTooltip signUpBonus={signUpBonus} friendsBonus={friendsBonus || 0} remaining={downloadsLeft} />
      )}

      <Button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'pointer-events-auto',
          'border border-blue-light-border',
          'bg-blue-light-bg',
          'font-semibold',
          'text-blue-600',
          'hover:bg-blue-light-bg hover:text-white',
          'shadow-lg',
          'cursor-pointer',
          'flex items-center gap-1.5',
          'rounded-xl',
          'p-5.5',
          'relative',
          className,
        )}
      >
        <div className="flex items-center gap-1.5">
          {isGenerating ? (
            <span className="text-[13px] font-semibold bg-gradient-to-r from-blue-gradient-start to-blue-gradient-end bg-clip-text text-transparent">
              Generating PDF...
            </span>
          ) : (
            <>
              {isLoggedIn && !isLocked && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center w-[47px] h-6 rounded-full bg-gradient-to-r from-blue-600 to-dark-900 border-2 border-white">
                  <span className="text-[13px] font-semibold text-blue-text-light">
                    {downloadsDone}/{downloadsAllowed}
                  </span>
                </div>
              )}

              {isLoggedIn && isLocked && (
                <div className="absolute -top-3 -left-3 flex items-center justify-center w-7.5 h-7.5 rounded-full bg-gradient-to-r from-error-500 to-error-600 border-2 border-white">
                  <Image src="/images/lock.svg" alt="Locked" width={16} height={16} className="text-white" />
                </div>
              )}

              <Download className="w-4 h-4" />
              <span className="text-[13px] font-semibold bg-gradient-to-r from-blue-gradient-start to-blue-gradient-end bg-clip-text text-transparent">
                Download PDF
              </span>
            </>
          )}
        </div>
      </Button>
    </div>
  );
}
