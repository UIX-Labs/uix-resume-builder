'use client';
import { useState } from 'react';
import { useGetAllTemplates, type Template } from '@entities/template-page/api/template-data';
import { useUserProfile } from '@shared/hooks/use-user';
import { SidebarProvider } from '@shared/ui/sidebar';
import DashboardHeader from '@widgets/dashboard/ui/dashboard-header';
import DashboardSidebar from '@widgets/dashboard/ui/dashboard-sidebar';
import WelcomeHeader from '@widgets/dashboard/ui/welcome-header';
import { TemplateCard } from '@widgets/templates-page/ui/template-card';
import { PreviewModal } from '@widgets/templates-page/ui/preview-modal';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { createResume, updateResumeTemplate } from '@entities/resume';
import Header from '@widgets/landing-page/ui/header-section';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { getOrCreateGuestEmail } from '@shared/lib/guest-email';
import ResumeCreationModal from '@widgets/dashboard/ui/resume-creation-modal';
import { LinkedInModal } from '@widgets/dashboard/ui/linkedin-integration-card';

export default function GetAllResumesPage() {
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useUserProfile();
  const { data: templates } = useGetAllTemplates();
  const isMobile = useIsMobile();
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Resume Creation Modal State
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [creationTemplate, setCreationTemplate] = useState<Template | null>(null);
  const [activeAction, setActiveAction] = useState<'create' | 'upload' | 'tailoredResume' | 'tailoredJD' | null>(null);
  const [optionsLocked, setOptionsLocked] = useState(false);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);

  const createResumeMutation = useMutation({
    mutationFn: createResume,
  });

  const updateTemplateMutation = useMutation({
    mutationFn: updateResumeTemplate,
  });

  const isLoading = createResumeMutation.isPending || updateTemplateMutation.isPending;

  const lockOptions = (action: 'create' | 'upload' | 'tailoredJD') => {
    setActiveAction(action);
    setOptionsLocked(true);
  };

  const releaseOptions = () => {
    setActiveAction(null);
    setOptionsLocked(false);
  };

  const handleTemplateClick = (template: Template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleMobileUseTemplate = (template: Template) => {
    setCreationTemplate(template);
    setIsCreationModalOpen(true);
  };

  const handleTemplateSelect = async (templateId: string) => {
    try {
      // biome-ignore lint/correctness/noUnusedVariables: guestEmail is used to ensure localStorage has guest email for API calls
      let guestEmail: string | undefined;

      if (!user?.isLoggedIn) {
        guestEmail = getOrCreateGuestEmail();
      } else if (!user) {
        return;
      }

      const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const userName = user ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Guest User';
      const title = `${userName}-Resume-${currentDate}`;

      const data = await createResumeMutation.mutateAsync({
        title,
        userInfo: {
          userId: user?.id ?? '',
        },
      });

      await updateTemplateMutation.mutateAsync({
        resumeId: data.id,
        templateId,
      });

      router.push(`/resume/${data.id}`);
    } catch (error) {
      console.error('Failed to create resume:', error);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen bg-white relative">
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-lg font-semibold text-gray-800">Creating Resume...</p>
              <p className="text-sm text-gray-600">Setting up your workspace</p>
            </div>
          </div>
        )}
        <div className="hidden lg:block">
          <DashboardSidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0 m-3 sm:m-3">
          {isMobile ? <Header /> : <DashboardHeader user={user} />}

          <main className="flex bg-[rgb(245,248,250)] mt-2 sm:mt-3 rounded-[36px] sm:rounded-[36px] overflow-hidden pb-4 h-full">
            <div className="flex-1">
              <div className="flex text-start w-full px-2 sm:px-0">
                <h1 className="text-[rgb(231,238,243)] font-semibold text-[58px] md:text-[90px] leading-tight -tracking-[3%] h-[77px] truncate mt-[-17px] md:mt-[-25px] ml-[-10px] mb-1 md:mb-0">
                  TEMPLATES
                </h1>
              </div>

              <WelcomeHeader
                userName={isUserLoading ? '...' : user ? `${user.firstName} ${user.lastName ?? ''}` : 'Guest User'}
              />

              <div className="flex items-center gap-4 sm:gap-6 my-4 sm:my-6 mx-2 sm:mx-4 justify-center sm:justify-evenly flex-wrap">
                {templates?.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onClick={() => (isMobile ? handleMobileUseTemplate(template) : handleTemplateSelect(template.id))}
                    onPreviewClick={() => handleTemplateClick(template)}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      <PreviewModal template={previewTemplate} isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />

      <ResumeCreationModal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
        onJDModalOpen={() => {}}
        onLinkedInClick={() => setIsLinkedInModalOpen(true)}
        onActionLock={lockOptions}
        onActionRelease={releaseOptions}
        activeAction={activeAction}
        optionsLocked={optionsLocked}
        template={creationTemplate}
      />
      <LinkedInModal isOpen={isLinkedInModalOpen} onClose={() => setIsLinkedInModalOpen(false)} />
    </SidebarProvider>
  );
}
