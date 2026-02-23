import { cn } from '@shared/lib/utils';

interface LoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'w-6 h-6 border-2',
  md: 'w-10 h-10 border-3',
  lg: 'w-16 h-16 border-4',
  xl: 'w-24 h-24 border-8',
};

export function Loader({ className, size = 'lg' }: LoaderProps) {
  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <div
        className={cn(
          'border-white border-t-transparent rounded-full animate-spin',
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
}
