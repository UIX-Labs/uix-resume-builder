const FILE_SIZE = 1024;
const MAX_FILE_SIZE = 5 * FILE_SIZE * FILE_SIZE;

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(FILE_SIZE));
  return `${parseFloat((bytes / FILE_SIZE ** i).toFixed(2))} ${sizes[i]}`;
};

export const validateFile = (file: File): { valid: boolean; error?: string } => {
  const allowedTypes = ['application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload only PDF files.' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size must be less than 5MB.' };
  }

  return { valid: true };
};
