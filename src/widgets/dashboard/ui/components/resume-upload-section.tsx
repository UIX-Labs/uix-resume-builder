'use client';

import { UploadCloudIcon, Trash2, RotateCcw } from 'lucide-react';
import { useRef, useCallback } from 'react';
import type { UploadState } from '../hooks/use-file-upload-with-progress';

interface ResumeUploadSectionProps {
  uploadState: UploadState;
  onFileSelect: (file: File) => void;
  onDelete: () => void;
  onReupload: () => void;
  fileInputRef?: React.RefObject<HTMLInputElement | null>;
}

export function ResumeUploadSection({
  uploadState,
  onFileSelect,
  onDelete,
  onReupload,
  fileInputRef: externalFileInputRef,
}: ResumeUploadSectionProps) {
  const internalFileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = externalFileInputRef || internalFileInputRef;

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const formatFileSize = (bytes: number): string => {
    return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
  };

  const formatTimeRemaining = (
    progress: number,
    fileSize: number,
    uploadedBytes: number,
    startTime: number | null,
  ): string => {
    if (progress === 0 || progress === 100 || !startTime) return '';
    const elapsed = (Date.now() - startTime) / 1000; // seconds
    if (elapsed === 0) return '';
    const speed = uploadedBytes / elapsed; // bytes per second
    const remaining = fileSize - uploadedBytes;
    const timeLeft = remaining / speed;
    return `${Math.ceil(timeLeft)} sec left`;
  };

  return (
    <div className="flex flex-col border-2 border-white rounded-[20px] w-1/2 h-[400px] items-center justify-center">
      <div className="flex flex-col gap-4 p-4 h-full items-center justify-center">
        <div className="bg-[#DF0B00] text-white py-1 px-3 rounded-3xl text-xs font-semibold w-fit">Mandatory</div>
        <h1 className="text-3xl font-semibold">
          {!uploadState.file && !uploadState.isUploading && !uploadState.isComplete
            ? 'Upload Your Resume'
            : uploadState.isUploading
              ? 'Resume Uploading'
              : uploadState.isComplete
                ? 'Resume Uploaded'
                : 'Upload Your Resume'}
        </h1>

        {!uploadState.file && !uploadState.isComplete ? (
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload resume file"
            className="flex flex-col  rounded-[20px] border-dashed items-center justify-center gap-2"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
              }
            }}
          >
            <UploadCloudIcon className="h-16 w-16" />
            <h3 className="text-2xl font-semibold">Drag & Drop</h3>
            <span>or Select File from your device</span>
          </div>
        ) : uploadState.file ? (
          <div className="bg-white rounded-[20px] p-4 text-black flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <div className="font-bold text-lg">{uploadState.file.name}</div>
                <div className="text-gray-600 text-sm">
                  {formatFileSize(uploadState.file.size)}
                  {uploadState.isUploading && uploadState.progress < 100
                    ? ` | ${formatTimeRemaining(
                        uploadState.progress,
                        uploadState.file.size,
                        uploadState.uploadedBytes,
                        uploadState.uploadStartTime,
                      )}`
                    : uploadState.isComplete
                      ? ' | 100% • Uploaded Successfully'
                      : ''}
                </div>
              </div>
              <div className="flex gap-2">
                {uploadState.isComplete && (
                  <button
                    type="button"
                    onClick={onReupload}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Reupload"
                  >
                    <RotateCcw className="h-5 w-5 text-gray-600" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onDelete}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            {uploadState.isUploading && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#02A44F] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadState.progress}%` }}
                />
              </div>
            )}
          </div>
        ) : null}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onFileSelect(file);
            }
          }}
          className="hidden"
        />
      </div>
    </div>
  );
}
