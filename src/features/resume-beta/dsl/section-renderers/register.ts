// ---------------------------------------------------------------------------
// Section renderer registration
//
// Call registerAllSections() once at app initialization to populate the
// SectionRegistry with all built-in section renderers.
// ---------------------------------------------------------------------------

import { SectionRegistry } from '../section-registry';

import { headerSectionRenderer, bannerSectionRenderer } from './header-section-renderer';
import { listSectionRenderer } from './list-section-renderer';
import { contentSectionRenderer } from './content-section-renderer';
import { inlineListSectionRenderer } from './inline-list-section-renderer';
import { badgeSectionRenderer } from './badge-section-renderer';
import { tableSectionRenderer } from './table-section-renderer';
import { twoColumnLayoutRenderer } from './two-column-layout-renderer';

let registered = false;

export function registerAllSections(): void {
  if (registered) return;
  registered = true;

  SectionRegistry.register(headerSectionRenderer);
  SectionRegistry.register(bannerSectionRenderer);
  SectionRegistry.register(listSectionRenderer);
  SectionRegistry.register(contentSectionRenderer);
  SectionRegistry.register(inlineListSectionRenderer);
  SectionRegistry.register(badgeSectionRenderer);
  SectionRegistry.register(tableSectionRenderer);
  SectionRegistry.register(twoColumnLayoutRenderer);
}
