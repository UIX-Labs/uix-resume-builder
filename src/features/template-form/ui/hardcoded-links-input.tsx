'use client';

import { cn } from '@shared/lib/cn';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import { useEffect, useState } from 'react';
import { Link2, ChevronDown, Trash2 } from 'lucide-react';
import { LinkedInIcon, GithubIcon, DribbleIcon, BehanceIcon, YoutubeIcon, WebsiteIcon } from '@shared/icons';
import type { ComponentType } from 'react';

interface LinkType {
  key: string;
  label: string;
  Icon?: ComponentType<{ className?: string; width?: number | string; height?: number | string; color?: string }>;
}

interface LinkData {
  title: string;
  link: string;
}

interface HardcodedLinksInputProps {
  data: Record<string, LinkData> | null;
  onChange: (data: Record<string, LinkData>) => void;
  section?: unknown;
}

const LINK_TYPES: LinkType[] = [
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon },
  { key: 'github', label: 'GitHub', Icon: GithubIcon },
  { key: 'dribble', label: 'Dribble', Icon: DribbleIcon },
  { key: 'behance', label: 'Behance', Icon: BehanceIcon },
  { key: 'youtube', label: 'Youtube', Icon: YoutubeIcon },
  { key: 'website', label: 'Website', Icon: WebsiteIcon },
];

const getLinkType = (key: string) => LINK_TYPES.find((lt) => lt.key === key);

function LinkTypeButton({ linkType, onClick }: { linkType: LinkType; onClick?: () => void }) {
  const Icon = linkType.Icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-left cursor-pointer"
    >
      {Icon && <Icon width={16} height={16} className="object-contain" />}
      <span className="text-sm text-[#0C1118]">{linkType.label}</span>
    </button>
  );
}

function LinkSelector({
  currentType,
  availableTypes,
  onSelect,
}: {
  currentType: LinkType;
  availableTypes: LinkType[];
  onSelect: (newKey: string) => void;
}) {
  const Icon = currentType.Icon;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 bg-[#005FF2] text-white rounded-lg min-w-[100px] justify-center cursor-pointer hover:bg-[#0051d4] transition-colors ml-2"
        >
          {Icon && <Icon width={16} height={16} className="object-contain" color="white" />}
          <span className="text-xs font-semibold whitespace-nowrap">{currentType.label}</span>
          <ChevronDown className="w-3 h-3 text-white" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="start">
        <div className="flex flex-col gap-1">
          {availableTypes.map((type) => (
            <LinkTypeButton key={type.key} linkType={type} onClick={() => onSelect(type.key)} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function HardcodedLinksInput({ data, onChange }: HardcodedLinksInputProps) {
  const initialData = data && typeof data === 'object' ? data : {};

  const [linksData, setLinksData] = useState<Record<string, LinkData>>(initialData);
  const [linksOrder, setLinksOrder] = useState<string[]>(Object.keys(initialData));

  useEffect(() => {
    if (data && typeof data === 'object') {
      setLinksData(data);
    } else {
      setLinksData({});
    }
  }, [data]);

  useEffect(() => {
    onChange(linksData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linksData]);

  const updateLink = (key: string, link: string) => {
    if (!link.trim()) {
      setLinksData((prev) => {
        const { [key]: _, ...rest } = prev;
        return rest;
      });
    } else {
      setLinksData((prev) => ({
        ...prev,
        [key]: { title: getLinkType(key)?.label || key, link },
      }));
    }
  };

  const deleteLink = (key: string) => {
    const isLastLink = Object.keys(linksData).length === 1;

    if (isLastLink) {
      setLinksData((prev) => ({ ...prev, [key]: { ...prev[key], link: '' } }));
    } else {
      setLinksData((prev) => {
        const { [key]: _, ...rest } = prev;
        return rest;
      });
      setLinksOrder((prev) => prev.filter((k) => k !== key));
    }
  };

  const addLink = (key: string) => {
    setLinksData((prev) => ({
      ...prev,
      [key]: { title: getLinkType(key)?.label || key, link: '' },
    }));
    setLinksOrder((prev) => [...prev, key]);
  };

  const changeLinkType = (oldKey: string, newKey: string) => {
    if (oldKey === newKey) return;

    const oldLink = linksData[oldKey]?.link || '';

    setLinksData((prev) => {
      const { [oldKey]: _, ...rest } = prev;
      return { ...rest, [newKey]: { title: getLinkType(newKey)?.label || newKey, link: oldLink } };
    });
    setLinksOrder((prev) => prev.map((k) => (k === oldKey ? newKey : k)));
  };

  const visibleLinks = linksOrder
    .map((key) => getLinkType(key))
    .filter((lt): lt is LinkType => lt !== undefined && linksData[lt.key] !== undefined);

  const availableLinks = LINK_TYPES.filter((lt) => !linksData[lt.key]);
  const canAddMore = availableLinks.length > 0;
  return (
    <div className="flex flex-col gap-4">
      {visibleLinks.map((linkType) => (
        <div
          key={linkType.key}
          className={cn(
            'relative flex items-center w-full border border-[#959DA8] rounded-lg',
            'bg-[#FAFBFC] focus-within:border-[#0059ED] transition-colors overflow-hidden',
          )}
        >
          <LinkSelector
            currentType={linkType}
            availableTypes={LINK_TYPES.filter((lt) => lt.key !== linkType.key)}
            onSelect={(newKey) => changeLinkType(linkType.key, newKey)}
          />

          <input
            type="text"
            placeholder="Paste link"
            value={linksData[linkType.key]?.link || ''}
            onChange={(e) => updateLink(linkType.key, e.target.value)}
            className={cn(
              'flex-1 h-[42px] px-4 pr-14 bg-transparent border-0 outline-none',
              'placeholder:text-[#CFD4DB] text-sm text-[#0C1118] font-normal min-w-0',
            )}
          />

          <button
            type="button"
            onClick={() => deleteLink(linkType.key)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-md bg-white z-20 hover:bg-gray-100 transition-colors cursor-pointer text-gray-500 hover:text-red-500"
            aria-label="Delete link"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}

      {canAddMore && (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 text-[#005FF2] text-sm font-medium hover:text-[#0051d4] transition-colors cursor-pointer self-end"
            >
              <Link2 className="w-4 h-4" />
              <span>Add new link</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="end">
            <div className="flex flex-col gap-1">
              {availableLinks.map((linkType) => (
                <LinkTypeButton key={linkType.key} linkType={linkType} onClick={() => addLink(linkType.key)} />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
