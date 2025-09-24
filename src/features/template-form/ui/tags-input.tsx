import { cn } from '@shared/lib/cn';
import { type Tag, TagInput } from 'emblor';
import { useEffect, useState } from 'react';

export function TagsInput({ onChange, data, section }: { data: any; section: any; onChange: (data: any) => void }) {
  const [tags, setTags] = useState<Tag[]>(data);

  useEffect(() => {
    setTags(data.map((tag: string) => ({ id: tag, text: tag })));
  }, []);

  return (
    <div className="z-[1000] relative w-full">
      <TagInput
        activeTagIndex={0}
        placeholder={section.placeholder}
        setActiveTagIndex={() => {}}
        tags={tags}
        setTags={setTags}
        onTagAdd={(tag) => {
          console.log(tag);
          onChange([...data, tag]);
        }}
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
