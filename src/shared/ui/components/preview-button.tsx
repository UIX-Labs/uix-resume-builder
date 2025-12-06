'use client';

import { Eye } from 'lucide-react';
import { Button } from '@shared/ui/button';

interface PreviewButtonProps {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function PreviewButton({ onClick, className, children }: PreviewButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`pointer-events-auto border border-[#CBE7FF] bg-[#E9F4FF]
                font-semibold text-[#005FF2] hover:bg-blue-700 hover:text-white shadow-lg cursor-pointer
                flex items-center gap-1.5 rounded-xl ${className || ''}`}
    >
      <Eye className="w-4 h-4" />
      {children || <span>Preview</span>}
    </Button>
  );
}

