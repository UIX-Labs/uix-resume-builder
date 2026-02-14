import { useCallback, useState } from 'react';

interface UseJDModalOptions {
  onRelease?: () => void;
}

interface UseJDModalReturn {
  isJDModalOpen: boolean;
  handleJDModal: (isOpen: boolean) => void;
  handleJDSubmittingChange: (isSubmitting: boolean, hasError?: boolean) => void;
}

export function useJDModal(options?: UseJDModalOptions): UseJDModalReturn {
  const [isJDModalOpen, setIsJDModalOpen] = useState(false);

  const handleJDModal = useCallback((isOpen: boolean) => {
    setIsJDModalOpen(isOpen);
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
    handleJDModal,
    handleJDSubmittingChange,
  };
}
