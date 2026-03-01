'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ResumeData } from '@entities/resume';
import { cn } from '@shared/lib/cn';
import { calculateResumeCompletion } from '@shared/lib/resume-completion';
import { ProgressCircle } from '@shared/ui/progress-circle';
import { useAnalyzerStore } from '@shared/stores/analyzer-store';
import { NavigationItem } from '@widgets/form-page-builder/ui/navigation-item';
import { BuilderIntelligenceCard } from '@widgets/form-page-builder/ui/builder-intelligence-card';
import { isSectionEmpty } from '@widgets/form-page-builder/lib/section-utils';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useBuilderActions, useBuilderState } from '../models/builder-context';

export function Sidebar() {
  const {
    currentStep,
    navs,
    formData,
    resumeData,
    resumeId,
    isAnalyzing,
  } = useBuilderState();
  const { setCurrentStep, handleBuilderIntelligence } = useBuilderActions();

  const queryClient = useQueryClient();
  const router = useRouter();
  const isTailoredWithJD = useAnalyzerStore((s) => s.isTailoredWithJD);

  const [progress, setProgress] = useState(0);

  const isAnalyzed = (resumeData as any)?.isAnalyzed ?? false;

  const isResumeEmpty = useMemo(() => {
    if (!formData) return true;
    const sectionKeys = Object.keys(formData).filter(
      (key) => key !== 'templateId' && key !== 'updatedAt' && key !== 'template',
    );
    return sectionKeys.every((key) => isSectionEmpty(formData[key as keyof typeof formData]));
  }, [formData]);

  const handleLogoClick = () => {
    queryClient.invalidateQueries({ queryKey: ['resumes'] });
    queryClient.invalidateQueries({ queryKey: ['resume-data', resumeId] });
    router.push('/resumes');
  };

  useEffect(() => {
    if (!formData) return;
    const p = calculateResumeCompletion(formData as ResumeData);
    const fixed = +p.toFixed(0);
    setProgress(Number.isNaN(fixed) ? 0 : Number(fixed));
  }, [formData]);

  const currentStepIndex = navs.findIndex((nav) => nav.name === currentStep);

  return (
    <div
      className={cn(
        'bg-white border-2 border-[#E9F4FF] rounded-[36px] min-w-[240px] w-[20%] h-[calc(100vh-32px)] py-4 flex flex-col items-center mt-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
        isAnalyzing && 'opacity-60 pointer-events-none select-none cursor-not-allowed',
      )}
    >
      <div className="flex flex-col gap-4 mt-4 w-full pl-6 pr-2">
        <button
          className="flex flex-row items-center cursor-pointer gap-2"
          type="button"
          onClick={handleLogoClick}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-normal text-black bg-clip-text text-xl text-left">Back</span>
        </button>
      </div>

      <div className="mt-5">
        <ProgressCircle
          progress={progress}
          totalSteps={navs.length}
          currentStep={currentStepIndex + 1}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4 w-full pl-6 pr-2">
        {navs.map((nav) => (
          <NavigationItem
            key={nav.name}
            nav={nav}
            currentStep={currentStep}
            resumeData={formData}
            onSelect={setCurrentStep}
          />
        ))}
      </div>

      <BuilderIntelligenceCard
        isAnalyzed={isAnalyzed}
        isAnalyzing={isAnalyzing}
        isTailoredWithJD={isTailoredWithJD}
        isResumeEmpty={isResumeEmpty}
        onAnalyze={handleBuilderIntelligence}
      />
    </div>
  );
}
