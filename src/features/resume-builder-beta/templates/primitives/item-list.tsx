import { cn } from '@shared/lib/utils';

interface ItemListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  className?: string;
  itemClassName?: string;
  breakable?: boolean;
}

export function ItemList<T>({
  items,
  renderItem,
  keyExtractor,
  className,
  itemClassName,
  breakable = false,
}: ItemListProps<T>) {
  if (items.length === 0) return null;

  return (
    <div className={cn(className)} data-breakable={breakable ? 'true' : undefined}>
      {items.map((item, index) => (
        <div
          key={keyExtractor ? keyExtractor(item, index) : index}
          data-item
          className={cn(itemClassName)}
          style={breakable ? undefined : { breakInside: 'avoid' }}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
