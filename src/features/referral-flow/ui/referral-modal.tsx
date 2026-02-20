'use client';

import { cn } from '@shared/lib/utils';
import { Button } from '@shared/ui/components/button';
import { Modal, ModalBody } from '@shared/ui/components/modal';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { REFERRAL_CONSTANTS, REFERRAL_STEPS } from '../constants';
import { CurveDownwardsSvg, CurveUpwardsSvg } from './referral-curve-svg';
import { ReferralStepsCarousel } from './referral-steps-carousel';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralLink?: string;
}

export function ReferralModal({
  isOpen,
  onClose,
  referralLink = REFERRAL_CONSTANTS.DEFAULT_REFERRAL_LINK,
}: ReferralModalProps) {
  const [_copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      toast.success(<p>Referral link copied!</p>);
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast.error('Failed to copy link');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={cn('w-[90%] sm:max-w-[1035px] overflow-visible', 'border-0 shadow-none bg-transparent h-auto')}
      showCloseButton={false}
      overlayClassName="backdrop-blur-md"
    >
      <Button
        onClick={onClose}
        className="absolute -top-2 -right-2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-referral-modal-bg border-[3px] sm:border-[4px] border-white flex items-center justify-center transition-opacity hover:opacity-80 focus:outline-none focus:ring-0 focus:ring-white p-0"
        aria-label="Close modal"
      >
        <X className="size-4 sm:size-5 text-white" strokeWidth={2.5} />
      </Button>

      <ModalBody className="relative px-0 sm:px-8 md:px-12 py-8 sm:py-12 overflow-hidden rounded-[24px] sm:rounded-[36px] bg-referral-modal-bg sm:bg-referral-modal-bg-alt border-0">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-[321px] sm:-left-[340px] -top-[125px] w-[922px] sm:w-250 h-[922px] sm:h-250 rounded-full opacity-100 bg-[linear-gradient(145deg,rgb(235,137,110)_33%,rgb(233,59,54)_36%,rgb(23,23,23)_70%)] blur-[100px]" />
        </div>

        <Image
          src="/images/referral-bg.png"
          alt="background pattern"
          width={260}
          height={260}
          priority
          className="absolute top-0 left-0 pointer-events-none select-none hidden sm:block"
        />
        <div className="absolute -left-20 -top-25 w-80 pointer-events-none opacity-80 sm:hidden">
          <Image
            src="/images/referral-bg.png"
            alt="background pattern"
            width={390}
            height={376}
            priority
            className="pointer-events-none select-none"
          />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col items-center gap-2 mb-8 sm:mb-12 px-4 md:px-0">
            <h2 className="text-5xl sm:text-[clamp(32px,5.6vw,56px)] font-semibold leading-[1] sm:leading-[1.2] tracking-[-0.03em] text-center w-full sm:max-w-none text-referral-text-primary">
              {REFERRAL_CONSTANTS.MODAL_TITLE}
            </h2>
            <p className="text-base sm:text-lg font-normal leading-[1.375] sm:leading-[1.33] tracking-[-0.011em] sm:tracking-[-0.0144em] text-center text-white  sm:max-w-[653px]">
              {REFERRAL_CONSTANTS.MODAL_DESCRIPTION}
            </p>
          </div>

          <div className="mb-12 sm:mb-16">
            <div className="sm:hidden">
              <ReferralStepsCarousel steps={REFERRAL_STEPS} />
            </div>

            <div className="hidden sm:flex items-center justify-center gap-26 mb-8 sm:mb-12 relative">
              <div className="flex flex-col items-center gap-2 relative">
                <div className="w-19 h-19 rounded-full bg-referral-step-bg flex items-center justify-center mb-2 relative">
                  <Image src="/images/chat.svg" alt="Chat icon" width={28} height={28} />
                  <CurveUpwardsSvg className="absolute -top-[43px] left-25 w-45 h-20 pointer-events-none" />
                </div>
                <h3 className="text-base font-semibold leading-[1.375] tracking-[-0.011em] text-center text-white">
                  {REFERRAL_CONSTANTS.STEPS.SEND.title}
                </h3>
                <p className="text-sm font-normal leading-[1.43] tracking-[-0.004em] text-center text-white/60 max-w-[233px]">
                  {REFERRAL_CONSTANTS.STEPS.SEND.description}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 relative">
                <div className="w-[76px] h-[76px] rounded-full bg-referral-step-bg flex items-center justify-center mb-2 relative">
                  <Image src="/images/app_registration.svg" alt="Registration icon" width={28} height={28} />
                  <CurveDownwardsSvg className="absolute top-[25px] left-[100px] w-[180px] h-[80px] pointer-events-none" />
                </div>

                <h3 className="text-base font-semibold leading-[1.375] tracking-[-0.011em] text-center text-white">
                  {REFERRAL_CONSTANTS.STEPS.REGISTER.title}
                </h3>
                <p className="text-sm font-normal leading-[1.43] tracking-[-0.004em] text-center text-white/60 max-w-[163px]">
                  {REFERRAL_CONSTANTS.STEPS.REGISTER.description}
                </p>
              </div>{' '}
              <div className="flex flex-col items-center gap-2">
                <div className="w-19 h-19 rounded-full bg-referral-step-bg flex items-center justify-center mb-2">
                  <Image src="/images/earn-downloads.svg" alt="Earn downloads icon" width={28} height={28} />
                </div>
                <h3 className="text-base font-semibold leading-[1.375] tracking-[-0.011em] text-center text-white">
                  {REFERRAL_CONSTANTS.STEPS.EARN.title}
                </h3>
                <p className="text-sm font-normal leading-[1.43] tracking-[-0.004em] text-center text-white/60 max-w-[225px]">
                  {REFERRAL_CONSTANTS.STEPS.EARN.description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 sm:gap-6 max-w-[311px] sm:max-w-[609px] mx-auto">
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-xl font-semibold leading-[1.2] tracking-[-0.03em] text-center text-referral-text-primary">
                {REFERRAL_CONSTANTS.SHARE_TITLE}
              </h3>
              <p className="text-[13px] font-normal leading-[1.38] text-center text-white max-w-[269px] sm:max-w-none">
                {REFERRAL_CONSTANTS.SHARE_DESCRIPTION}
              </p>
            </div>

            <div className="w-full h-16 rounded-[20px] flex items-center justify-between px-3 sm:px-4 gap-2 sm:gap-4 bg-referral-link-field-bg">
              <span className="text-[13px] sm:text-sm font-semibold leading-[1.23] sm:leading-[1.43] tracking-[-0.001em] truncate text-referral-link-text">
                {referralLink}
              </span>
              <Button
                onClick={handleCopyLink}
                className={cn(
                  'rounded-[12px] px-5 py-3 h-auto min-w-24 sm:min-w-[111px] transition-all',
                  'shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)]',
                  'relative overflow-hidden bg-referral-button-bg-mobile sm:bg-referral-button-bg',
                  'hover:bg-referral-button-hover hover:border hover:border-transparent',
                  'hover:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04),inset_0_0_0_1px_transparent]',
                  'hover:[background-image:linear-gradient(rgb(126,52,49),rgb(126,52,49)),linear-gradient(131deg,rgb(215,168,166)_0%,rgb(59,30,29)_47%)]',
                  'hover:[background-origin:border-box,border-box]',
                  'hover:[background-clip:padding-box,border-box]',
                )}
              >
                <span className="relative z-10 flex items-center">
                  <span className="text-base sm:text-lg font-semibold leading-[1.375] sm:leading-[1.33] tracking-[-0.011em] sm:tracking-[-0.014em] text-referral-button-text hover:text-referral-button-text">
                    {REFERRAL_CONSTANTS.COPY_BUTTON_TEXT}
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
