'use client';

import { cn } from '@shared/lib/utils';
import { Button } from '@shared/ui/components/button';
import { Modal, ModalBody } from '@shared/ui/components/modal';
import { X } from 'lucide-react';
import Image from 'next/image';
import { REFERRAL_CONSTANTS } from '@features/referral-flow/constants';

interface FriendsJoinedEmptyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FriendsJoinedEmptyModal({ open, onOpenChange }: FriendsJoinedEmptyModalProps) {
  return (
    <Modal
      isOpen={open}
      onClose={() => onOpenChange(false)}
      className={cn('w-[90%] h-auto overflow-visible', 'border-0 shadow-none bg-transparent')}
      showCloseButton={false}
      overlayClassName="backdrop-blur-md"
    >
      <Button
        onClick={() => onOpenChange(false)}
        className="absolute -top-2 -right-2 z-50 w-10 h-10 rounded-full bg-referral-modal-bg border-[3px] border-white flex items-center justify-center transition-opacity hover:opacity-80 focus:outline-none focus:ring-0 focus:ring-white p-0"
        aria-label="Close modal"
      >
        <X className="size-4 text-white" strokeWidth={2.5} />
      </Button>

      <ModalBody className="relative px-0 py-8 overflow-hidden rounded-3xl bg-referral-modal-bg border-0">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-[321px] -top-[125px] w-[922px] h-[922px] rounded-full opacity-100 bg-[linear-gradient(145deg,rgb(235,137,110)_33%,rgb(233,59,54)_36%,rgb(23,23,23)_70%)] blur-[100px]" />
        </div>

        <div className="absolute -left-20 -top-25 w-80 pointer-events-none opacity-80">
          <Image
            src="/images/referral-bg.png"
            alt="background pattern"
            width={390}
            height={376}
            priority
            className="pointer-events-none select-none"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center px-2">
          <h2 className="text-5xl font-semibold leading-[1] tracking-[-0.03em] text-center text-referral-text-primary mb-5 w-[327px]">
            {REFERRAL_CONSTANTS.MODAL_TITLE}
          </h2>

          <div className="flex flex-col items-center gap-7 w-[235px]">
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-19 h-19 rounded-full bg-referral-step-bg flex items-center justify-center">
                <Image src="/images/chat.svg" alt="Chat icon" width={28} height={28} />
              </div>
              <h3 className="text-base font-semibold leading-[1.375] tracking-[-0.011em] text-center text-white">
                {REFERRAL_CONSTANTS.STEPS.SEND.title}
              </h3>
              <p className="text-sm font-normal leading-[1.43] tracking-[-0.004em] text-center text-white/60 w-[233px]">
                {REFERRAL_CONSTANTS.STEPS.SEND.description}
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-19 h-19 rounded-full bg-referral-step-bg flex items-center justify-center">
                <Image src="/images/app_registration.svg" alt="Registration icon" width={28} height={28} />
              </div>
              <h3 className="text-base font-semibold leading-[1.375] tracking-[-0.011em] text-center text-white">
                {REFERRAL_CONSTANTS.STEPS.REGISTER.title}
              </h3>
              <p className="text-sm font-normal leading-[1.43] tracking-[-0.004em] text-center text-white/60 w-[163px]">
                {REFERRAL_CONSTANTS.STEPS.REGISTER.description}
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-19 h-19 rounded-full bg-referral-step-bg flex items-center justify-center">
                <Image src="/images/earn-downloads.svg" alt="Earn downloads icon" width={28} height={28} />
              </div>
              <h3 className="text-base font-semibold leading-[1.375] tracking-[-0.011em] text-center text-white">
                {REFERRAL_CONSTANTS.STEPS.EARN.title}
              </h3>
              <p className="text-sm font-normal leading-[1.43] tracking-[-0.004em] text-center text-white/60 w-[225px]">
                {REFERRAL_CONSTANTS.STEPS.EARN.description}
              </p>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
