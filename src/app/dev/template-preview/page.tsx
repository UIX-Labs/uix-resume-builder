'use client';

/**
 * DEV-ONLY page for previewing templates with dummy data.
 *
 * Visit:  http://localhost:3000/dev/template-preview
 *
 * - Pick any template from the sidebar
 * - See it rendered instantly with dummy data
 * - Edit the template file → save → hot-reload updates here
 */

import { getTemplateNames } from '@features/resume/data/template-registry';
import { DummyTemplateRenderer } from '@features/resume/ui/dummy-template-renderer';
import { useState } from 'react';

const templateNames = getTemplateNames();

export default function TemplatePreviewPage() {
  const [selected, setSelected] = useState<string>('standard');

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar — template picker */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto shrink-0 sticky top-0 h-screen">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Templates</h2>
        <ul className="space-y-1">
          {templateNames.map((name) => (
            <li key={name}>
              <button
                type="button"
                onClick={() => setSelected(name)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selected === name ? 'bg-blue-600 text-white font-medium' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main preview area */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-4 flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-800">Template Preview</h1>
          <span className="text-sm text-gray-500 bg-gray-200 px-2 py-0.5 rounded">{selected}</span>
        </div>

        <div className="flex justify-center">
          <DummyTemplateRenderer templateName={selected} />
        </div>
      </main>
    </div>
  );
}
