'use client';

import { useUserProfile } from '@shared/hooks/use-user';
import { SidebarProvider } from '@shared/ui/sidebar';
import DashboardCarousel from '@widgets/dashboard/ui/dashboard-carousel';
import DashboardSidebar from '@widgets/dashboard/ui/dashboard-sidebar';
import LinkedinIntegrationCard from '@widgets/dashboard/ui/linkedin-integration-card';
import ResumeCreationCard from '@widgets/dashboard/ui/resume-creation-card';
import WelcomeHeader from '@widgets/dashboard/ui/welcome-header';
import { HomeIcon } from 'lucide-react';
import { Button } from '@shared/ui';
import { useRouter } from 'next/navigation';

export default function DashboardLayout() {
  const { data: user } = useUserProfile();

  const router = useRouter();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen bg-white">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0 m-3">
          <header className="flex justify-end items-center bg-[rgba(245,248,250,1)] p-4 rounded-3xl">
            

            <div className="flex items-center gap-3 ">
              <div className="flex items-center justify-center bg-blue-200 rounded-full overflow-hidden h-[53px] w-[53px]">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.push('/')}
                  className="border-none bg-transparent hover:bg-transparent cursor-pointer"
                >
                  <HomeIcon className="w-full h-full" />
                </Button>
              </div>

              <div className="flex items-center justify-center bg-blue-200 rounded-full overflow-hidden h-[53px] w-[53px]">
                <span className="text-xl font-bold text-gray-600">{user?.firstName?.charAt(0)}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-black leading-[1.375em] tracking-[-1.125%] text-base font-normal">
                  {user ? `${user.firstName} ${user.lastName ?? ''}` : 'Loading...'}
                </span>

                <span className="text-[13px] font-normal leading-[1.385em] text-[rgb(149,157,168)]">
                  {user?.email ?? 'Loading...'}
                </span>
              </div>
            </div>
          </header>

          <main className="flex bg-[rgb(245,248,250)] mt-3 rounded-[36px] overflow-hidden pb-4">
            <div className="flex-1">
              <div className="flex text-start w-full">
                <h1 className="text-[rgb(231,238,243)] font-semibold text-[90px] leading-tight -tracking-[3%] h-[77px] truncate mt-[-25px] ml-[-10px]">
                  DASHBOARD
                </h1>
              </div>

              <WelcomeHeader userName={(user?.firstName ?? '') + ' ' + (user?.lastName ?? '')} />

              <div className="px-4">
                <ResumeCreationCard />
              </div>

              <div className="flex-1 mt-4 px-4">
                <LinkedinIntegrationCard />
              </div>
            </div>

            <div className="w-110 bg-[rgb(235,241,244)] p-4 my-[54px] mr-4 rounded-[20px] shadow ">
              <DashboardCarousel />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
