'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Control } from 'react-hook-form';
import { useResumeStore } from '../stores/resume-store';
import {
  certificationsFormSchema,
  type CertificationsFormValues,
} from '../types/form-schemas';
import { FormInput } from '@shared/ui/form-input';
import { FormDatePicker } from '@shared/ui/form-date-picker';
import { FormToggle } from '@shared/ui/form-toggle';
import { FormLinkField } from '@shared/ui/form-link-field';
import { FormSortableList } from '@shared/ui/form-sortable-list';
import { Button } from '@shared/ui/button';


const CertificationItemFields = memo(function CertificationItemFields({
  control,
  index,
  onRemove,
}: {
  control: Control<CertificationsFormValues>;
  index: number;
  onRemove: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center">
        <span className="font-medium text-sm">Certification {index + 1}</span>
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
          <FormInput control={control} name={`items.${index}.title`} label="Title" placeholder="Certification name" />
          <FormInput control={control} name={`items.${index}.issuer`} label="Issuer" placeholder="Issuing organization" />
          <FormDatePicker control={control} name={`items.${index}.startDate`} label="Issue Date" />
          <FormDatePicker control={control} name={`items.${index}.endDate`} label="Expiry Date" />
          <FormToggle control={control} name={`items.${index}.ongoing`} label="No expiration" />
          <div className="col-span-2">
            <FormLinkField control={control} name={`items.${index}.link`} label="Credential Link" />
          </div>
        </div>
      ) : null}
    </div>
  );
});

const EMPTY_ITEMS: CertificationsFormValues['items'] = [];

export const CertificationsForm = memo(function CertificationsForm() {
  const storeItems = useResumeStore((s) => s.data?.certifications?.items) ?? EMPTY_ITEMS;
  const updateSection = useResumeStore((s) => s.updateSection);
  const isStoreUpdateRef = useRef(false);

  const form = useForm<CertificationsFormValues>({
    resolver: zodResolver(certificationsFormSchema),
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
        updateSection('certifications', (draft) => {
          draft.items = value.items as CertificationsFormValues['items'];
        });
      }
    });
    return () => sub.unsubscribe();
  }, [form, updateSection]);

  const handleAdd = useCallback(() => {
    append({
      id: crypto.randomUUID(),
      title: '',
      issuer: '',
      startDate: '',
      endDate: '',
      ongoing: false,
      link: { title: '', link: '' },
    });
  }, [append]);

  return (
    <div className="flex flex-col gap-4">
      <FormSortableList
        items={fields}
        onReorder={(from, to) => move(from, to)}
        renderItem={(field, index) => (
          <CertificationItemFields
            key={field.id}
            control={form.control}
            index={index}
            onRemove={() => remove(index)}
          />
        )}
      />
      <Button variant="outline" onClick={handleAdd} className="w-fit">
        + Add Certification
      </Button>
    </div>
  );
});

export default CertificationsForm;
