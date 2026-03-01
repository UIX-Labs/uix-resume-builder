'use client';

import { isNil } from '@shared/lib/guards';
import { Modal, ModalBody } from '@shared/ui/components/modal';
import { ShieldAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { isApiError } from '../../models/guards';

interface NotAccessibleModalProps {
  error: Error | null;
}

export function NotAccessibleModal({ error }: NotAccessibleModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const message = isApiError(error)
    ? error.data?.message?.message || 'You are not allowed to access this.'
    : 'You are not allowed to access this.';

  useEffect(() => {
    if (!isNil(error) && isApiError(error) && error.status === 403) {
      setIsOpen(true);
    }
  }, [error]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      showCloseButton={true}
      closeButtonVariant="default"
      className="max-w-[90%] md:w-auto mx-auto"
      overlayClassName="backdrop-blur-md"
    >
      <ModalBody className="flex flex-col items-center gap-6 py-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <ShieldAlert className="h-8 w-8 text-red-600" />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">Access Denied</h2>
          <p className="text-sm text-gray-600 max-w-sm">{message}</p>
        </div>
      </ModalBody>
    </Modal>
  );
}
