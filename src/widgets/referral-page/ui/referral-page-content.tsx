import { useReferralData } from '@entities/referral/hooks/use-referral';
import { REFERRAL_CONSTANTS } from '@features/referral-flow/constants';
import { useIsMobile } from '@shared/hooks/use-mobile';
import type { User } from '@shared/hooks/use-user';
import ReferralShareCard from './referral-share-card';
import ReferralStatsCard from './referral-stats-card';
import ReferralStepsSection from './referral-steps-section';

interface ReferralPageContentProps {
  user?: User;
}

export default function ReferralPageContent({ user }: ReferralPageContentProps) {
  const isMobile = useIsMobile();
  const { data: referralData, isLoading: isLoadingReferral } = useReferralData();

  const referralLink = referralData?.referralUrl ?? '';
  const friendsJoined = referralData?.referredTo?.length ?? 0;
  const downloadsRemaining = referralData?.downloadsLeft ?? user?.downloadsLeft ?? 0;
  const downloadsAllowed = referralData?.downloadsAllowed ?? user?.downloadsAllowed ?? 0;
  const friendsJoinedBonus = friendsJoined * 3;

  const friends =
    referralData?.referredTo?.map((referral) => ({
      id: referral.id,
      name: `${referral.firstName}${referral.lastName ? ` ${referral.lastName}` : ''}`,
      email: referral.email,
      createdAt: referral.createdAt,
    })) ?? [];
  return (
    <div className="px-4 md:px-6">
      <div className="mb-8">
        <h2 className="-mt-5 md:mt-0 text-2xl md:text-4xl font-semibold leading-tight tracking-[-0.03em] text-neutral-900 mb-0">
          {REFERRAL_CONSTANTS.MODAL_TITLE}
        </h2>
        <p className="text-base leading-[1.25] tracking-[-0.00125em] text-[#959DA8] max-w-[617px]">
          {REFERRAL_CONSTANTS.MODAL_DESCRIPTION} and they get {REFERRAL_CONSTANTS.REFEREE_DOWNLOADS} free download.
        </p>
      </div>

      {!isMobile && (
        <div className="mb-12">
          <ReferralStepsSection />
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-stretch gap-5 max-w-6xl mx-auto mt-16">
        <ReferralStatsCard
          friendsJoined={friendsJoined}
          downloadsEarned={downloadsAllowed}
          downloadsRemaining={downloadsRemaining}
          downloadsAllowed={downloadsAllowed}
          friendsJoinedBonus={friendsJoinedBonus}
          friends={friends}
          isLoading={isLoadingReferral}
        />

        <ReferralShareCard referralLink={referralLink} isLoading={isLoadingReferral} />
      </div>
    </div>
  );
}
