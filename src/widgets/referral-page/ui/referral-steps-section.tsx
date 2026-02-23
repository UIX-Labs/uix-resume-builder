import Image from 'next/image';
import { CurveUpwardsSvg, CurveDownwardsSvg } from '@/features/referral-flow/ui/referral-curve-svg';

export default function ReferralStepsSection() {
  return (
    <div className="rounded-3xl p-8 md:p-12">
      <div className="flex items-center justify-center gap-12 md:gap-26 relative">
        <div className="flex flex-col items-center gap-2 relative">
          <div className="w-19 h-19 rounded-full bg-white flex items-center justify-center mb-2 relative">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Image src="/images/chat-dash.svg" alt="" width={28} height={28} />
            </div>
            <CurveUpwardsSvg
              className="absolute -top-[43px] left-25 w-45 h-20 pointer-events-none hidden md:block"
              stroke="rgba(12,17,24,0.2)"
            />
          </div>
          <h3 className="text-base font-semibold leading-[1.375] tracking-[-0.011em] text-center text-dark-900">
            Send Invitation
          </h3>
          <p className="text-sm font-normal leading-[1.43] tracking-[-0.004em] text-center text-dark-900/50 max-w-[233px]">
            Share your referral link with friends and invite them to try Pika Resume.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 relative">
          <div className="w-19 h-19 rounded-full bg-white flex items-center justify-center mb-2 relative">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Image src="/images/app_registration-dash.svg" alt="" width={28} height={28} />
            </div>
            <CurveDownwardsSvg
              className="absolute top-[25px] left-[100px] w-[180px] h-[80px] pointer-events-none hidden md:block"
              stroke="rgba(12,17,24,0.2)"
            />
          </div>
          <h3 className="text-base font-semibold leading-[1.375] tracking-[-0.011em] text-center text-dark-900">
            Registration
          </h3>
          <p className="text-sm font-normal leading-[1.43] tracking-[-0.004em] text-center text-dark-900/50 max-w-[163px]">
            They sign up using your referral link.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-19 h-19 rounded-full bg-white flex items-center justify-center mb-2">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Image src="/images/earn.svg" alt="" width={28} height={28} />
            </div>
          </div>
          <h3 className="text-base font-semibold leading-[1.375] tracking-[-0.011em] text-center text-dark-900">
            Earn Downloads
          </h3>
          <p className="text-sm font-normal leading-[1.43] tracking-[-0.004em] text-center text-dark-900/50 max-w-[225px]">
            You get 3 free downloads, and your friend gets 1 free download.
          </p>
        </div>
      </div>
    </div>
  );
}
