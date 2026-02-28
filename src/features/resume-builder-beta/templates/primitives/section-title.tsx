import { cn } from '@shared/lib/utils';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  divider?: 'line' | 'dashed' | 'dotted' | 'none';
  dividerClassName?: string;
}

export function SectionTitle({
  children,
  className,
  divider = 'none',
  dividerClassName,
}: SectionTitleProps) {
  return (
    <div className="flex flex-col">
      <h2 className={cn(className)}>{children}</h2>
      {divider === 'line' ? (
        <div className={cn('w-full h-px bg-black', dividerClassName)} />
      ) : null}
      {divider === 'dashed' ? (
        <div className={cn('w-full border-t border-dashed border-black', dividerClassName)} />
      ) : null}
      {divider === 'dotted' ? (
        <div className={cn('w-full border-t border-dotted border-black', dividerClassName)} />
      ) : null}
    </div>
  );
}
