/**
 * Compound component namespace — Vercel composition pattern.
 *
 * Usage:
 *   <ResumeBuilder.Provider resumeId={id}>
 *     <ResumeBuilder.Toolbar />
 *     <div className="flex">
 *       <ResumeBuilder.Sidebar />
 *       <ResumeBuilder.Editor />
 *       <ResumeBuilder.Preview />
 *     </div>
 *   </ResumeBuilder.Provider>
 */
import { ResumeBuilderProvider } from './provider';
import { ResumeBuilderToolbar } from './toolbar';
import { ResumeBuilderSidebar } from './sidebar';
import { ResumeBuilderEditor } from './editor-panel';
import { ResumeBuilderPreview } from './preview-panel';
import { MobileSectionList } from './mobile-section-list';
import { MobileFormSheet } from './mobile-form-sheet';
import { MobilePreviewModal } from './mobile-preview-modal';
import { MobileFooter } from './mobile-footer';

export const ResumeBuilder = {
  Provider: ResumeBuilderProvider,
  Toolbar: ResumeBuilderToolbar,
  Sidebar: ResumeBuilderSidebar,
  Editor: ResumeBuilderEditor,
  Preview: ResumeBuilderPreview,
  MobileSectionList,
  MobileFormSheet,
  MobilePreviewModal,
  MobileFooter,
};
