'use client';
import { useState } from 'react';
import { Sortable, SortableItem } from '@shared/ui/components/sortable';
import { cn } from '@shared/lib/cn';
import Image from 'next/image';

function CollapsedState({ value, subValue }: { value: string; subValue: string }) {
  return (
    <div className="pl-4">
      {value && <div className="text-sm text-[#0C1118] font-semibold">{value}</div>}
      {subValue && <div className="text-sm font-normal text-[#000000]">{subValue}</div>}
    </div>
  );
}

function UnCollapsedState({
  item,
  section,
  index,
  onChange,
  data,
  getItem,
}: {
  item: any;
  section: any;
  index: number;
  onChange: (data: any[]) => void;
  data: any[];
  getItem: (section: any, data: any, onChange: (data: any[]) => void) => void;
}) {
  return (
    <div className="p-4 grid grid-cols-2 gap-y-1.5 gap-x-8 relative group">
      {Object.entries(item).map(([key, value]) => {
        if (!section[key]) return null;

        return (
          <div
            key={key}
            className={cn(
              'text-sm text-[#0C1118] font-semibold flex flex-col gap-2',
              section[key]?.fluid && 'col-span-2',
            )}
          >
            {section[key]?.label}
            {getItem(section[key], value, (value: any) => {
              const newData = [...data];
              newData[index][key] = value;
              onChange(newData);
            })}
          </div>
        );
      })}
    </div>
  );
}

export function Draggable({
  data,
  section,
  onChange,
  getItem,
}: {
  data: any[];
  section: any;
  onChange: (data: any[]) => void;
  getItem: (section: any, data: any, onChange: (data: any[]) => void) => void;
}) {
  const [collapsed, setCollapsed] = useState<boolean[]>([]);

  function handlePlusClick(index: number) {
    const newItem = Object.entries(data[0]).reduce(
      (acc, [key]) => {
        if (key === 'rank') {
          return acc;
        }

        if (key === 'itemId') {
          acc[key] = crypto.randomUUID();
        } else {
          acc[key] = '';
        }

        return acc;
      },
      {} as Record<string, string>,
    );

    const newData = [...data];

    //Insert after index
    newData.splice(index + 1, 0, newItem);

    onChange(newData);
  }

  function handleDeleteClick(index: number) {
    const newData = [...data];
    newData.splice(index, 1);
    onChange(newData);
  }

  function handleCollapseClick(index: number) {
    const newCollapsed = [...collapsed];
    newCollapsed[index] = !newCollapsed[index];
    setCollapsed(newCollapsed);
  }
  return (
    <Sortable data={data} getId={(item) => item.itemId} onDragEnd={onChange}>
      {(localData) => {
        return localData.map((item, index) => {
          const id = item.itemId;
          const collapsedTitleValue = item[section.collapsedState?.titleKey];
          const collapsedSubTitleValue = item[section.collapsedState?.subTitleKey];

          return (
            <SortableItem key={id} id={id} className="mb-4">
              <button
                type="button"
                className={cn('absolute cursor-pointer top-0 right-0 translate-x-full flex')}
                onClick={() => handleDeleteClick(index)}
              >
                <Image src="/images/delete.svg" alt="delete" width={24} height={24} />
              </button>

              <div
                className={cn(
                  'group relative text-sm text-[#0C1118] w-full border border-[#CCD4DF] rounded-[12px]',
                  'bg-white transition-all duration-300',
                  collapsed[index] && 'h-15 items-center flex',
                )}
              >
                <button
                  type="button"
                  className="flex items-center justify-between absolute top-1 right-1.5 w-7 h-7 z-10 cursor-pointer"
                  onClick={() => handleCollapseClick(index)}
                >
                  <Image
                    src="/images/cheveron-up.svg"
                    alt="cheveron-up"
                    className={cn('transition-all duration-300', collapsed[index] && 'rotate-180')}
                    width={24}
                    height={24}
                  />
                </button>

                <button
                  type="button"
                  className={cn(
                    'hidden group-hover:flex absolute cursor-pointer bg-[#959DA8] rounded-full w-7 h-7 justify-center items-center',
                    'bottom-0 right-0 translate-x-1/2 translate-y-1/2 transition-all duration-300',
                  )}
                  onClick={() => handlePlusClick(index)}
                >
                  <Image src="/images/plus.svg" alt="plus" width={16} height={16} />
                </button>

                {!collapsed[index] ? (
                  <UnCollapsedState
                    item={item}
                    section={section}
                    index={index}
                    onChange={onChange}
                    data={data}
                    getItem={getItem}
                  />
                ) : (
                  <CollapsedState value={collapsedTitleValue} subValue={collapsedSubTitleValue} />
                )}
              </div>
            </SortableItem>
          );
        });
      }}
    </Sortable>
  );
}
