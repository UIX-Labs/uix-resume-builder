import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import type { ParsePdfResponse } from '@entities/resume/types';

export interface UploadState {
  file: File | null;
  progress: number;
  isUploading: boolean;
  isComplete: boolean;
  resumeId: string | null;
  error: string | null;
  uploadStartTime: number | null;
  uploadedBytes: number;
}

interface UseFileUploadWithProgressOptions {
  maxFileSize?: number; // in MB
  onSuccess?: (data: ParsePdfResponse) => void;
  onError?: (error: Error) => void;
}

export function useFileUploadWithProgress(options: UseFileUploadWithProgressOptions = {}) {
  const { maxFileSize = 10, onSuccess, onError } = options;

  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    progress: 0,
    isUploading: false,
    isComplete: false,
    resumeId: null,
    error: null,
    uploadStartTime: null,
    uploadedBytes: 0,
  });

  const uploadFileWithProgress = useCallback(
    (file: File): Promise<ParsePdfResponse> => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('file', file);

        // Track upload progress
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            setUploadState((prev) => ({
              ...prev,
              progress: percentComplete,
              uploadedBytes: event.loaded,
              uploadStartTime: prev.uploadStartTime || Date.now(),
            }));
          }
        });

        // Handle completion
        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response: ParsePdfResponse = JSON.parse(xhr.responseText);
              setUploadState((prev) => ({
                ...prev,
                isUploading: false,
                isComplete: true,
                progress: 100,
                resumeId: response.resumeId,
                error: null,
              }));
              resolve(response);
            } catch {
              const errorMsg = 'Failed to parse response';
              setUploadState((prev) => ({
                ...prev,
                isUploading: false,
                error: errorMsg,
              }));
              const error = new Error(errorMsg);
              reject(error);
            }
          } else {
            let errorMsg = 'Upload failed';
            try {
              const errorResponse = JSON.parse(xhr.responseText);
              errorMsg = errorResponse.message || errorMsg;
            } catch {
              // Use default error message
            }
            setUploadState((prev) => ({
              ...prev,
              isUploading: false,
              error: errorMsg,
            }));
            const error = new Error(errorMsg);
            reject(error);
          }
        });

        // Handle errors
        xhr.addEventListener('error', () => {
          const errorMsg = 'Network error occurred';
          setUploadState((prev) => ({
            ...prev,
            isUploading: false,
            error: errorMsg,
          }));
          const error = new Error(errorMsg);
          reject(error);
        });

        xhr.addEventListener('abort', () => {
          setUploadState((prev) => ({
            ...prev,
            isUploading: false,
            error: 'Upload cancelled',
          }));
          const error = new Error('Upload cancelled');
          reject(error);
        });

        // Open and send request
        xhr.open('POST', `${process.env.NEXT_PUBLIC_BACKEND_URL}/resume/parse-pdf`);
        xhr.withCredentials = true;
        xhr.send(formData);
      });
    },
    []
  );

  const handleFileSelect = useCallback(
    async (file: File) => {
      // Validate file type
      if (file.type !== 'application/pdf') {
        const error = new Error('Please select a PDF file.');
        toast.error(error.message);
        onError?.(error);
        return;
      }

      // Validate file size
      const maxSizeBytes = maxFileSize * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        const error = new Error(
          `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds the maximum limit of ${maxFileSize}MB.`
        );
        toast.error(error.message);
        onError?.(error);
        return;
      }

      // Reset state and start upload
      setUploadState({
        file,
        progress: 0,
        isUploading: true,
        isComplete: false,
        resumeId: null,
        error: null,
        uploadStartTime: Date.now(),
        uploadedBytes: 0,
      });

      try {
        const response = await uploadFileWithProgress(file);
        toast.success('Resume uploaded successfully!');
        onSuccess?.(response);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to upload resume';
        toast.error(`Upload failed: ${errorMessage}`);
        onError?.(error instanceof Error ? error : new Error(errorMessage));
      }
    },
    [uploadFileWithProgress, maxFileSize, onSuccess, onError]
  );

  const resetUpload = useCallback(() => {
    setUploadState({
      file: null,
      progress: 0,
      isUploading: false,
      isComplete: false,
      resumeId: null,
      error: null,
      uploadStartTime: null,
      uploadedBytes: 0,
    });
  }, []);

  return {
    uploadState,
    handleFileSelect,
    resetUpload,
  };
}

