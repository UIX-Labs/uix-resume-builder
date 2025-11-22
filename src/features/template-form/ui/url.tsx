import { cn } from '@shared/lib/cn';
import { Input } from '@shared/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const UrlInput = ({
  data,
  onChange,
}: {
  data?: { title?: string; link?: string } | null;
  onChange: (data: { title: string; link: string }) => void;
  section: any;
}) => {
  const [title, setTitle] = useState(() => {
    return data?.title ?? '';
  });
  const [link, setLink] = useState(() => {
    return data?.link ?? '';
  });
  const [open, setOpen] = useState(false);


  useEffect(() => {
    onChange({ title, link: link });
  }, [title, link]);

  return (
    <div className="relative">
      <Input
        placeholder="Enter URL"
        className={cn(
          'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-[8px]',
          'placeholder:text-[#DBCFD4] text-base text-[#0C1118]',
          'font-normal focus:border-[#0059ED] focus:ring-[#CBE7FF] placeholder:text-[#CFD4DB]',
          'bg-[#FAFBFC]',
        )}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="absolute top-0 right-2 bottom-0 flex items-center justify-center text-muted-foreground">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="cursor-pointer">
            <Image src="/images/link.svg" alt="link" width={16} height={16} />
          </PopoverTrigger>
          <PopoverContent onClick={(e) => e.stopPropagation()}>
            <Input
              autoFocus
              placeholder="Enter URL"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setOpen(false)}
              onClick={(e) => e.stopPropagation()}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
