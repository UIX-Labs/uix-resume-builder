import { cn } from '@shared/lib/utils';

interface LinkItemProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function LinkItem({ href, children, className, icon }: LinkItemProps) {
  if (!children) return null;

  if (!href) {
    return (
      <span className={cn(className)}>
        {icon ? <span className="mr-1">{icon}</span> : null}
        {children}
      </span>
    );
  }

  return (
    <a href={href} className={cn('underline', className)} target="_blank" rel="noopener noreferrer">
      {icon ? <span className="mr-1">{icon}</span> : null}
      {children}
    </a>
  );
}
