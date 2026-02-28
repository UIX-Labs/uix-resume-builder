'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Control } from 'react-hook-form';
import { useResumeStore } from '../stores/resume-store';
import {
  projectsFormSchema,
  type ProjectsFormValues,
} from '../types/form-schemas';
import { FormInput } from '@shared/ui/form-input';
import { FormDatePicker } from '@shared/ui/form-date-picker';
import { FormToggle } from '@shared/ui/form-toggle';
import { FormRichText } from '@shared/ui/form-rich-text';
import { FormLinkField } from '@shared/ui/form-link-field';
import { FormTagsInput } from '@shared/ui/form-tags-input';
import { FormSortableList } from '@shared/ui/form-sortable-list';
import { Button } from '@shared/ui/button';


const ProjectItemFields = memo(function ProjectItemFields({
  control,
  index,
  onRemove,
}: {
  control: Control<ProjectsFormValues>;
  index: number;
  onRemove: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center">
        <span className="font-medium text-sm">Project {index + 1}</span>
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
          <FormInput control={control} name={`items.${index}.title`} label="Title" placeholder="Project name" />
          <FormDatePicker control={control} name={`items.${index}.startDate`} label="Start Date" />
          <FormDatePicker control={control} name={`items.${index}.endDate`} label="End Date" />
          <FormToggle control={control} name={`items.${index}.ongoing`} label="Ongoing" />
          <div className="col-span-2">
            <FormTagsInput control={control} name={`items.${index}.techStack`} label="Tech Stack" placeholder="Add technology..." />
          </div>
          <div className="col-span-2">
            <FormRichText control={control} name={`items.${index}.description`} label="Description" />
          </div>
          <div className="col-span-2">
            <FormLinkField control={control} name={`items.${index}.link`} label="Link" />
          </div>
        </div>
      ) : null}
    </div>
  );
});

const EMPTY_ITEMS: ProjectsFormValues['items'] = [];

export const ProjectsForm = memo(function ProjectsForm() {
  const storeItems = useResumeStore((s) => s.data?.projects?.items) ?? EMPTY_ITEMS;
  const updateSection = useResumeStore((s) => s.updateSection);
  const isStoreUpdateRef = useRef(false);

  const form = useForm<ProjectsFormValues>({
    resolver: zodResolver(projectsFormSchema),
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
        updateSection('projects', (draft) => {
          draft.items = value.items as ProjectsFormValues['items'];
        });
      }
    });
    return () => sub.unsubscribe();
  }, [form, updateSection]);

  const handleAdd = useCallback(() => {
    append({
      id: crypto.randomUUID(),
      title: '',
      techStack: [],
      startDate: '',
      endDate: '',
      ongoing: false,
      description: '',
      link: { title: '', link: '' },
    });
  }, [append]);

  return (
    <div className="flex flex-col gap-4">
      <FormSortableList
        items={fields}
        onReorder={(from, to) => move(from, to)}
        renderItem={(field, index) => (
          <ProjectItemFields
            key={field.id}
            control={form.control}
            index={index}
            onRemove={() => remove(index)}
          />
        )}
      />
      <Button variant="outline" onClick={handleAdd} className="w-fit">
        + Add Project
      </Button>
    </div>
  );
});

export default ProjectsForm;
