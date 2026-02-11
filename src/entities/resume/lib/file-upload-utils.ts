export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
};

export const validateFile = (file: File): { valid: boolean; error?: string } => {
  const allowedTypes = ['application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload only PDF files.' };
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 5MB.' };
  }

  return { valid: true };
};
