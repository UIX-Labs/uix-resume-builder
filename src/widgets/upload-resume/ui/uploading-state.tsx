import { CloudUpload, X } from 'lucide-react';
import { Button } from '@shared/ui/components/button';

interface UploadingStateProps {
  fileName: string;
  fileSize: string;
  uploadProgress: number;
  onCloseUpload: () => void;
}

export function UploadingState({ fileName, fileSize, uploadProgress, onCloseUpload }: UploadingStateProps) {
  return (
    <div className="relative py-9 mt-[40%]">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h3 className="text-4xl font-semibold text-[#0C1118] mb-1">Resume Uploading</h3>
          <p className="text-xs text-[#72847F]">We are uploading your Resume</p>
        </div>

        <div className="w-full bg-[#FAFBFC] border-2 border-[#257AFF] rounded-[20px] p-4 flex items-center gap-2 shadow-[0px_0px_0px_4px_rgba(37,122,255,0.22)]">
          <div className="size-15 rounded-full bg-[#E9F4FF] flex items-center justify-center flex-shrink-0">
            <CloudUpload size={25} className="text-[#257AFF]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="text-sm font-semibold text-black truncate flex-1 min-w-0">{fileName}</p>
              <Button
                type="button"
                onClick={onCloseUpload}
                variant="ghost"
                size="icon"
                className="flex-shrink-0 h-auto w-auto hover:bg-gray-100 p-1"
              >
                <X size={20} className="text-black" />
              </Button>
            </div>

            <div className="mb-2">
              <div className="w-full h-1.5 bg-[#E1E8F2] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#257AFF] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-[#72847F]">{fileSize}</span>
              <span className="text-xs font-semibold text-[#101D30]">{uploadProgress}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
