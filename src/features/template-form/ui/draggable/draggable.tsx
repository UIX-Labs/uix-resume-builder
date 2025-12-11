"use client";
import { useState } from "react";
import { Sortable, SortableItem } from "@shared/ui/components/sortable";
import { cn } from "@shared/lib/cn";
import Image from "next/image";
import { FieldErrorBadges } from "../error-badges";
import { getFieldErrors } from "../../lib/get-field-errors";
import type { SuggestedUpdates } from "@entities/resume";

function CollapsedState({
  value,
  subValue,
}: {
  value: string;
  subValue: string;
}) {
  return (
    <div className="pl-4">
      {value && (
        <div className="text-sm text-[#0C1118] font-semibold">{value}</div>
      )}
      {subValue && (
        <div className="text-sm font-normal text-[#000000]">{subValue}</div>
      )}
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
  suggestedUpdates,
  onOpenAnalyzerModal,
}: {
  item: any;
  section: any;
  index: number;
  onChange: (data: any[]) => void;
  data: any[];
  getItem: (
    section: any,
    data: any,
    onChange: (data: any[]) => void,
    suggestedUpdates?: SuggestedUpdates,
    itemId?: string,
    fieldName?: string
  ) => void;
  suggestedUpdates?: SuggestedUpdates;
  onOpenAnalyzerModal?: (
    itemId: string,
    fieldName: string,
    suggestionType: any
  ) => void;
}) {
  const itemId = item.itemId;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-y-1.5 gap-x-8 relative group">
      {Object.entries(item).map(([key, value]) => {
        if (!section[key]) return null;

        // Get error counts for this field
        const errorCounts = getFieldErrors(suggestedUpdates, itemId, key);

        // Check if field has badges
        const hasBadges =
          errorCounts.spellingCount > 0 ||
          errorCounts.sentenceCount > 0 ||
          errorCounts.newSummaryCount > 0;

        return (
          <div
            key={key}
            className={cn(
              "text-sm text-[#0C1118] font-semibold flex flex-col gap-2 w-full min-w-0",
              section[key]?.fluid && "col-span-1 md:col-span-2",
              !section[key]?.fluid && hasBadges && "col-span-1 md:col-span-2"
            )}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full min-w-0">
              <span className="flex-shrink-0">{section[key]?.label}</span>
              <div className="">
                <FieldErrorBadges
                  spellingCount={errorCounts.spellingCount}
                  sentenceCount={errorCounts.sentenceCount}
                  newSummaryCount={errorCounts.newSummaryCount}
                  onBadgeClick={(suggestionType) =>
                    onOpenAnalyzerModal?.(itemId, key, suggestionType)
                  }
                />
              </div>
            </div>
            <div className="w-full min-w-0">
              {getItem(
                section[key],
                value,
                (value: any) => {
                  const newData = [...data];
                  newData[index][key] = value;
                  onChange(newData);
                },
                suggestedUpdates,
                itemId,
                key
              )}
            </div>
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
  suggestedUpdates,
  onOpenAnalyzerModal,
}: {
  data: any[];
  section: any;
  onChange: (data: any[]) => void;
  getItem: (section: any, data: any, onChange: (data: any[]) => void) => void;
  suggestedUpdates?: SuggestedUpdates;
  onOpenAnalyzerModal?: (
    itemId: string,
    fieldName: string,
    suggestionType: any
  ) => void;
}) {
  const [collapsed, setCollapsed] = useState<boolean[]>([]);

  function handlePlusClick(index: number) {
    const newItem = Object.entries(data[0]).reduce((acc, [key]) => {
      if (key === "rank") {
        return acc;
      }

      if (key === "itemId") {
        acc[key] = crypto.randomUUID();
      } else {
        acc[key] = "";
      }

      return acc;
    }, {} as Record<string, string>);

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
          const collapsedSubTitleValue =
            item[section.collapsedState?.subTitleKey];

          return (
            <SortableItem key={id} id={id} className="mb-4">
              <button
                type="button"
                className={cn(
                  "absolute cursor-pointer top-0 right-0 translate-x-full flex"
                )}
                onClick={() => handleDeleteClick(index)}
              >
                <Image
                  src="/images/delete.svg"
                  alt="delete"
                  width={24}
                  height={24}
                />
              </button>

              <div
                className={cn(
                  "group relative text-sm text-[#0C1118] w-full border border-[#CCD4DF] rounded-[12px]",
                  "bg-white transition-all duration-300",
                  collapsed[index] && "h-15 items-center flex"
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
                    className={cn(
                      "transition-all duration-300",
                      collapsed[index] && "rotate-180"
                    )}
                    width={24}
                    height={24}
                  />
                </button>

                <button
                  type="button"
                  className={cn(
                    "hidden group-hover:flex absolute cursor-pointer bg-[#959DA8] rounded-full w-7 h-7 justify-center items-center",
                    "bottom-0 right-0 translate-x-1/2 translate-y-1/2 transition-all duration-300"
                  )}
                  onClick={() => handlePlusClick(index)}
                >
                  <Image
                    src="/images/plus.svg"
                    alt="plus"
                    width={16}
                    height={16}
                  />
                </button>

                {!collapsed[index] ? (
                  <UnCollapsedState
                    item={item}
                    section={section}
                    index={index}
                    onChange={onChange}
                    data={data}
                    getItem={getItem}
                    suggestedUpdates={suggestedUpdates}
                    onOpenAnalyzerModal={onOpenAnalyzerModal}
                  />
                ) : (
                  <CollapsedState
                    value={collapsedTitleValue}
                    subValue={collapsedSubTitleValue}
                  />
                )}
              </div>
            </SortableItem>
          );
        });
      }}
    </Sortable>
  );
}
