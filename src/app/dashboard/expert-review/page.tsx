'use client';

import { useUserProfile } from '@shared/hooks/use-user';
import { SidebarProvider } from '@shared/ui/sidebar';

import DashboardSidebar from '@widgets/dashboard/ui/dashboard-sidebar';
import PageHeading from '@widgets/dashboard/ui/page-heading';
import ResponsiveDashboardHeader from '@widgets/dashboard/ui/header';
import ExpertReviewPageContent from '@widgets/expert-review-dashboard/ui/expert-review-page-content';

export default function ExpertReviewPage() {
  const { data: user } = useUserProfile();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen bg-white">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0 m-3">
          <ResponsiveDashboardHeader user={user} />

          <main className="flex flex-col bg-dashboard-bg h-[calc(100vh-114px)] md:h-auto mt-3 rounded-[36px] overflow-hidden pb-4">
            <PageHeading title="EXPERT REVIEW" />

            <ExpertReviewPageContent />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
