import type { FormSchema, ResumeData, ResumeDataKey } from '@entities/resume';
import { cn } from '@shared/lib/cn';
import { ProfessionalSummary } from '@shared/icons/prof-summary';
import { SECTION_ICONS } from '../lib/section-utils';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@shared/ui/button';
import { cleanHtml } from '@shared/lib/markdown';

interface MobileSectionListProps {
  navs: Array<{ name: string; label: string }>;
  formData: Omit<ResumeData, 'templateId'>;
  formSchema: FormSchema | {};
  onSectionClick: (step: ResumeDataKey) => void;
  onBackClick: () => void;
}

export function MobileSectionList({ navs, formData, formSchema, onSectionClick, onBackClick }: MobileSectionListProps) {
  const completedSections = new Set(
    Object.entries(formData ?? {})
      .filter(([_, sectionData]) => sectionData?.isCompleted)
      .map(([key]) => key),
  );

  const getItemFields = (item: any, currentSchema: any) => {
    // Handle string items (like achievements, interests)
    if (typeof item === 'string') {
      return { primary: item, secondary: null };
    }

    // Handle object items (like experience, education)
    if (typeof item === 'object' && currentSchema) {
      const EXCLUDED_KEYS = new Set([
        'label',
        'subTitle',
        'itemsType',
        'id',
        'itemId',
        'ongoing',
        'profilePicturePublicUrl',
      ]);

      const schemaKeys = Object.keys(currentSchema).filter((key) => !EXCLUDED_KEYS.has(key));

      const shouldSkip = (key: string, value: any): boolean => {
        return !value || EXCLUDED_KEYS.has(key) || typeof value === 'object';
      };

      const displayValues: string[] = [];

      for (const key of schemaKeys) {
        const value = item[key];

        if (shouldSkip(key, value)) {
          continue;
        }

        if (typeof value === 'string') {
          const cleanValue = cleanHtml(value);
          if (cleanValue) {
            displayValues.push(cleanValue);
            if (displayValues.length === 2) break;
          }
        }
      }

      return {
        primary: displayValues[0] || '',
        secondary: displayValues[1] || null,
      };
    }

    return { primary: '', secondary: null };
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#F9FAFB] pb-20 max-w-full">
      <div className="flex items-start px-4 pt-4">
        <Button
          type="button"
          onClick={onBackClick}
          variant="ghost"
          size="icon"
          className="-ml-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={7} />
        </Button>

        <div className="flex-1">
          <h1 className="text-[18px] font-semibold text-[#111827]">Your resume is ready</h1>
          <p className="text-[13px] text-[#6B7280]">
            We've filled in all your details from LinkedIn. Take a moment to review everything — you can edit, improve,
            or personalize it anytime.
          </p>
        </div>
      </div>

      <div className="w-full px-4 pb-4 space-y-4 mt-5">
        {navs.map((nav) => {
          const isCompleted = completedSections.has(nav.name);
          const sectionData = formData?.[nav.name as ResumeDataKey];
          const currentSchema = formSchema?.[nav.name as ResumeDataKey];
          const items = sectionData?.items || [];
          const Icon = SECTION_ICONS[nav.name as keyof typeof SECTION_ICONS] ?? ProfessionalSummary;

          return (
            // biome-ignore lint/a11y/noStaticElementInteractions: Mobile-only touch interface
            <div
              key={nav.name}
              className="space-y-3 p-5 rounded-2xl shadow-sm border border-gray-100 bg-white cursor-pointer"
              onClick={() => onSectionClick(nav.name as ResumeDataKey)}
              style={{
                background: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'size-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-white',
                    isCompleted ? 'bg-[#10B981]' : 'bg-[#1F2937]',
                  )}
                >
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6 text-white" />}
                </div>
                <h3 className="text-sm text-[#111827]">{nav.label}</h3>
                {isCompleted && <CheckCircle2 className="w-5 h-5 text-[#10B981] ml-auto" />}
              </div>

              {/* Section Items */}
              <div className="space-y-3">
                {items.length > 0 ? (
                  items.slice(0, 2).map((item: any, itemIndex: number) => {
                    const { primary, secondary } = getItemFields(item, currentSchema);

                    return (
                      <Button
                        key={item?.id || item?.itemId || itemIndex}
                        type="button"
                        variant="outline"
                        className="w-full rounded-md bg-white border border-[#D1D5DB] p-3 text-left h-auto justify-start shadow-[0_0_0_4px_#F6F6F6] whitespace-normal"
                      >
                        <div className="flex flex-col items-start">
                          {primary && <h4 className="text-sm font-semibold text-[#111827] mb-1">{primary}</h4>}
                          {secondary && <p className="text-sm text-[#6B7280]">{secondary}</p>}
                        </div>
                      </Button>
                    );
                  })
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-[12px] bg-white border border-[#D1D5DB] p-3 text-left h-auto justify-start shadow-[0_0_0_4px_#F6F6F6]"
                  >
                    <p className="text-sm text-[#9CA3AF]">Add {nav.label}</p>
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
