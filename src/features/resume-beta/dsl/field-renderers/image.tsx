import type { FieldRenderer, FieldRenderContext } from '../field-registry';
import { resolvePath } from '@features/resume/lib/resolve-path';
import { cn } from '@shared/lib/cn';
import React from 'react';

export const imageFieldRenderer: FieldRenderer = {
  type: 'image',

  render(field: any, ctx: FieldRenderContext): React.ReactNode {
    const actualSrc = resolvePath(ctx.data, field.path)?.replace(/&amp;/g, '&');
    const hasActualImage = actualSrc && actualSrc.trim() !== '';

    if (field.skipIfNoActualValue && !hasActualImage) {
      return null;
    }

    const src = hasActualImage ? actualSrc : field.fallback;
    if (!src) return null;

    const isExternalUrl = (url: string) => {
      return url.startsWith('http://') || url.startsWith('https://');
    };

    const imageSrc =
      ctx.isThumbnail && src && isExternalUrl(src) ? `/api/proxy-image?url=${encodeURIComponent(src)}` : src;

    return (
      <img
        src={imageSrc}
        crossOrigin={ctx.isThumbnail && isExternalUrl(src) ? 'anonymous' : undefined}
        alt={field.alt || 'Image'}
        className={cn(field.className)}
      />
    );
  },
};
