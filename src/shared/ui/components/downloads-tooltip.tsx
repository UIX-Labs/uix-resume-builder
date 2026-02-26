import { cn } from '@shared/lib/utils';

export interface DownloadsTooltipProps {
  /** Sign up bonus count */
  signUpBonus: number;
  /** Friends joined bonus count */
  friendsBonus: number;
  /** Remaining downloads */
  remaining: number;
  className?: string;
}

export function DownloadsTooltip({
  signUpBonus,
  friendsBonus,
  remaining,

  className,
}: DownloadsTooltipProps) {
  const totalEarned = signUpBonus + friendsBonus;

  return (
    <div
      className={cn(
        'absolute bottom-full mb-2 left-1/2 -translate-x-1/2',
        'bg-white rounded-[16px]',
        'border-2 border-tooltip-border',
        'shadow-[0_6px_14px_0_rgba(0,0,0,0.05)]',
        'p-4 w-50',
        'opacity-0 invisible group-hover:opacity-100 group-hover:visible',
        'transition-all duration-200',
        'z-50',
        className,
      )}
    >
      <div className="mb-3">
        <h3 className="text-dark-900 text-[13px] font-semibold">
          Downloads Earned ({totalEarned.toString().padStart(2, '0')})
        </h3>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs">Sign Up Bonus</span>
          <div className="flex items-center justify-center w-6 h-5 rounded-full bg-gray-400">
            <span className="text-white text-xs font-bold">{signUpBonus}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs">Friends Joined Bonus</span>
          <div className="flex items-center justify-center w-6 h-5 rounded-full bg-gray-400">
            <span className="text-white text-xs font-bold">{friendsBonus}</span>
          </div>
        </div>
      </div>

      <div className="">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gray-400">
          <span className="text-white text-xs font-medium">Remaining : {remaining}</span>
        </div>
      </div>
    </div>
  );
}
