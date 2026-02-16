'use client';
import { createResume, useGetAllResumes, type Resume, useResumeData } from '@entities/resume';
import type { ResumeCreationAction, ResumeCreationActionType } from '@entities/dashboard/types/type';
import { useGetTemplateById, useGetAllTemplates } from '@entities/template-page/api/template-data';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { useUserProfile } from '@shared/hooks/use-user';
import { formatDate } from '@shared/lib/date-time';
import { getOrCreateGuestEmail } from '@shared/lib/guest-email';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shared/ui/dropdown';
import { SidebarProvider } from '@shared/ui/sidebar';
import { useMutation } from '@tanstack/react-query';
import DashboardSidebar from '@widgets/dashboard/ui/dashboard-sidebar';
import WelcomeHeader from '@widgets/dashboard/ui/welcome-header';
import ResumeCreationModal from '@widgets/dashboard/ui/resume-creation-modal';
import { LinkedInModal } from '@widgets/dashboard/ui/linkedin-integration-card';
import { DeleteResumeModal } from '@widgets/resumes/ui/delete-resume-modal';
import { ResumeCardMobile } from '@widgets/resumes/ui/resume-card-mobile';
import { PreviewModal } from '@widgets/templates-page/ui/preview-modal';
import { MoreVertical, Trash2, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import PageHeading from '@widgets/dashboard/ui/page-heading';
import AdaptiveDashboardHeader from '@widgets/dashboard/ui/header';
import { Button } from '@shared/ui/components/button';
import JDUploadMobileModal from '@widgets/dashboard/ui/jd-upload-mobile-modal';
import { useJDModal } from '@entities/jd-modal-mobile/hooks/use-jd-modal';

export default function AllResumePage() {
  const { data: user, isLoading } = useUserProfile();
  const { data: resumes } = useGetAllResumes();
  const isMobile = useIsMobile();
  const [previewResumeId, setPreviewResumeId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<ResumeCreationActionType>(null);
  const [optionsLocked, setOptionsLocked] = useState(false);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);

  const { data: previewResumeData } = useResumeData(previewResumeId || '');

  const { data: fetchedTemplate } = useGetTemplateById(previewResumeData?.templateId || null);

  const handleResumePreview = useCallback((resumeId: string) => {
    setPreviewResumeId(resumeId);
    setIsPreviewOpen(true);
  }, []);

  const lockOptions = useCallback(
    (action: ResumeCreationAction.CREATE | ResumeCreationAction.UPLOAD | ResumeCreationAction.TAILORED_JD) => {
      setActiveAction(action);
      setOptionsLocked(true);
    },
    [],
  );

  const releaseOptions = useCallback(() => {
    setActiveAction(null);
    setOptionsLocked(false);
  }, []);

  const { isJDModalOpen, handleJDModal, handleJDSubmittingChange } = useJDModal({
    onRelease: releaseOptions,
  });

  const createResumeMutation = useMutation({
    mutationFn: createResume,
  });

  const router = useRouter();

  const sortedResumes = resumes?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const handleCreateResume = useCallback(async () => {
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    let guestEmail: string | undefined;

    if (!user?.isLoggedIn) {
      guestEmail = getOrCreateGuestEmail();
    } else if (!user) {
      return;
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
    const userName = user ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Guest User';
    const title = `${userName}-Resume-${currentDate}`;

    const data = await createResumeMutation.mutateAsync({
      title: title,
      userInfo: {
        userId: user?.id ?? '',
      },
    });

    router.push(`/resume/${data.id}`);
  }, [user, createResumeMutation, router]);

  const handleClosePreview = useCallback(() => {
    setIsPreviewOpen(false);
    setPreviewResumeId(null);
  }, []);

  const handleCreationModalClose = useCallback(() => {
    setIsCreationModalOpen(false);
  }, []);

  const handleLinkedInModalOpen = useCallback(() => {
    setIsLinkedInModalOpen(true);
  }, []);

  const handleLinkedInModalClose = useCallback(() => {
    setIsLinkedInModalOpen(false);
  }, []);

  const handleJDModalToggle = useCallback(
    (isOpen: boolean) => {
      handleJDModal(isOpen);
    },
    [handleJDModal],
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen bg-white relative">
        <div className="hidden lg:block">
          <DashboardSidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0 m-3">
          <AdaptiveDashboardHeader user={user} />

          <main className="flex flex-col md:flex-row bg-dashboard-bg mt-3 rounded-[36px] overflow-hidden pb-4">
            <div className="flex-1">
              <PageHeading title={isMobile ? 'RESUMES' : 'YOUR RESUMES'} />

              <WelcomeHeader
                userName={isLoading ? '...' : user ? `${user.firstName} ${user.lastName ?? ''}` : 'Guest User'}
              />

              {isMobile && (
                <div className="mx-4 mt-4 flex justify-start">
                  <div className="rounded-2xl border-2 border-blue-300 p-[2.5px]">
                    <Button
                      onClick={() => setIsCreationModalOpen(true)}
                      className="
                        w-44
                        bg-blue-600 hover:bg-blue-700
                        text-white
                        rounded-lg
                        px-10 py-3
                        flex items-center gap-2
                        font-medium
                      "
                    >
                      Create Resume
                      <ChevronDown className="size-4" />
                    </Button>
                  </div>
                </div>
              )}

              <div
                className="flex flex-col gap-3 mt-4 mx-2 justify-center items-center
                sm:flex-row sm:flex-wrap sm:gap-6 sm:mt-6 sm:mx-4 sm:justify-start"
              >
                <Button
                  type="button"
                  variant="outline"
                  className="w-[260px] h-[320px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-400 hover:border-purple-500 transition hidden md:flex"
                  onClick={handleCreateResume}
                >
                  <div className="text-center">
                    <span className="text-3xl text-gray-500">+</span>
                    <p className="text-gray-600 font-medium mt-1">New resume</p>
                  </div>
                </Button>

                {sortedResumes?.map((resume, index) =>
                  isMobile ? (
                    <ResumeCardMobile
                      key={resume.id}
                      resume={resume}
                      onPreview={() => handleResumePreview(resume.id)}
                    />
                  ) : (
                    <ResumeCardDesktop key={resume.id} resume={resume} index={index} />
                  ),
                )}
              </div>
            </div>
          </main>
        </div>
        {isPreviewOpen && (
          <PreviewModal
            isOpen={isPreviewOpen}
            onClose={handleClosePreview}
            template={fetchedTemplate ? fetchedTemplate : null}
            resumeData={previewResumeData}
          />
        )}

        <ResumeCreationModal
          isOpen={isCreationModalOpen}
          onClose={handleCreationModalClose}
          onJDModalOpen={handleLinkedInModalOpen}
          onLinkedInClick={handleLinkedInModalOpen}
          onActionLock={lockOptions}
          onActionRelease={releaseOptions}
          activeAction={activeAction}
          optionsLocked={optionsLocked}
        />

        <LinkedInModal isOpen={isLinkedInModalOpen} onClose={handleLinkedInModalClose} />

        <JDUploadMobileModal
          isOpen={isJDModalOpen}
          onClose={handleJDModalToggle}
          onSubmittingChange={handleJDSubmittingChange}
        />
      </div>
    </SidebarProvider>
  );
}

interface ResumeCardProps {
  resume: Resume;
  index: number;
}

function ResumeCardDesktop({ resume }: ResumeCardProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="relative w-[260px] h-[320px] rounded-2xl bg-white shadow-sm border transition-all duration-300 overflow-hidden group cursor-pointer">
        <div className="w-full h-full overflow-hidden rounded-t-2xl">
          <div className="">
            {resume.publicThumbnail?.url ? (
              <Image src={resume.publicThumbnail.url} width={260} height={320} alt={resume.title} unoptimized />
            ) : (
              <Image src="/images/image-14.svg" alt={resume.title} className="w-full h-full object-contain" fill />
            )}
          </div>

          <div className="absolute bottom-0 px-3 py-2 flex justify-between items-center bg-white p-8 w-full">
            <div className="max-w-[90%]">
              <h3 className="font-medium text-sm truncate">{resume.title}</h3>
              <p className="text-xs text-gray-500">{formatDate(resume.updatedAt)}</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0 cursor-pointer">
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Button
                    className="flex w-full bg-white items-center text-red-600 cursor-pointer"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Resume
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Button
          variant="ghost"
          type="button"
          className="absolute inset-0 rounded-2xl bg-white/70 backdrop-blur-sm flex flex-col justify-center items-center gap-6 text-center transition-all duration-300 opacity-0 group-hover:opacity-70 cursor-pointer text-black h-[85%] rounded-b-none"
          onClick={() => router.push(`/resume/${resume.id}`)}
        >
          <span className="hover:text-blue-500 transition-all duration-300">VIEW RESUME →</span>
        </Button>
      </div>

      <DeleteResumeModal isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} resume={resume} />
    </>
  );
}
