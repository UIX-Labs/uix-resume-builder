import { Star } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@shared/lib/utils';
import { Button } from '@shared/ui/components/button';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  className?: string;
}

export function StarRating({ value, onChange, max = 5, className }: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  return (
    <div className={cn('flex gap-2', className)}>
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = (hoverValue !== null ? hoverValue : value) >= starValue;

        return (
          <Button
            key={index}
            variant="ghost"
            type="button"
            className="focus:outline-none transition-transform hover:bg-transparent cursor-pointer"
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(null)}
          >
            <Star
              className={cn(
                'size-14 transition-colors',
                isFilled ? 'fill-blue-700 text-blue-700 border-none' : 'fill-gray-200 text-gray-200',
              )}
            />
          </Button>
        );
      })}
    </div>
  );
}
