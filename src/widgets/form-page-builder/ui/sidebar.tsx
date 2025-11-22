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
import { useRouter, useParams } from 'next/navigation';
import type { ResumeData } from '@entities/resume';
import { CheckIcon, Sparkles } from 'lucide-react';
import { Button } from '@shared/ui/button';
import { getResumeEmptyData } from '@entities/resume';
import { deepMerge, normalizeStringsFields } from '@entities/resume/models/use-resume-data';
import { updateResumeByAnalyzerWithResumeId } from '@entities/resume/api/update-resume-by-analyzer';
import { toast } from 'sonner';

const icons = {
  personalDetails: PersonalInfo,
  professionalSummary: ProfessionalSummary,
  experience: Experience,
  education: Education,
  skills: Skills,
  achievements: Achievements,
};

function sectionHasPendingSuggestions(sectionData: unknown): boolean {
  if (
    !sectionData ||
    typeof sectionData !== 'object' ||
    !('suggestedUpdates' in sectionData) ||
    !Array.isArray((sectionData as { suggestedUpdates?: unknown[] }).suggestedUpdates)
  ) {
    return false;
  }

  const { suggestedUpdates } = sectionData as {
    suggestedUpdates: Array<{
      itemId?: string;
      fields?: Record<string, { suggestedUpdates?: unknown[] }>;
    }>;
    items?: unknown;
  };

  const items = Array.isArray((sectionData as { items?: unknown }).items)
    ? ((sectionData as { items?: unknown }).items as Array<Record<string, unknown>>)
    : null;

  return suggestedUpdates.some((suggestion) => {
    if (!suggestion || typeof suggestion !== 'object') {
      return false;
    }

    if (items && suggestion.itemId) {
      const itemExists = items.some((item) => {
        if (!item || typeof item !== 'object') return false;
        const candidate = item as Record<string, unknown>;
        return candidate.id === suggestion.itemId || candidate.itemId === suggestion.itemId;
      });

      if (!itemExists) {
        return false;
      }
    }

    if (!suggestion.fields || typeof suggestion.fields !== 'object') {
      return false;
    }

    return Object.values(suggestion.fields).some((field) => {
      if (!field || typeof field !== 'object') {
        return false;
      }

      const { suggestedUpdates, fieldCounts } = field as {
        suggestedUpdates?: unknown[];
        fieldCounts?: Record<string, number>;
      };

      const hasCounts =
        !!fieldCounts &&
        ((fieldCounts.spelling_error ?? 0) > 0 ||
          (fieldCounts.sentence_refinement ?? 0) > 0 ||
          (fieldCounts.new_summary ?? 0) > 0);

      if (hasCounts) {
        return true;
      }

      return Array.isArray(suggestedUpdates) && suggestedUpdates.length > 0;
    });
  });
}

function sectionHasContent(sectionData: unknown): boolean {
  if (!sectionData || typeof sectionData !== 'object') {
    return false;
  }

  const entries = Object.entries(sectionData as Record<string, unknown>).filter(([key]) => key !== 'suggestedUpdates');

  return entries.some(([, value]) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return Object.keys(value as Record<string, unknown>).length > 0;
    return true;
  });
}

export function Sidebar() {
  const [progress, setProgress] = useState(0);
  const { currentStep, setCurrentStep, navs } = useFormPageBuilder();

  const resumeData = useFormDataStore((state) => state.formData);
  const setFormData = useFormDataStore((state) => state.setFormData);
  const isAnalyzing = useFormDataStore((state) => state.isAnalyzing);
  const setIsAnalyzing = useFormDataStore((state) => state.setIsAnalyzing);
  const setAnalyzerError = useFormDataStore((state) => state.setAnalyzerError);
  const setRetryAnalyzer = useFormDataStore((state) => state.setRetryAnalyzer);
  const router = useRouter();
  const params = useParams();
  const resumeId = params?.id as string;

  const handleBuilderIntelligence = async () => {
    if (!resumeId) {
      toast.error('Resume ID not found');
      return;
    }

    setIsAnalyzing(true);
    setAnalyzerError(false);
    try {
      const response = await updateResumeByAnalyzerWithResumeId(resumeId);

      if (response?.resume) {
        const emptyData = await getResumeEmptyData();

        let processedData = { ...response.resume };
        for (const key of Object.keys(emptyData)) {
          processedData[key] = deepMerge(processedData[key], emptyData[key]);
        }

        processedData = normalizeStringsFields(processedData);

        setFormData(processedData);

        toast.success('Builder Intelligence analysis complete!');
      }
    } catch (error) {
      console.error('Builder Intelligence error:', error);
      setAnalyzerError(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    setRetryAnalyzer(() => handleBuilderIntelligence);
  }, [resumeId]);

  useEffect(() => {
    if (!resumeData) return;

    const p = calculateResumeCompletion(resumeData as ResumeData);

    const fixed = +p.toFixed(0);
    setProgress(Number.isNaN(fixed) ? 0 : Number(fixed));
  }, [resumeData]);

  const currentStepIndex = navs.findIndex((nav) => nav.label === currentStep);

  return (
    <div className="bg-white border-2 border-[#E9F4FF] rounded-[36px] min-w-[200px] h-[calc(100vh-32px)] py-4 flex flex-col items-center mt-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => router.push('/resumes')}
          className="px-1 text-lg text-gray-800 transition-all duration-300 hover:bg-gray-200 rounded-md 
        flex items-center justify-center w-6 h-6"
          aria-label="Go back to resumes"
        >
          <span>{'\u2190'}</span>
        </button>

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

      <div className="flex flex-col gap-2 mt-4 w-full pl-6 pr-2">
        {navs.map((nav) => {
          const Icon = icons[nav.name as keyof typeof icons] ?? ProfessionalSummary;
          const sectionData = resumeData?.[nav.name as keyof typeof resumeData];
          const hasSuggestions = sectionHasPendingSuggestions(sectionData);
          const hasSuggestedUpdatesField =
            !!sectionData &&
            typeof sectionData === 'object' &&
            'suggestedUpdates' in sectionData &&
            Array.isArray((sectionData as { suggestedUpdates?: unknown[] }).suggestedUpdates);

          const showResolved = hasSuggestedUpdatesField && sectionHasContent(sectionData) && !hasSuggestions;

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
              {hasSuggestions && (
                <span className="ml-2 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#C7BC21] text-[10px] font-semibold text-white">
                  !
                </span>
              )}
              {!hasSuggestions && showResolved && (
                <span className="ml-2 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#02A44F] text-[10px] font-semibold text-white">
                  <CheckIcon className="size-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Builder Intelligence Card */}
      <div
        className="w-[180px] rounded-2xl p-3 mt-4 mx-auto mb-2"
        style={{
          background: 'linear-gradient(136.27deg, #257AFF 30.51%, #171717 65.75%)',
        }}
      >
        <p className="text-sm font-semibold text-white">Switch to Builder Intelligence</p>
        <p className="text-[11px] font-normal text-white/80 mt-1">
          Get grammar fixes, stronger verbs, and tailored improvements.
        </p>

        <Button
          className="w-full mt-3 bg-[#02A44F] hover:bg-[#028a42] border-none h-8 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
          onClick={handleBuilderIntelligence}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            'Analyzing...'
          ) : (
            <>
              Builder Intelligence
              <Sparkles className="w-3.5 h-3.5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
