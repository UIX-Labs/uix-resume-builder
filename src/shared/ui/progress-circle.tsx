import { CircularProgress } from './circular-progress';

interface ProgressCircleProps {
  progress: number; // 0-100
  currentStep: number;
  totalSteps: number;
}

export function ProgressCircle({ currentStep, totalSteps, progress }: ProgressCircleProps) {
  return (
    <CircularProgress progress={progress} size={188} strokeWidth={20} variant="default">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[#002359] text-[13px] font-regular bg-[#E9F4FF] border-[0.7px] border-[#DFF0FF] px-1 rounded-[10px]">
          Your Progress
        </p>
        <p className="text-gray-1000 text-[48px] font-[900] leading-[120%]">{progress}%</p>
        {/* <p className="text-[#666] text-[13px] font-regular">
          {String(currentStep).padStart(2, '0')}/{String(totalSteps).padStart(2, '0')}
        </p> */}
      </div>
    </CircularProgress>
  );
}
