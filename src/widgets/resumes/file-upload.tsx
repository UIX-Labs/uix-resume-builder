'use client';

import { useParsePdfResume } from '@entities/resume';
import { Upload } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@shared/ui/components/button';
import StarsIcon from '@shared/icons/stars-icon';

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
                      variant="outline"
                      className="relative border-none w-full flex flex-row items-center justify-start gap-2 bg-white text-black rounded-xl h-11 shadow-none hover:bg-[#E9F4FF]"
                      onClick={handleButtonClick}
                      disabled={isDisabled}
                    >
                      <StarsIcon />
                      <span className="flex items-center gap-2 text-[#656A72] text-base font-normal text-left">
                        Upload Resume
                      </span>
                    </Button>
    </>
  );
}
