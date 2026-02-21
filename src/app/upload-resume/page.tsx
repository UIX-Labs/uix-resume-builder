'use client';

import { formatFileSize, useParsePdfResume, validateFile } from '@entities/resume';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { useUserProfile } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { getOrCreateGuestEmail } from '@shared/lib/guest-email';
import Header from '@widgets/landing-page/ui/header-section';
import { UploadState } from '@widgets/upload-resume/lib/upload-state';
import { Breadcrumb } from '@widgets/upload-resume/ui/breadcrumb';
import { DeleteModal } from '@widgets/upload-resume/ui/delete-modal';
import { SelectState } from '@widgets/upload-resume/ui/select-state';
import { SuccessState } from '@widgets/upload-resume/ui/success-state';
import { UploadingState } from '@widgets/upload-resume/ui/uploading-state';
import { notFound, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function UploadResumePage() {
  const router = useRouter();
  const user = useUserProfile();
  const isMobile = useIsMobile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState({
    uploadState: UploadState.SELECT,
    uploadProgress: 0,
    uploadedFile: null as File | null,
    showDeleteModal: false,
    resumeId: null as string | null,
    uploadError: null as string | null,
  });

  const { mutate: parsePdfResume } = useParsePdfResume();

  // Show 404 if accessed from non-mobile device
  useEffect(() => {
    if (isMobile === false) {
      notFound();
    }
  }, [isMobile]);

  const uploadResume = useCallback(
    (file: File) => {
      setState((prev) => ({
        ...prev,
        uploadState: UploadState.UPLOADING,
        uploadProgress: 0,
        uploadError: null,
      }));

      const progressInterval = setInterval(() => {
        setState((prev) => {
          if (prev.uploadProgress >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return { ...prev, uploadProgress: prev.uploadProgress + 10 };
        });
      }, 300);

      parsePdfResume(file, {
        onSuccess: (data: any) => {
          clearInterval(progressInterval);
          setState((prev) => ({ ...prev, uploadProgress: 100, resumeId: data.resumeId }));

          setTimeout(() => {
            setState((prev) => ({ ...prev, uploadState: UploadState.SUCCESS }));
            trackEvent('resume_upload_success', {
              source: 'upload_resume_page',
              file_name: file.name,
              file_size: file.size,
              resume_id: data.resumeId,
              user_type: user.data?.isLoggedIn ? 'logged_in' : 'guest',
            });
          }, 300);
        },
        onError: (error: any) => {
          clearInterval(progressInterval);
          const errorMessage = error?.message || 'Upload failed. Please try again.';
          setState((prev) => ({
            ...prev,
            uploadError: errorMessage,
            uploadState: UploadState.SELECT,
            uploadProgress: 0,
          }));
        },
      });
    },
    [parsePdfResume, user.data?.isLoggedIn],
  );

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const validation = validateFile(file);

      if (!validation.valid) {
        setState((prev) => ({ ...prev, uploadError: validation.error || 'unknown' }));
        return;
      }

      setState((prev) => ({ ...prev, uploadedFile: file }));

      if (!user.data?.isLoggedIn) {
        getOrCreateGuestEmail();
      }

      trackEvent('resume_upload_started', {
        source: 'upload_resume_page',
        file_name: file.name,
        file_size: file.size,
        user_type: user.data?.isLoggedIn ? 'logged_in' : 'guest',
      });

      uploadResume(file);
    },
    [user.data?.isLoggedIn, uploadResume],
  );

  const handleSelectResume = useCallback(() => {
    setState((prev) => ({ ...prev, uploadError: null }));

    trackEvent('select_resume_click', {
      source: 'upload_resume_page',
      user_type: user.data?.isLoggedIn ? 'logged_in' : 'guest',
    });

    fileInputRef.current?.click();
  }, [user.data?.isLoggedIn]);

  const handleDeleteClick = useCallback(() => {
    setState((prev) => ({ ...prev, showDeleteModal: true }));
  }, []);

  const handleCloseUpload = useCallback(() => {
    setState((prev) => ({
      ...prev,
      uploadState: UploadState.SELECT,
      uploadProgress: 0,
      uploadedFile: null,
      resumeId: null,
      uploadError: null,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    setState({
      uploadState: UploadState.SELECT,
      uploadProgress: 0,
      uploadedFile: null,
      showDeleteModal: false,
      resumeId: null,
      uploadError: null,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    trackEvent('resume_upload_deleted', {
      source: 'upload_resume_page',
      resume_id: state.resumeId,
      user_type: user.data?.isLoggedIn ? 'logged_in' : 'guest',
    });
  }, [state.resumeId, user.data?.isLoggedIn]);

  const handleDeleteCancel = useCallback(() => {
    setState((prev) => ({ ...prev, showDeleteModal: false }));
  }, []);

  const handleRetryUpload = useCallback(() => {
    if (state.uploadedFile) {
      uploadResume(state.uploadedFile);
      trackEvent('resume_upload_retry', {
        source: 'upload_resume_page',
        file_name: state.uploadedFile.name,
        user_type: user.data?.isLoggedIn ? 'logged_in' : 'guest',
      });
    }
  }, [state.uploadedFile, uploadResume, user.data?.isLoggedIn]);

  const handleAutoFillResume = useCallback(() => {
    if (!state.resumeId) {
      console.error('No resume ID available');
      return;
    }

    trackEvent('auto_fill_resume_click', {
      source: 'upload_resume_page',
      file_name: state.uploadedFile?.name || '',
      resume_id: state.resumeId,
      user_type: user.data?.isLoggedIn ? 'logged_in' : 'guest',
    });

    router.push(`/resume/${state.resumeId}?importSource=pdf`);
  }, [state.resumeId, state.uploadedFile?.name, user.data?.isLoggedIn, router]);

  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);

  if (!isMobile) {
    return null;
  }

  const displayFileName = state.uploadedFile?.name || '';
  const displayFileSize = state.uploadedFile ? formatFileSize(state.uploadedFile.size) : '';

  const renderUploadStateContent = () => {
    switch (state.uploadState) {
      case UploadState.SELECT:
        return <SelectState uploadError={state.uploadError} onSelectResume={handleSelectResume} />;

      case UploadState.UPLOADING:
        return (
          <UploadingState
            fileName={displayFileName}
            fileSize={displayFileSize}
            uploadProgress={state.uploadProgress}
            onCloseUpload={handleCloseUpload}
          />
        );

      case UploadState.SUCCESS:
        return (
          <SuccessState
            fileName={displayFileName}
            fileSize={displayFileSize}
            onRetryUpload={handleRetryUpload}
            onDeleteClick={handleDeleteClick}
            onAutoFillResume={handleAutoFillResume}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileSelect}
        className="hidden"
      />

      <Header />

      <main
        className="flex-1 bg-[#F5F8FA] px-4 py-6 rounded-[36px] m-3 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/bg.png)' }}
      >
        {state.uploadState !== UploadState.UPLOADING && <Breadcrumb onBackClick={handleBackClick} />}

        {renderUploadStateContent()}
      </main>

      <DeleteModal isOpen={state.showDeleteModal} onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />
    </div>
  );
}
