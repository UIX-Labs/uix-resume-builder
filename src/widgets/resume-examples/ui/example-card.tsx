'use client';

import type { ResumeExampleListItem } from '@entities/resume-example/types';
import { cn } from '@shared/lib/cn';
import { Eye } from 'lucide-react';

interface ExampleCardProps {
  example: ResumeExampleListItem;
  onClick: () => void;
}

export function ExampleCard({ example, onClick }: ExampleCardProps) {
  return (
    <div
      className="group cursor-pointer transition-all duration-200 hover:shadow-lg"
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      role="button"
      tabIndex={0}
    >
      <div className="relative glass-card2 border border-gray-100 rounded-2xl overflow-hidden">
        {/* Thumbnail */}
        <div className="relative w-full aspect-[3/4] bg-gray-50">
          {example.publicThumbnail?.url ? (
            <img
              src={example.publicThumbnail.url}
              alt={example.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-4">
                <div
                  className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: example.primaryColor || '#2563EB' }}
                >
                  <span className="text-white text-xl font-bold">
                    {example.title.charAt(0)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{example.title}</p>
              </div>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">Preview</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
            {example.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs text-gray-500">{example.role}</span>
            {example.experienceYears !== null && (
              <>
                <span className="text-gray-300">|</span>
                <span className="text-xs text-gray-500">
                  {example.experienceYears === 0
                    ? 'No exp.'
                    : `${example.experienceYears}yr${example.experienceYears > 1 ? 's' : ''}`}
                </span>
              </>
            )}
            <span className="text-gray-300">|</span>
            <div
              className="w-3 h-3 rounded-full border border-gray-200"
              style={{ backgroundColor: example.primaryColor || '#2563EB' }}
              title={example.colorName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
