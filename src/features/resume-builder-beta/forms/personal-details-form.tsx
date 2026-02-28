'use client';

import { memo, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useResumeStore } from '../stores/resume-store';
import {
  personalDetailsFormSchema,
  type PersonalDetailsFormValues,
} from '../types/form-schemas';
import { FormInput } from '@shared/ui/form-input';
import { FormPhoneInput } from '@shared/ui/form-phone-input';
import { FormLinkField } from '@shared/ui/form-link-field';

const EMPTY_ITEMS: PersonalDetailsFormValues['items'] = [];

export const PersonalDetailsForm = memo(function PersonalDetailsForm() {
  const storeItems = useResumeStore((s) => s.data?.personalDetails?.items) ?? EMPTY_ITEMS;
  const updateSection = useResumeStore((s) => s.updateSection);
  const isStoreUpdateRef = useRef(false);

  const form = useForm<PersonalDetailsFormValues>({
    resolver: zodResolver(personalDetailsFormSchema),
    defaultValues: { items: storeItems },
    mode: 'onChange',
  });

  // Store → Form sync (undo/redo or external updates)
  useEffect(() => {
    if (isStoreUpdateRef.current) {
      isStoreUpdateRef.current = false;
      return;
    }
    form.reset({ items: storeItems });
  }, [storeItems, form]);

  // Form → Store sync via RHF subscription
  useEffect(() => {
    const sub = form.watch((value) => {
      if (value.items) {
        isStoreUpdateRef.current = true;
        updateSection('personalDetails', (draft) => {
          draft.items = value.items as PersonalDetailsFormValues['items'];
        });
      }
    });
    return () => sub.unsubscribe();
  }, [form, updateSection]);

  const { control } = form;
  const prefix = 'items.0' as const;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <FormInput control={control} name={`${prefix}.fullName`} label="Full Name" placeholder="John Doe" />
        <FormInput control={control} name={`${prefix}.jobTitle`} label="Job Title" placeholder="Software Engineer" />
        <FormInput control={control} name={`${prefix}.email`} label="Email" type="email" placeholder="john@example.com" />
        <FormPhoneInput control={control} name={`${prefix}.phone`} label="Phone" />
        <div className="col-span-2">
          <FormInput control={control} name={`${prefix}.address`} label="Address" placeholder="City, Country" />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <h3 className="text-sm font-medium text-gray-700">Social Links</h3>
        <FormLinkField control={control} name={`${prefix}.links.linkedin`} label="LinkedIn" />
        <FormLinkField control={control} name={`${prefix}.links.github`} label="GitHub" />
        <FormLinkField control={control} name={`${prefix}.links.website`} label="Website" />
        <FormLinkField control={control} name={`${prefix}.links.youtube`} label="YouTube" />
        <FormLinkField control={control} name={`${prefix}.links.dribble`} label="Dribbble" />
        <FormLinkField control={control} name={`${prefix}.links.behance`} label="Behance" />
      </div>
    </div>
  );
});

export default PersonalDetailsForm;
