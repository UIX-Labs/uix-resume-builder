export enum ModalStep {
  UPLOAD_JD = 'upload-jd',
  UPLOADING_JD = 'uploading-jd',
  UPLOAD_RESUME = 'upload-resume',
  UPLOADING_RESUME = 'uploading-resume',
  READY_TO_ANALYZE = 'ready-to-analyze',
}

export enum StepPropKey {
  JD_FILE = 'jdFile',
  RESUME_FILE = 'resumeFile',
  UPLOAD_PROGRESS = 'uploadProgress',
  UPLOAD_ERROR = 'uploadError',
  ON_JD_FILE_SELECT = 'onJDFileSelect',
  ON_RESUME_FILE_SELECT = 'onResumeFileSelect',
  ON_REMOVE_JD = 'onRemoveJD',
  ON_REMOVE_RESUME = 'onRemoveResume',
  ON_RETRY_JD = 'onRetryJD',
  ON_RETRY_RESUME = 'onRetryResume',
  ON_RESUME_SELECTED = 'onResumeSelected',
  ON_RUN_PIKA_INTELLIGENCE = 'onRunPikaIntelligence',
  IS_SUBMITTING = 'isSubmitting',
  JD_FILE_INPUT_REF = 'jdFileInputRef',
  RESUME_FILE_INPUT_REF = 'resumeFileInputRef',
}

export interface StepProps {
  jdFile: File | null;
  resumeFile: File | null;
  uploadProgress: number;
  uploadError?: string | null;
  onJDFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResumeFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveJD: () => void;
  onRemoveResume: () => void;
  onRetryJD: () => void;
  onRetryResume: () => void;
  onResumeSelected?: (resumeId: string) => void;
  onRunPikaIntelligence: () => void;
  isSubmitting: boolean;
  jdFileInputRef: React.RefObject<HTMLInputElement>;
  resumeFileInputRef: React.RefObject<HTMLInputElement>;
}

export type UploadJDStepProps = Pick<StepProps, StepPropKey.JD_FILE_INPUT_REF | StepPropKey.ON_JD_FILE_SELECT>;

export type UploadingJDStepProps = Pick<StepProps, StepPropKey.UPLOAD_PROGRESS | StepPropKey.ON_REMOVE_JD  | StepPropKey.JD_FILE>;

export type UploadResumeStepProps = Pick<
  StepProps,
  | StepPropKey.JD_FILE
  | StepPropKey.RESUME_FILE_INPUT_REF
  | StepPropKey.ON_RESUME_FILE_SELECT
  | StepPropKey.ON_REMOVE_JD
  | StepPropKey.ON_RETRY_JD
  | StepPropKey.ON_RESUME_SELECTED
>;

export type UploadingResumeStepProps = Pick<StepProps, StepPropKey.UPLOAD_PROGRESS | StepPropKey.ON_REMOVE_RESUME>;

export type ReadyToAnalyzeStepProps = Pick<
  StepProps,
  | StepPropKey.JD_FILE
  | StepPropKey.RESUME_FILE
  | StepPropKey.ON_REMOVE_JD
  | StepPropKey.ON_REMOVE_RESUME
  | StepPropKey.ON_RETRY_JD
  | StepPropKey.ON_RETRY_RESUME
  | StepPropKey.ON_RUN_PIKA_INTELLIGENCE
  // | StepPropKey.IS_SUBMITTING
>;
