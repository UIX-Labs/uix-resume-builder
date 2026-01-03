import { cn } from '@shared/lib/cn';
import { type Tag, TagInput } from 'emblor';
import { useEffect, useState } from 'react';

export function TagsInput({ onChange, data, section }: { data: any; section: any; onChange: (data: any) => void }) {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    // Initialize tags from data (array of strings)
    if (Array.isArray(data)) {
      setTags(data.map((tag: string) => ({ id: tag, text: tag })));
    } else {
      setTags([]);
    }
  }, [data]);

  const handleTagsChange = (newTags: Tag[] | ((prevState: Tag[]) => Tag[])) => {
    const updatedTags = typeof newTags === 'function' ? newTags(tags) : newTags;
    setTags(updatedTags);
    // Convert tags back to array of strings
    onChange(updatedTags.map((tag) => tag.text));
  };

  return (
    <div className="relative w-full">
      <TagInput
        activeTagIndex={0}
        placeholder={section.placeholder}
        setActiveTagIndex={() => undefined}
        tags={tags}
        setTags={handleTagsChange}
        styleClasses={{
          input: cn(
            'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-[8px]',
            'placeholder:text-[#DBCFD4] text-base text-[#0C1118] font-normal',
            'focus:ring-[#CBE7FF] placeholder:text-[#CFD4DB]',
            'bg-[#FAFBFC] h-8 w-full',
          ),
          tag: {
            body: 'bg-[#FAFBFC] h-8 rounded-[8px]',
          },
        }}
      />
    </div>
  );
}
