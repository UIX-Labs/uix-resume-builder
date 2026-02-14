import { Button } from '@shared/ui/components/button';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface ResumeCreationMobileCardProps {
  onClick: () => void;
}

export default function ResumeCreationMobileCard({ onClick }: ResumeCreationMobileCardProps) {
  return (
    <div className="w-full bg-white rounded-2xl mt-4 md:hidden px-4 py-4">
      <div className="relative w-full h-[240px] rounded-2xl overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <title>Decorative dashed border</title>
          <rect
            x="0.5"
            y="0.5"
            width="calc(100% - 1px)"
            height="calc(100% - 1px)"
            rx="16"
            ry="16"
            fill="none"
            stroke="rgb(204,212,223)"
            strokeWidth="1"
            strokeDasharray="6 6"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/images/resume-creation-bg2.png"
            alt="Resume preview"
            width={90}
            height={140}
            className="
              absolute
              left-1/2 top-1/2
              -translate-x-[120%] -translate-y-[60%]
              opacity-90
            "
          />

          <Image
            src="/images/contact_page.svg"
            alt="Resume icon"
            width={48}
            height={48}
            className="
              absolute
              left-1/2 
              -translate-x-1/2 -translate-y-[65%]
              opacity-80
            "
          />

          <Image
            src="/images/resume-creation-bg.png"
            alt="Resume preview"
            width={90}
            height={140}
            className="
              absolute
              left-1/2 top-1/2
              translate-x-[30%] -translate-y-[55%]
              opacity-90
            "
          />
        </div>

        <div className="absolute inset-0 flex items-end justify-center z-20 mb-16">
          <div className="rounded-2xl border-2 border-blue-300 p-[2.5px]">
            <Button
              onClick={onClick}
              className="
          w-50
          bg-blue-600 hover:bg-blue-700
          text-white
          rounded-lg
          px-10 py-3
          flex items-center gap-2
          font-medium h-11 text-lg
        "
            >
              Create Resume
              <ChevronDown className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
