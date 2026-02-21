import type { FormSchema, ResumeData, ResumeDataKey } from '@entities/resume';
import { ProfessionalSummary } from '@shared/icons/prof-summary';
import { cn } from '@shared/lib/cn';
import { cleanHtml } from '@shared/lib/markdown';
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/components/input';
import { ArrowLeft, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { SECTION_ICONS, SECTION_PLACEHOLDERS } from '../lib/section-utils';

interface MobileSectionListProps {
  navs: Array<{ name: string; label: string }>;
  formData: Omit<ResumeData, 'templateId'>;
  formSchema: FormSchema | {};
  onSectionClick: (step: ResumeDataKey) => void;
  onBackClick: () => void;
  onToggleHideSection?: (sectionId: string, isHidden: boolean) => void;
}

const SectionItemWithData = ({
  primary,
  secondary,
  itemKey,
}: {
  primary: string;
  secondary: string | null;
  itemKey: string | number;
}) => {
  const isPlaceholder = itemKey === 'placeholder';
  return (
    <div
      key={itemKey}
      className="relative w-full rounded-md bg-white border border-section-border shadow-[0_0_0_4px_var(--color-section-shadow)]"
    >
      <Input readOnly value="" className="absolute inset-0 opacity-0 h-full cursor-text" tabIndex={-1} />
      <div className="relative flex flex-col items-start p-3 space-y-1 pointer-events-none">
        {primary && (
          <div
            className={cn(
              'text-sm font-semibold text-section-text-primary w-full',
              isPlaceholder && 'text-section-text-muted',
            )}
          >
            {primary}
          </div>
        )}
        {secondary && (
          <div className={cn('text-sm text-section-text-secondary w-full', isPlaceholder && 'text-section-text-muted')}>
            {secondary}
          </div>
        )}
      </div>
    </div>
  );
};

export function MobileSectionList({
  navs,
  formData,
  formSchema,
  onSectionClick,
  onBackClick,
  onToggleHideSection,
}: MobileSectionListProps) {
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

  const renderSectionItems = (items: any[], currentSchema: any, label: string, sectionName: string) => {
    const itemsWithData = items.slice(0, 2).filter((item: any) => {
      const { primary, secondary } = getItemFields(item, currentSchema);
      return primary || secondary;
    });

    const placeholder = SECTION_PLACEHOLDERS[sectionName] || { primary: label, secondary: null };

    if (itemsWithData.length === 0) {
      return (
        <SectionItemWithData itemKey="placeholder" primary={placeholder.primary} secondary={placeholder.secondary} />
      );
    }

    return itemsWithData.map((item: any, itemIndex: number) => {
      const { primary, secondary } = getItemFields(item, currentSchema);
      const itemKey = item?.id || item?.itemId || itemIndex;

      return <SectionItemWithData key={itemKey} itemKey={itemKey} primary={primary} secondary={secondary} />;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden bg-dashboard-bg pb-20 max-w-full">
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
          <h1 className="text-[18px] font-semibold text-section-text-primary">Your resume is ready</h1>
          <p className="text-[13px] text-section-text-secondary">
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
          const isHidden = sectionData?.isHidden || false;
          const EyeIcon = isHidden ? EyeOff : Eye;
          const eyeLabel = isHidden ? 'Unhide' : 'Hide';

          const handleToggleHide = (e: React.MouseEvent) => {
            e.stopPropagation();
            if (nav.name === 'personalDetails') return;
            onToggleHideSection?.(nav.name, !isHidden);
          };

          return (
            // biome-ignore lint/a11y/noStaticElementInteractions: Mobile-only touch interface
            <div
              key={nav.name}
              className={cn(
                'space-y-3 p-5 rounded-2xl bg-white cursor-pointer transition-opacity',
                isHidden && 'opacity-60',
              )}
              onClick={() => onSectionClick(nav.name as ResumeDataKey)}
              style={{
                backgroundImage: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'size-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-white',
                    isCompleted ? 'bg-section-success' : 'bg-section-dark',
                  )}
                >
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6 text-white" />}
                </div>
                <h3 className="text-sm text-section-text-primary flex-1">{nav.label}</h3>
                {nav.name !== 'personalDetails' && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleToggleHide}
                    className="flex-shrink-0 h-8 w-8 rounded-full hover:bg-gray-100"
                    aria-label={eyeLabel}
                  >
                    <EyeIcon className="w-5 h-5 text-gray-500" />
                  </Button>
                )}
              </div>

              <div className="space-y-3">{renderSectionItems(items, currentSchema, nav.label, nav.name)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
