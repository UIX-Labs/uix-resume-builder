'use client';

import { Eye } from 'lucide-react';

interface PreviewButtonProps {
  onClick: () => void;
}

export function PreviewButton({ onClick }: PreviewButtonProps) {
  return (
    <div className="absolute top-5 right-5 z-10">
      <button
        type="button"
        onClick={onClick}
        className="group/preview h-8 w-8 rounded-full bg-[#005FF2] hover:bg-[#0050D5] flex items-center justify-center shadow-lg transition-colors border-0 cursor-pointer p-0"
      >
        <Eye className="h-4 w-4 text-white transition-colors" />
      </button>
    </div>
  );
}
