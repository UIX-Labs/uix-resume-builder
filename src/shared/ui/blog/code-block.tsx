'use client';

import { useRef } from 'react';
import { CopyButton } from './copy-button';

export function CodeBlock({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const ref = useRef<HTMLPreElement>(null);

  return (
    <div className="group relative my-6">
      <pre
        ref={ref}
        className="overflow-x-auto rounded-xl border border-gray-200 bg-gray-950 p-4 text-gray-100"
        {...props}
      >
        {children}
      </pre>
      <CopyButton text={ref.current?.textContent || ''} />
    </div>
  );
}
