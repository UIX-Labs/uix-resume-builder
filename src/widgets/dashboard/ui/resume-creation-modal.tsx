'use client';

import { createResume, updateResumeTemplate } from '@entities/resume';
import { ResumeCreationAction, type ResumeCreationActionType } from '@entities/dashboard/types/type';
import { useUserProfile } from '@shared/hooks/use-user';
import type { Template } from '@entities/template-page/api/template-data';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { getOrCreateGuestEmail } from '@shared/lib/guest-email';
import { Button } from '@shared/ui/components/button';
import { Modal, ModalBody } from '@shared/ui/components/modal';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthRedirectModal } from '@shared/ui/components/auth-redirect-modal';
import Image from 'next/image';
import { useIsMobile } from '@shared/hooks/use-mobile';

interface ResumeCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJDModalOpen: () => void;
  onLinkedInClick: () => void;
  onActionLock: (
    action: ResumeCreationAction.CREATE | ResumeCreationAction.UPLOAD | ResumeCreationAction.TAILORED_JD,
  ) => void;
  onActionRelease: () => void;
  activeAction: ResumeCreationActionType;
  optionsLocked: boolean;
  template?: Template | null;
}

export default function ResumeCreationModal({
  isOpen,
  onClose,
  onLinkedInClick,
  onActionLock,
  onActionRelease,
  activeAction,
  optionsLocked,
  template,
}: ResumeCreationModalProps) {
  const router = useRouter();
  const user = useUserProfile();
  const createResumeMutation = useMutation({
    mutationFn: createResume,
  });

  const updateTemplateMutation = useMutation({
    mutationFn: updateResumeTemplate,
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const getTitle = () => {
    if (template) {
      const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const userName = user.data ? `${user.data.firstName} ${user.data.lastName || ''}`.trim() : 'Guest User';
      return `${userName}-Resume-${currentDate}`;
    }

    return 'Frontend Engineer Resume';
  };

  const resumeCreateHandler = async () => {
    onActionLock(ResumeCreationAction.CREATE);
    onClose();

    trackEvent('create_resume_click', {
      source: template ? 'template_modal' : 'dashboard_modal',
      method: 'from_scratch',
      ...(template && { templateId: template.id }),
    });

    // For guest users, create guest email for API tracking
    if (!user.data?.isLoggedIn) {
      getOrCreateGuestEmail();
    }

    if (!user.data?.id && user.data?.isLoggedIn) {
      onActionRelease();
      return;
    }

    try {
      const title = getTitle();

      const data = await createResumeMutation.mutateAsync({
        title,
        userInfo: {
          userId: user.data?.id ?? '',
        },
      });

      if (template) {
        await updateTemplateMutation.mutateAsync({
          resumeId: data.id,
          templateId: template.id,
        });
      }
      router.push(`/resume/${data.id}`);
    } catch (error) {
      console.error('Failed to create resume:', error);
      onActionRelease();
    }
  };

  // const handleUploadSuccess = async (data: any) => {
  //   trackEvent('resume_uploaded', {
  //     source: template ? 'template_modal' : 'dashboard_modal',
  //     resumeId: data.resumeId,
  //     ...(template && { templateId: template.id }),
  //   });

  //   if (template) {
  //     try {
  //       await updateTemplateMutation.mutateAsync({
  //         resumeId: data.resumeId,
  //         templateId: template.id,
  //       });
  //     } catch (error) {
  //       console.error('Failed to apply template to uploaded resume:', error);
  //     }
  //   }

  //   setTimeout(() => {
  //     router.push(`/resume/${data.resumeId}`);
  //   }, 300);
  // };

  // const handleUploadError = (error: any) => {
  //   onActionRelease();
  //   console.error('Upload error:', error);
  // };

  // const handleUploadPendingChange = (pending: boolean) => {
  //   if (pending) {
  //     onActionLock('upload');
  //     onClose();
  //     return;
  //   }

  //   if (activeAction === 'upload') {
  //     onActionRelease();
  //   }
  // };

  // const handleOpenTailoredWithJD = () => {
  //   trackEvent('create_resume_click', {
  //     source: template ? 'template_modal' : 'dashboard_modal',
  //     method: 'tailored_with_jd',
  //   });

  //   // Guest users must login for Tailored JD flow
  //   if (!user.data?.id || !user.data?.isLoggedIn) {
  //     localStorage.setItem('openJDModal', 'true');
  //     setAuthRedirectUrl('/auth?callbackUrl=' + encodeURIComponent('/dashboard'));
  //     setIsAuthModalOpen(true);
  //     return;
  //   }

  //   onActionLock('tailoredJD');
  //   onClose();
  //   onJDModalOpen();
  // };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="w-[300px] sm:w-[380px]"
        showCloseButton={true}
        closeButtonVariant="custom"
        title="Create Resume"
      >
        <ModalBody className="">
          <div className="divide-y divide-gray-100">
            {/* From Scratch */}
            <Button
              onClick={resumeCreateHandler}
              disabled={optionsLocked && activeAction !== ResumeCreationAction.CREATE}
              className="w-full flex items-center justify-start gap-3 px-0 pb-6 transition-colors bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-left text-base"
            >
              {/* <FileText className="w-5 h-5 text-gray-500 flex-shrink-0" /> */}
              <Image src="/images/from-scratch.svg" alt="" width={24} height={24} />
              <span className="text-gray-700 font-normal">From Scratch</span>
            </Button>

            {/* Upload Resume */}
            <div className="relative">
              <Button
                onClick={resumeCreateHandler}
                className="w-full flex items-center justify-start gap-3 px-0 py-6 transition-colors hover:bg-gray-50 bg-white text-left text-base"
              >
                <Image src="/images/file_upload.svg" alt="" width={24} height={24} />
                <span className="text-gray-700 font-normal">Upload Resume</span>
              </Button>
              {/* <FileUpload
                onSuccess={handleUploadSuccess}
                onError={handleUploadError}
                onPendingChange={handleUploadPendingChange}
                disabled={optionsLocked && activeAction !== 'upload'}
                renderAsOverlay={true}
                onUploadClick={() => {
                  if (isMobile) {
                    setShowMobileView(true);
                    onClose();
                    trackEvent('upload_resume_click', {
                      source: template ? 'template_modal' : 'dashboard_modal',
                      blocked: 'mobile_device',
                    });
                    return false; // Prevent upload
                  }

                  trackEvent('upload_resume_click', {
                    source: template ? 'template_modal' : 'dashboard_modal',
                  });
                  // For guest users, create guest email for API tracking
                  if (!user.data?.isLoggedIn) {
                    getOrCreateGuestEmail();
                  }
                }}
              /> */}
            </div>

            {/* Auto-fill via LinkedIn */}
            <Button
              onClick={() => {
                trackEvent('create_resume_click', {
                  source: template ? 'template_modal' : 'dashboard_modal',
                  method: 'linkedin_autofill',
                });
                onLinkedInClick();
                onClose();
              }}
              className="w-full flex items-center justify-start gap-3 px-0 py-6 transition-colors text-left text-base bg-white"
            >
              <Image src="/images/auto_mode.svg" alt="" width={24} height={24} />

              <span className="text-gray-700 font-normal">Auto-fill via Linkedin</span>
            </Button>

            {/* Tailored with JD - Recommended */}
            <Button
              onClick={resumeCreateHandler}
              disabled={optionsLocked && activeAction !== ResumeCreationAction.TAILORED_JD}
              className="w-full flex items-center justify-start gap-3 px-0 py-6 transition-colors text-left text-base bg-white"
            >
              <Image src="/images/file_open.svg" alt="" width={24} height={24} />
              <span className="text-gray-700 font-normal">Tailored with JD</span>
              <span className="bg-green-500 text-white text-xs font-medium rounded-md px-2 py-0.5">recommended</span>
            </Button>
          </div>

          {/* Template Image Section */}
          {template && (
            <div className="pt-4 flex gap-4 items-end">
              <div className="relative min-w-[180px] h-[254px] rounded-lg overflow-hidden shadow-md border border-gray-200">
                <Image
                  src={template.publicImageUrl}
                  alt={`Template ${template.id}`}
                  fill
                  className="object-fill"
                  unoptimized
                />
              </div>
              <div className="pb-4 text-gray-400 text-sm -rotate-90 origin-bottom-left translate-x-8 whitespace-nowrap">
                selected template
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>

      <AuthRedirectModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        redirectUrl=""
        title="Login Required"
        description="You need to login to use Tailored with JD."
      />
    </>
  );
}