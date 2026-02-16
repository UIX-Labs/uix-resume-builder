export enum ResumeCreationAction {
  CREATE = 'create',
  UPLOAD = 'upload',
  TAILORED_RESUME = 'tailoredResume',
  TAILORED_JD = 'tailoredJD',
}

export type ResumeCreationActionType = ResumeCreationAction | null;

// Union type for compatibility with existing string literal types
export type ResumeCreationActionString = 'create' | 'upload' | 'tailoredResume' | 'tailoredJD';
