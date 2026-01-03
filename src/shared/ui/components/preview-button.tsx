'use client';

import { Eye } from 'lucide-react';

interface PreviewButtonProps {
  onClick: () => void;
}

export function PreviewButton({ onClick }: PreviewButtonProps) {
  return (
    <div className="absolute top-6 right-6 z-10">
      <button
        type="button"
        onClick={onClick}
        className="group h-10 w-10 rounded-lg bg-[#CBE7FF] hover:bg-[#005FF2] flex items-center justify-center shadow-lg transition-colors border-0 cursor-pointer p-0"
      >
        <Eye className="h-5 w-5 text-blue-500 hover:text-white transition-colors" />
      </button>
    </div>
  );
}
