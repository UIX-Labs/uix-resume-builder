'use client';

import { cn } from '@shared/lib/cn';
import { Input } from '@shared/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import { useEffect, useState } from 'react';
import { Link2, ChevronDown, Trash2 } from 'lucide-react';
import { LinkedInIcon, GithubIcon, DribbleIcon, BehanceIcon, YoutubeIcon, WebsiteIcon } from '@shared/icons';
import type { ComponentType } from 'react';

interface LinkType {
  key: string;
  label: string;
  Icon?: ComponentType<{ className?: string; width?: number | string; height?: number | string; color?: string }>;
  placeholder: string;
}

const LINK_TYPES: LinkType[] = [
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon, placeholder: 'Paste link' },
  { key: 'github', label: 'GitHub', Icon: GithubIcon, placeholder: 'Paste link' },
  { key: 'dribble', label: 'Dribble', Icon: DribbleIcon, placeholder: 'Paste link' },
  { key: 'behance', label: 'Behance', Icon: BehanceIcon, placeholder: 'Paste link' },
  { key: 'youtube', label: 'Youtube', Icon: YoutubeIcon, placeholder: 'Paste link' },
  { key: 'website', label: 'Website', Icon: WebsiteIcon, placeholder: 'Paste link' },
];

interface HardcodedLinksInputProps {
  data: any;
  onChange: (data: any) => void;
  section: any;
}

export function HardcodedLinksInput({ data, onChange, section }: HardcodedLinksInputProps) {
  // Initialize data structure if it doesn't exist
  const [linksData, setLinksData] = useState<Record<string, { title: string; link: string }>>(() => {
    if (!data || typeof data !== 'object') {
      return {};
    }
    return data;
  });

  useEffect(() => {
    onChange(linksData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linksData]);

  const handleLinkChange = (key: string, link: string) => {
    if (link.trim() === '') {
      // Remove the link if it's empty
      setLinksData((prev) => {
        const newData = { ...prev };
        delete newData[key];
        return newData;
      });
    } else {
      setLinksData((prev) => ({
        ...prev,
        [key]: {
          title: LINK_TYPES.find((lt) => lt.key === key)?.label || key,
          link: link,
        },
      }));
    }
  };

  const handleDeleteLink = (key: string) => {
    setLinksData((prev) => {
      const visibleLinksCount = Object.keys(prev).length;
      
      // If there's only one link box left, clear the text instead of deleting
      if (visibleLinksCount === 1) {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            link: '',
          },
        };
      }
      
      // Otherwise, delete the link box
      const newData = { ...prev };
      delete newData[key];
      return newData;
    });
  };

  const handleAddLink = (key: string) => {
    setLinksData((prev) => ({
      ...prev,
      [key]: {
        title: LINK_TYPES.find((lt) => lt.key === key)?.label || key,
        link: '',
      },
    }));
  };

  const handleChangeLinkType = (oldKey: string, newKey: string) => {
    if (oldKey === newKey) return;

    const oldLink = linksData[oldKey]?.link || '';
    
    setLinksData((prev) => {
      const newData = { ...prev };
      delete newData[oldKey];
      
      if (oldLink.trim() !== '') {
        newData[newKey] = {
          title: LINK_TYPES.find((lt) => lt.key === newKey)?.label || newKey,
          link: oldLink,
        };
      }
      
      return newData;
    });
  };

  // Get available link types (not yet added)
  const availableLinks = LINK_TYPES.filter((linkType) => !linksData[linkType.key]);

  // Show link types that have values OR have been added (even if empty)
  const visibleLinks = LINK_TYPES.filter((linkType) => {
    return linksData[linkType.key] !== undefined;
  });

  // Count links with actual values (for button visibility)
  const linksWithValues = LINK_TYPES.filter((linkType) => {
    const currentLink = linksData[linkType.key]?.link || '';
    return currentLink.trim() !== '';
  });

  return (
    <div className="flex flex-col gap-4">
      {visibleLinks.map((linkType) => {
        const currentLink = linksData[linkType.key]?.link || '';
        const availableTypes = LINK_TYPES.filter((lt) => lt.key !== linkType.key);
        const IconComponent = linkType.Icon;
        
        return (
          <div
            key={linkType.key}
            className={cn(
              'relative flex items-center w-full border border-[#959DA8] rounded-lg',
              'bg-[#FAFBFC] focus-within:border-[#0059ED]',
              'transition-colors overflow-hidden'
            )}
          >
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 bg-[#005FF2] text-white rounded-lg min-w-[100px] justify-center cursor-pointer hover:bg-[#0051d4] transition-colors ml-2"
                >
                  {IconComponent && (
                    <IconComponent width={16} height={16} className="object-contain" color="white" />
                  )}
                  <span className="text-xs font-semibold whitespace-nowrap">{linkType.label}</span>
                  <ChevronDown className="w-3 h-3 text-white" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="start">
                <div className="flex flex-col gap-1">
                  {availableTypes.map((type) => {
                    const TypeIconComponent = type.Icon;
                    return (
                      <button
                        key={type.key}
                        type="button"
                        onClick={() => {
                          handleChangeLinkType(linkType.key, type.key);
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-left cursor-pointer"
                      >
                        {TypeIconComponent && (
                          <TypeIconComponent width={16} height={16} className="object-contain" />
                        )}
                        <span className="text-sm text-[#0C1118]">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
            <input
              type="text"
              placeholder={linkType.placeholder}
              value={currentLink}
              onChange={(e) => handleLinkChange(linkType.key, e.target.value)}
              className={cn(
                'flex-1 h-[42px] px-4 pr-14 bg-transparent border-0 outline-none',
                'placeholder:text-[#DBCFD4] text-sm text-[#0C1118]',
                'font-normal placeholder:text-[#CFD4DB]',
                'min-w-0',
              )}
            />
            <button
              type="button"
              onClick={() => handleDeleteLink(linkType.key)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-md bg-white z-20 hover:bg-gray-100 transition-colors cursor-pointer text-gray-500 hover:text-red-500"
              aria-label="Delete link"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        );
      })}

      {linksWithValues.length < LINK_TYPES.length && availableLinks.length > 0 && (
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
              {availableLinks.map((linkType) => {
                const LinkIconComponent = linkType.Icon;
                return (
                  <button
                    key={linkType.key}
                    type="button"
                    onClick={() => {
                      handleAddLink(linkType.key);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-left cursor-pointer"
                  >
                    {LinkIconComponent && (
                      <LinkIconComponent width={16} height={16} className="object-contain" />
                    )}
                    <span className="text-sm text-[#0C1118]">{linkType.label}</span>
                  </button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
