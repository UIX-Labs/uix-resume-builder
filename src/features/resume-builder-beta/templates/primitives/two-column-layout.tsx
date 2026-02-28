import { cn } from '@shared/lib/utils';

interface TwoColumnLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftWidth?: number | string;
  rightWidth?: number | string;
  gap?: number;
  leftClassName?: string;
  rightClassName?: string;
  className?: string;
}

export function TwoColumnLayout({
  left,
  right,
  leftWidth = '35%',
  rightWidth = '65%',
  gap = 0,
  leftClassName,
  rightClassName,
  className,
}: TwoColumnLayoutProps) {
  const leftW = typeof leftWidth === 'number' ? `${leftWidth}px` : leftWidth;
  const rightW = typeof rightWidth === 'number' ? `${rightWidth}px` : rightWidth;

  return (
    <div
      className={cn('flex', className)}
      style={{
        display: 'grid',
        gridTemplateColumns: `${leftW} ${rightW}`,
        gap,
      }}
    >
      <div className={cn(leftClassName)}>{left}</div>
      <div className={cn(rightClassName)}>{right}</div>
    </div>
  );
}
