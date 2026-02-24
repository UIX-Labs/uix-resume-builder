'use client';

import { Modal, ModalBody } from '@shared/ui/components/modal';
import { ShieldAlert } from 'lucide-react';

interface ResumeNotAccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export function ResumeNotAccessibleModal({
  isOpen,
  onClose,
  message = 'You are not allowed to access this.',
}: ResumeNotAccessibleModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
