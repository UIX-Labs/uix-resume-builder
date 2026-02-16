'use client';

import { Dialog, DialogContent } from '@shared/ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';
import { uploadResumeForReview } from '../api/upload-for-review';
import { ProgressView } from './views/progress-view';
import { SuccessView } from './views/success-view';
import { UploadView } from './views/upload-view';

type FlowState = 'upload' | 'progress' | 'success';

interface ExpertReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExpertReviewModal({ isOpen, onClose }: ExpertReviewModalProps) {
  const [step, setStep] = useState<FlowState>('upload');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState('');

  const handleSignIn = () => {
    const pathname = window.location.pathname;
    const callbackUrl = encodeURIComponent(pathname + window.location.search);
    window.location.href = `/auth?callbackUrl=${callbackUrl}`;
  };

  const handleUpload = async (file: File) => {
    setFileName(file.name);
    setStep('progress');
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
        setStep('success');
      }, 800);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload resume. Please try again.');
      setStep('upload');
    }
  };

  const handleReset = () => {
    setStep('upload');
    setUploadProgress(0);
    setFileName('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleReset()}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100vw-2rem)] max-w-[1035px] min-h-[min(100dvh-2rem,653px)] sm:min-h-[653px] p-0 overflow-hidden bg-expert-bg border-none rounded-expert-modal-mobile sm:rounded-expert-modal max-h-[100dvh] overflow-y-auto"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -left-[340px] -top-[125px] w-[1028px] h-[1028px] rounded-full opacity-100 blur-[100px]"
            style={{
              background: `linear-gradient(136deg, var(--color-expert-gradient-start) 30%, var(--color-expert-gradient-end) 68%)`,
            }}
          />
        </div>
        {step === 'upload' && <UploadView onUpload={handleUpload} onSignIn={handleSignIn} onClose={handleReset} />}
        {step === 'progress' && (
          <ProgressView
            fileName={fileName}
            progress={uploadProgress}
            onCancel={() => setStep('upload')}
            onClose={handleReset}
          />
        )}
        {step === 'success' && (
          <SuccessView
            onDashboard={() => {
              onClose(); /* navigate to dashboard */
            }}
            onClose={handleReset}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
