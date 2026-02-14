import type { UploadingResumeStepProps } from '@entities/jd-modal-mobile/types/types';
import { UploadingStep } from './uploading-step';

export function UploadingResumeStep({ uploadProgress, onRemoveResume }: UploadingResumeStepProps) {
  return (
    <UploadingStep
      uploadProgress={uploadProgress}
      onCancel={onRemoveResume}
      title="Uploading Resume"
      subtitle="We are uploading your resume"
    />
  );
}
