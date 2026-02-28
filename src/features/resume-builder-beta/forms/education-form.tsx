'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Control } from 'react-hook-form';
import { useResumeStore } from '../stores/resume-store';
import {
  educationFormSchema,
  type EducationFormValues,
} from '../types/form-schemas';
import { FormInput } from '@shared/ui/form-input';
import { FormDatePicker } from '@shared/ui/form-date-picker';
import { FormToggle } from '@shared/ui/form-toggle';
import { FormSortableList } from '@shared/ui/form-sortable-list';
import { Button } from '@shared/ui/button';


const EducationItemFields = memo(function EducationItemFields({
  control,
  index,
  onRemove,
}: {
  control: Control<EducationFormValues>;
  index: number;
  onRemove: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center">
        <span className="font-medium text-sm">Education {index + 1}</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded((p) => !p)}>
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
          <Button variant="ghost" size="sm" onClick={onRemove}>
            Remove
          </Button>
        </div>
      </div>
      {isExpanded ? (
        <div className="grid grid-cols-2 gap-3 mt-3">
          <FormInput control={control} name={`items.${index}.institution`} label="Institution" placeholder="University name" />
          <FormInput control={control} name={`items.${index}.degree`} label="Degree" placeholder="Bachelor of Science" />
          <FormInput control={control} name={`items.${index}.fieldOfStudy`} label="Field of Study" placeholder="Computer Science" />
          <FormDatePicker control={control} name={`items.${index}.startDate`} label="Start Date" />
          <FormDatePicker control={control} name={`items.${index}.endDate`} label="End Date" />
          <FormToggle control={control} name={`items.${index}.ongoing`} label="Currently studying" />
        </div>
      ) : null}
    </div>
  );
});

const EMPTY_ITEMS: EducationFormValues['items'] = [];

export const EducationForm = memo(function EducationForm() {
  const storeItems = useResumeStore((s) => s.data?.education?.items) ?? EMPTY_ITEMS;
  const updateSection = useResumeStore((s) => s.updateSection);
  const isStoreUpdateRef = useRef(false);

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: { items: storeItems },
    mode: 'onChange',
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  useEffect(() => {
    if (isStoreUpdateRef.current) {
      isStoreUpdateRef.current = false;
      return;
    }
    form.reset({ items: storeItems });
  }, [storeItems, form]);

  useEffect(() => {
    const sub = form.watch((value) => {
      if (value.items) {
        isStoreUpdateRef.current = true;
        updateSection('education', (draft) => {
          draft.items = value.items as EducationFormValues['items'];
        });
      }
    });
    return () => sub.unsubscribe();
  }, [form, updateSection]);

  const handleAdd = useCallback(() => {
    append({
      id: crypto.randomUUID(),
      degree: '',
      institution: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      grade: '',
      ongoing: false,
    });
  }, [append]);

  return (
    <div className="flex flex-col gap-4">
      <FormSortableList
        items={fields}
        onReorder={(from, to) => move(from, to)}
        renderItem={(field, index) => (
          <EducationItemFields
            key={field.id}
            control={form.control}
            index={index}
            onRemove={() => remove(index)}
          />
        )}
      />
      <Button variant="outline" onClick={handleAdd} className="w-fit">
        + Add Education
      </Button>
    </div>
  );
});

export default EducationForm;
