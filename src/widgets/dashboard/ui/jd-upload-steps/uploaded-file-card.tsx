import { formatFileSize } from '@entities/resume/lib/file-upload-utils';
import { cn } from '@shared/lib/utils';
import { Button } from '@shared/ui/components/button';
import { Check, RotateCw, Trash2 } from 'lucide-react';

interface UploadedFileCardProps {
  badgeText: string;
  file: File | null;
  defaultFileName: string;
  onRemove: () => void;
  onRetry?: () => void;
  showBorder?: boolean;
}

export function UploadedFileCard({
  badgeText,
  file,
  defaultFileName,
  onRemove,
  onRetry,
  showBorder = true,
}: UploadedFileCardProps) {
  return (
    <div className={cn('w-full', showBorder && 'rounded-[20px] border border-dashed border-[#6AC095] p-3')}>
      <div className="relative w-full h-18">
        <div className="absolute top-0 left-0 flex items-center justify-center gap-1 bg-[#063B1F] rounded-t-2xl px-3 py-1 h-5">
          <span className="text-white text-[10px] font-semibold leading-[1.2em]">{badgeText}</span>
        </div>

        <div className="absolute top-5 left-0 w-[279px] h-13 bg-[#0E5731] border border-[#387D58] rounded-tr-xl rounded-b-xl flex items-center px-2 gap-3">
          <div className="w-9 h-9 rounded-full bg-[#ABFCDD] flex items-center justify-center flex-shrink-0">
            <Check size={20} className="text-[#02A44F]" />
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[#ABFCDD] text-sm font-semibold leading-[1.428em] tracking-[-0.00143em] truncate">
              {file?.name || defaultFileName}
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[#89B5A9] text-xs leading-[1.5em]">
                {file ? formatFileSize(file.size) : '5 MB'}
              </span>
              <div className="w-1 h-1 rounded-full bg-[#89B5A9]" />
              <span className="text-[#89B5A9] text-xs leading-[1.5em]">Uploaded</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onRetry && (
              <Button
                type="button"
                onClick={onRetry}
                className="w-5 h-5 text-white flex-shrink-0 hover:opacity-80 transition-opacity p-0"
                variant="ghost"
              >
                <RotateCw size={20} className="text-white" />
              </Button>
            )}
            <Button
              type="button"
              onClick={onRemove}
              className="w-5 h-5 text-white flex-shrink-0 hover:opacity-80 transition-opacity p-0"
              variant="ghost"
            >
              <Trash2 size={20} className="text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
