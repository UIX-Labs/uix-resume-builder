import { cn } from '@/shared/lib/utils';

const ASTHA_IMAGE = '/images/astha-img.png';

const DEFAULT_AUTHOR_IMAGE =
  'https://res.cloudinary.com/dvrzhxhmr/image/upload/v1765530541/Pika-Resume-logo_tkkeon.webp';

interface AuthorImageProps {
  author: string;
  className?: string;
}

export function AuthorImage({ author, className }: AuthorImageProps) {
  const src = author === 'Astha Narang' ? ASTHA_IMAGE : DEFAULT_AUTHOR_IMAGE;

  return <img src={src} className={cn('w-6 h-6 rounded-full object-cover', className)} alt={author} />;
}
