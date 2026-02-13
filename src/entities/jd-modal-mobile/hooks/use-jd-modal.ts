import { useCallback, useState } from 'react';

interface UseJDModalOptions {
  onRelease?: () => void;
}

interface UseJDModalReturn {
  isJDModalOpen: boolean;
  handleJDModalOpen: () => void;
  handleJDModalClose: () => void;
  handleJDSubmittingChange: (isSubmitting: boolean, hasError?: boolean) => void;
}

export function useJDModal(options?: UseJDModalOptions): UseJDModalReturn {
  const [isJDModalOpen, setIsJDModalOpen] = useState(false);

  const handleJDModalOpen = useCallback(() => {
    setIsJDModalOpen(true);
  }, []);

  const handleJDModalClose = useCallback(() => {
    setIsJDModalOpen(false);
  }, []);

  const handleJDSubmittingChange = useCallback(
    (isSubmitting: boolean, hasError?: boolean) => {
      if (isSubmitting) {
        return;
      }
      if (hasError && options?.onRelease) {
        options.onRelease();
      }
    },
    [options],
  );

  return {
    isJDModalOpen,
    handleJDModalOpen,
    handleJDModalClose,
    handleJDSubmittingChange,
  };
}
