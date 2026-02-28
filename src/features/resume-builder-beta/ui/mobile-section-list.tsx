'use client';

import { memo } from 'react';
import type { ResumeDataKey } from '@entities/resume';
import { cn } from '@shared/lib/utils';
import { useUIStore } from '../stores/ui-store';
import { useSectionCompletion } from '../hooks/use-section-completion';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderKanban,
  Award,
  Heart,
  Trophy,
  ChevronRight,
} from 'lucide-react';

const SECTIONS: { key: ResumeDataKey; label: string; icon: React.ElementType }[] = [
  { key: 'personalDetails', label: 'Personal Details', icon: User },
  { key: 'professionalSummary', label: 'Professional Summary', icon: FileText },
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'skills', label: 'Skills', icon: Wrench },
  { key: 'projects', label: 'Projects', icon: FolderKanban },
  { key: 'certifications', label: 'Certifications', icon: Award },
  { key: 'interests', label: 'Interests', icon: Heart },
  { key: 'achievements', label: 'Achievements', icon: Trophy },
];

/**
 * Mobile section overview — tap a section to open form sheet.
 */
export const MobileSectionList = memo(function MobileSectionList() {
  const setActiveSection = useUIStore((s) => s.setActiveSection);
  const setIsMobileFormOpen = useUIStore((s) => s.setIsMobileFormOpen);
  const completion = useSectionCompletion();

  const handleSelect = (key: ResumeDataKey) => {
    setActiveSection(key);
    setIsMobileFormOpen(true);
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      {SECTIONS.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => handleSelect(key)}
          className="flex items-center gap-3 w-full px-4 py-3 bg-white rounded-xl border border-gray-100 active:bg-gray-50 transition-colors"
        >
          <Icon className="w-5 h-5 text-gray-500 shrink-0" />
          <span className="flex-1 text-left text-sm font-medium text-gray-900">
            {label}
          </span>
          <span
            className={cn(
              'w-2 h-2 rounded-full shrink-0',
              completion[key] === 100
                ? 'bg-green-500'
                : completion[key] > 0
                  ? 'bg-yellow-500'
                  : 'bg-gray-300',
            )}
          />
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
        </button>
      ))}
    </div>
  );
});
