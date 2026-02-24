export const MAX_EXPERT_REVIEW_FILE_BYTES = 4 * 1024 * 1024; // 4 MB

export const EXPERT_REVIEW_ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'] as const;

export const EXPERT_REVIEW_ACCEPT = EXPERT_REVIEW_ALLOWED_EXTENSIONS.join(',');

export function isExpertReviewFileTypeValid(file: File): boolean {
  const name = file.name.toLowerCase();
  return EXPERT_REVIEW_ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext));
}
