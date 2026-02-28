'use client';

import { memo, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useResumeStore } from '../stores/resume-store';
import {
  interestsFormSchema,
  type InterestsFormValues,
} from '../types/form-schemas';
import { FormTagsInput } from '@shared/ui/form-tags-input';

const EMPTY_ITEMS: InterestsFormValues['items'] = [];

export const InterestsForm = memo(function InterestsForm() {
  const storeItems = useResumeStore((s) => s.data?.interests?.items) ?? EMPTY_ITEMS;
  const updateSection = useResumeStore((s) => s.updateSection);
  const isStoreUpdateRef = useRef(false);

  const form = useForm<InterestsFormValues>({
    resolver: zodResolver(interestsFormSchema),
    defaultValues: { items: storeItems },
    mode: 'onChange',
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
        updateSection('interests', (draft) => {
          draft.items = value.items as string[];
        });
      }
    });
    return () => sub.unsubscribe();
  }, [form, updateSection]);

  return (
    <div className="flex flex-col gap-4">
      <FormTagsInput
        control={form.control}
        name="items"
        label="Interests"
        placeholder="Type an interest and press Enter"
      />
    </div>
  );
});

export default InterestsForm;
