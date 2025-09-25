'use client';
import { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './sortable-item';

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = data.findIndex((item) => item.itemId === active.id);
    const newIndex = data.findIndex((item) => item.itemId === over.id);

    const newData = arrayMove(data, oldIndex, newIndex);
    onChange(newData);

    const newCollapsed = arrayMove(collapsed, oldIndex, newIndex);
    setCollapsed(newCollapsed);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={data.map((item) => item.itemId)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-4">
          {data.map((item, i) => (
            <SortableItem
              key={item.itemId}
              item={item}
              index={i}
              section={section}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              onChange={onChange}
              data={data}
              getItem={getItem}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
