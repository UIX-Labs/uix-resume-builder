'use client';

import { ResumeCreationAction, type ResumeCreationActionType } from '@entities/dashboard/types/type';
import { createResume, updateResumeTemplate } from '@entities/resume';
import type { Template } from '@entities/template-page/api/template-data';
import { useUserProfile } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { getOrCreateGuestEmail } from '@shared/lib/guest-email';
import { AuthRedirectModal } from '@shared/ui/components/auth-redirect-modal';
import { Modal, ModalBody } from '@shared/ui/components/modal';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

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

  // const handleUploadResumeClick = useCallback(() => {
  //   trackEvent('upload_resume_click', {
  //     source: template ? 'template_modal' : 'dashboard_modal',
  //     device: 'mobile',
  //   });
  //   router.push('/upload-resume');
  // }, [template, router]);

  const handleUploadClick = () => {
    trackEvent('create_resume_click', { source: 'dashboard_modal', method: 'upload_existing' });
    router.push('/dashboard?action=upload');
  };

  const handleLinkedInClick = useCallback(() => {
    trackEvent('create_resume_click', {
      source: template ? 'template_modal' : 'dashboard_modal',
      method: 'linkedin_autofill',
    });
    onLinkedInClick();
    onClose();
  }, [template, onLinkedInClick, onClose]);

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
  //     source: 'dashboard_modal', method: 'tailored_with_jd',
  //   });
  //   router.push('/dashboard?action=tailored_with_jd');

  const handleOpenTailoredWithJD = () => {
    trackEvent('create_resume_click', {
      source: 'dashboard_modal',
      method: 'tailored_with_jd',
    });

    if (!user.data?.isLoggedIn) {
      localStorage.setItem('openJDModal', 'true');
      router.push('/auth');
      return;
    }

    router.push('/dashboard?action=tailored_jd');
  };

  // const handleUploadClick = () => {
  // trackEvent('create_resume_click',
  //   { source: 'dashboard_modal', method: 'upload_existing', });
  //   router.push('/dashboard?action=upload');
  // };

  // Guest users must login for Tailored JD flow
  //   if (!user.data?.id || !user.data?.isLoggedIn) {
  //     localStorage.setItem('openJDModal', 'true');
  //     setIsAuthModalOpen(true);
  //     return;
  //   }

  //   onActionLock(ResumeCreationAction.TAILORED_JD);
  //   onClose();
  //   onJDModalOpen();
  // };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="w-[90vw] max-w-[832px] md:max-w-[500px] border border-[#D5E5FF] rounded-[36px]"
        showCloseButton={true}
        closeButtonVariant="default"
        overlayClassName="backdrop-blur-md"
      >
        <ModalBody className="px-8 sm:px-12 py-8 sm:py-10">
          {/* Heading */}
          <div className="text-center mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Let&apos;s get <span className="text-blue-600">Started</span>
            </h2>
            <p className="text-gray-400 mt-1 text-base">How do you want to create your Resume?</p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-4 mt-6">
            {/* Start from Scratch */}
            <button
              type="button"
              onClick={resumeCreateHandler}
              disabled={optionsLocked && activeAction !== ResumeCreationAction.CREATE}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-xl border border-gray-200 bg-white hover:bg-[#FFE4E1] transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Image src="/images/from-scratch.svg" alt="" width={24} height={24} />
              <span className="text-gray-700 font-medium text-base">Start from Scratch</span>
            </button>

            {/* Upload Existing Resume */}
            <button
              type="button"
              onClick={handleUploadClick}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-xl border border-gray-200 bg-white hover:bg-[#F3E8FF] transition-colors text-left cursor-pointer"
            >
              <Image src="/images/file_upload.svg" alt="" width={24} height={24} />
              <span className="text-gray-700 font-medium text-base">Upload Existing Resume</span>
            </button>

            {/* Import from LinkedIn */}
            <button
              type="button"
              onClick={handleLinkedInClick}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-xl border border-gray-200 bg-white hover:bg-[#E0F7FA] transition-colors text-left cursor-pointer"
            >
              <Image src="/images/auto_mode.svg" alt="" width={24} height={24} />
              <span className="text-gray-700 font-medium text-base">Import from LinkedIn/ Use LinkedIn Resume</span>
            </button>

            {/* Tailored with Job Description */}
            <button
              type="button"
              onClick={handleOpenTailoredWithJD}
              disabled={optionsLocked && activeAction !== ResumeCreationAction.TAILORED_JD}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-xl border border-gray-200 bg-white hover:bg-[#E0F2F1] transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Image src="/images/file_open.svg" alt="" width={24} height={24} />
              <span className="text-gray-700 font-medium text-base">Tailored with Job Description</span>
            </button>
          </div>
        </ModalBody>
      </Modal>

      <AuthRedirectModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        redirectUrl="/auth"
        title="Login Required"
        description="You need to login to use Tailored with JD."
      />
    </>
  );
}
