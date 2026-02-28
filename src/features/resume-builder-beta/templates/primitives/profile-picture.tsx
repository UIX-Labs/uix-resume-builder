import { cn } from '@shared/lib/utils';

interface ProfilePictureProps {
  src?: string;
  alt?: string;
  className?: string;
  size?: number;
}

export function ProfilePicture({
  src,
  alt = 'Profile',
  className,
  size = 80,
}: ProfilePictureProps) {
  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={cn('rounded-full object-cover', className)}
      style={{ width: size, height: size }}
    />
  );
}
