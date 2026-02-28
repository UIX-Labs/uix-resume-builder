import { cn } from '@shared/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  pageIndex: number;
  className?: string;
  padding?: string;
  background?: string;
  fontFamily?: string;
  isPrint?: boolean;
}

export function PageContainer({
  children,
  pageIndex,
  className,
  padding = '40px',
  background = 'white',
  fontFamily,
  isPrint = false,
}: PageContainerProps) {
  if (isPrint) {
    return (
      <div
        className={cn(className)}
        style={{
          padding,
          background,
          fontFamily,
          breakBefore: pageIndex > 0 ? 'page' : undefined,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn('mb-5', className)}
      style={{
        width: '21cm',
        minHeight: '29.7cm',
        padding,
        background,
        fontFamily,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      {children}
    </div>
  );
}
