'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useUserProfile } from '@shared/hooks/use-user';
import { SidebarProvider } from '@shared/ui/sidebar';
import { useIsMobile } from '@shared/hooks/use-mobile';

import { useFormDataStore } from '@widgets/form-page-builder/models/store';
import DashboardCarousel from '@widgets/dashboard/ui/dashboard-carousel';
import DashboardHeader from '@widgets/dashboard/ui/dashboard-header';
import DashboardSidebar from '@widgets/dashboard/ui/dashboard-sidebar';
import LinkedinIntegrationCard from '@widgets/dashboard/ui/linkedin-integration-card';
import ResumeCreationCard from '@widgets/dashboard/ui/resume-creation-card';
import WelcomeHeader from '@widgets/dashboard/ui/welcome-header';
import Header from '@widgets/landing-page/ui/header-section';
import { runAnalyzerWithProgress } from '@shared/lib/analyzer/run-analyzer-with-progress';

function DashboardContent() {
  const { data: user, isLoading } = useUserProfile();
  const queryClient = useQueryClient();
  const setIsAnalyzing = useFormDataStore((state) => state.setIsAnalyzing);
  const setAnalyzerError = useFormDataStore((state) => state.setAnalyzerError);
  const setFormData = useFormDataStore((state) => state.setFormData);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [shouldOpenJDModal, setShouldOpenJDModal] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check if we should open the JD modal
    const openModal = searchParams?.get('openModal');
    if (openModal === 'jd') {
      setShouldOpenJDModal(true);
      // Clear the query parameter from URL
      router.replace('/dashboard');
    }
  }, [searchParams, router]);

  useEffect(() => {
    const pendingResumeId = localStorage.getItem('pending_analyzer_resume_id');
    if (!pendingResumeId) {
      return;
    }

    localStorage.removeItem('pending_analyzer_resume_id');

    const resumeId = pendingResumeId;

    const runPendingAnalyzer = async (): Promise<void> => {
      router.push(`/resume/${resumeId}`);

      setTimeout(async () => {
        await runAnalyzerWithProgress({
          resumeId,
          queryClient,
          setFormData,
          setIsAnalyzing,
          setAnalyzerError,
        });
      }, 100);
    };

    void runPendingAnalyzer();
  }, [queryClient, router, setAnalyzerError, setFormData, setIsAnalyzing]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen bg-white">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0 m-3">
          {isMobile ? <Header /> : <DashboardHeader user={user} />}

          <main className="flex flex-col md:flex-row bg-[rgb(245,248,250)] mt-3 rounded-[36px] overflow-hidden pb-4">
            <div className="flex-1">
              <div className="flex text-start w-full">
                <h1 className="text-[rgb(231,238,243)] font-semibold text-[58px] md:text-[90px] leading-tight -tracking-[3%] h-[77px] truncate mt-[-17px] md:mt-[-25px] ml-[-10px] mb-1 md:mb-0">
                  DASHBOARD
                </h1>
              </div>

              <WelcomeHeader
                userName={isLoading ? '...' : user ? `${user.firstName} ${user.lastName ?? ''}` : 'Guest User'}
              />

              <div className="px-4">
                <ResumeCreationCard shouldOpenJDModal={shouldOpenJDModal} />
              </div>

              <div className="flex-1 mt-4 px-4">
                <LinkedinIntegrationCard />
              </div>

              <div className="lg:hidden mt-4 px-4 h-[470px]">
                <div className="bg-[rgb(235,241,244)] p-4 rounded-[20px] shadow">
                  <DashboardCarousel />
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-110 bg-[rgb(235,241,244)] p-4 mt-[54px] mr-4 rounded-[20px] shadow">
              <DashboardCarousel />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  );
}
