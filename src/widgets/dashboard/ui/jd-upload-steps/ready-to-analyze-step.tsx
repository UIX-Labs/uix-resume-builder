import type { ReadyToAnalyzeStepProps } from '@entities/jd-modal-mobile/types/types';
import { Button } from '@shared/ui/components/button';
import Image from 'next/image';
import { DashboardChip } from './dashboard-chip';
import { UploadedFileCard } from './uploaded-file-card';

export function ReadyToAnalyzeStep({
  jdFile,
  resumeFile,
  onRemoveJD,
  onRemoveResume,
  onRetryJD,
  onRetryResume,
  onRunPikaIntelligence,
}: ReadyToAnalyzeStepProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <DashboardChip />

      <div className="flex flex-col items-center gap-0.5 mt-24 w-[262px]">
        <h2 className="text-white text-[36px] font-semibold leading-[1.2em] tracking-[-0.03em] text-center w-full">
          Tailored with JD
        </h2>
        <p className="text-white text-[18px] leading-[1.333em] tracking-[-0.0144em] text-center w-[246px]">
          Upload the job description and tailor your resume
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-[60px] w-[303px]">
        <UploadedFileCard
          badgeText="JD Uploaded"
          file={jdFile}
          defaultFileName="UIX Labs JD.pdf"
          onRemove={onRemoveJD}
          onRetry={onRetryJD}
        />

        <UploadedFileCard
          badgeText="Resume Uploaded"
          file={resumeFile}
          defaultFileName="Akshat resume.pdf"
          onRemove={onRemoveResume}
          onRetry={onRetryResume}
        />
      </div>

      <Button
        onClick={onRunPikaIntelligence}
        className="flex items-center justify-center gap-2 px-4 py-3 bg-[#02A44F] border-2 border-white rounded-xl mt-[60px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.15)]"
        variant="default"
      >
        <span className="text-white text-[20px] font-semibold leading-[1.2em] tracking-[-0.02em]">
          Run Pika Intelligence
        </span>
        <Image src="/images/auto_awesome.svg" alt="AI Powered" width={17} height={17} className="flex-shrink-0" />
      </Button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <Image
          src="/images/pika-intelligence.svg"
          alt="Pika Intelligence"
          width={217}
          height={72}
          className="object-contain"
        />
      </div>
    </div>
  );
}
