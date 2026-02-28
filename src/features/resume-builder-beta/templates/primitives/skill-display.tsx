import { cn } from '@shared/lib/utils';

interface SkillDisplayProps {
  name: string;
  level?: string;
  variant?: 'dots' | 'bar' | 'badge' | 'text-only';
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

const LEVEL_MAP: Record<string, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

export function SkillDisplay({
  name,
  level,
  variant = 'text-only',
  className,
  activeClassName = 'bg-black',
  inactiveClassName = 'bg-gray-200',
}: SkillDisplayProps) {
  if (!name) return null;

  const levelNum = level ? (LEVEL_MAP[level.toLowerCase()] ?? 0) : 0;

  if (variant === 'text-only') {
    return <span className={cn(className)}>{name}</span>;
  }

  if (variant === 'badge') {
    return (
      <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs', className)}>
        {name}
      </span>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <span className="text-sm">{name}</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className={cn(
                'w-2 h-2 rounded-full',
                i < levelNum ? activeClassName : inactiveClassName,
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  // bar
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-sm">{name}</span>
      <div className={cn('h-1.5 rounded-full w-full', inactiveClassName)}>
        <div
          className={cn('h-full rounded-full', activeClassName)}
          style={{ width: `${(levelNum / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}
