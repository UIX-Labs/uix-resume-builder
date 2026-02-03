import { Button } from '@shared/ui/components/button';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface ResumeCreationMobileCardProps {
  onClick: () => void;
}

export default function ResumeCreationMobileCard({ onClick }: ResumeCreationMobileCardProps) {
  return (
    <div className="w-full bg-white rounded-2xl mt-4 md:hidden px-4 py-4">
      <div className="relative w-full h-[240px] rounded-2xl border border-dashed border-[rgb(204,212,223)] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/images/resume-creation-bg2.png"
            alt="Resume preview"
            width={90}
            height={120}
            className="
              absolute
              left-1/2 top-1/2
              -translate-x-[140%] -translate-y-1/2
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
              left-1/2 [top-30%]
              -translate-x-1/2 -translate-y-1/2
              opacity-80
            "
          />

          <Image
            src="/images/resume-creation-bg.png"
            alt="Resume preview"
            width={90}
            height={120}
            className="
              absolute
              left-1/2 top-1/2
              translate-x-[40%] -translate-y-1/2
              opacity-90
            "
          />
        </div>

        <div className="absolute inset-0 flex items-end justify-center z-20 mb-16">
          <div className="rounded-2xl border-2 border-blue-300 p-[2.5px]">
            <Button
              onClick={onClick}
              className="
          w-44
          bg-blue-600 hover:bg-blue-700
          text-white
          rounded-lg
          px-10 py-3
          flex items-center gap-2
          font-medium
        "
            >
              Create Resume
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
