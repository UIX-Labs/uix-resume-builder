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

export function TemplateForm({
  formSchema,
  values,
  onChange,
  currentStep = 'personalDetails',
  onOpenAnalyzerModal,
}: {
  formSchema: FormSchema | {};
  values: Omit<ResumeData, 'templateId'>;
  onChange: (data: Omit<ResumeData, 'templateId'>) => void;
  currentStep: ResumeDataKey;
  onOpenAnalyzerModal?: (itemId: string, fieldName: string, suggestionType: any) => void;
}) {
  function getItem<T extends string | boolean>(
    section: any,
    data: T,
    onChange: (data: T) => void,
    suggestedUpdates?: SuggestedUpdates,
    itemId?: string,
    fieldName?: string,
  ) {
    switch (section.type) {
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
            )}
            onChange={(_value, html) => {
              onChange(html);
            }}
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
        return <StringsInput data={data} onChange={onChange} section={section} />;
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

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-[20px] font-semibold text-gray-1000">
        {currentSchema?.label}
        <p className="text-[13px] font-normal text-[rgba(23, 23, 23, 1)]">{currentSchema?.subTitle}</p>
      </div>

      <form className="grid grid-cols-2 gap-4 w-full">
        {currentSchema.itemsType === 'draggable' ? (
          <div className="col-span-2">
            <Draggable
              data={currentData.items}
              section={currentSchema}
              onChange={(items) => {
                onChange({ ...values, [currentStep]: { ...currentData, items } });
              }}
              getItem={getItem}
              suggestedUpdates={currentData.suggestedUpdates}
              onOpenAnalyzerModal={onOpenAnalyzerModal}
            />
          </div>
        ) : currentSchema.itemsType === 'strings' ? (
          <div className="col-span-2">
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
              />
            ))}
          </div>
        ) : (
          currentData.items.map((item, itemIdx) => {
            const itemId = item.id || `item-${itemIdx}`;

            return Object.entries(item).map(([key, value], i) => {
              const section = currentSchema[key];

              if (!section) {
                return null;
              }

              const errorCounts = getFieldErrors(currentData.suggestedUpdates, itemId, key);

              return (
                <label
                  key={key}
                  className={cn(
                    'text-sm text-[#0C1118] font-semibold flex flex-col gap-2',
                    section.fluid && 'col-span-2',
                  )}
                  htmlFor={key}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{section.label}</span>
                    <FieldErrorBadges
                      spellingCount={errorCounts.spellingCount}
                      sentenceCount={errorCounts.sentenceCount}
                      newSummaryCount={errorCounts.newSummaryCount}
                      onBadgeClick={(suggestionType) => onOpenAnalyzerModal?.(itemId, key, suggestionType)}
                    />
                  </div>

                  {getItem(
                    section,
                    value,
                    (value) => {
                      const items = [...currentData.items];
                      items[itemIdx][key] = value;
                      onChange({ ...values, [currentStep]: { ...currentData, items } });
                    },
                    currentData.suggestedUpdates,
                    itemId,
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
