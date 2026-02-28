import { cn } from '@shared/lib/utils';

interface ResumeHeaderProps {
  fullName?: string;
  jobTitle?: string;
  nameClassName?: string;
  titleClassName?: string;
  layout?: 'centered' | 'left-aligned' | 'with-photo';
  className?: string;
  children?: React.ReactNode;
}

export function ResumeHeader({
  fullName,
  jobTitle,
  nameClassName,
  titleClassName,
  layout = 'left-aligned',
  className,
  children,
}: ResumeHeaderProps) {
  if (!fullName) return null;

  return (
    <header
      data-section="header"
      className={cn(
        layout === 'centered' && 'flex flex-col items-center text-center',
        layout === 'left-aligned' && 'flex flex-col',
        layout === 'with-photo' && 'flex flex-row items-center gap-4',
        className,
      )}
    >
      <div>
        <h1 className={cn(nameClassName)}>{fullName}</h1>
        {jobTitle ? <p className={cn(titleClassName)}>{jobTitle}</p> : null}
      </div>
      {children}
    </header>
  );
}
