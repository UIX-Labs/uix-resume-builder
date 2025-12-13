import { useState, useRef, useCallback } from 'react';
import { UploadCloudIcon, Trash2, RotateCcw, Edit } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import { Progress } from '@shared/ui/progress';
import { toast } from 'sonner';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';

interface UploadedFile {
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'success' | 'error';
}

interface ResumeUploadSectionProps {
  onFileStatusChange?: (status: 'uploading' | 'success' | 'error' | null) => void;
  onFileChange?: (file: File | null) => void;
}

export default function ResumeUploadSection({ onFileStatusChange, onFileChange }: ResumeUploadSectionProps) {
  const [file, setFile] = useState<UploadedFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (selectedFile: File) => {
      if (!selectedFile) return;

      const newFile: UploadedFile = {
        name: selectedFile.name,
        size: +(selectedFile.size / (1024 * 1024)).toFixed(2),
        progress: 0,
        status: 'uploading',
      };

      setFile(newFile);
      onFileStatusChange?.('uploading');

      trackEvent('tailored_resume_upload_start', {
        fileName: selectedFile.name,
        fileSize: selectedFile.size
      });

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFile((prev) => (prev ? { ...prev, progress } : null));

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFile((prev) => (prev ? { ...prev, status: 'success', progress: 100 } : null));
            onFileStatusChange?.('success');
            onFileChange?.(selectedFile);
            trackEvent('tailored_resume_upload_success', {
              fileName: selectedFile.name
            });
          }, 300);
        }
      }, 150);
    },
    [onFileStatusChange, onFileChange],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFileSelect(selectedFile);
    e.target.value = '';
  };

  const handleDelete = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onFileStatusChange?.(null);
    onFileChange?.(null);
  };

  const handleReupload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col flex-1 min-w-[500px] cursor-pointer">
      <div
        className={cn(
          'flex flex-col border-2 border-dashed rounded-[20px] items-center justify-center h-[350px] gap-3 p-6',
          'border-[#D6FFEA] bg-[#0B372E] cursor-pointer',
        )}
      >
        <div className={cn('py-1 px-3 rounded-3xl text-xs font-semibold', 'bg-[#DFC500] text-white')}>Mandatory</div>

        {!file ? (
          <label
            htmlFor="resume-upload-input"
            className="flex flex-col items-center gap-4 cursor-pointer"
            onClick={() => {
              trackEvent('tailored_resume_upload_click');
            }}
          >
            <h1 className="text-2xl font-semibold text-white">Upload Your Resume</h1>
            <UploadCloudIcon className="h-16 w-16 text-white cursor-pointer" />
            <h3 className="text-xl font-semibold text-white">Drag & Drop</h3>
            <span className="text-sm text-gray-300">or Select File from your device</span>
          </label>
        ) : (
          <>
            <div className="flex flex-col bg-white rounded-[10px] px-4 py-3 w-[85%] mt-2">
              <div className="flex justify-between items-start">
                <div className="flex flex-col flex-1">
                  <span className="font-medium text-gray-900">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    {file.size} MB {file.status === 'success' && <span>• Uploaded Successfully</span>}
                    {file.status === 'error' && toast.error('Upload failed. Please try again.')}
                  </span>
                </div>

                <div className="flex gap-2">
                  {file.status === 'success' && (
                    <button
                      type="button"
                      onClick={handleReupload}
                      className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <Edit className="h-4 w-4 text-gray-600" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors cursor-pointer"
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
          </>
        )}

        <input
          id="resume-upload-input"
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
