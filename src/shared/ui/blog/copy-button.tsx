'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@shared/lib/utils';

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'absolute right-3 top-3 rounded-md p-1.5 text-gray-400 transition-all duration-200',
        'hover:bg-white/10 hover:text-white',
        'opacity-0 group-hover:opacity-100 focus:opacity-100',
      )}
      aria-label="Copy code"
    >
      {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}
