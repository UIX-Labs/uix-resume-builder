import { Button } from '@shared/ui/components/button';
import { Check, RotateCw, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface SuccessStateProps {
  fileName: string;
  fileSize: string;
  onRetryUpload: () => void;
  onDeleteClick: () => void;
  onAutoFillResume: () => void;
}

export function SuccessState({
  fileName,
  fileSize,
  onRetryUpload,
  onDeleteClick,
  onAutoFillResume,
}: SuccessStateProps) {
  return (
    <>
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#171717] mb-1">Upload Resume</h1>
            <p className="text-lg text-[#72847F]">Upload your resume to auto-fill your details instantly</p>
          </div>
          <div className="opacity-20">
            <Image src="/images/file_upload.svg" alt="" width={48} height={48} />
          </div>
        </div>
      </div>

      <div className="relative mt-[40%] px-3">
        <div className="flex flex-col items-center gap-8">
          <div className="relative w-full">
            <div className="absolute -top-3 left-0">
              <div className="bg-[#EBECEE] border-2 border-[#FAFBFC] rounded-xl px-3 py-1 flex items-center gap-1">
                <span className="text-[10px] font-semibold text-[#0C1118]">Resume Uploaded</span>
              </div>
            </div>

            <div className="bg-[#FAFBFC] rounded-t-xl rounded-xl shadow-md p-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#EBECEE] flex items-center justify-center flex-shrink-0">
                  <Check size={20} className="text-[#838E9E]" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0C1118] truncate mb-1">{fileName}</p>
                  <div className="flex items-center gap-1.5 text-xs text-[#72847F]">
                    <span>{fileSize}</span>
                    <div className="w-1 h-1 rounded-full bg-[#72847F]" />
                    <span>Uploaded</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={onRetryUpload}
                    variant="ghost"
                    size="icon"
                    className="h-auto w-auto hover:bg-gray-100 p-1"
                    title="Re-upload"
                  >
                    <RotateCw size={20} className="text-[#0C1118]" />
                  </Button>
                  <Button
                    onClick={onDeleteClick}
                    variant="ghost"
                    size="icon"
                    className="h-auto w-auto hover:bg-gray-100 p-1"
                    title="Delete"
                  >
                    <Trash2 size={20} className="text-[#0C1118]" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={onAutoFillResume}
            className="bg-[#005FF2] hover:bg-[#0047b3] text-white font-semibold text-xl px-5 py-5 rounded-xl border-2 border-white shadow-sm"
          >
            Auto-fill Resume
          </Button>
        </div>
      </div>
    </>
  );
}
