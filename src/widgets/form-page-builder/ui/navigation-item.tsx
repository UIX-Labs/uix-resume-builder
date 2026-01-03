import { CheckIcon, X } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import { ProfessionalSummary } from '@shared/icons/prof-summary';
import { hasPendingSuggestions } from '@features/resume/renderer';
import { SECTION_ICONS, sectionHasContent, hasBuilderIntelligenceRun, getSuggestedUpdates } from '../lib/section-utils';
import type { ResumeDataKey } from '@entities/resume';

interface NavigationItemProps {
  nav: { label: string; name: ResumeDataKey };
  currentStep: ResumeDataKey;
  resumeData: any;
  onSelect: (name: ResumeDataKey) => void;
}

export function NavigationItem({ nav, currentStep, resumeData, onSelect }: NavigationItemProps) {
  const Icon = SECTION_ICONS[nav.name as keyof typeof SECTION_ICONS] ?? ProfessionalSummary;
  const sectionData = resumeData?.[nav.name as keyof typeof resumeData];

  const suggestedUpdatesArray = getSuggestedUpdates(sectionData);
  const hasValidPendingSuggestions = hasPendingSuggestions(suggestedUpdatesArray);
  const hasContent = sectionHasContent(sectionData);
  const builderIntelligenceRun = hasBuilderIntelligenceRun(resumeData);

  const showPendingIcon = builderIntelligenceRun && hasValidPendingSuggestions;
  const showCompletedIcon = builderIntelligenceRun && !hasValidPendingSuggestions && hasContent;
  const showEmptyIcon = builderIntelligenceRun && !hasValidPendingSuggestions && !hasContent;

  return (
    <button
      type="button"
      className={cn(
        'flex items-center gap-2 px-1 py-1.5 rounded-2xl cursor-pointer pr-4 w-fit',
        currentStep === nav.name && 'bg-[#E9F4FF]',
      )}
      onClick={() => onSelect(nav.name)}
    >
      <div className="w-5 h-5 bg-[#0C1118] rounded-full flex items-center justify-center">
        <Icon />
      </div>

      <p
        className={cn(
          'text-[#0B0A09] text-sm transition-all',
          currentStep === nav.name && 'text-[#005FF2] font-semibold',
        )}
      >
        {nav.label}
      </p>

      {/* Yellow "!" for pending suggestions */}
      {showPendingIcon && (
        <span className="ml-2 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#C7BC21] text-[10px] font-semibold text-white">
          !
        </span>
      )}

      {/* Green checkmark for completed sections (with content) */}
      {showCompletedIcon && (
        <span className="ml-2 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#02A44F] text-[10px] font-semibold text-white">
          <CheckIcon className="size-3" />
        </span>
      )}

      {/* Red X for empty sections (no content) */}
      {showEmptyIcon && (
        <span className="ml-2 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#E53E3E] text-[10px] font-semibold text-white">
          <X className="size-3" />
        </span>
      )}
    </button>
  );
}
