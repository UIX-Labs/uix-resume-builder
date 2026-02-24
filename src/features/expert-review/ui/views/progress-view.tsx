'use client';

import { Button } from '@shared/ui/button';
import { FileText, Upload, X } from 'lucide-react';
import { useRef } from 'react';
import { CloseButton } from './shared';

const GEIST_FONT = { fontFamily: 'Geist, sans-serif' } as const;

interface ProgressViewProps {
  fileName: string;
  progress: number;
  fileSizeFormatted: string;
  /** When true, show "Upload different file" and "Submit for review" instead of progress bar */
  showConfirmActions: boolean;
  isSubmitting?: boolean;
  onFileSelected: (file: File) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const ACCEPT_FILES = '.pdf,.doc,.docx';

export function ProgressView({
  fileName,
  progress,
  fileSizeFormatted,
  showConfirmActions,
  isSubmitting = false,
  onFileSelected,
  onSubmit,
  onCancel,
  onClose,
}: ProgressViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReplaceClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelected(file);
    }
    e.target.value = '';
  };

  return (
    <div className="relative w-full min-h-[min(100dvh-2rem,653px)] sm:min-h-[653px] flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-transparent text-white overflow-hidden">
      <CloseButton onClick={onClose} />

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={ACCEPT_FILES}
        onChange={handleFileChange}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-10 w-full max-w-xl px-2 sm:px-4">
        <h2
          className="text-expert-heading font-semibold text-[28px] sm:text-[40px] md:text-[56px] leading-[1] tracking-[-0.18px] text-center align-bottom"
          style={GEIST_FONT}
        >
          {showConfirmActions ? 'Confirm your resume' : 'Resume Uploading'}
        </h2>

        <div className="w-full bg-white border-2 border-expert-border rounded-2xl sm:rounded-[28px] p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 relative shadow-xl">
          {!showConfirmActions && (
            <button
              type="button"
              onClick={onCancel}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 min-w-10 min-h-10 text-black/70 hover:text-black active:text-black transition-colors touch-manipulation"
              aria-label="Cancel upload"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          <div className={`flex items-center gap-4 sm:gap-6 ${showConfirmActions ? '' : 'pr-10 sm:pr-12'}`}>
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-expert-border/10 flex items-center justify-center text-expert-border flex-shrink-0">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="flex flex-col items-start flex-1 min-w-0 gap-0.5">
              <span
                className="text-black font-semibold text-base sm:text-xl truncate w-full text-left"
                style={GEIST_FONT}
              >
                {fileName || 'Resume.pdf'}
              </span>
              <span className="text-expert-progress-muted text-sm" style={GEIST_FONT}>
                {fileSizeFormatted}
              </span>
            </div>
          </div>

          {showConfirmActions ? (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                type="button"
                onClick={handleReplaceClick}
                disabled={isSubmitting}
                variant="outline"
                className="flex-1 border-2 border-expert-border bg-transparent text-black rounded-expert-button px-5 py-3 min-h-12 font-semibold text-base hover:bg-gray-50 touch-manipulation"
                style={GEIST_FONT}
              >
                Upload different file
                <Upload className="w-5 h-5 shrink-0" />
              </Button>
              <Button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-expert-primary hover:bg-expert-primary-hover text-white border border-expert-border font-semibold min-h-12 px-6 rounded-expert-button text-base flex items-center justify-center gap-2 touch-manipulation disabled:opacity-70"
                style={GEIST_FONT}
              >
                {isSubmitting ? 'Submitting…' : 'Submit for review'}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="w-full h-2.5 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-expert-border rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span
                  className="text-expert-progress-muted font-normal text-sm sm:text-base leading-[22px] tracking-[-0.18px]"
                  style={GEIST_FONT}
                >
                  {fileSizeFormatted}
                </span>
                <span className="text-black font-semibold text-lg sm:text-xl" style={GEIST_FONT}>
                  {progress}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
