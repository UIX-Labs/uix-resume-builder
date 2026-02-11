'use client';

import Header from '@widgets/landing-page/ui/header-section';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { getOrCreateGuestEmail } from '@shared/lib/guest-email';
import { useUserProfile } from '@shared/hooks/use-user';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { notFound } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { formatFileSize, useParsePdfResume, validateFile } from '@entities/resume';
import { Breadcrumb } from '@widgets/upload-resume/ui/breadcrumb';
import { SelectState } from '@widgets/upload-resume/ui/select-state';
import { UploadingState } from '@widgets/upload-resume/ui/uploading-state';
import { SuccessState } from '@widgets/upload-resume/ui/success-state';
import { DeleteModal } from '@widgets/upload-resume/ui/delete-modal';

enum UploadState {
  SELECT = 'select',
  UPLOADING = 'uploading',
  SUCCESS = 'success',
}

export default function UploadResumePage() {
  const router = useRouter();
  const user = useUserProfile();
  const isMobile = useIsMobile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadState, setUploadState] = useState<UploadState>(UploadState.SELECT);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { mutate: parsePdfResume } = useParsePdfResume();

  // Show 404 if accessed from non-mobile device
  useEffect(() => {
    if (isMobile === false) {
      notFound();
    }
  }, [isMobile]);

  const uploadResume = (file: File) => {
    setUploadState(UploadState.UPLOADING);
    setUploadProgress(0);
    setUploadError(null);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    parsePdfResume(file, {
      onSuccess: (data: any) => {
        clearInterval(progressInterval);
        setUploadProgress(100);
        setResumeId(data.resumeId);

        setTimeout(() => {
          setUploadState(UploadState.SUCCESS);
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
        setUploadError(errorMessage);
        setUploadState(UploadState.SELECT);
        setUploadProgress(0);

        trackEvent('resume_upload_error', {
          source: 'upload_resume_page',
          error: errorMessage,
          file_name: file.name,
          user_type: user.data?.isLoggedIn ? 'logged_in' : 'guest',
        });
      },
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateFile(file);

    if (!validation.valid) {
      setUploadError(validation.error || 'unknown');
      trackEvent('resume_upload_error', {
        source: 'upload_resume_page',
        error: validation.error,
        user_type: user.data?.isLoggedIn ? 'logged_in' : 'guest',
      });
      return;
    }

    setUploadedFile(file);

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
  };

  const handleSelectResume = () => {
    setUploadError(null);

    trackEvent('select_resume_click', {
      source: 'upload_resume_page',
      user_type: user.data?.isLoggedIn ? 'logged_in' : 'guest',
    });

    fileInputRef.current?.click();
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseUpload = () => {
    setUploadState(UploadState.SELECT);
    setUploadProgress(0);
    setUploadedFile(null);
    setResumeId(null);
    setUploadError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    setUploadState(UploadState.SELECT);
    setUploadProgress(0);
    setUploadedFile(null);
    setResumeId(null);
    setUploadError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    trackEvent('resume_upload_deleted', {
      source: 'upload_resume_page',
      resume_id: resumeId,
      user_type: user.data?.isLoggedIn ? 'logged_in' : 'guest',
    });
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleRetryUpload = () => {
    if (uploadedFile) {
      uploadResume(uploadedFile);
      trackEvent('resume_upload_retry', {
        source: 'upload_resume_page',
        file_name: uploadedFile.name,
        user_type: user.data?.isLoggedIn ? 'logged_in' : 'guest',
      });
    }
  };

  const handleAutoFillResume = () => {
    if (!resumeId) {
      console.error('No resume ID available');
      return;
    }

    trackEvent('auto_fill_resume_click', {
      source: 'upload_resume_page',
      file_name: uploadedFile?.name || '',
      resume_id: resumeId,
      user_type: user.data?.isLoggedIn ? 'logged_in' : 'guest',
    });

    router.push(`/resume/${resumeId}`);
  };

  const handleBackClick = () => {
    router.back();
  };

  if (!isMobile) {
    return null;
  }

  const displayFileName = uploadedFile?.name || '';
  const displayFileSize = uploadedFile ? formatFileSize(uploadedFile.size) : '';

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

      <main className="flex-1 bg-[#F5F8FA] px-4 py-6 rounded-2xl m-3">
        {uploadState !== UploadState.UPLOADING && <Breadcrumb onBackClick={handleBackClick} />}

        {uploadState === UploadState.SELECT && (
          <SelectState uploadError={uploadError} onSelectResume={handleSelectResume} />
        )}
        {uploadState === UploadState.UPLOADING && (
          <UploadingState
            fileName={displayFileName}
            fileSize={displayFileSize}
            uploadProgress={uploadProgress}
            onCloseUpload={handleCloseUpload}
          />
        )}
        {uploadState === UploadState.SUCCESS && (
          <SuccessState
            fileName={displayFileName}
            fileSize={displayFileSize}
            onRetryUpload={handleRetryUpload}
            onDeleteClick={handleDeleteClick}
            onAutoFillResume={handleAutoFillResume}
          />
        )}
      </main>

      <DeleteModal isOpen={showDeleteModal} onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />
    </div>
  );
}
