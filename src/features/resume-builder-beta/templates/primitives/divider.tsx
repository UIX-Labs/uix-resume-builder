import { cn } from '@shared/lib/utils';

interface DividerProps {
  variant?: 'line' | 'dashed' | 'dotted';
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider({
  variant = 'line',
  direction = 'horizontal',
  className,
}: DividerProps) {
  if (direction === 'vertical') {
    return (
      <div
        className={cn(
          'self-stretch',
          variant === 'line' && 'w-px bg-gray-300',
          variant === 'dashed' && 'w-px border-l border-dashed border-gray-300',
          variant === 'dotted' && 'w-px border-l border-dotted border-gray-300',
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'w-full',
        variant === 'line' && 'h-px bg-gray-300',
        variant === 'dashed' && 'border-t border-dashed border-gray-300',
        variant === 'dotted' && 'border-t border-dotted border-gray-300',
        className,
      )}
    />
  );
}
