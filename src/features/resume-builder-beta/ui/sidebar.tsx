'use client';

import { memo } from 'react';
import type { ResumeDataKey } from '@entities/resume';
import { cn } from '@shared/lib/utils';
import { useUIStore } from '../stores/ui-store';
import { useSectionCompletion } from '../hooks/use-section-completion';

const SECTIONS: { key: ResumeDataKey; label: string }[] = [
  { key: 'personalDetails', label: 'Personal Details' },
  { key: 'professionalSummary', label: 'Summary' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'interests', label: 'Interests' },
  { key: 'achievements', label: 'Achievements' },
];

export const ResumeBuilderSidebar = memo(function ResumeBuilderSidebar() {
  const activeSection = useUIStore((s) => s.activeSection);
  const setActiveSection = useUIStore((s) => s.setActiveSection);
  const completion = useSectionCompletion();

  return (
    <nav className="bg-white border-2 border-[#E9F4FF] rounded-[36px] min-w-[200px] w-[200px] h-[calc(100vh-80px)] py-4 flex flex-col items-center overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex flex-col gap-1 w-full px-3">
        {SECTIONS.map((section) => (
          <SidebarItem
            key={section.key}
            label={section.label}
            isActive={activeSection === section.key}
            completion={completion[section.key]}
            onClick={() => setActiveSection(section.key)}
          />
        ))}
      </div>
    </nav>
  );
});

const SidebarItem = memo(function SidebarItem({
  label,
  isActive,
  completion,
  onClick,
}: {
  label: string;
  isActive: boolean;
  completion: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm transition-colors text-left',
        isActive
          ? 'bg-[#E9F4FF] text-[#005FF2] font-medium'
          : 'text-gray-700 hover:bg-gray-50',
      )}
    >
      <span
        className={cn(
          'w-2 h-2 rounded-full flex-shrink-0',
          completion === 100 ? 'bg-green-500' : completion > 0 ? 'bg-yellow-500' : 'bg-gray-300',
        )}
      />
      <span className="truncate">{label}</span>
    </button>
  );
});
