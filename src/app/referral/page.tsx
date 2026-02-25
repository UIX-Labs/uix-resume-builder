'use client';

import { useUserProfile } from '@shared/hooks/use-user';
import { SidebarProvider } from '@shared/ui/sidebar';

import DashboardSidebar from '@widgets/dashboard/ui/dashboard-sidebar';
import PageHeading from '@widgets/dashboard/ui/page-heading';
import ResponsiveDashboardHeader from '@widgets/dashboard/ui/header';
import ReferralPageContent from '@widgets/referral-page/ui/referral-page-content';
import ReferralBackgroundPattern from '@features/referral-flow/ui/referral-background-pattern-svg';

export default function ReferralPage() {
  const { data: user } = useUserProfile();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen bg-white">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0 m-3">
          <ResponsiveDashboardHeader user={user} />

          <main className="flex flex-col bg-dashboard-bg h-[calc(100vh-114px)] md:h-auto mt-3 rounded-[36px] overflow-hidden pb-4 relative">
            <div className="absolute -bottom-18 -right-15 md:-right-7 md:top-0 pointer-events-none w-75 h-65 opacity-30">
              <ReferralBackgroundPattern />
            </div>

            <div className="flex-1 relative z-10">
              <PageHeading title="REFERRAL" />

              <ReferralPageContent user={user} />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
