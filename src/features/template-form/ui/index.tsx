import { Input } from '@/shared/ui/components/input';

import type { FormSchema, ResumeDataKey, ResumeData } from '@entities/resume';
import { cn } from '@shared/lib/cn';
import { TiptapTextArea } from '@shared/ui/components/textarea';
import { Draggable } from './draggable';
import { UrlInput } from './url';
import { Dropdown } from './dropdown';
import { Duration } from './duration';
import { TagsInput } from './tags-input';

export function TemplateForm({
  formSchema,
  values,
  onChange,
  currentStep = 'personalDetails',
}: {
  formSchema: FormSchema;
  values: ResumeData;
  onChange: (data: any) => void;
  currentStep: ResumeDataKey;
}) {
  function getItem(section: IFormField, data: any, onChange: (data: any) => void) {
    switch (section.type) {
      case 'text':
      case 'email':
      case 'tel': {
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
        ) : (
          currentData.items.map((section, itemIdx) => {
            return Object.entries(section).map(([key, value], i) => {
              const section = currentSchema[key];

              if (!section) return null;

              return (
                <label
                  key={key + i}
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
