import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext as SortableContextOriginal,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@shared/lib/cn';
import Image from 'next/image';
import { useEffect, useState, type PropsWithChildren } from 'react';

export const useSortableContext = useSortable;

export function DragDropContext({
  children,
  onDragStart,
  onDragEnd,
  onDragOver,
}: PropsWithChildren<{
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onDragOver?: (event: any) => void;
}>) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      {children}
    </DndContext>
  );
}

export { DragOverlay };

export function SortableList<T>({
  items,
  getId,
  children,
  strategy = verticalListSortingStrategy,
  id,
}: {
  items: T[];
  getId: (item: T) => string;
  children: React.ReactNode;
  strategy?: any;
  id: string;
}) {
  return (
    <SortableContextOriginal id={id} items={items.map((item) => getId(item))} strategy={strategy}>
      {children}
    </SortableContextOriginal>
  );
}

export function SortableItem({
  children,
  id,
  className,
  dragHandleClassName,
}: PropsWithChildren<{ id: string; className?: string; dragHandleClassName?: string }>) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortableContext({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 100 : undefined,
    opacity: isDragging ? 0.6 : 1,
    scale: isDragging ? '1.02' : '1',
    boxShadow: isDragging ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className={cn('relative group transition-all duration-200', className)}>
      <button
        type="button"
        {...attributes}
        {...listeners}
        className={cn(
          'absolute cursor-grab opacity-0 group-hover:opacity-100 transition-opacity',
          'top-2 left-2 z-[110] bg-white rounded shadow-sm border p-0.5 hover:bg-gray-50 active:cursor-grabbing',
          dragHandleClassName,
        )}
      >
        <Image src="/images/drag.svg" alt="drag" width={20} height={20} />
      </button>

      {children}
    </div>
  );
}

export function Sortable<T>({
  data,
  children,
  getId,
  onDragEnd,
}: {
  data: T[];
  getId: (item: T) => string;
  children: (data: T[]) => React.ReactNode;
  onDragEnd?: (data: T[]) => void;
}) {
  const [localData, setLocalData] = useState<T[]>(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localData.findIndex((item) => getId(item) === active.id);
    const newIndex = localData.findIndex((item) => getId(item) === over.id);

    const newData = arrayMove(localData, oldIndex, newIndex);

    setLocalData(newData);
    onDragEnd?.(newData);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContextOriginal items={localData.map((item) => getId(item))} strategy={verticalListSortingStrategy}>
        {typeof children === 'function' ? children(localData) : children}
      </SortableContextOriginal>
    </DndContext>
  );
}
