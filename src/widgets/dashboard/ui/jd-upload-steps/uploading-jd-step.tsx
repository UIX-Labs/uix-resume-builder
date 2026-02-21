import type { UploadingJDStepProps } from '@entities/jd-modal-mobile/types/types';
import { UploadingStep } from './uploading-step';

export function UploadingJDStep({ uploadProgress, onRemoveJD,  jdFile,}: UploadingJDStepProps) {
  return (
    <UploadingStep
      uploadProgress={uploadProgress}
      onCancel={onRemoveJD}
      title="Uploading JD"
      subtitle="We are uploading your JD"
      fileSize= {jdFile?.size}
    />
  );
}
