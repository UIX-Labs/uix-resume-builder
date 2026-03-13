'use client';

import type React from 'react';
import { ShadcnInput } from '@shared/ui/input';
import { Label } from '@shared/ui/label';
import { Button } from '@shared/ui/button';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  mono,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  mono?: boolean;
}) {
  const id = `input-${label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;

  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <ShadcnInput
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={mono ? 'font-mono' : ''}
      />
    </div>
  );
}

export function SectionWrapper({
  title,
  section,
  collapsed,
  onToggle,
  count,
  children,
}: {
  title: string;
  section: string;
  collapsed: Record<string, boolean>;
  onToggle: (section: string) => void;
  count?: number;
  children: React.ReactNode;
}) {
  const isCollapsed = collapsed[section];

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <button
        type="button"
        onClick={() => onToggle(section)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          {count !== undefined && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{count}</span>
          )}
        </div>
        {isCollapsed ? (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {!isCollapsed && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

export function RepeatableSection({
  items,
  onChange,
  renderItem,
  emptyItem,
  compact,
}: {
  items: any[];
  onChange: (items: any[]) => void;
  renderItem: (item: any, index: number, updateItem: (updated: any) => void) => React.ReactNode;
  emptyItem: Record<string, any>;
  compact?: boolean;
}) {
  const addItem = () => {
    onChange([...items, { ...emptyItem, rank: items.length }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, updated: any) => {
    const newItems = [...items];
    newItems[index] = updated;
    onChange(newItems);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className={`relative ${compact ? 'p-3' : 'p-4'} bg-gray-50 rounded-lg border border-gray-100`}>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeItem(index)}
            className="absolute top-2 right-2 h-7 w-7 text-gray-400 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          {renderItem(item, index, (updated) => updateItem(index, updated))}
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        onClick={addItem}
        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
      >
        <Plus className="w-4 h-4" />
        Add Item
      </Button>
    </div>
  );
}

export function StringListEditor({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  const flatItems = items.map((item: any) => (typeof item === 'string' ? item : item?.name || item?.title || ''));

  const addItem = () => onChange([...flatItems, '']);

  const removeItem = (index: number) => onChange(flatItems.filter((_: any, i: number) => i !== index));

  const updateItem = (index: number, value: string) => {
    const updated = [...flatItems];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      {flatItems.map((item: string, index: number) => (
        <div key={index} className="flex gap-2">
          <ShadcnInput
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeItem(index)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        onClick={addItem}
        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
      >
        <Plus className="w-4 h-4" />
        Add Item
      </Button>
    </div>
  );
}
