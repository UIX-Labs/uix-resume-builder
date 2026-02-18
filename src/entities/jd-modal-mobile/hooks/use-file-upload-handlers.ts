import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { useCallback, useRef, useState } from 'react';
import { validateFileWithToast } from '@entities/resume/lib/file-upload-utils';
import { simulateUploadProgress } from '@entities/jd-modal-mobile/lib/upload-progress';
import { ModalStep } from '@entities/jd-modal-mobile/types/types';

export function useFileUploadHandlers() {
  const [currentStep, setCurrentStep] = useState<ModalStep>(ModalStep.UPLOAD_JD);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const jdFileInputRef = useRef<HTMLInputElement>(null);
  const resumeFileInputRef = useRef<HTMLInputElement>(null);

  const handleJDFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!validateFileWithToast(selectedFile)) return;

    setJdFile(selectedFile);
    trackEvent('jd_mobile_file_selected', {
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
    });

    setCurrentStep(ModalStep.UPLOADING_JD);

    simulateUploadProgress(setUploadProgress, () => setCurrentStep(ModalStep.UPLOAD_RESUME));
  }, []);

  const handleResumeFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!validateFileWithToast(selectedFile)) return;

    setResumeFile(selectedFile);
    trackEvent('resume_mobile_file_selected', {
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
    });

    setCurrentStep(ModalStep.UPLOADING_RESUME);

    simulateUploadProgress(setUploadProgress, () => setCurrentStep(ModalStep.READY_TO_ANALYZE));
  }, []);

  const handleJDUploadClick = useCallback(() => {
    trackEvent('jd_mobile_upload_button_click');
    jdFileInputRef.current?.click();
  }, []);

  const handleResumeUploadClick = useCallback(() => {
    trackEvent('resume_mobile_upload_button_click');
    resumeFileInputRef.current?.click();
  }, []);

  const handleRemoveJD = useCallback(() => {
    setJdFile(null);
    setCurrentStep(ModalStep.UPLOAD_JD);
    setUploadProgress(0);
  }, []);

  const handleRemoveResume = useCallback(() => {
    setResumeFile(null);
    setCurrentStep(ModalStep.UPLOAD_RESUME);
  }, []);

  const handleRetryJD = useCallback(() => {
    setJdFile(null);
    setCurrentStep(ModalStep.UPLOAD_JD);
    setUploadProgress(0);
    trackEvent('jd_mobile_retry_click');
  }, []);

  const handleRetryResume = useCallback(() => {
    setResumeFile(null);
    setCurrentStep(ModalStep.UPLOAD_RESUME);
    setUploadProgress(0);
    trackEvent('resume_mobile_retry_click');
  }, []);

  const handleResumeSelected = useCallback(async (resumeId: string) => {
    const mockFile = new File([''], `resume-${resumeId}.pdf`, { type: 'application/pdf' });

    Object.defineProperty(mockFile, 'resumeId', {
      value: resumeId,
      writable: false,
    });

    setResumeFile(mockFile);
    trackEvent('resume_selected_from_saved', {
      resumeId,
    });

    setCurrentStep(ModalStep.UPLOADING_RESUME);
    simulateUploadProgress(setUploadProgress, () => setCurrentStep(ModalStep.READY_TO_ANALYZE));
  }, []);

  const resetState = useCallback(() => {
    setCurrentStep(ModalStep.UPLOAD_JD);
    setJdFile(null);
    setResumeFile(null);
    setUploadProgress(0);
  }, []);

  return {
    currentStep,
    jdFile,
    resumeFile,
    uploadProgress,
    jdFileInputRef,
    resumeFileInputRef,

    handleJDFileSelect,
    handleResumeFileSelect,
    handleJDUploadClick,
    handleResumeUploadClick,
    handleRemoveJD,
    handleRemoveResume,
    handleRetryJD,
    handleRetryResume,
    handleResumeSelected,
    resetState,
  };
}
