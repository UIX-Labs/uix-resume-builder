// ---------------------------------------------------------------------------
// Field renderer registration
//
// Call registerAllFields() once at app initialization to populate the
// FieldRegistry with all built-in field renderers.
// ---------------------------------------------------------------------------

import { FieldRegistry } from '../field-registry';

import { implicitFieldRenderer } from './implicit';
import { textFieldRenderer } from './text';
import { htmlFieldRenderer } from './html';
import { durationFieldRenderer } from './duration';
import { linkFieldRenderer } from './link';
import { iconFieldRenderer } from './icon';
import { imageFieldRenderer } from './image';
import { skillLevelFieldRenderer } from './skill-level';
import { groupFieldRenderer } from './group';
import { inlineGroupFieldRenderer } from './inline-group';
import { inlineGroupWithIconFieldRenderer } from './inline-group-with-icon';
import { horizontalGroupFieldRenderer } from './horizontal-group';
import { containerFieldRenderer } from './container';
import { contactGridFieldRenderer } from './contact-grid';
import { badgeFieldRenderer } from './badge';

let registered = false;

export function registerAllFields(): void {
  if (registered) return;
  registered = true;

  FieldRegistry.register(implicitFieldRenderer);
  FieldRegistry.register(textFieldRenderer);
  FieldRegistry.register(htmlFieldRenderer);
  FieldRegistry.register(durationFieldRenderer);
  FieldRegistry.register(linkFieldRenderer);
  FieldRegistry.register(iconFieldRenderer);
  FieldRegistry.register(imageFieldRenderer);
  FieldRegistry.register(skillLevelFieldRenderer);
  FieldRegistry.register(groupFieldRenderer);
  FieldRegistry.register(inlineGroupFieldRenderer);
  FieldRegistry.register(inlineGroupWithIconFieldRenderer);
  FieldRegistry.register(horizontalGroupFieldRenderer);
  FieldRegistry.register(containerFieldRenderer);
  FieldRegistry.register(contactGridFieldRenderer);
  FieldRegistry.register(badgeFieldRenderer);
}
