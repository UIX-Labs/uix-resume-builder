import { cn } from '@shared/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  if (!children) return null;

  return <span className={cn(className)}>{children}</span>;
}
