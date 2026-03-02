'use client';

import { Button } from '@/shared/ui/components/button';
import { formatFileSize } from '@entities/resume';
import { uploadResumeForReview } from '@features/expert-review/api/upload-for-review';
import {
  EXPERT_REVIEW_ACCEPT,
  MAX_EXPERT_REVIEW_FILE_BYTES,
  isExpertReviewFileTypeValid,
} from '@features/expert-review/constants';
import { ProgressView } from '@features/expert-review/ui/views/progress-view';
import { SuccessView } from '@features/expert-review/ui/views/success-view';
import { useCachedUser } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

type UploadStep = 'upload' | 'confirm' | 'progress' | 'success';

export function UploadSection() {
  const router = useRouter();
  const user = useCachedUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<UploadStep>('upload');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSizeBytes, setFileSizeBytes] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = () => {
    const callbackUrl = encodeURIComponent('/expert-review?expertReview=open');
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
    setStep('confirm');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelected(file);
    }
    e.target.value = '';
  };

  const handleUploadClick = () => {
    trackEvent('expert_review_upload_click', { source: 'expert_review_page' });
    if (!user) {
      handleSignIn();
      return;
    }
    fileInputRef.current?.click();
  };

  const handleConfirmSubmit = async () => {
    if (!selectedFile) return;
    setIsSubmitting(true);
    setFileSizeBytes(selectedFile.size);
    setStep('progress');
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

      trackEvent('expert_review_upload_success', { source: 'expert_review_page' });
      toast.success('Resume uploaded successfully for expert review!');

      setTimeout(() => {
        setStep('success');
      }, 800);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload resume. Please try again.');
      setStep('confirm');
      setUploadProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep('upload');
    setUploadProgress(0);
    setFileName('');
    setSelectedFile(null);
    setFileSizeBytes(0);
    setIsSubmitting(false);
  };

  const handleDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <section id="expert-review-upload" className="relative overflow-hidden bg-[#0c1118] min-h-[500px] sm:min-h-[600px]">
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/expert-review-bg.png" alt="" fill className="object-cover" priority />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={EXPERT_REVIEW_ACCEPT}
        onChange={handleFileChange}
        aria-hidden
      />

      {step === 'upload' && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] sm:min-h-[600px] px-4 sm:px-8 md:px-12 py-12 sm:py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-6">
              Ready to Level Up Your Resume?
            </h2>
            <p className="text-base sm:text-lg text-white/70 mb-10 max-w-xl mx-auto">
              Upload your resume below and our experts will review it personally. You will receive detailed feedback in
              your inbox within 3 days.
            </p>

            <div className="flex flex-col items-center gap-4">
              <Button
                onClick={handleUploadClick}
                className="bg-[#0a70f8] hover:bg-[#0960dd] text-white font-semibold rounded-xl px-10 py-6 text-lg transition-all duration-300 flex items-center gap-3 border border-[#005FF2]"
              >
                <Upload className="w-5 h-5" />
                {user ? 'Upload Resume' : 'Sign In to Upload'}
              </Button>
              <span className="text-sm text-white/50">Accepted: PDF, DOC, DOCX (max 4 MB)</span>
            </div>
          </motion.div>
        </div>
      )}

      {step === 'confirm' && selectedFile && (
        <ProgressView
          fileName={fileName}
          progress={0}
          fileSizeFormatted={formatFileSize(selectedFile.size)}
          showConfirmActions
          isSubmitting={isSubmitting}
          onFileSelected={handleFileSelected}
          onSubmit={handleConfirmSubmit}
          onCancel={() => setStep('confirm')}
          onClose={handleReset}
        />
      )}

      {step === 'progress' && (
        <ProgressView
          fileName={fileName}
          progress={uploadProgress}
          fileSizeFormatted={fileSizeBytes ? formatFileSize(fileSizeBytes) : '0 B'}
          showConfirmActions={false}
          onFileSelected={handleFileSelected}
          onSubmit={handleConfirmSubmit}
          onCancel={() => setStep('confirm')}
          onClose={handleReset}
        />
      )}

      {step === 'success' && <SuccessView onDashboard={handleDashboard} onClose={handleReset} />}
    </section>
  );
}
