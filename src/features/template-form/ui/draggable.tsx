import { cn } from '@shared/lib/cn';
import Image from 'next/image';
import { useState } from 'react';

export function Draggable({
  data,
  section,
  onChange,
  getItem,
}: {
  data: any;
  section: any;
  onChange: (data: any) => void;
  getItem: (section: any, data: any, onChange: (data: any) => void) => void;
}) {
  const [collapsed, setCollapsed] = useState<boolean[]>([]);

  return (
    <div className="flex flex-col gap-4">
      {data.map((item, i) => {
        const collapsedTitleValue = item[section.collapsedState?.titleKey];
        const collapsedSubTitleValue = item[section.collapsedState?.subTitleKey];

        return (
          <div key={item.itemId} className="relative">
            <button
              type="button"
              className={cn(
                'absolute cursor-pointer',
                collapsed[i] ? 'top-1/2 -translate-y-1/2 right-2' : 'top-0 right-2',
              )}
              onClick={() => {
                const newData = [...data];
                newData.splice(i, 1);
                onChange(newData);
              }}
            >
              <Image src="/images/delete.svg" alt="delete" width={24} height={24} />
            </button>

            <button
              type="button"
              className={cn(
                'absolute cursor-pointer',
                collapsed[i] ? '-left-6 top-1/2 -translate-y-1/2' : 'right-2 bottom-6',
              )}
            >
              <Image src="/images/drag.svg" alt="drag" width={24} height={24} />
            </button>

            <div
              className={cn(
                'group relative text-sm text-[#0C1118] w-full border border-[#CCD4DF] rounded-[12px]',
                'bg-white transition-all duration-300',
                'max-w-[calc(100%-32px)]',
                collapsed[i] && 'h-15 items-center flex',
              )}
            >
              <div className="flex items-center justify-between absolute top-1 right-1.5 w-7 h-7 cursor-pointer z-10">
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => {
                    const newCollapsed = [...collapsed];
                    newCollapsed[i] = !newCollapsed[i];
                    setCollapsed(newCollapsed);
                  }}
                >
                  <Image
                    src="/images/cheveron-up.svg"
                    alt="cheveron-up"
                    className={cn('transition-all duration-300', collapsed[i] && 'rotate-180')}
                    width={24}
                    height={24}
                  />
                </button>
              </div>

              <button
                type="button"
                className={cn(
                  'hidden group-hover:flex absolute cursor-pointer bg-[#959DA8] rounded-full w-7 h-7 justify-center items-center',
                  'bottom-0 right-0 translate-x-1/2 translate-y-1/2 transition-all duration-300',
                )}
                onClick={() => {
                  const newItem = Object.entries(item).reduce(
                    (acc, [key]) => {
                      if (key === 'itemId' || key === 'rank') {
                        return acc;
                      }

                      acc[key] = '';

                      return acc;
                    },
                    {} as Record<string, string>,
                  );

                  const newData = [...data];
                  newData.push(newItem);
                  onChange(newData);
                }}
              >
                <Image src="/images/plus.svg" alt="plus" width={16} height={16} />
              </button>

              {!collapsed[i] ? (
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
                        {getItem(section[key], value, (value) => {
                          const newData = [...data];
                          newData[i][key] = value;

                          onChange(newData);
                        })}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="pl-4">
                  {collapsedTitleValue && (
                    <div className="text-sm text-[#0C1118] font-semibold">{collapsedTitleValue}</div>
                  )}

                  {collapsedSubTitleValue && (
                    <div className="text-sm font-normal text-[#000000]">{collapsedSubTitleValue}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
