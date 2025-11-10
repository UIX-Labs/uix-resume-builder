import { useState, useRef, useCallback } from 'react';
import { UploadCloudIcon, Trash2, RotateCcw } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import { Progress } from '@shared/ui/progress';
import { toast } from 'sonner';

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

  const handleFileSelect = useCallback((selectedFile: File) => {
    if (!selectedFile) return;

    const newFile: UploadedFile = {
      name: selectedFile.name,
      size: +(selectedFile.size / (1024 * 1024)).toFixed(2),
      progress: 0,
      status: 'uploading',
    };

    setFile(newFile);
    onFileStatusChange?.('uploading');

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFile((prev) => (prev ? { ...prev, progress } : null));

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setFile((prev) =>
            prev ? { ...prev, status: 'success', progress: 100 } : null
          );
          onFileStatusChange?.('success');
          onFileChange?.(selectedFile);
        }, 300);
      }
    }, 150);
  }, [onFileStatusChange, onFileChange]);

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
    <div className="flex flex-col border-2 border-white rounded-[20px] w-1/2 h-[400px]">
      <div
        className={cn(
          'flex flex-col border-2 border-dashed rounded-[20px] items-center justify-center h-full gap-2',
          'border-[#D6FFEA] bg-[#0B372E]' 
        )}
      >
        <div
          className={cn(
            'py-1 px-3 rounded-3xl text-xs font-semibold',
            'bg-[#DC2626] text-white'
          )}
        >
          Mandatory
        </div>

        {!file ? (
          <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-4">
            <h1 className="text-3xl font-semibold">Upload Your Resume</h1>
            <UploadCloudIcon className="h-16 w-16" />
            <h3 className="text-2xl font-semibold">Drag & Drop</h3>
            <span>or Select File from your device</span>
            </button>
        ) : (
          <>
            <h1 className="text-3xl font-semibold text-white">
              Resume Uploaded
            </h1>

            <div className="flex flex-col bg-white rounded-[10px] px-4 py-3 w-[90%] mt-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col flex-1">
                  <span className="font-medium text-gray-900">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    {file.size} MB{' '}
                    {file.status === 'success' && (
                      <span>• Uploaded Successfully</span>
                    )}
                    {file.status === 'error' && (
                     toast.error('Upload failed. Please try again.')  
                    )}
                  </span>
                </div>

                <div className="flex gap-2">
                  {file.status === 'success' && (
                    <button
                      onClick={handleReupload}
                      className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <RotateCcw className="h-4 w-4 text-gray-600" />
                    </button>
                  )}

                  <button
                    onClick={handleDelete}
                    className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {file.status !== 'success' && (
                <div className="mt-3">
                  <Progress
                    value={file.progress}
                    className="h-1 [&>div]:bg-[#02A44F]"
                  />
                </div>
              )}
            </div>
          </>
        )}

        <input
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
