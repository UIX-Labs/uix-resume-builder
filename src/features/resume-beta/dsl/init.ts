// ---------------------------------------------------------------------------
// DSL initialization
//
// Call initDsl() once at app startup to register all field and section
// renderers. Safe to call multiple times (registrations are idempotent).
// ---------------------------------------------------------------------------

import { registerAllFields } from './field-renderers/register';
import { registerAllSections } from './section-renderers/register';

let initialized = false;

export function initDsl(): void {
  if (initialized) return;
  initialized = true;
  registerAllFields();
  registerAllSections();
}
