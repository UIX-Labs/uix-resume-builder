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

interface JDUploadSectionProps {
  disabled?: boolean;
  onJDFileChange?: (file: File | null) => void;
}

export function JDUploadSection({ disabled = false, onJDFileChange }: JDUploadSectionProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [resumeFile, setResumeFile] = useState<UploadedFile | null>(null);
  const [jdFile, setJdFile] = useState<UploadedFile | null>(null);

  const resumeInputRef = useRef<HTMLInputElement>(null);
  const jdInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = useCallback(
    (
      selectedFile: File,
      setFile: React.Dispatch<React.SetStateAction<UploadedFile | null>>,
      type: 'resume' | 'jd'
    ) => {

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
            setFile((prev) =>
              prev ? { ...prev, status: 'success', progress: 100 } : null
            );
            if (type === 'jd') {
              onJDFileChange?.(selectedFile);
            }
          }, 300);
        }
      }, 150);
    },
    [onJDFileChange]
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
      if (resumeInputRef.current) resumeInputRef.current.value = '';
    } else {
      setJdFile(null);
      if (jdInputRef.current) jdInputRef.current.value = '';
      onJDFileChange?.(null);
    }
  };

  const handleReupload = (type: 'resume' | 'jd') => {
    if (type === 'resume') resumeInputRef.current?.click();
    else jdInputRef.current?.click();
  };

  const renderUploadedCard = (file: UploadedFile, type: 'resume' | 'jd') => (
    <div className="flex flex-col bg-white rounded-[10px] px-4 py-3 w-[90%] mt-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col flex-1">
          <span className="font-medium text-gray-900">{file.name}</span>
          <span className="text-xs text-gray-500">
            {file.size} MB{' '}
            {file.status === 'success' && <span>• Uploaded Successfully</span>}
            {file.status === 'error' && toast.error('Upload failed. Please try again.')}
          </span>
        </div>

        <div className="flex gap-2">
          {file.status === 'success' && (
            <button
              onClick={() => handleReupload(type)}
              className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              <RotateCcw className="h-4 w-4 text-gray-600" />
            </button>
          )}
          <button
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
  );

  return (
    <div className="border-2 border-white w-1/2 flex flex-col h-[400px] rounded-[20px]">
      <div
        className={cn(
          'flex flex-col border-2 border-dashed rounded-[20px] w-full items-center justify-center h-full p-4',
          'border-[#D6FFEA] bg-[#0B372E]',
          showOptions || resumeFile || jdFile ? 'gap-4' : 'gap-8',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        {/* Label */}
        <div className="py-1 px-3 rounded-3xl text-xs font-semibold bg-[#DFC500] text-white">
          Optional
        </div>

        {/* Upload JD initial view */}
        {!showOptions && !resumeFile && !jdFile && (
          <button
            onClick={() => !disabled && setShowOptions(true)}
            disabled={disabled}
            className="flex flex-col items-center gap-4 disabled:cursor-not-allowed"
          >
            <h1 className="text-3xl font-semibold text-white">Upload Your JD</h1>
            <UploadCloudIcon className="h-16 w-16 text-white" />
            <h3 className="text-2xl font-semibold text-white">Drag & Drop</h3>
            <span className="text-sm text-gray-300">
              or Select File from your device
            </span>
          </button>
        )}

        {/* Upload Options */}
        {showOptions && (
          <div className="flex flex-row gap-4">
            {!resumeFile && (
              <button
                onClick={() => !disabled && resumeInputRef.current?.click()}
                disabled={disabled}
                className="flex flex-col items-center gap-2 bg-[#FFFFFF22] hover:bg-[#FFFFFF33] text-white py-3 px-5 rounded-xl transition-all disabled:cursor-not-allowed disabled:opacity-50"
              >
                <UploadCloudIcon className="h-8 w-8" />
                <span className="text-lg font-semibold">Upload Resume</span>
              </button>
            )}

            {!jdFile && (
              <button
                onClick={() => !disabled && jdInputRef.current?.click()}
                disabled={disabled}
                className="flex flex-col items-center gap-2 bg-[#FFFFFF22] hover:bg-[#FFFFFF33] text-white py-3 px-5 rounded-xl transition-all disabled:cursor-not-allowed disabled:opacity-50"
              >
                <UploadCloudIcon className="h-8 w-8" />
                <span className="text-lg font-semibold">Upload JD</span>
              </button>
            )}
          </div>
        )}

        {/* Uploaded cards */}
        {resumeFile && renderUploadedCard(resumeFile, 'resume')}
        {jdFile && renderUploadedCard(jdFile, 'jd')}

        {/* Hidden inputs */}
        <input
          ref={resumeInputRef}
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileChange(e, 'resume')}
          className="hidden"
        />
        <input
          ref={jdInputRef}
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileChange(e, 'jd')}
          className="hidden"
        />
      </div>
    </div>
  );
}
