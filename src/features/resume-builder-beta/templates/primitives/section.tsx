import { cn } from '@shared/lib/utils';
import { SectionTitle } from './section-title';

interface SectionProps {
  id: string;
  title?: string;
  visible?: boolean;
  className?: string;
  titleClassName?: string;
  divider?: 'line' | 'dashed' | 'none';
  dividerClassName?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  title,
  visible = true,
  className,
  titleClassName,
  divider = 'none',
  dividerClassName,
  children,
}: SectionProps) {
  if (!visible) return null;

  return (
    <div data-section={id} className={cn(className)}>
      {title ? (
        <SectionTitle
          divider={divider}
          dividerClassName={dividerClassName}
          className={titleClassName}
        >
          {title}
        </SectionTitle>
      ) : null}
      {children}
    </div>
  );
}
