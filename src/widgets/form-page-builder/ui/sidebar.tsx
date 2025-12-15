import { cn } from "@shared/lib/cn";
import { ProgressCircle } from "@shared/ui/progress-circle";
import { useFormPageBuilder } from "../models/ctx";
import { useEffect, useState } from "react";
import { useFormDataStore } from "../models/store";
import { calculateResumeCompletion } from "@shared/lib/resume-completion";
import { useParams } from "next/navigation";
import type { ResumeData } from "@entities/resume";
import mockData from "../../../../mock-data.json";
import { ArrowLeftIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAnalyzerStore } from "@shared/stores/analyzer-store";
import { useRouter } from "next/navigation";
import { NavigationItem } from "./navigation-item";
import { BuilderIntelligenceCard } from "./builder-intelligence-card";

export function Sidebar() {
  const [progress, setProgress] = useState(0);
  const {
    currentStep,
    setCurrentStep,
    navs,
    resumeData: resumeDataFromContext,
    onBuilderIntelligence,
  } = useFormPageBuilder();
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams();
  const resumeId = params?.id as string;

  const resumeData = useFormDataStore((state) => state.formData);
  const isAnalyzing = useFormDataStore((state) => state.isAnalyzing);
  const isTailoredWithJD = useAnalyzerStore((state) => state.isTailoredWithJD);

  const isAnalyzed = resumeDataFromContext?.isAnalyzed ?? false;

  const handleLogoClick = () => {
    queryClient.invalidateQueries({ queryKey: ["resumes"] });
    queryClient.invalidateQueries({ queryKey: ["resume-data", resumeId] });
    router.push("/resumes");
  };

  useEffect(() => {
    if (!resumeData) return;

    const p = calculateResumeCompletion(
      resumeData as ResumeData,
      mockData as Record<string, any>
    );

    const fixed = +p.toFixed(0);
    setProgress(Number.isNaN(fixed) ? 0 : Number(fixed));
  }, [resumeData]);

  const currentStepIndex = navs.findIndex((nav) => nav.label === currentStep);

  return (
    <div
      className={cn(
        "bg-white border-2 border-[#E9F4FF] rounded-[36px] min-w-[240px] h-[calc(100vh-32px)] py-4 flex flex-col items-center mt-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        isAnalyzing &&
          "opacity-60 pointer-events-none select-none cursor-not-allowed"
      )}
    >
      <div className="flex flex-col gap-4 mt-4 w-full pl-6 pr-2">
        <button
          className="flex flex-row items-center cursor-pointer gap-2"
          type="button"
          onClick={handleLogoClick}
        >
          <ArrowLeftIcon className="w-5 h-5" />

          <span className="font-normal text-black bg-clip-text text-xl text-left">
            Back
          </span>
        </button>
      </div>

      {/* Progress Circle */}
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
            resumeData={resumeData}
            onSelect={setCurrentStep}
          />
        ))}
      </div>

      {onBuilderIntelligence && (
        <BuilderIntelligenceCard
          isAnalyzed={isAnalyzed}
          isAnalyzing={isAnalyzing}
          isTailoredWithJD={isTailoredWithJD}
          onAnalyze={onBuilderIntelligence}
        />
      )}
    </div>
  );
}
