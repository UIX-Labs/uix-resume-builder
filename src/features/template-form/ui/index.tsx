import { Input } from '@/shared/ui/components/input';

import type { FormSchema, ResumeData, ResumeDataKey, SuggestedUpdates } from '@entities/resume';
import { cn } from '@shared/lib/cn';
import { Button } from '@shared/ui/button';
import { TiptapTextArea } from '@shared/ui/components/textarea';
import { Eye, EyeOff } from 'lucide-react';
import { getFieldSuggestions } from '../lib/get-field-errors';
import { Draggable } from './draggable';
import { Dropdown } from './dropdown';
import { Duration } from './duration';
import { FormFieldItem } from './form-field-item';
import { LinksInput } from './links-input';
import { PhoneInput } from './phone-input';
import { ProfilePictureInput } from './profile-picture';
import { StringsInput } from './strings-input';
import { TagsInput } from './tags-input';
import { UrlInput } from './url';

export function TemplateForm({
  formSchema,
  values,
  onChange,
  currentStep = 'personalDetails',
  onOpenAnalyzerModal,
  onToggleHideSection,
  isMobile = false,
}: {
  formSchema: FormSchema | {};
  values: Omit<ResumeData, 'templateId'>;
  onChange: (data: Omit<ResumeData, 'templateId'>) => void;
  currentStep: ResumeDataKey;
  onOpenAnalyzerModal?: (itemId: string, fieldName: string, suggestionType: any) => void;
  onToggleHideSection?: (sectionId: string, isHidden: boolean) => void;
  isMobile?: boolean;
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
              isMobile
                ? 'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-xl placeholder:text-[#9CA3AF] text-sm text-[#111827] font-normal focus:border-[#3B82F6] focus:ring-0 bg-white h-[48px] px-4'
                : 'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-xl text-base text-[#0C1118] font-normal focus:border-[#0059ED] focus:ring-[#CBE7FF] placeholder:text-[#CFD4DB] bg-[#FAFBFC]',
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
              isMobile
                ? 'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-xl placeholder:text-[#9CA3AF] text-sm text-[#111827] font-normal focus:border-[#3B82F6] focus:ring-0 bg-white min-h-[120px]'
                : 'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-xl text-base text-[#0C1118] font-normal focus:border-[#0059ED] focus:ring-[#CBE7FF] placeholder:text-[#CFD4DB] bg-[#FAFBFC]',
              '[&_.ProseMirror]:pb-18',
              '[&>div]:!ml-0',
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
            className={isMobile ? 'w-full h-[48px]' : 'w-full'}
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
        return <StringsInput data={data} onChange={onChange} section={section} suggestedUpdates={suggestedUpdates} isMobile={isMobile} />;
      }

      default: {
        return (
          <Input
            placeholder={section.placeholder}
            className={cn(
              isMobile
                ? 'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-xl placeholder:text-[#9CA3AF] text-sm text-[#111827] font-normal focus:border-[#3B82F6] focus:ring-0 bg-white h-[48px] px-4'
                : 'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-xl text-base text-[#0C1118] font-normal focus:border-[#0059ED] focus:ring-[#CBE7FF] placeholder:text-[#CFD4DB] bg-[#FAFBFC]',
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
    <div className={cn('flex flex-col w-full', isMobile ? 'gap-6' : 'gap-4')}>
      {/* Header - only show on desktop or when not in mobile mode */}
      {!isMobile && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-[20px] font-semibold text-gray-1000">
            {currentSchema?.label}
            <p className="text-[13px] font-normal text-[rgba(23, 23, 23, 1)]">{currentSchema?.subTitle}</p>
          </div>
          {currentStep !== 'personalDetails' &&
            (() => {
              const Icon = isHidden ? Eye : EyeOff;
              const label = isHidden ? 'Unhide' : 'Hide';

              return (
                <Button
                  type="button"
                  onClick={handleToggleHide}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 text-sm self-start sm:self-auto"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              );
            })()}
        </div>
      )}

      <form
        className={cn(
          'w-full',
          isMobile ? 'flex flex-col gap-6' : 'grid grid-cols-1 md:grid-cols-2 gap-4',
          !isMobile && isHidden && 'opacity-50 pointer-events-none',
        )}
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
              isMobile={isMobile}
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
                isMobile={isMobile}
              />
            ))}
          </div>
        ) : (
          currentData.items.map((item, itemIdx) => {
            const itemId = item.id || item.itemId || `item-${itemIdx}`;

            const handleFieldChange = (key: string) => (value: any) => {
              const items = [...currentData.items];
              items[itemIdx][key] = value;
              onChange({
                ...values,
                [currentStep]: { ...currentData, items },
              });
            };

            const renderFieldInput = (key: string, value: any, section: any) => {
              return getItem(
                section,
                value,
                handleFieldChange(key),
                currentData.suggestedUpdates,
                currentData.items[itemIdx]?.itemId,
                key,
              );
            };

            const fieldItems = Object.entries(item).map(([key, value], _i) => {
              const section = currentSchema[key];

              if (!section) {
                return null;
              }

              return (
                <FormFieldItem
                  key={key}
                  itemId={itemId}
                  fieldKey={key}
                  fieldValue={value}
                  section={section}
                  isMobile={isMobile}
                  suggestedUpdates={currentData.suggestedUpdates}
                  onOpenAnalyzerModal={onOpenAnalyzerModal}
                  renderInput={() => renderFieldInput(key, value, section)}
                />
              );
            });

            // Mobile: Wrap each item's fields in a card
            if (isMobile) {
              return (
                <div key={itemId} className="w-full max-w-full rounded-[16px] space-y-3">
                  {fieldItems}
                </div>
              );
            }

            // Desktop: Return fields directly for grid layout
            return fieldItems;
          })
        )}
      </form>
    </div>
  );
}
