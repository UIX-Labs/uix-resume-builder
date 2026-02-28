'use client';

import { memo } from 'react';
import { Button } from '@shared/ui/button';
import { useResumeBuilderContext } from './provider';
import { usePdfDownload } from '../hooks/use-pdf-download';
import { useSaveIndicator } from '../hooks/use-save-indicator';
import { useBuilderIntelligence } from '../hooks/use-builder-intelligence';
import { useUIStore } from '../stores/ui-store';
import { SuggestionBadge } from './suggestion-overlay';

export const ResumeBuilderToolbar = memo(function ResumeBuilderToolbar() {
  const { state, actions, meta } = useResumeBuilderContext();
  const { downloadPdf, isGenerating } = usePdfDownload(meta.previewRef);
  const saveText = useSaveIndicator(state.lastSavedAt);
  const { analyze, isAnalyzing } = useBuilderIntelligence();
  const setIsTemplatePickerOpen = useUIStore((s) => s.setIsTemplatePickerOpen);

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={actions.undo}
          disabled={!meta.canUndo}
          title="Undo (Ctrl+Z)"
        >
          Undo
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={actions.redo}
          disabled={!meta.canRedo}
          title="Redo (Ctrl+Shift+Z)"
        >
          Redo
        </Button>
        {saveText ? (
          <span className="text-xs text-gray-500 ml-2">{saveText}</span>
        ) : null}
        {state.isSaving ? (
          <span className="text-xs text-blue-500 ml-2">Saving...</span>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <SuggestionBadge />
        <Button
          variant="outline"
          size="sm"
          onClick={analyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsTemplatePickerOpen(true)}
        >
          Templates
        </Button>
        <Button
          size="sm"
          onClick={downloadPdf}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Download PDF'}
        </Button>
      </div>
    </div>
  );
});
