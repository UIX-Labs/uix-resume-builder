import { fetch } from '@shared/api';

export async function uploadResumeForReview(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return fetch('resume/upload-for-review', {
    options: {
      method: 'POST',
      body: formData,
    },
  });
}
