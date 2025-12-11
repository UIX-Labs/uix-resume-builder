'use client';

import { useParsePdfResume } from '@entities/resume';
import { useRef } from 'react';
import { Button } from '@shared/ui/components/button';
import StarsIcon from '@shared/icons/stars-icon';
import { cn } from '@shared/lib/cn';

interface FileUploadProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  disabled?: boolean;
  className?: string;
  buttonText?: string;
  acceptedFileTypes?: string;
  maxFileSize?: number;
  onPendingChange?: (pending: boolean) => void;
  renderAsOverlay?: boolean;
  onUploadClick?: () => void;
}

export function FileUpload({
  onSuccess,
  onError,
  disabled = false,
  className = '',
  buttonText = 'Upload Resume',
  acceptedFileTypes = '.pdf',
  maxFileSize = 10,
  onPendingChange,
  renderAsOverlay = false,
  onUploadClick,
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

    onPendingChange?.(true);

    parsePdfResume(file, {
      onSuccess: (data) => {
        onSuccess?.(data);
        onPendingChange?.(false);
      },
      onError: (error) => {
        console.error('Upload error:', error);
        const errorMessage = error?.message;
        alert(`Upload failed: ${errorMessage}`);
        onError?.(error);
        onPendingChange?.(false);
      },
    });
  };

  const handleButtonClick = () => {
    onUploadClick?.();
    fileInputRef.current?.click();
  };

  const isDisabled = disabled || isPending;

  if (renderAsOverlay) {
    return (
      <>
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          type="button"
          className={cn('absolute inset-0 cursor-pointer rounded-xl', isDisabled && 'cursor-not-allowed', className)}
          onClick={isDisabled ? undefined : handleButtonClick}
        />
      </>
    );
  }

  return (
    <>
      <input ref={fileInputRef} type="file" accept={acceptedFileTypes} onChange={handleFileUpload} className="hidden" />

      <Button
        variant="outline"
        className={cn(
          'relative border-none w-full flex flex-row items-center justify-start gap-2 bg-white text-black rounded-xl h-11 shadow-none hover:bg-[#E9F4FF]',
          className,
        )}
        onClick={handleButtonClick}
        disabled={isDisabled}
      >
        <StarsIcon />
        <span className="flex items-center gap-2 text-[#656A72] text-base font-normal text-left">{buttonText}</span>
      </Button>
    </>
  );
}
