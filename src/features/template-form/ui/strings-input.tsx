import { Sortable, SortableItem } from '@shared/ui/components/sortable';
import { Input } from '@shared/ui/components/input';
import { cn } from '@shared/lib/cn';
import Image from 'next/image';
import { useState } from 'react';

export function StringInput({ data, onChange }: { data: any; onChange: (data: any) => void }) {
  const [value, setValue] = useState(data);

  return (
    <Input
      className={cn(
        'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-[8px]',
        'placeholder:text-[#DBCFD4] text-base text-[#0C1118] font-normal',
        'focus:border-[#0059ED] focus:ring-[#CBE7FF] placeholder:text-[#CFD4DB]',
        'bg-[#FAFBFC]',
      )}
      defaultValue={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
}

export function StringsInput({
  data,
  onChange,
}: {
  data: { itemId: string; items: string[] };
  onChange: (data: any) => void;
  section: any;
}) {
  const [localData, setLocalData] = useState(data.items);

  function handleDragEnd(data: any) {
    onChange({ ...data, items: data });
    setLocalData(data);
  }

  function handlePlusClick(index: number) {
    const newData = [...localData];

    //Insert after index
    newData.splice(index + 1, 0, '');

    onChange({ ...data, items: newData });
    setLocalData(newData);
  }

  return (
    <div className="flex flex-col gap-2">
      <Sortable data={localData} getId={(item) => item as string} onDragEnd={handleDragEnd}>
        {localData.map((item: any, index: number) => (
          <SortableItem id={item} key={index + item} className="group">
            <StringInput
              data={item}
              onChange={(value) => {
                const newData = [...localData];
                newData[index] = value;

                onChange({ ...data, items: newData });
                setLocalData(newData);
              }}
            />

            <button
              type="button"
              className={cn(
                'hidden group-hover:flex absolute cursor-pointer bg-[#959DA8] rounded-full w-7 h-7 justify-center items-center',
                'bottom-0 right-0 translate-x-1/2 translate-y-1/2 transition-all duration-300 z-10',
              )}
              onClick={() => handlePlusClick(index)}
            >
              <Image src="/images/plus.svg" alt="plus" width={16} height={16} />
            </button>
          </SortableItem>
        ))}
      </Sortable>
    </div>
  );
}
