'use client';

import { cn } from '@shared/lib/utils';
import { Button } from '@shared/ui/components/button';
import { Modal, ModalBody } from '@shared/ui/components/modal';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ReferralNewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReferralNewUserModal({ isOpen, onClose }: ReferralNewUserModalProps) {
  const router = useRouter();

  const handleBackToDashboard = () => {
    onClose();
    router.push('/dashboard');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={cn('w-[90%] sm:max-w-5xl overflow-visible h-[80vh] sm:h-auto', 'border-0 shadow-none bg-transparent')}
      showCloseButton={false}
      overlayClassName="backdrop-blur-md"
    >
      <Button
        onClick={onClose}
        className="absolute -top-2 -right-2 z-50 size-10 sm:size-12 rounded-full bg-expert-bg border-4 sm:border-[5px] border-white flex items-center justify-center transition-opacity hover:opacity-80 focus:outline-none focus:ring-0 focus:ring-white p-0"
        aria-label="Close modal"
      >
        <X className="size-4 sm:size-5 text-white" strokeWidth={2.5} />
      </Button>

      <ModalBody className="h-full sm:h-auto relative px-4 sm:px-16 md:px-16 py-12 sm:py-20 overflow-hidden rounded-3xl sm:rounded-[36px] bg-expert-bg border-0 min-h-96 flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -left-[340px] -top-[261px] w-[1028px] h-[1028px] rounded-full opacity-100 bg-[linear-gradient(136deg,var(--color-expert-gradient-start)_30%,var(--color-neutral-900)_68%)] blur-[100px]" />
        </div>

        <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 sm:left-25 sm:top-25 w-72 h-72 pointer-events-none">
          <Image
            src="/images/jd-modal-bg.png"
            alt="Decorative background pattern"
            width={294}
            height={294}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="absolute right-40 sm:right-56 -top-10 sm:top-56 w-60 sm:w-80 h-44 sm:h-48 pointer-events-none">
          <Image
            src="/images/pattern.svg"
            alt="Decorative cross pattern"
            width={322}
            height={149}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="absolute right-48 sm:right-2 -bottom-5 sm:top-0 w-60 sm:w-80 h-40 sm:h-48 pointer-events-none">
          <Image
            src="/images/pattern.svg"
            alt="Decorative cross pattern"
            width={322}
            height={149}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="absolute -right-11 -bottom-11.5 sm:-right-14.5 sm:top-20 size-40 sm:size-52 pointer-events-none rotate-[90deg] sm:rotate-0">
          <Image
            src="/images/Star-2.png"
            alt="Decorative star element"
            width={105}
            height={105}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="relative z-10 w-full">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-5xl sm:text-[56px] font-semibold leading-tight sm:leading-tight tracking-tight text-expert-heading text-center sm:text-left sm:whitespace-nowrap max-w-[326px] sm:w-auto">
                You've received 1 free download
              </h2>
              <p className="text-base font-normal leading-snug tracking-tight text-expert-subheading text-center sm:text-left max-w-lg">
                It's been added to your account. Check your total downloads in the Referral Dashboard
              </p>
            </div>

            <div className="flex justify-center sm:justify-start">
              <Button
                onClick={handleBackToDashboard}
                className={cn(
                  'w-full sm:w-76 h-auto px-7 py-3 rounded-xl',
                  'bg-transparent active:bg-blue-hover',
                  'border-2 border-white',
                  'shadow-sm',
                  'transition-colors duration-200 w-[256px] sm:w-auto',
                )}
              >
                <span className="text-2xl font-semibold leading-tight tracking-tight text-white text-center">
                  Back to Dashboard
                </span>
              </Button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
