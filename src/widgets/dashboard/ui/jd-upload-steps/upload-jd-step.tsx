import { UploadCloudIcon } from 'lucide-react';
import Image from 'next/image';
import type { UploadJDStepProps } from '@entities/jd-modal-mobile/types/types';
import { Button } from '@shared/ui/components/button';
import { Input } from '@shared/ui/components/input';
import { DashboardChip } from './dashboard-chip';

export function UploadJDStep({ jdFileInputRef, onJDFileSelect }: UploadJDStepProps) {
  return (
    <>
      <DashboardChip />

      <div className="flex-1 flex flex-col items-center justify-center px-6 mb-16">
        <div className="text-center flex flex-col items-center gap-[2px] mb-6">
          <h1 className="text-white font-semibold text-center text-[36px] leading-[1.2em] tracking-[-0.03em]">
            Tailored with JD
          </h1>
          <p className="text-white/80 text-center text-[18px] leading-[1.33em] tracking-[-0.014em] w-[246px]">
            Upload the job description and tailor your resume
          </p>
        </div>

        <div className="relative flex items-center justify-center w-[364px] h-[364px]">
          <div className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[364px] h-[364px] bg-[rgba(15,77,45,0.24)]" />

          <div className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[286px] h-[286px] bg-[rgba(23,108,65,0.31)]" />

          <div className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[216px] h-[216px] bg-[rgba(33,132,80,0.42)]" />

          <Input ref={jdFileInputRef} type="file" accept=".pdf" onChange={onJDFileSelect} className="hidden" />

          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[152px] h-[152px] rounded-full p-[3px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
            style={{
              background: 'linear-gradient(94deg, #6AC095 3.23%, #1B5F3C 30.1%)',
            }}
          >
            <Button
              type="button"
              onClick={() => jdFileInputRef.current?.click()}
              className="w-full h-full rounded-full flex flex-col items-center justify-center transition-transform hover:scale-105 bg-[rgba(42,96,69,1)]"
              variant="ghost"
            >
              <div className="flex flex-col items-center gap-0">
                <UploadCloudIcon className="text-white size-14" strokeWidth={2} />
                <span className="text-white font-semibold text-center text-[18px] leading-[1.33em] tracking-[-0.019em]">
                  Upload JD
                </span>
              </div>
            </Button>
          </div>
        </div>

        <p className="text-center text-[#75A88D] text-xs leading-[1.5em] font-normal mt-6">
          JPEG and PDF formats, up to 5MB
        </p>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <Image
          src="/images/pika-intelligence.svg"
          alt="Pika Intelligence"
          width={320}
          height={72}
          className="object-contain"
        />
      </div>
    </>
  );
}
