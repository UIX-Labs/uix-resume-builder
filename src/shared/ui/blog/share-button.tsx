'use client';

import { cn } from '@shared/lib/utils';
import { Check, Link2, Linkedin, Share2, Twitter } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
  title: string;
  url: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      label: 'Copy link',
      icon: copied ? Check : Link2,
      onClick: async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      label: 'Twitter / X',
      icon: Twitter,
      onClick: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          '_blank',
        );
      },
    },
    {
      label: 'LinkedIn',
      icon: Linkedin,
      onClick: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
      },
    },
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className={cn(
          'flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600',
          'transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900',
        )}
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>

      {showMenu && (
        <>
          {/* Backdrop */}
          <button type="button" className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />

          {/* Menu */}
          <div className="absolute right-0 z-50 mt-2 w-48 animate-in fade-in slide-in-from-top-2 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
            {shareOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => {
                  option.onClick();
                  if (option.label !== 'Copy link') setShowMenu(false);
                }}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <option.icon className="h-4 w-4 text-gray-400" />
                {option.label === 'Copy link' && copied ? 'Copied!' : option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
