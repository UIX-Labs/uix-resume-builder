import { cn } from '@shared/lib/cn';
import { Sortable, SortableItem } from '@shared/ui/components/sortable';
import { useState, useEffect } from 'react';
import { Input } from '@shared/ui/components/input';
import Image from 'next/image';
import { FieldErrorBadges } from './error-badges';

export function StringInput({
  data,
  onChange,
  suggestions,
  onOpenAnalyzerModal,
  parentItemId,
}: {
  data: any;
  onChange: (data: any) => void;
  suggestions?: Array<{ old?: string; new: string; type: string }>;
  onOpenAnalyzerModal?: (itemId: string, fieldName: string, suggestionType: any) => void;
  parentItemId?: string;
}) {
  const [value, setValue] = useState(data);

  // Sync local state when data prop changes (e.g., after applying suggestions)
  useEffect(() => {
    setValue(data);
  }, [data]);

  // Filter suggestions that match the current string value
  const matchingSuggestions =
    suggestions?.filter((suggestion) => suggestion.old && suggestion.old.trim() === value?.trim()) || [];

  // Calculate error counts only for matching suggestions
  const errorCounts = {
    spellingCount: matchingSuggestions.filter((s) => s.type === 'spelling_error').length,
    sentenceCount: matchingSuggestions.filter((s) => s.type === 'sentence_refinement').length,
    newSummaryCount: matchingSuggestions.filter((s) => s.type === 'new_summary').length,
  };

  // Only show badge if there are matching suggestions
  const hasErrors = errorCounts.spellingCount > 0 || errorCounts.sentenceCount > 0 || errorCounts.newSummaryCount > 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        {/* <span className="text-sm font-semibold text-[#0C1118]">Skill</span> */}
        {hasErrors && onOpenAnalyzerModal && parentItemId && (
          <FieldErrorBadges
            spellingCount={errorCounts.spellingCount}
            sentenceCount={errorCounts.sentenceCount}
            newSummaryCount={errorCounts.newSummaryCount}
            onBadgeClick={(suggestionType) => onOpenAnalyzerModal(parentItemId, 'items', suggestionType)}
          />
        )}
      </div>
      <Input
        className={cn(
          'border border-[#959DA8] ring-4 ring-[#f6f6f6] rounded-[8px]',
          'placeholder:text-[#DBCFD4] text-base text-[#0C1118] font-normal',
          'focus:border-[#0059ED] focus:ring-[#CBE7FF] placeholder:text-[#CFD4DB]',
          'bg-[#FAFBFC]',
        )}
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
}

export function StringsInput({
  data,
  onChange,
  suggestedUpdates,
  onOpenAnalyzerModal,
}: {
  data: { itemId: string; items: any[] };
  onChange: (data: any) => void;
  suggestedUpdates?: any;
  onOpenAnalyzerModal?: (itemId: string, fieldName: string, suggestionType: any) => void;
}) {
  const initialData = data?.items?.length > 0 ? data.items : [''];
  const [localData, setLocalData] = useState(initialData);

  // Sync local data when parent data changes (e.g., after applying suggestions)
  useEffect(() => {
    if (data?.items) {
      setLocalData(data.items.length > 0 ? data.items : ['']);
    }
  }, [data]);

  // Extract suggestions array from the suggestedUpdates structure
  // Structure: suggestedUpdates[itemId].fields.items.suggestedUpdates[]
  const itemUpdate = suggestedUpdates?.find((update: any) => update.itemId === data.itemId);
  const suggestionsArray = itemUpdate?.fields?.items?.suggestedUpdates || [];

  function handleDragEnd(newItems: string[]) {
    onChange({ ...data, items: newItems });
    setLocalData(newItems);
  }

  function handlePlusClick(index: number) {
    const newData = [...localData];
    newData.splice(index + 1, 0, '');
    onChange({ ...data, items: newData });
    setLocalData(newData);
  }

  const wrappedData = localData.map((item, index) => ({
    originalItem: item,
    uniqueId: typeof item === 'string' ? `string-item-${index}` : item.itemId || item.id || `item-${index}`,
  }));

  return (
    <div className="flex flex-col gap-2">
      <Sortable
        data={wrappedData}
        getId={(wrappedItem) => wrappedItem.uniqueId}
        onDragEnd={(newWrappedItems) => {
          const unwrappedItems = newWrappedItems.map((wrapped) => wrapped.originalItem);
          handleDragEnd(unwrappedItems);
        }}
      >
        {
          ((wrappedItems: any[]) => (
            <>
              {wrappedItems.map((wrappedItem, index) => {
                const item = wrappedItem.originalItem;
                const itemId = wrappedItem.uniqueId;

                return (
                  <SortableItem id={itemId} key={itemId} className="group">
                    <StringInput
                      data={typeof item === 'object' ? item.name || item : item}
                      suggestions={suggestionsArray}
                      parentItemId={data.itemId}
                      onOpenAnalyzerModal={onOpenAnalyzerModal}
                      onChange={(value) => {
                        const newData = [...localData];
                        // Handle both object and string formats
                        if (typeof newData[index] === 'object') {
                          newData[index] = { ...newData[index], name: value };
                        } else {
                          newData[index] = value;
                        }
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
                );
              })}
            </>
          )) as any
        }
      </Sortable>
    </div>
  );
}
