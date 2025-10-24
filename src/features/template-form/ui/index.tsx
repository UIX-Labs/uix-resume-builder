import { Input } from '@/shared/ui/components/input';

import type { FormSchema, ResumeDataKey, ResumeData } from '@entities/resume';
import { cn } from '@shared/lib/cn';
import { TiptapTextArea } from '@shared/ui/components/textarea';
import { Draggable } from './draggable';
import { UrlInput } from './url';
import { Dropdown } from './dropdown';
import { Duration } from './duration';
import { TagsInput } from './tags-input';
import { LinksInput } from './links-input';
import { StringsInput } from './strings-input';
import { PhoneInput } from './phone-input';

export function TemplateForm({
  formSchema,
  values,
  onChange,
  currentStep = 'personalDetails',
}: {
  formSchema: FormSchema;
  values: Omit<ResumeData, 'templateId'>;
  onChange: (data: Omit<ResumeData, 'templateId'>) => void;
  currentStep: ResumeDataKey;
}) {
  function getItem<T extends string | boolean>(section: any, data: T, onChange: (data: T) => void) {
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
            defaultValue={data.value}
            onChange={(e) => onChange({ ...data, value: e.target.value })}
          />
        );
      }

      case 'textarea': {
        return (
          <TiptapTextArea
            defaultValue={data}
            placeholder={section.placeholder}
            className={cn(
              'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-[8px]',
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

      case 'tel': {
        return (
          <PhoneInput
            defaultValue={typeof data === 'string' ? data : data?.value || ''}
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
            defaultValue={data}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      }
    }
  }

  const currentData = values[currentStep];
  const currentSchema = formSchema?.[currentStep];

  if (!currentSchema || !currentData || typeof currentData === 'string' || !('items' in currentData)) return null;

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
          currentData.items.map((section, itemIdx) => {
            return Object.entries(section).map(([key, value], i) => {
              const section = currentSchema[key];

              if (!section) return null;

              return (
                <label
                  key={key}
                  className={cn(
                    'text-sm text-[#0C1118] font-semibold flex flex-col gap-2',
                    section.fluid && 'col-span-2',
                  )}
                  htmlFor={key}
                >
                  {section.label}

                  {getItem(section, value, (value) => {
                    const items = [...currentData.items];
                    items[itemIdx][key] = value;

                    onChange({ ...values, [currentStep]: { ...currentData, items } });
                  })}
                </label>
              );
            });
          })
        )}
      </form>
    </div>
  );
}
