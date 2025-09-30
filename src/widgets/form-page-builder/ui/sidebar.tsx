import { Education } from '@shared/icons/education';
import { Experience } from '@shared/icons/experience';
import { PersonalInfo } from '@shared/icons/personal-info';
import { ProfessionalSummary } from '@shared/icons/prof-summary';
import { Skills } from '@shared/icons/skills';
import { cn } from '@shared/lib/cn';
import { ProgressCircle } from '@shared/ui/progress-circle';
import { useFormPageBuilder } from '../models/ctx';
import Image from 'next/image';
import { Achievements } from '@shared/icons/achievements';
import { useEffect, useState } from 'react';
import { useFormDataStore } from '../models/store';
import { calculateResumeCompletion } from '@shared/lib/resume-completion';
import { useRouter } from 'next/navigation';

const icons = {
  personalDetails: PersonalInfo,
  professionalSummary: ProfessionalSummary,
  experience: Experience,
  education: Education,
  skills: Skills,
  achievements: Achievements,
};

export function Sidebar() {
  const [progress, setProgress] = useState(0);
  const { currentStep, setCurrentStep, navs } = useFormPageBuilder();

  const resumeData = useFormDataStore((state) => state.formData);
  const router = useRouter();

  useEffect(() => {
    if (!resumeData) return;

    const p = calculateResumeCompletion(resumeData);

    const fixed = +p.toFixed(0);
    setProgress(isNaN(fixed) ? 0 : Number(fixed));
  }, [resumeData]);

  const currentStepIndex = navs.findIndex((nav) => nav.label === currentStep);

  return (
    <div className="bg-white border-2 border-[#E9F4FF] rounded-[36px] min-w-[200px] h-[calc(100vh-32px)] py-4 flex flex-col items-center mt-4">
      <div className="flex items-center gap-2">
        <div
          onClick={() => router.push('/resumes')}
          className="px-1 text-lg text-gray-800 cursor-pointer transition-all duration-300 hover:bg-gray-200 rounded-md 
        flex items-center justify-center w-6 h-6"
        >
          <span>{'\u2190'}</span>
        </div>

        <p className="text-[#0B0A09] text-lg font-semibold">Resume Builder</p>
      </div>

      <div className="flex items-center gap-2 text-[12px] font-bold text-white px-3 py-[4.5px] bg-[#02A44F] rounded-[25px] mt-1">
        AI Powered
        <Image src="/images/sparkles.svg" alt="Sparkles" width={17} height={17} />
      </div>

      {/* Progress Circle */}
      <div className="mt-5">
        <ProgressCircle progress={progress} totalSteps={navs.length} currentStep={currentStepIndex + 1} />
      </div>

      <div className="flex flex-col gap-2 mt-12 w-full pl-6">
        {navs.map((nav) => {
          const Icon = icons[nav.name as keyof typeof icons] ?? ProfessionalSummary;

          return (
            <button
              type="button"
              key={nav.name}
              className={cn(
                'flex items-center gap-2 px-1 py-1.5 rounded-2xl cursor-pointer pr-4 w-fit',
                currentStep === nav.name && 'bg-[#E9F4FF]',
              )}
              onClick={() => setCurrentStep(nav.name)}
            >
              {Icon && (
                <div className="w-5 h-5 bg-[#0C1118] rounded-full flex items-center justify-center">
                  <Icon />
                </div>
              )}

              <p
                className={cn(
                  'text-[#0B0A09] text-sm transition-all',
                  currentStep === nav.name && 'text-[#005FF2] font-semibold',
                )}
              >
                {nav.label}
              </p>
            </button>
          );
        })}
      </div>

      {/* <div
        className="w-[217px] rounded-3xl p-4 mt-auto"
        style={{
          background: 'linear-gradient(136.27deg, #257AFF 30.51%, #171717 65.75%)',
        }}
      >
        <p className="text-sm font-semibold text-white">Don’t Lose Your Progress</p>
        <p className="text-[12px] font-normal text-white mt-[3px]">
          Sign in to save your resume, access more templates, and unlock smart features.
        </p>

        <Button className="w-full mt-4 bg-[#006BFF] border border-[#94CDFF] h-8 w-fit">Sign In</Button>
      </div> */}
    </div>
  );
}
