'use client';

import { Dialog, DialogContent } from '@shared/ui/dialog';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'sonner';
import { useFileUploadWithProgress } from './hooks/use-file-upload-with-progress';
import { ResumeUploadSection } from './components/resume-upload-section';
import { JDUploadSection } from './components/jd-upload-section';
import { InitiateBuilderIntelligenceButton } from './components/initiate-builder-intelligence-button';

interface BuilderIntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BuilderIntelligenceModal({ isOpen, onClose }: BuilderIntelligenceModalProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadState, handleFileSelect, resetUpload } = useFileUploadWithProgress({
    onSuccess: (data) => {
      // Success is already handled in the hook with toast
      console.log('Resume uploaded successfully:', data);
    },
    onError: (error) => {
      // Error is already handled in the hook with toast
      console.error('Upload error:', error);
    },
  });

  const handleDelete = () => {
    resetUpload();
  };

  const handleReupload = () => {
    resetUpload();
    // Small delay to ensure state is reset before triggering file input
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 100);
  };

  const handleInitiateBuilderIntelligence = () => {
    if (uploadState.resumeId) {
      router.push(`/resume/${uploadState.resumeId}`);
      onClose();
    } else {
      toast.error('Please upload a resume first');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="!max-w-3xl rounded-4xl px-6 py-12 bg-cover bg-center text-white"
        style={{
          backgroundImage: `url("data:image/jpeg;base64,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")`,
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-row justify-between gap-3 items-center">
            <ResumeUploadSection
              uploadState={uploadState}
              onFileSelect={handleFileSelect}
              onDelete={handleDelete}
              onReupload={handleReupload}
              fileInputRef={fileInputRef}
            />
            <JDUploadSection />
          </div>

          {<InitiateBuilderIntelligenceButton onClick={handleInitiateBuilderIntelligence} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
