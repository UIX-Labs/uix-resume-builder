import { cn } from '@shared/lib/cn';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@shared/ui';
import { Input } from '@shared/ui/components/input';
import { useState } from 'react';

export function Dropdown({
  data,
  onChange,
  section,
}: {
  data: string;
  onChange: (data: string) => void;
  section: any;
}) {
  const [value, setValue] = useState(data);

  function handleChange(value: string) {
    setValue(value);
    onChange(value);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Input
          className={cn(
            'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-[8px]',
            'placeholder:text-[#DBCFD4] text-base text-[#0C1118] font-normal',
            'focus:border-[#0059ED] focus:ring-[#CBE7FF] placeholder:text-[#CFD4DB]',
            'bg-[#FAFBFC]',
          )}
          placeholder={section.placeholder}
          value={value}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full">
        <DropdownMenuGroup>
          {section.options.map((option: string) => (
            <DropdownMenuCheckboxItem checked={value === option} key={option} onClick={() => handleChange(option)}>
              {option}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
