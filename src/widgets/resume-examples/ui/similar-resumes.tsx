'use client';

import type { ResumeExampleListItem } from '@entities/resume-example/types';
import { ExampleCard } from './example-card';

interface SimilarResumesProps {
  examples: ResumeExampleListItem[];
  onSelect: (example: ResumeExampleListItem) => void;
}

export function SimilarResumes({ examples, onSelect }: SimilarResumesProps) {
  if (!examples.length) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Similar Resumes
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {examples.map((example) => (
          <ExampleCard
            key={example.id}
            example={example}
            onClick={() => onSelect(example)}
          />
        ))}
      </div>
    </div>
  );
}
