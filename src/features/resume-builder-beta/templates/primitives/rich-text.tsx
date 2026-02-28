import { cn } from '@shared/lib/utils';

interface RichTextProps {
  html?: string;
  className?: string;
  breakable?: boolean;
}

export function RichText({ html, className, breakable = false }: RichTextProps) {
  if (!html) return null;

  return (
    <div
      className={cn(className)}
      data-breakable={breakable ? 'true' : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
