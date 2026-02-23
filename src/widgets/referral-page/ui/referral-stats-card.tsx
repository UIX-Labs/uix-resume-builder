'use client';

import { cn } from '@/shared/lib/utils';
import { useState } from 'react';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { DownloadIcon } from './download-icon';
import { DownloadsEarnedModal } from './downloads-earned-modal';
import { FriendsIcon } from './friends-icon';
import { FriendsJoinedModal } from './friends-joined-modal';
import { FriendsJoinedEmptyModal } from './friends-joined-empty-modal';

interface Friend {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface ReferralStatsCardProps {
  friendsJoined: number;
  downloadsEarned: number;
  downloadsRemaining: number;
  downloadsAllowed?: number;
  signUpBonus?: number;
  friendsJoinedBonus?: number;
  friends?: Friend[];
  isLoading?: boolean;
}

export default function ReferralStatsCard({
  friendsJoined,
  downloadsEarned,
  downloadsRemaining,
  signUpBonus = 3,
  friendsJoinedBonus,
  friends,
  isLoading = false,
}: ReferralStatsCardProps) {
  const isMobile = useIsMobile();
  const calculatedFriendsJoinedBonus = friendsJoinedBonus ?? friendsJoined * 3;
  const [isDownloadsModalOpen, setIsDownloadsModalOpen] = useState(false);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
  const [isFriendsEmptyModalOpen, setIsFriendsEmptyModalOpen] = useState(false);
  return (
    <div className="flex-shrink-0 bg-background-white rounded-3xl p-4 md:p-6 flex items-stretch justify-center gap-3 md:gap-4">
      <div className="relative flex-1 md:flex-none">
        <div
          className={cn(
            'relative w-full md:w-45 rounded-[20px] p-4 md:p-6 pb-8 flex flex-col items-center justify-center cursor-pointer hover:bg-bg-light-pink transition-colors h-full md:h-37.5',
            isDownloadsModalOpen ? 'bg-bg-light-pink' : 'bg-form-bg-light',
          )}
          onClick={() => setIsDownloadsModalOpen(true)}
          role="button"
          tabIndex={0}
        >
          <div className="w-5 h-5 md:w-6 md:h-6">
            <DownloadIcon />
          </div>
          <div className="text-[44px] font-black leading-[1.3] tracking-[-0.03em] text-center bg-gradient-to-r from-gradient-coral to-dark-900 bg-clip-text text-transparent">
            {isLoading ? '...' : downloadsEarned.toString().padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm font-normal leading-[1.43] tracking-[-0.004em] text-center text-dark-900 whitespace-nowrap">
            Downloads Earned
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center px-3 md:px-4 py-1 bg-gradient-to-r from-gradient-coral to-dark-900 rounded-full z-10 whitespace-nowrap">
            <span className="text-[10px] md:text-xs font-medium leading-[1.3] text-white">
              {isLoading ? 'loading...' : `remaining : ${downloadsRemaining.toString().padStart(2, '0')}`}
            </span>
          </div>
        </div>

        <DownloadsEarnedModal
          open={isDownloadsModalOpen}
          onOpenChange={setIsDownloadsModalOpen}
          signUpBonus={signUpBonus}
          friendsJoinedBonus={calculatedFriendsJoinedBonus}
          remaining={downloadsRemaining}
        />
      </div>

      <div className="relative flex-1 md:flex-none">
        <div
          className={cn(
            'w-full md:w-45 rounded-[20px] p-4 md:p-6 pb-8 flex flex-col items-center justify-center cursor-pointer hover:bg-bg-light-pink transition-colors h-full md:h-37.5',
            isFriendsModalOpen || isFriendsEmptyModalOpen ? 'bg-bg-light-pink' : 'bg-form-bg-light',
          )}
          onClick={() => {
            // Show empty modal for mobile when friendsJoined is 0
            if (isMobile && friendsJoined === 0) {
              setIsFriendsEmptyModalOpen(true);
            } else {
              setIsFriendsModalOpen(true);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div className="w-5 h-5 md:w-6 md:h-6">
            <FriendsIcon />
          </div>

          <div className="text-[44px] font-black leading-[1.3] tracking-[-0.03em] text-center bg-gradient-to-r from-gradient-coral to-dark-900 bg-clip-text text-transparent">
            {isLoading ? '...' : friendsJoined.toString().padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm font-normal leading-[1.43] tracking-[-0.004em] text-center text-dark-900">
            Friends Joined
          </div>
        </div>

        <FriendsJoinedModal open={isFriendsModalOpen} onOpenChange={setIsFriendsModalOpen} friends={friends} />

        <FriendsJoinedEmptyModal open={isFriendsEmptyModalOpen} onOpenChange={setIsFriendsEmptyModalOpen} />
      </div>
    </div>
  );
}
