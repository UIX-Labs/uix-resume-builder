import { CircularProgress } from '@shared/ui/circular-progress';
import { Button } from '@shared/ui/components/button';
import Image from 'next/image';
import { DashboardChip } from './dashboard-chip';

interface UploadingStepProps {
  uploadProgress: number;
  onCancel: () => void;
  title: string;
  subtitle: string;
  fileSize?: number;

}

export function UploadingStep({ uploadProgress, onCancel, title, subtitle, fileSize }: UploadingStepProps) {
    const formattedSize = fileSize
  ? `${(fileSize / 1024 / 1024).toFixed(2)} MB`
  : '';


  return (
    <>
      <DashboardChip />

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center mb-8 flex flex-col gap-2">
          <h1 className="text-4xl font-semibold leading-[1.2em] tracking-[-0.03em] text-white">{title}</h1>
          <p className="text-[#A5F4D6] text-xs leading-[1.5em] font-normal">{subtitle}</p>
        </div>

        <div className="mb-8">
          <CircularProgress
            progress={uploadProgress}
            size={216}
            strokeWidth={70}
            backgroundColor="rgba(19, 93, 56, 0.69)"
            progressColor="#A3F7CB"
            variant="green"
          >
            <div className="absolute flex items-center justify-center rounded-full bg-[#2A6045] w-[146px] h-[146px] shadow-[0_4px_25.6px_10px_rgba(0,0,0,0.09)]">
              <div className="flex flex-col items-center justify-center">
                <span className="text-[#CEEEDD] font-semibold text-center leading-[1.2em] tracking-[-0.03em] text-5xl">
                  {uploadProgress}%
                </span>
                 <span className="text-[#75A88D] text-xs leading-[1.5em] text-center font-normal mt-0.5">{formattedSize}</span> 
              </div>
            </div>
          </CircularProgress>
        </div>

        <Button
          type="button"
          onClick={onCancel}
          className="h-14 px-22 py-4 bg-[#154B30] hover:bg-[#0F2419] text-white font-semibold rounded-xl transition-colors text-xl leading-[1.2em] tracking-[-0.02em] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.15)]
"
          variant="ghost"
        >
          Cancel
        </Button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <Image
          src="/images/pika-intelligence.svg"
          alt="Pika Intelligence"
          width={217}
          height={72}
          className="object-contain"
        />
      </div>
    </>
  );
}
