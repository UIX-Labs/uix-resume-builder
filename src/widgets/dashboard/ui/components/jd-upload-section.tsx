import { useState, useRef, useCallback } from 'react';
import { UploadCloudIcon, Trash2, RotateCcw } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import { Progress } from '@shared/ui/progress';

interface UploadedFile {
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'success' | 'error';
}

interface JDUploadSectionProps {
  onJDFileChange?: (file: File | null) => void;
  onResumeFileChange?: (file: File | null) => void;
  disabled?: boolean;
}

export function JDUploadSection({
  onJDFileChange,
  onResumeFileChange,
  disabled: externalDisabled = false,
}: JDUploadSectionProps) {
  const [resumeFile, setResumeFile] = useState<UploadedFile | null>(null);
  const [jdFile, setJdFile] = useState<UploadedFile | null>(null);

  const resumeInputRef = useRef<HTMLInputElement>(null);
  const jdInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = useCallback(
    (selectedFile: File, setFile: React.Dispatch<React.SetStateAction<UploadedFile | null>>, type: 'resume' | 'jd') => {
      const newFile: UploadedFile = {
        name: selectedFile.name,
        size: +(selectedFile.size / (1024 * 1024)).toFixed(2),
        progress: 0,
        status: 'uploading',
      };
      setFile(newFile);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFile((prev) => (prev ? { ...prev, progress } : null));
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFile((prev) => (prev ? { ...prev, status: 'success', progress: 100 } : null));
            if (type === 'jd') onJDFileChange?.(selectedFile);
            if (type === 'resume') onResumeFileChange?.(selectedFile);
          }, 300);
        }
      }, 150);
    },
    [onJDFileChange, onResumeFileChange],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'jd') => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (type === 'resume') simulateUpload(selectedFile, setResumeFile, 'resume');
    else simulateUpload(selectedFile, setJdFile, 'jd');
    e.target.value = '';
  };

  const handleDelete = (type: 'resume' | 'jd') => {
    if (type === 'resume') {
      setResumeFile(null);
      if (resumeInputRef.current) {
        resumeInputRef.current.value = '';
      }
      onResumeFileChange?.(null);
      // Also reset JD when resume is deleted
      setJdFile(null);
      if (jdInputRef.current) {
        jdInputRef.current.value = '';
      }
      onJDFileChange?.(null);
    } else {
      setJdFile(null);
      if (jdInputRef.current) {
        jdInputRef.current.value = '';
      }
      onJDFileChange?.(null);
    }
  };

  const handleReupload = (type: 'resume' | 'jd') => {
    if (type === 'resume') resumeInputRef.current?.click();
    else jdInputRef.current?.click();
  };

  const renderUploadBox = (
    label: string,
    type: 'resume' | 'jd',
    file: UploadedFile | null,
    inputRef: React.RefObject<HTMLInputElement | null>,
    disabled?: boolean,
  ) => (
    <div
      className={cn(
        'flex flex-col border-2 border-dashed rounded-[20px] items-center justify-center w-full h-[350px] p-4 transition-all',
        'border-[#D6FFEA] bg-[#0B372E]',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      <div className="py-1 px-3 rounded-3xl text-xs font-semibold bg-[#DFC500] text-white mb-3">Mandatory</div>

      {!file ? (
        <button
          type="button"
          onClick={() => !disabled && inputRef.current?.click()}
          disabled={disabled}
          className="flex flex-col items-center gap-4 disabled:cursor-not-allowed"
        >
          <h1 className="text-2xl font-semibold text-white">{label}</h1>
          <UploadCloudIcon className="h-16 w-16 text-white" />
          <h3 className="text-xl font-semibold text-white">Drag & Drop</h3>
          <span className="text-sm text-gray-300">or Select File from your device</span>
        </button>
      ) : (
        <div className="flex flex-col bg-white rounded-[10px] px-4 py-3 w-[90%] mt-2">
          <div className="flex justify-between items-start">
            <div className="flex flex-col flex-1">
              <span className="font-medium text-gray-900">{file.name}</span>
              <span className="text-xs text-gray-500">
                {file.size} MB {file.status === 'success' && <span>• Uploaded Successfully</span>}
              </span>
            </div>

            <div className="flex gap-2">
              {file.status === 'success' && (
                <button
                  type="button"
                  onClick={() => handleReupload(type)}
                  className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <RotateCcw className="h-4 w-4 text-gray-600" />
                </button>
              )}
              <button
                type="button"
                onClick={() => handleDelete(type)}
                className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Trash2 className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          {file.status !== 'success' && (
            <div className="mt-3">
              <Progress value={file.progress} className="h-1 [&>div]:bg-[#02A44F]" />
            </div>
          )}
        </div>
      )}

      <input ref={inputRef} type="file" accept=".pdf" onChange={(e) => handleFileChange(e, type)} className="hidden" />
    </div>
  );

  return (
    <div className="flex flex-row gap-6 w-full">
      {/* Resume Upload Box */}
      <div className="w-1/2">{renderUploadBox('Upload Your Resume', 'resume', resumeFile, resumeInputRef, false)}</div>

      {/* JD Upload Box - disabled until Resume is uploaded successfully */}
      <div className="w-1/2">
        {renderUploadBox(
          'Upload Your JD',
          'jd',
          jdFile,
          jdInputRef,
          externalDisabled || !(resumeFile && resumeFile.status === 'success'),
        )}
      </div>
    </div>
  );
}
