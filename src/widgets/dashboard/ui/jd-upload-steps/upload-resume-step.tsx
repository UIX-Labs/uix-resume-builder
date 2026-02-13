import { File, UploadCloudIcon } from 'lucide-react';
import Image from 'next/image';
import type { UploadResumeStepProps } from '@entities/jd-modal-mobile/types/types';
import { UploadedFileCard } from './uploaded-file-card';
import { Button } from '@shared/ui/components/button';
import { Input } from '@shared/ui/components/input';
import { DashboardChip } from './dashboard-chip';
import { YourResumesModal } from '@widgets/dashboard/ui/your-resumes-modal';
import { useState } from 'react';

export function UploadResumeStep({
  jdFile,
  resumeFileInputRef,
  onResumeFileSelect,
  onRemoveJD,
  onRetryJD,
  onResumeSelected,
}: UploadResumeStepProps) {
  const [isYourResumesModalOpen, setIsYourResumesModalOpen] = useState(false);

  const handleResumeSelect = (resumeId: string) => {
    console.log('Selected resume ID:', resumeId);

    setIsYourResumesModalOpen(false);

    if (onResumeSelected) {
      onResumeSelected(resumeId);
    }
  };

  return (
    <>
      <DashboardChip />

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center mb-8 flex flex-col gap-[2px]">
          <h1 className="text-white font-semibold text-center text-[36px] leading-[1.2em] tracking-[-0.03em]">
            Tailored with JD
          </h1>
          <p className="text-white font-normal text-center text-[18px] leading-[1.333em] tracking-[-0.0144em]">
            Upload the job description and tailor your resume
          </p>
        </div>

        <div className="w-full max-w-[279px] mb-6">
          <UploadedFileCard
            badgeText="JD Uploaded"
            file={jdFile}
            defaultFileName="UIX Labs JD.pdf"
            onRemove={onRemoveJD}
            onRetry={onRetryJD}
            showBorder={false}
          />
        </div>

        <div className="w-full max-w-[303px] rounded-[36px] p-6 mb-8 border border-dashed border-[#6AC095]">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-1 w-full">
              <Input
                type="file"
                ref={resumeFileInputRef}
                onChange={onResumeFileSelect}
                accept=".pdf,.jpg,.jpeg"
                className="hidden"
                id="resume-input"
              />
              <label htmlFor="resume-input" className="cursor-pointer">
                <div
                  className="w-[84px] h-[44px] rounded-full flex items-center justify-center bg-[linear-gradient(131deg,_rgba(106,192,149,1)_0%,_rgba(27,95,60,1)_47%)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.15)]
"
                >
                  <UploadCloudIcon size={28} className="text-white" />
                </div>
              </label>
              <div className="flex flex-col items-center w-full">
                <span className="text-[#A7CAB8] font-bold text-center text-[20px] leading-[1.3em] tracking-[-0.02em]">
                  upload resume
                </span>
                <span className="text-[#5F8672] text-xs leading-[1.5em] text-center font-normal">
                  JPEG and PDF formats, up to 5MB
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full">
              <div className="h-[1px] flex-1 bg-[linear-gradient(131deg,_rgba(27,95,60,1)_53%,_rgba(106,192,149,1)_100%)]" />
              <span className="text-[#59806C] text-center font-normal text-sm leading-[1.428em] tracking-[-0.00357em]">
                or
              </span>
              <div className="h-[1px] flex-1 bg-[linear-gradient(131deg,_rgba(27,95,60,1)_53%,_rgba(106,192,149,1)_100%)]" />
            </div>

            <div className="flex flex-col items-center gap-1 w-full">
              <Button
                onClick={() => setIsYourResumesModalOpen(true)}
                className="w-[84px] h-[44px] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity bg-[linear-gradient(131deg,_rgba(106,192,149,1)_0%,_rgba(27,95,60,1)_47%)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.15)]
 p-0"
                variant="ghost"
              >
                <File />
              </Button>
              <div className="flex flex-col items-center w-full">
                <span className="text-[#A7CAB8] font-normal text-center text-[20px] leading-[1.4em] tracking-[-0.02em]">
                  choose from resume
                </span>
                <span className="text-[#5F8672] text-xs leading-[1.5em] text-center font-normal">
                  Select a resume from your saved resumes
                </span>
              </div>
            </div>
          </div>
        </div>
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

      <YourResumesModal
        isOpen={isYourResumesModalOpen}
        onClose={() => setIsYourResumesModalOpen(false)}
        onSelect={handleResumeSelect}
      />
    </>
  );
}
