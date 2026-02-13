'use client';
import { createResume, updateResumeTemplate } from '@entities/resume';
import { ResumeCreationAction, type ResumeCreationActionType } from '@entities/dashboard/types/type';
import { useGetAllTemplates, type Template } from '@entities/template-page/api/template-data';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { useUserProfile } from '@shared/hooks/use-user';
import { getOrCreateGuestEmail } from '@shared/lib/guest-email';
import { SidebarProvider } from '@shared/ui/sidebar';
import { useMutation } from '@tanstack/react-query';
import DashboardSidebar from '@widgets/dashboard/ui/dashboard-sidebar';
import { LinkedInModal } from '@widgets/dashboard/ui/linkedin-integration-card';
import PageHeading from '@widgets/dashboard/ui/page-heading';
import ResumeCreationModal from '@widgets/dashboard/ui/resume-creation-modal';
import WelcomeHeader from '@widgets/dashboard/ui/welcome-header';
import { PreviewModal } from '@widgets/templates-page/ui/preview-modal';
import { TemplateCard } from '@widgets/templates-page/ui/template-card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ResponsiveHeader from '@widgets/dashboard/ui/header';
import JDUploadMobileModal from '@widgets/dashboard/ui/jd-upload-mobile-modal';
import { useJDModal } from '@entities/jd-modal-mobile/hooks/use-jd-modal';

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
  const [activeAction, setActiveAction] = useState<ResumeCreationActionType>(null);
  const [optionsLocked, setOptionsLocked] = useState(false);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);

  const createResumeMutation = useMutation({
    mutationFn: createResume,
  });

  const updateTemplateMutation = useMutation({
    mutationFn: updateResumeTemplate,
  });

  const isLoading = createResumeMutation.isPending || updateTemplateMutation.isPending;

  const lockOptions = (
    action: ResumeCreationAction.CREATE | ResumeCreationAction.UPLOAD | ResumeCreationAction.TAILORED_JD,
  ) => {
    setActiveAction(action);
    setOptionsLocked(true);
  };

  const releaseOptions = () => {
    setActiveAction(null);
    setOptionsLocked(false);
  };

  const { isJDModalOpen, handleJDModalOpen, handleJDModalClose, handleJDSubmittingChange } = useJDModal({
    onRelease: releaseOptions,
  });

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

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
  };

  const handleCreationModalClose = () => {
    setIsCreationModalOpen(false);
  };

  const handleLinkedInModalOpen = () => {
    setIsLinkedInModalOpen(true);
  };

  const handleLinkedInModalClose = () => {
    setIsLinkedInModalOpen(false);
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

        <div className="flex-1 flex flex-col min-w-0 m-3">
          <ResponsiveHeader user={user} />

          <main className="flex flex-col md:flex-row bg-dashboard-bg mt-3 rounded-[36px] overflow-hidden pb-4">
            <div className="flex-1">
              <PageHeading title="TEMPLATES" />

              <WelcomeHeader
                userName={isUserLoading ? '...' : user ? `${user.firstName} ${user.lastName ?? ''}` : 'Guest User'}
              />

              <div className="flex items-center gap-4 sm:gap-6 my-4 sm:my-6 mx-2 sm:mx-4 justify-center sm:justify-evenly flex-wrap">
                {templates?.map((template) => {
                  const handleClick = () => {
                    if (isMobile) {
                      handleMobileUseTemplate(template);
                    } else {
                      handleTemplateSelect(template.id);
                    }
                  };

                  const handlePreview = () => {
                    handleTemplateClick(template);
                  };

                  return (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onClick={handleClick}
                      onPreviewClick={handlePreview}
                    />
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      </div>

      <PreviewModal template={previewTemplate} isOpen={isPreviewOpen} onClose={handlePreviewClose} />

      <ResumeCreationModal
        isOpen={isCreationModalOpen}
        onClose={handleCreationModalClose}
        onJDModalOpen={handleJDModalOpen}
        onLinkedInClick={handleLinkedInModalOpen}
        onActionLock={lockOptions}
        onActionRelease={releaseOptions}
        activeAction={activeAction}
        optionsLocked={optionsLocked}
        template={creationTemplate}
      />
      <LinkedInModal isOpen={isLinkedInModalOpen} onClose={handleLinkedInModalClose} />

      <JDUploadMobileModal
        isOpen={isJDModalOpen}
        onClose={handleJDModalClose}
        onSubmittingChange={handleJDSubmittingChange}
      />
    </SidebarProvider>
  );
}
