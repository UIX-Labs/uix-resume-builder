import { Lightbulb } from 'lucide-react';
import React from 'react';

export function ProTip({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-8 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3">
        <Lightbulb className="h-10 w-10 text-white bg-blue-500" />
        <span className="font-bold text-blue-500 text-2xl">PRO TIP</span>
      </div>

      {/* Content */}
      <div className="px-4 py-4 [&>p]:mt-0">
        <p className="font-semibold text-blue-500 mb-2 text-xl">{title}</p>

        {children}
      </div>
    </div>
  );
}
