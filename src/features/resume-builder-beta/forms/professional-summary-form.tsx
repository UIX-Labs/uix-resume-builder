'use client';

import { memo, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useResumeStore } from '../stores/resume-store';
import {
  professionalSummaryFormSchema,
  type ProfessionalSummaryFormValues,
} from '../types/form-schemas';
import { FormRichText } from '@shared/ui/form-rich-text';

const EMPTY_ITEMS: ProfessionalSummaryFormValues['items'] = [];

export const ProfessionalSummaryForm = memo(function ProfessionalSummaryForm() {
  const storeItems = useResumeStore((s) => s.data?.professionalSummary?.items) ?? EMPTY_ITEMS;
  const updateSection = useResumeStore((s) => s.updateSection);
  const isStoreUpdateRef = useRef(false);

  const form = useForm<ProfessionalSummaryFormValues>({
    resolver: zodResolver(professionalSummaryFormSchema),
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
        updateSection('professionalSummary', (draft) => {
          draft.items = value.items as ProfessionalSummaryFormValues['items'];
        });
      }
    });
    return () => sub.unsubscribe();
  }, [form, updateSection]);

  return (
    <div className="flex flex-col gap-4">
      <FormRichText
        control={form.control}
        name="items.0.summary"
        label="Professional Summary"
        placeholder="Write a brief professional summary..."
      />
    </div>
  );
});

export default ProfessionalSummaryForm;
