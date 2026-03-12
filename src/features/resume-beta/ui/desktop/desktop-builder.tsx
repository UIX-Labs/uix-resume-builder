'use client';

import { useBuilderMeta } from '../../models/builder-context';
import { HiddenRenderers } from '../hidden-renderers';
import { ModalsContainer } from '../modal/modals-container';
import { FormPanel } from './form-panel';
import { PreviewPanel } from './preview-panel';
import { ResizerHandle } from './resizer-handle';

export function DesktopBuilder() {
  const { containerRef } = useBuilderMeta();

  return (
    <div ref={containerRef} className="flex w-full h-full relative">
      <PreviewPanel />
      <ResizerHandle />
      <FormPanel />
      <HiddenRenderers />
      <ModalsContainer />
    </div>
  );
}
