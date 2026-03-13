'use client';

import { useUserProfile } from '@shared/hooks/use-user';
import { SidebarProvider } from '@shared/ui/sidebar';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { runAnalyzerWithProgress } from '@shared/lib/analyzer/run-analyzer-with-progress';
import DashboardCarousel from '@widgets/dashboard/ui/dashboard-carousel';
import DashboardSidebar from '@widgets/dashboard/ui/dashboard-sidebar';
import ResponsiveDashboardHeader from '@widgets/dashboard/ui/header';
import LinkedinIntegrationCard from '@widgets/dashboard/ui/linkedin-integration-card';
import PageHeading from '@widgets/dashboard/ui/page-heading';
import ResumeCreationCard from '@widgets/dashboard/ui/resume-creation-card';
import WelcomeHeader from '@widgets/dashboard/ui/welcome-header';
import { useFormDataStore } from '@widgets/form-page-builder/models/store';

function DashboardContent() {
  const { data: user, isLoading } = useUserProfile();
  const queryClient = useQueryClient();
  const setIsAnalyzing = useFormDataStore((state) => state.setIsAnalyzing);
  const setAnalyzerError = useFormDataStore((state) => state.setAnalyzerError);
  const setFormData = useFormDataStore((state) => state.setFormData);
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams?.get('action');
  const tId = searchParams?.get('templateId');
  const openModal = searchParams?.get('openModal');

  const [autoAction, setAutoAction] = useState<'from_scratch' | 'upload' | 'tailored_jd' | null>(() => {
    if (action === 'from_scratch' || action === 'upload' || action === 'tailored_jd') return action;
    if (openModal === 'jd') return 'tailored_jd';
    return null;
  });

  useEffect(() => {
    const isNewAction = action === 'from_scratch' || action === 'upload' || action === 'tailored_jd';
    const isLegacyAction = openModal === 'jd';

    if (isNewAction || isLegacyAction) {
      if (isNewAction) setAutoAction(action);
      else setAutoAction('tailored_jd');

      router.replace(tId ? `/dashboard?templateId=${tId}` : '/dashboard');
    }
  }, [action, openModal, tId, router]);
  const templateId = tId;

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
          <ResponsiveDashboardHeader user={user} />

          <main className="flex flex-col md:flex-row bg-dashboard-bg mt-3 rounded-[36px] overflow-hidden pb-4">
            <div className="flex-1">
              <PageHeading title="DASHBOARD" />

              <WelcomeHeader
                userName={isLoading ? '...' : user ? `${user.firstName} ${user.lastName ?? ''}` : 'Guest User'}
              />

              <div className="px-4">
                <ResumeCreationCard autoAction={autoAction} templateId={templateId} />
              </div>

              <div className="flex-1 mt-4 px-4">
                <LinkedinIntegrationCard />
              </div>

              <div className="lg:hidden mt-4 px-4">
                <div className="bg-dashboard-card-bg p-4 rounded-[20px] shadow-none md:shadow">
                  <DashboardCarousel />
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-110 bg-dashboard-card-bg p-4 mt-[54px] mr-4 rounded-[20px] shadow">
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
