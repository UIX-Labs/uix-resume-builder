'use client';

import { useParsePdfResume } from '@entities/resume';
import { Upload } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@shared/ui/components/button';

interface FileUploadProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  disabled?: boolean;
  className?: string;
  buttonText?: string;
  acceptedFileTypes?: string;
  maxFileSize?: number;
}

export function FileUpload({
  onSuccess,
  onError,
  disabled = false,
  className = '',
  buttonText = 'Upload Resume',
  acceptedFileTypes = '.pdf',
  maxFileSize = 10,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: parsePdfResume, isPending } = useParsePdfResume();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      const errorMessage = 'Please select a PDF file.';
      alert(errorMessage);
      onError?.(new Error(errorMessage));
      return;
    }

    const maxSizeBytes = maxFileSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      const errorMessage = `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds the maximum limit of ${maxFileSize}MB.`;
      alert(errorMessage);
      onError?.(new Error(errorMessage));
      return;
    }

    parsePdfResume(file, {
      onSuccess: (data) => {
        console.log('Resume parsed successfully:', data);
        onSuccess?.(data);
      },
      onError: (error) => {
        console.error('Upload error:', error);
        const errorMessage = error?.message;
        alert(`Upload failed: ${errorMessage}`);
        onError?.(error);
      },
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const isDisabled = disabled || isPending;

  return (
    <>
      <input ref={fileInputRef} type="file" accept={acceptedFileTypes} onChange={handleFileUpload} className="hidden" />

      <Button
        className={`flex items-center justify-center gap-2 bg-gradient-to-l from-white to-[rgb(224,224,224)] text-black border-2 border-white rounded-xl px-5 py-3 h-11 shadow-sm transition-all hover:bg-[rgb(46,125,50)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        onClick={handleButtonClick}
        disabled={isDisabled}
      >
        {!isPending && <Upload className="w-4 h-4" />}
        <span className="text-[18px] font-semibold leading-[1.333] tracking-[-0.014em] text-center">
          {isPending ? 'Processing...' : buttonText}
        </span>
      </Button>
    </>
  );
}
