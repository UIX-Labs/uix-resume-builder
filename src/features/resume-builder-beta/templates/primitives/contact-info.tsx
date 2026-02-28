import { cn } from '@shared/lib/utils';

interface LinkData {
  title: string;
  link: string;
}

interface ContactInfoProps {
  email?: string;
  phone?: string;
  address?: string;
  links?: {
    linkedin?: LinkData;
    github?: LinkData;
    behance?: LinkData;
    dribble?: LinkData;
    website?: LinkData;
    youtube?: LinkData;
  };
  variant: 'inline' | 'stacked' | 'grid';
  separator?: string;
  className?: string;
  itemClassName?: string;
  showIcons?: boolean;
  renderItem?: (label: string, href?: string) => React.ReactNode;
}

export function ContactInfo({
  email,
  phone,
  address,
  links,
  variant,
  separator = ' | ',
  className,
  itemClassName,
  renderItem,
}: ContactInfoProps) {
  const items: { label: string; href?: string }[] = [];

  if (address) items.push({ label: address });
  if (phone) items.push({ label: phone });
  if (email) items.push({ label: email, href: `mailto:${email}` });

  if (links) {
    for (const link of Object.values(links)) {
      if (link?.title) {
        items.push({ label: link.title, href: link.link || undefined });
      }
    }
  }

  if (items.length === 0) return null;

  if (variant === 'stacked') {
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        {items.map((item) => (
          <ContactItem
            key={item.label}
            item={item}
            className={itemClassName}
            renderItem={renderItem}
          />
        ))}
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className={cn('grid grid-cols-2 gap-1', className)}>
        {items.map((item) => (
          <ContactItem
            key={item.label}
            item={item}
            className={itemClassName}
            renderItem={renderItem}
          />
        ))}
      </div>
    );
  }

  // inline (default)
  return (
    <div className={cn(className)}>
      {items.map((item, i) => (
        <span key={item.label}>
          {i > 0 ? <span>{separator}</span> : null}
          <ContactItem item={item} className={itemClassName} renderItem={renderItem} />
        </span>
      ))}
    </div>
  );
}

function ContactItem({
  item,
  className,
  renderItem,
}: {
  item: { label: string; href?: string };
  className?: string;
  renderItem?: (label: string, href?: string) => React.ReactNode;
}) {
  if (renderItem) return <>{renderItem(item.label, item.href)}</>;

  if (item.href) {
    return (
      <a href={item.href} className={cn('underline', className)}>
        {item.label}
      </a>
    );
  }

  return <span className={cn(className)}>{item.label}</span>;
}
