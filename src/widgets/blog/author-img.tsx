const ASTHA_IMAGE = "/images/astha-img.png";

const DEFAULT_AUTHOR_IMAGE =
  "https://res.cloudinary.com/dvrzhxhmr/image/upload/v1765530541/Pika-Resume-logo_tkkeon.webp";

interface AuthorImageProps {
  author: string;
}

export function AuthorImage({ author }: AuthorImageProps) {
  const src = author === "Astha Narang" ? ASTHA_IMAGE : DEFAULT_AUTHOR_IMAGE;

  return (
    <img
      src={src}
      className="w-6 h-6 rounded-full object-cover"
      alt={author}
    />
  );
}

