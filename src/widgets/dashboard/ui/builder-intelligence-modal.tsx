'use client';

import { Dialog, DialogContent } from '@shared/ui/dialog';
import { cn } from '@shared/lib/cn';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { JDUploadSection } from './components/jd-upload-section';
import { Button } from '@shared/ui/components/button';
import ResumeUploadSection from './components/resume-upload-section';
import { fetch } from '@shared/api';
import { useRouter } from 'next/navigation';
import type { UpdateResumeAnalyzer } from '@entities/resume/types';
import { useAnalyzerStore } from '@shared/stores/analyzer-store';

interface BuilderIntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  showJDUpload?: boolean;
  showResumeUpload?: boolean;
  onSubmittingChange?: (isSubmitting: boolean) => void;
}

export default function BuilderIntelligenceModal({
  isOpen,
  onClose,
  showJDUpload = false,
  showResumeUpload = false,
  onSubmittingChange,
}: BuilderIntelligenceModalProps) {
  const router = useRouter();
  const { setAnalyzedData } = useAnalyzerStore();
  const [resumeUploadStatus, setResumeUploadStatus] = useState<'uploading' | 'success' | 'error' | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    onSubmittingChange?.(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);

  useEffect(() => {
    if (isSubmitting && isOpen) {
      onClose();
    }
  }, [isSubmitting, isOpen, onClose]);

  const handleInitiateBuilderIntelligence = async () => {
    if (!resumeFile) {
      toast.error('Please upload a resume first');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);

      let response: UpdateResumeAnalyzer;

      if (jdFile) {
        // Both resume and JD uploaded - call job-based-analyzer
        formData.append('jobDescription', jdFile);
        response = await fetch('resume/job-based-analyzer', {
          options: {
            method: 'POST',
            body: formData,
          },
        });
        toast.success('Resume and JD analyzed successfully!');
      } else {
        // Only resume uploaded - call analyzer
        response = await fetch('resume/analyzer', {
          options: {
            method: 'POST',
            body: formData,
          },
        });
        toast.success('Resume analyzed successfully!');
      }

      if (response?.resumeId && response?.resume) {
        setAnalyzedData(response.resume, response.resumeId);

        router.push(`/resume/${response.resumeId}`);
      } else {
        onClose();
      }
    } catch (error) {
      toast.error('Failed to analyze. Please try again.');
      console.error('Analysis error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isResumeStepComplete = showResumeUpload ? resumeUploadStatus === 'success' && !!resumeFile : !!resumeFile;
  const isJdStepComplete = showJDUpload ? !!jdFile : true;
  const isActionDisabled = isSubmitting || !isResumeStepComplete || !isJdStepComplete;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="!max-w-4xl rounded-[36px] px-6 py-12 bg-cover bg-center text-white"
        style={{
          backgroundImage: `url("data:image/jpeg;base64,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")`,
        }}
      >
        <div className={cn('flex flex-col gap-6', isSubmitting && 'pointer-events-none opacity-30')}>
          <div className="flex flex-row justify-between gap-3 items-center">
            {showResumeUpload && (
              <ResumeUploadSection onFileStatusChange={setResumeUploadStatus} onFileChange={setResumeFile} />
            )}
            {showJDUpload && (
              <JDUploadSection
                disabled={!isResumeStepComplete}
                onJDFileChange={setJdFile}
                onResumeFileChange={setResumeFile}
              />
            )}
          </div>
        </div>
        <Button
          className="bg-[#02A44F] text-white hover:bg-none"
          variant="outline"
          onClick={handleInitiateBuilderIntelligence}
          disabled={isActionDisabled}
        >
          {isSubmitting ? 'Analyzing...' : 'Initiate Builder Intelligence'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
