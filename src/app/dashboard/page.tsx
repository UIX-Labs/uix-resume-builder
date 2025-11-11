'use client';

import { useState, useEffect, useMemo } from 'react';
import { useUserProfile } from '@shared/hooks/use-user';
import { SidebarProvider } from '@shared/ui/sidebar';
import DashboardCarousel from '@widgets/dashboard/ui/dashboard-carousel';
import DashboardSidebar from '@widgets/dashboard/ui/dashboard-sidebar';
import LinkedinIntegrationCard from '@widgets/dashboard/ui/linkedin-integration-card';
import ResumeCreationCard from '@widgets/dashboard/ui/resume-creation-card';
import WelcomeHeader from '@widgets/dashboard/ui/welcome-header';
import { Search, Users, TrendingUp } from 'lucide-react';

export default function DashboardLayout() {
  const { data: user } = useUserProfile();
  const [showBuilderIntelligenceOverlay, setShowBuilderIntelligenceOverlay] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const steps = useMemo(
    () => [
      { key: 'scanning', type: 'single' as const, title: 'Scanning Resume', icon: 'dot' as const, duration: 2200 },
      { key: 'parsing', type: 'single' as const, title: 'Parsing & Mapping', icon: 'users' as const, duration: 2200 },
      {
        key: 'preparing',
        type: 'single' as const,
        title: 'Preparing Suggestions',
        icon: 'trend' as const,
        duration: 2200,
      },
    ],
    [],
  );

  useEffect(() => {
    if (!showBuilderIntelligenceOverlay) {
      setActiveStepIndex(0);
      setIsFading(false);
      return;
    }

    let stepTimer: ReturnType<typeof setTimeout> | undefined;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;

    const scheduleNext = (currentIndex: number) => {
      const currentStep = steps[currentIndex];
      stepTimer = setTimeout(() => {
        setIsFading(true);
        fadeTimer = setTimeout(() => {
          const nextIndex = (currentIndex + 1) % steps.length;
          setActiveStepIndex(nextIndex);
          setIsFading(false);
          scheduleNext(nextIndex);
        }, 300);
      }, currentStep.duration);
    };

    scheduleNext(0);

    return () => {
      if (stepTimer) {
        clearTimeout(stepTimer);
      }
      if (fadeTimer) {
        clearTimeout(fadeTimer);
      }
    };
  }, [showBuilderIntelligenceOverlay, steps]);

  return (
    <SidebarProvider>
      {showBuilderIntelligenceOverlay && (
        <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-gradient-to-br from-[#081a3c] via-[#0b1120] to-[#0f265c]">
          <div className="flex items-center justify-center flex-1">
            <div className="relative w-[500px] h-[500px] rounded-full overflow-hidden shadow-[0_0_60px_rgba(15,58,187,0.6)]">
              <video
                src="/videos/scanning-animation-resize.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Optional glowing border ring */}
              <div className="absolute inset-0 rounded-full ring-2 ring-[#2e7dff]/50 animate-pulse" />
            </div>
          </div>
          <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-3 px-4">
            <div
              className={`transition-all duration-300 ${
                isFading ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
              }`}
            >
              {steps[activeStepIndex].type === 'single' && (
                <div className="flex items-center gap-3">
                  {steps[activeStepIndex].icon === 'dot' && (
                    <div className="w-4 h-4 rounded-full bg-white/20 border border-white/30" />
                  )}
                  {steps[activeStepIndex].icon === 'users' && (
                    <Users className="w-5 h-5 text-white" strokeWidth={1.5} />
                  )}
                  {steps[activeStepIndex].icon === 'trend' && (
                    <TrendingUp className="w-5 h-5 text-white" strokeWidth={1.5} />
                  )}
                  <p className="text-white text-2xl font-medium">{steps[activeStepIndex].title}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex min-h-screen w-screen bg-white">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0 m-3">
          <header className="flex justify-between items-center bg-[rgba(245,248,250,1)] p-4 rounded-3xl">
            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-[30px] min-w-[309px] h-12">
              <Search className="flex-shrink-0 w-6 h-6 text-[rgb(149,157,168)]" />

              <input
                type="text"
                placeholder="search template"
                className="flex-1 border-none outline-none bg-transparent text-base text-[rgb(149,157,168)] leading-[1.375em] tracking-[-1.125%]"
              />
            </div>

            <div className="flex items-center gap-3">
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
                <ResumeCreationCard onBuilderIntelligenceSubmittingChange={setShowBuilderIntelligenceOverlay} />
              </div>

              <div className="flex-1 mt-4 px-4">
                <LinkedinIntegrationCard />
              </div>
            </div>

            <div className="w-110 bg-[rgb(235,241,244)] p-4 mt-[54px] mr-4 rounded-[20px] shadow overflow-hidden">
              <DashboardCarousel />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
