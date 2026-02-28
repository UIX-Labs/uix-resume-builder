'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Control } from 'react-hook-form';
import { useResumeStore } from '../stores/resume-store';
import {
  skillsFormSchema,
  type SkillsFormValues,
} from '../types/form-schemas';
import { FormInput } from '@shared/ui/form-input';
import { FormSortableList } from '@shared/ui/form-sortable-list';
import { Button } from '@shared/ui/button';


const SkillItemFields = memo(function SkillItemFields({
  control,
  index,
  onRemove,
}: {
  control: Control<SkillsFormValues>;
  index: number;
  onRemove: () => void;
}) {
  return (
    <div className="border rounded-lg p-3">
      <div className="flex items-center gap-3">
        <div className="flex-1 grid grid-cols-3 gap-2">
          <FormInput control={control} name={`items.${index}.name`} placeholder="Skill name" />
          <FormInput control={control} name={`items.${index}.category`} placeholder="Category" />
          <FormInput control={control} name={`items.${index}.level`} placeholder="Level" />
        </div>
        <Button variant="ghost" size="sm" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
});

const EMPTY_ITEMS: SkillsFormValues['items'] = [];

export const SkillsForm = memo(function SkillsForm() {
  const storeItems = useResumeStore((s) => s.data?.skills?.items) ?? EMPTY_ITEMS;
  const updateSection = useResumeStore((s) => s.updateSection);
  const isStoreUpdateRef = useRef(false);

  const form = useForm<SkillsFormValues>({
    resolver: zodResolver(skillsFormSchema),
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
        updateSection('skills', (draft) => {
          draft.items = value.items as SkillsFormValues['items'];
        });
      }
    });
    return () => sub.unsubscribe();
  }, [form, updateSection]);

  const handleAdd = useCallback(() => {
    append({ id: crypto.randomUUID(), name: '', category: '', level: '' });
  }, [append]);

  return (
    <div className="flex flex-col gap-4">
      <FormSortableList
        items={fields}
        onReorder={(from, to) => move(from, to)}
        renderItem={(field, index) => (
          <SkillItemFields
            key={field.id}
            control={form.control}
            index={index}
            onRemove={() => remove(index)}
          />
        )}
      />
      <Button variant="outline" onClick={handleAdd} className="w-fit">
        + Add Skill
      </Button>
    </div>
  );
});

export default SkillsForm;
