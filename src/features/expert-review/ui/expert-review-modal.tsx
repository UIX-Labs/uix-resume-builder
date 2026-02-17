'use client';

import { Dialog, DialogContent } from '@shared/ui/dialog';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { uploadResumeForReview } from '../api/upload-for-review';
import { ProgressView } from './views/progress-view';
import { SuccessView } from './views/success-view';
import { UploadView } from './views/upload-view';

enum ExpertReviewStep {
  UPLOAD = 'upload',
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

  const handleSignIn = () => {
    const pathname = window.location.pathname;
    const callbackUrl = encodeURIComponent(pathname + window.location.search);
    window.location.href = `/auth?callbackUrl=${callbackUrl}`;
  };

  const handleUpload = async (file: File) => {
    setFileName(file.name);
    setStep(ExpertReviewStep.PROGRESS);
    setUploadProgress(0);

    try {
      // Start a slow progress simulation while the real upload happens
      // Since we don't have native progress tracking from fetch easily
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);

      await uploadResumeForReview(file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      toast.success('Resume uploaded successfully for expert review!');

      setTimeout(() => {
        setStep(ExpertReviewStep.SUCCESS);
      }, 800);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload resume. Please try again.');
      setStep(ExpertReviewStep.UPLOAD);
    }
  };

  const handleReset = () => {
    setStep(ExpertReviewStep.UPLOAD);
    setUploadProgress(0);
    setFileName('');
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case ExpertReviewStep.UPLOAD:
        return <UploadView onUpload={handleUpload} onSignIn={handleSignIn} onClose={handleReset} />;
      case ExpertReviewStep.PROGRESS:
        return (
          <ProgressView
            fileName={fileName}
            progress={uploadProgress}
            onCancel={() => setStep(ExpertReviewStep.UPLOAD)}
            onClose={handleReset}
          />
        );
      case ExpertReviewStep.SUCCESS:
        return (
          <SuccessView
            onDashboard={() => {
              onClose(); /* navigate to dashboard */
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
