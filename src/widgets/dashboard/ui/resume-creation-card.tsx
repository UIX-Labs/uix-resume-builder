'use client';

import { createResume } from '@entities/resume';
import { useMutation } from '@tanstack/react-query';
import { ChevronDown, FileText } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@shared/ui/components/button';
import { FileUpload } from '@widgets/resumes/file-upload';
import { useUserProfile } from '@shared/hooks/use-user';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import StarsIcon from '@shared/icons/stars-icon';
import BuilderIntelligenceModal from './builder-intelligence-modal';
import { useState } from 'react';

export default function ResumeCreationCard() {
  const router = useRouter();
  const user = useUserProfile();
  const createResumeMutation = useMutation({
    mutationFn: createResume,
  });

  const [isBuilderIntelligenceModalOpen, setIsBuilderIntelligenceModalOpen] = useState(false);

  const resumeCreateHandler = async () => {
    if (!user.data?.id) {
      return;
    }

    const data = await createResumeMutation.mutateAsync({
      title: 'Frontend Engineer Resume',
      userInfo: {
        userId: user.data.id,
      },
    });

    router.push(`/resume/${data.id}`);
  };

  return (
    <>
      <div className="min-w-[600px] h-[277px] bg-white rounded-[20px] shadow-sm overflow-hidden mt-4">
        <div className="z-10 m-5 h-[237px] bg-white/10 rounded-2xl border border-dashed border-[rgb(204,212,223)] flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 z-20 rounded-xl p-4">
            <div className="w-[44.07px] h-10 flex items-center justify-center">
              <FileText className="w-[29.38px] h-[33.33px] text-black" strokeWidth={1.5} />
            </div>

            <div className="relative w-full h-[52px] rounded-[15px] p-1 flex items-center">
              <div className="flex flex-row gap-3">
                <Popover>
                  <PopoverTrigger>
                    <Button className="flex items-center justify-center gap-2 bg-[rgb(0,95,242)] text-white rounded-xl px-5 py-3 h-11 shadow-sm transition-all hover:bg-[rgb(0,81,217)]">
                      <span>Create Resume</span>
                      <ChevronDown className="w-6 h-6" strokeWidth={2} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-2 w-full">
                    <Button
                      variant="outline"
                      className="relative border-none w-full flex flex-row items-center justify-start gap-2 bg-white text-black rounded-xl h-11 shadow-none hover:bg-[#E9F4FF]"
                      onClick={resumeCreateHandler}
                    >
                      <StarsIcon />
                      <span className="flex items-center gap-2 text-[#656A72] text-base font-normal text-left">
                        From scratch
                      </span>
                    </Button>
                    <Button
                      className="relative border-none w-full flex flex-row items-center justify-center gap-2 bg-white text-black rounded-xl h-11 shadow-none  hover:bg-[#E9F4FF]"
                      variant="outline"
                      onClick={() => setIsBuilderIntelligenceModalOpen((prev) => !prev)}
                    >
                      <StarsIcon />

                      <span className="flex items-center gap-2 text-[#656A72] text-base font-normal justify-center">
                        Builder Intelligence
                        <span className="bg-[#02A44F] text-white text-xs font-medium rounded-full px-2 py-[2px] justify-center">
                          recommended
                        </span>
                      </span>
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="absolute inset-0 flex items-center justify-center -z-1">
                <div className="absolute -left-[50px] -top-[70px] flex flex-col gap-2 -rotate-45">
                  <div className="w-[95.07px] h-[99.23px] bg-[rgb(141,48,48)] rounded-lg flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/template-dashboard.png"
                      alt="Template 1"
                      width={97.7}
                      height={101.91}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="absolute -right-[50px] -top-[70px] flex flex-col gap-2 rotate-45">
                  <div className="w-[95.07px] h-[99.23px] bg-[rgb(141,48,48)] rounded-lg flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/template-dashboard.png"
                      alt="Template 2"
                      width={100.11}
                      height={104.65}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="absolute -left-[50px] -top-[70px] flex flex-col gap-2 -rotate-32">
                  <div className="w-[81.58px] h-[95.96px] bg-white rounded-lg flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/template-dashboard.png"
                      alt="Template 3"
                      width={82.84}
                      height={97.22}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="absolute -right-[50px] -top-[70px] flex flex-col gap-2 rotate-25">
                  <div className="w-[81.49px] h-[95.92px] bg-[#1FB272] rounded-lg flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/template-dashboard.png"
                      alt="Template 4"
                      width={87.87}
                      height={102.72}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isBuilderIntelligenceModalOpen && (
        <BuilderIntelligenceModal
          isOpen={isBuilderIntelligenceModalOpen}
          onClose={() => setIsBuilderIntelligenceModalOpen(false)}
        />
      )}
    </>
  );
}
