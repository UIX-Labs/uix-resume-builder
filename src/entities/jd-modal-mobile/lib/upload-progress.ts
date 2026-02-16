import { UPLOAD_PROGRESS } from '@entities/jd-modal-mobile/constants';

export function simulateUploadProgress(onProgress: (progress: number) => void, onComplete: () => void): () => void {
  let progress = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  onProgress(0);

  const progressInterval = setInterval(() => {
    progress += UPLOAD_PROGRESS.INCREMENT;

    if (progress >= 100) {
      clearInterval(progressInterval);
      onProgress(100);

      timeoutId = setTimeout(() => {
        onComplete();
      }, UPLOAD_PROGRESS.COMPLETE_DELAY_MS);
    } else {
      onProgress(progress);
    }
  }, UPLOAD_PROGRESS.INTERVAL_MS);

  return () => {
    clearInterval(progressInterval);
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  };
}
