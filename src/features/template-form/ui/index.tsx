import { Input } from '@/shared/ui/components/input';

import type { FormSchema, ResumeDataKey, ResumeData, SuggestedUpdates } from '@entities/resume';
import { cn } from '@shared/lib/cn';
import { TiptapTextArea } from '@shared/ui/components/textarea';
import { Draggable } from './draggable';
import { UrlInput } from './url';
import { Dropdown } from './dropdown';
import { Duration } from './duration';
import { TagsInput } from './tags-input';
import { LinksInput } from './links-input';
import { StringsInput } from './strings-input';
import { FieldErrorBadges } from './error-badges';
import { getFieldErrors, getFieldSuggestions } from '../lib/get-field-errors';
import { ProfilePictureInput } from './profile-picture';
import { PhoneInput } from './phone-input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@shared/ui/button';

export function TemplateForm({
  formSchema,
  values,
  onChange,
  currentStep = 'personalDetails',
  onOpenAnalyzerModal,
  onToggleHideSection,
}: {
  formSchema: FormSchema | {};
  values: Omit<ResumeData, 'templateId'>;
  onChange: (data: Omit<ResumeData, 'templateId'>) => void;
  currentStep: ResumeDataKey;
  onOpenAnalyzerModal?: (itemId: string, fieldName: string, suggestionType: any) => void;
  onToggleHideSection?: (sectionId: string, isHidden: boolean) => void;
}) {
  function getItem<T = any>(
    section: any,
    data: T,
    onChange: (data: T) => void,
    suggestedUpdates?: SuggestedUpdates,
    itemId?: string,
    fieldName?: string,
  ) {
    switch (section.type) {
      case 'profilePicture': {
        return (
          <ProfilePictureInput
            data={typeof data === 'string' ? { profilePicturePublicUrl: data } : undefined}
            onChange={(value) => onChange(value.profilePicturePublicUrl as T)}
            personalDetailItemId={itemId || ''}
            section={section}
          />
        );
      }

      case 'data': {
        return (
          <Input
            placeholder={section.placeholder}
            className={cn(
              'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-[8px]',
              'placeholder:text-[#DBCFD4] text-base text-[#0C1118] font-normal',
              'focus:border-[#0059ED] focus:ring-[#CBE7FF] placeholder:text-[#CFD4DB]',
              'bg-[#FAFBFC]',
            )}
            value={data.value}
            onChange={(e) => onChange({ ...data, value: e.target.value })}
          />
        );
      }

      case 'textarea': {
        // Get error suggestions for this field
        const errorSuggestions =
          suggestedUpdates && itemId && fieldName
            ? getFieldSuggestions(suggestedUpdates, itemId, fieldName)
            : undefined;

        return (
          <TiptapTextArea
            key={`${itemId}-${fieldName}`}
            value={data as string}
            placeholder={section.placeholder}
            errorSuggestions={errorSuggestions}
            className={cn(
              'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-xl',
              'placeholder:text-[#DBCFD4] text-base text-[#0C1118] font-normal',
              'focus:border-[#0059ED] focus:ring-[#CBE7FF] placeholder:text-[#CFD4DB]',
              'bg-[#FAFBFC]',
              "[&>div]:!ml-0"
            )}
            onChange={(_value, html) => {
              onChange(html);
            }}
          />
        );
      }

      case 'tel': {
        return (
          <PhoneInput
            value={typeof data === 'string' ? data : data?.value || ''}
            placeholder={section.placeholder}
            onChange={(phoneValue) => {
              onChange(phoneValue || '');
            }}
            className="w-full"
          />
        );
      }

      case 'url': {
        return <UrlInput data={data} onChange={onChange} section={section} />;
      }

      case 'dropdown': {
        return <Dropdown data={data} onChange={onChange} section={section} />;
      }

      case 'duration': {
        return <Duration data={data} onChange={onChange} section={section} />;
      }

      case 'tags': {
        return <TagsInput data={data} onChange={onChange} section={section} />;
      }

      case 'links': {
        return <LinksInput data={data} onChange={onChange} section={section} />;
      }

      case 'strings': {
        return <StringsInput data={data} onChange={onChange} section={section} suggestedUpdates={suggestedUpdates} />;
      }

      default: {
        return (
          <Input
            placeholder={section.placeholder}
            className={cn(
              'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-[8px]',
              'placeholder:text-[#DBCFD4] text-base text-[#0C1118] font-normal',
              'focus:border-[#0059ED] focus:ring-[#CBE7FF] placeholder:text-[#CFD4DB]',
              'bg-[#FAFBFC]',
            )}
            value={data}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      }
    }
  }

  const currentData = values[currentStep];
  const currentSchema = formSchema?.[currentStep];

  if (!currentSchema || !currentData || typeof currentData === 'string' || !('items' in currentData)) {
    return null;
  }

  const isHidden = (currentData as any).isHidden || false;

  const handleToggleHide = () => {
    const newHiddenState = !isHidden;
    onChange({
      ...values,
      [currentStep]: { ...currentData, isHidden: newHiddenState } as any,
    });
    onToggleHideSection?.(currentStep, newHiddenState);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-[20px] font-semibold text-gray-1000">
          {currentSchema?.label}
          <p className="text-[13px] font-normal text-[rgba(23, 23, 23, 1)]">{currentSchema?.subTitle}</p>
        </div>
        {currentStep !== 'personalDetails' && (
          <Button
            type="button"
            onClick={handleToggleHide}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-sm self-start sm:self-auto"
          >
            {isHidden ? (
              <>
                <Eye className="w-4 h-4" />
                Unhide
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4" />
                Hide
              </>
            )}
          </Button>
        )}
      </div>

      <form
        className={cn('grid grid-cols-1 md:grid-cols-2 gap-4 w-full', isHidden && 'opacity-50 pointer-events-none')}
      >
        {currentSchema.itemsType === 'draggable' ? (
          <div className="col-span-1 md:col-span-2">
            <Draggable
              data={currentData.items}
              section={currentSchema}
              onChange={(items) => {
                onChange({
                  ...values,
                  [currentStep]: { ...currentData, items },
                });
              }}
              getItem={getItem}
              suggestedUpdates={currentData.suggestedUpdates}
              onOpenAnalyzerModal={onOpenAnalyzerModal}
            />
          </div>
        ) : currentSchema.itemsType === 'strings' ? (
          <div className="col-span-1 md:col-span-2">
            {currentData.items.map((item, i) => (
              <StringsInput
                key={item.itemId}
                data={item}
                onChange={(value) => {
                  const newData = { ...currentData };
                  newData.items[i] = value;
                  onChange({ ...values, [currentStep]: newData });
                }}
                section={currentSchema}
                suggestedUpdates={currentData.suggestedUpdates}
                onOpenAnalyzerModal={onOpenAnalyzerModal}
              />
            ))}
          </div>
        ) : (
          currentData.items.map((item, itemIdx) => {
            const itemId = item.id || item.itemId || `item-${itemIdx}`;

            return Object.entries(item).map(([key, value], i) => {
              const section = currentSchema[key];

              if (!section) {
                return null;
              }

              const errorCounts = getFieldErrors(currentData.suggestedUpdates, itemId, key);

              const hasBadges =
                errorCounts.spellingCount > 0 || errorCounts.sentenceCount > 0 || errorCounts.newSummaryCount > 0;

              return (
                <label
                  key={key}
                  className={cn(
                    'flex flex-col gap-2 w-full min-w-0',
                    section.fluid && 'col-span-1 md:col-span-2',
                    !section.fluid && hasBadges && 'col-span-1 md:col-span-2',
                  )}
                  htmlFor={key}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full min-w-0">
                    <span className="text-sm text-[#0C1118] font-semibold flex-shrink-0">{section.label}</span>
                    <div>
                      <FieldErrorBadges
                        spellingCount={errorCounts.spellingCount}
                        sentenceCount={errorCounts.sentenceCount}
                        newSummaryCount={errorCounts.newSummaryCount}
                        onBadgeClick={(suggestionType) => onOpenAnalyzerModal?.(itemId, key, suggestionType)}
                      />
                    </div>
                  </div>

                  {getItem(
                    section,
                    value,
                    (value) => {
                      const items = [...currentData.items];
                      items[itemIdx][key] = value;
                      onChange({
                        ...values,
                        [currentStep]: { ...currentData, items },
                      });
                    },
                    currentData.suggestedUpdates,
                    currentData.items[itemIdx]?.itemId,
                    key,
                  )}
                </label>
              );
            });
          })
        )}
      </form>
    </div>
  );
}
