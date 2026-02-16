import { Button } from '@shared/ui/components/button';
import { CloudUpload } from 'lucide-react';
import Image from 'next/image';
import { UploadErrorType } from '../lib/upload-state';

interface SelectStateProps {
  uploadError: string | null;
  onSelectResume: () => void;
}

export function SelectState({ uploadError, onSelectResume }: SelectStateProps) {
  const getErrorMessage = () => {
    if (uploadError === UploadErrorType.FILE_SIZE) {
      return 'Upload failed! Please upload a file under 5 MB.';
    } else if (uploadError === UploadErrorType.FILE_FORMAT) {
      return 'Upload failed! Please upload a PDF file.';
    } else if (uploadError) {
      return 'Upload failed! Please try again.';
    }
    return 'Supported Format: PDF (up to 5MB)';
  };

  return (
    <>
      <div className="mb-14">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#171717] mb-1">Upload Resume</h1>
            <p className="text-lg text-[#72847F]">Upload your resume to auto-fill your details instantly</p>
          </div>
          <div className="opacity-20">
            <Image src="/images/file_upload.svg" alt="file upload" width={48} height={48} />
          </div>
        </div>
      </div>

      <div className="relative rounded-[36px] border-2 border-[#257AFF] px-6 py-9 bg-[#FAFBFC] shadow-[0px_0px_0px_4px_rgba(37,122,255,0.22)]">
        {uploadError && (
          <div className="absolute top-4 right-4">
            <div className="bg-[#EF4444] text-white text-xs font-semibold px-3 py-1 rounded-full">Upload Failed</div>
          </div>
        )}

        <div className="flex flex-col items-center gap-8">
          <div className="w-[63px] h-[63px] rounded-full bg-[#E9F4FF] flex items-center justify-center">
            <CloudUpload size={28} strokeWidth={2} className="text-blue-400" />
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold text-[#0C1118] mb-0.5">Select Resume to Upload</h3>
            <p className="text-sm text-[#656A72]">{getErrorMessage()}</p>
          </div>

          <Button
            onClick={onSelectResume}
            className="bg-[#005FF2] hover:bg-[#0047b3] text-[#F2F2F2] font-semibold text-base px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm"
          >
            <span>Select Resume</span>
            <Image
              src="/images/file_upload.svg"
              alt="file upload"
              width={24}
              height={24}
              className="brightness-0 invert"
            />
          </Button>
        </div>
      </div>
    </>
  );
}
