'use client';

import { formatFileSize } from '@entities/resume';
import { Dialog, DialogContent } from '@shared/ui/dialog';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { uploadResumeForReview } from '../api/upload-for-review';
import { MAX_EXPERT_REVIEW_FILE_BYTES, isExpertReviewFileTypeValid } from '../constants';
import { ProgressView } from './views/progress-view';
import { SuccessView } from './views/success-view';
import { UploadView } from './views/upload-view';

enum ExpertReviewStep {
  UPLOAD = 'upload',
  CONFIRM = 'confirm',
  PROGRESS = 'progress',
  SUCCESS = 'success',
}

interface ExpertReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExpertReviewModal({ isOpen, onClose }: ExpertReviewModalProps) {
  const [step, setStep] = useState<ExpertReviewStep>(ExpertReviewStep.UPLOAD);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSizeBytes, setFileSizeBytes] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(ExpertReviewStep.UPLOAD);
      setUploadProgress(0);
      setFileName('');
      setSelectedFile(null);
      setFileSizeBytes(0);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSignIn = () => {
    const pathname = window.location.pathname;
    const callbackUrl = encodeURIComponent(`${pathname}?expertReview=open`);
    window.location.href = `/auth?callbackUrl=${callbackUrl}`;
  };

  const handleFileSelected = (file: File) => {
    if (!isExpertReviewFileTypeValid(file)) {
      toast.error('Please upload a PDF or Word document (.pdf, .doc, .docx).');
      return;
    }
    if (file.size > MAX_EXPERT_REVIEW_FILE_BYTES) {
      toast.error('File size must be 4 MB or less for expert review.');
      return;
    }
    setSelectedFile(file);
    setFileName(file.name);
    setStep(ExpertReviewStep.CONFIRM);
  };

  const handleConfirmSubmit = async () => {
    if (!selectedFile) return;
    setIsSubmitting(true);
    setFileSizeBytes(selectedFile.size);
    setStep(ExpertReviewStep.PROGRESS);
    setUploadProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);

      await uploadResumeForReview(selectedFile);

      clearInterval(progressInterval);
      setUploadProgress(100);
      setSelectedFile(null);

      toast.success('Resume uploaded successfully for expert review!');

      setTimeout(() => {
        setStep(ExpertReviewStep.SUCCESS);
      }, 800);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload resume. Please try again.');
      setStep(ExpertReviewStep.CONFIRM);
      setUploadProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(ExpertReviewStep.UPLOAD);
    setUploadProgress(0);
    setFileName('');
    setSelectedFile(null);
    setFileSizeBytes(0);
    setIsSubmitting(false);
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case ExpertReviewStep.UPLOAD:
        return <UploadView onUpload={handleFileSelected} onSignIn={handleSignIn} onClose={handleReset} />;
      case ExpertReviewStep.CONFIRM:
        if (!selectedFile) {
          return <UploadView onUpload={handleFileSelected} onSignIn={handleSignIn} onClose={handleReset} />;
        }
        return (
          <ProgressView
            fileName={fileName}
            progress={0}
            fileSizeFormatted={formatFileSize(selectedFile.size)}
            showConfirmActions
            isSubmitting={isSubmitting}
            onFileSelected={handleFileSelected}
            onSubmit={handleConfirmSubmit}
            onCancel={() => setStep(ExpertReviewStep.CONFIRM)}
            onClose={handleReset}
          />
        );
      case ExpertReviewStep.PROGRESS:
        return (
          <ProgressView
            fileName={fileName}
            progress={uploadProgress}
            fileSizeFormatted={fileSizeBytes ? formatFileSize(fileSizeBytes) : '0 B'}
            showConfirmActions={false}
            onFileSelected={handleFileSelected}
            onSubmit={handleConfirmSubmit}
            onCancel={() => setStep(ExpertReviewStep.CONFIRM)}
            onClose={handleReset}
          />
        );
      case ExpertReviewStep.SUCCESS:
        return (
          <SuccessView
            onDashboard={() => {
              onClose();
            }}
            onClose={handleReset}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleReset()}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100vw-2rem)] max-w-[1035px] min-h-[min(100dvh-2rem,653px)] sm:min-h-[653px] p-0 overflow-hidden bg-expert-bg border-none rounded-expert-modal-mobile sm:rounded-expert-modal max-h-[95dvh]"
      >
        {/* Background image */}
        <div className="absolute inset-0 pointer-events-none">
          <Image src="/images/expert-review-bg.png" alt="Background" fill className="object-cover" priority />
        </div>
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}
