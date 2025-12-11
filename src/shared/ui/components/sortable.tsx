'use client';

import { cn } from '@shared/lib/cn';
import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import React, { type PropsWithChildren, useState, useEffect } from 'react';
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext as SortableContextOriginal, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

export const useSortableContext = useSortable;

export function SortableItem({ children, id, className }: PropsWithChildren<{ id: string; className?: string }>) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortableContext({ id });

  const style = {
    transform: transform ? `translateY(${transform.y ?? 0}px)` : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={cn('relative', className)}>
      <button
        type="button"
        {...attributes}
        {...listeners}
        className={cn('absolute cursor-grab top-0 left-0 -translate-x-full')}
      >
        <Image src="https://res.cloudinary.com/dkxocdrky/image/upload/v1765473869/drag_msxj9a.svg" alt="drag" width={24} height={24} />
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
}: PropsWithChildren<{
  data: T[];
  getId: (item: T) => string;
  children: (data: T[]) => any;
  onDragEnd?: (data: T[]) => void;
}>) {
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
