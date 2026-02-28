'use client';

import { memo, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@shared/lib/utils';
import { GripVertical } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SortableItem {
  id: string;
}

interface FormSortableListProps<T extends SortableItem> {
  items: T[];
  onReorder: (fromIndex: number, toIndex: number) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Sortable wrapper for each item
// ---------------------------------------------------------------------------

interface SortableItemWrapperProps {
  id: string;
  children: React.ReactNode;
}

const SortableItemWrapper = memo(function SortableItemWrapper({ id, children }: SortableItemWrapperProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn('relative', isDragging && 'z-10 opacity-80')}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute left-0 top-3 cursor-grab p-1 text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="h-4 w-4" />
      </div>
      <div className="pl-7">{children}</div>
    </div>
  );
});

// ---------------------------------------------------------------------------
// Main list component
// ---------------------------------------------------------------------------

function FormSortableListInner<T extends SortableItem>({
  items,
  onReorder,
  renderItem,
  className,
}: FormSortableListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          onReorder(oldIndex, newIndex);
        }
      }
    },
    [items, onReorder],
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div className={cn('flex flex-col gap-3', className)}>
          {items.map((item, index) => (
            <SortableItemWrapper key={item.id} id={item.id}>
              {renderItem(item, index)}
            </SortableItemWrapper>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export const FormSortableList = memo(FormSortableListInner) as typeof FormSortableListInner;
