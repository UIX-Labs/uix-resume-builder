'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { CloseIcon } from '@shared/icons/close-icon';
import { Dialog, DialogOverlay, DialogPortal, DialogTitle } from '@shared/ui/dialog';
import Image from 'next/image';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScratchClick: () => void;
  onUploadClick: () => void;
  onLinkedInClick: () => void;
  onJDClick: () => void;
}

const OPTIONS = [
  {
    id: 'scratch',
    iconSrc: '/images/template-search/ant-design_build-filled.svg',
    iconAlt: 'Scratch',
    label: 'Start from Scratch',
  },
  {
    id: 'upload',
    iconSrc: '/images/template-search/flowbite_upload-solid.svg',
    iconAlt: 'Upload',
    label: 'Upload Existing Resume',
  },
  {
    id: 'linkedin',
    iconSrc: '/images/template-search/prime_linkedin.svg',
    iconAlt: 'LinkedIn',
    label: 'Import from LinkedIn / Use LinkedIn Resume',
  },
  {
    id: 'job',
    iconSrc: '/images/template-search/si_ai-edit-fill.svg',
    iconAlt: 'Job',
    label: 'Tailored with Job Description',
  },
];

export function GetStartedModal({
  isOpen,
  onClose,
  onScratchClick,
  onUploadClick,
  onLinkedInClick,
  onJDClick,
}: GetStartedModalProps) {
  const handleClick = (id: string) => {
    console.log('option clicked:', id);
    onClose();
    if (id === 'scratch') onScratchClick();
    if (id === 'upload') {
      console.log('upload calling');
      onUploadClick();
    }
    if (id === 'linkedin') onLinkedInClick();
    if (id === 'job') onJDClick();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="backdrop-blur-sm" />
        <DialogPrimitive.Content className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-[520px] bg-white rounded-2xl p-8 shadow-2xl overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200">
          <div className="dotted-bg rounded-2xl" />

          <DialogTitle className="sr-only">Get Started</DialogTitle>

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 cursor-pointer bg-white rounded-full p-1 hover:bg-gray-100 transition-colors"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-900">
                Let's get <span className="text-[#005FF2]">Started</span>
              </h2>
              <p className="text-gray-400 text-xl mt-1">How do you want to create your Resume?</p>
            </div>

            <div className="flex flex-col gap-3">
              {OPTIONS.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => handleClick(option.id)}
                  className="flex items-center justify-between w-full px-5 py-4 rounded-xl border border-gray-200 hover:border-[#005FF2] hover:bg-blue-50 transition-all duration-200 cursor-pointer group bg-gray-100 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <Image src={option.iconSrc} alt={option.iconAlt} width={20} height={20} />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#005FF2]">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
