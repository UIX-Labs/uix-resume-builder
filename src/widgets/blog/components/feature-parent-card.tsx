import { BlogPost } from '@/shared/lib/blog';
import FeaturedPrimaryCard from './feature-primary-card';
import FeaturedSecondaryCard from './feature-secondary';

interface FeaturedSectionProps {
  primaryPost: BlogPost;
  secondaryPosts: BlogPost[];
}

export default function FeaturedSection({ primaryPost, secondaryPosts }: FeaturedSectionProps) {
  const featureImages = ['/images/blog/features/image.png', '/images/blog/features/feature-img.png'];

  const badgeColors = ['bg-pink-500', 'bg-purple-700'];

  return (
    <section className="w-full mx-auto mt-10">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT - BIG CARD */}
        <div className="h-[400px] md:h-full border-white border-4 rounded-xl">
          <FeaturedPrimaryCard post={primaryPost} />
        </div>

        {/* RIGHT - TWO SMALL CARDS */}
        <div className="flex flex-col gap-8">
          {secondaryPosts.map((post, index) => {
            console.log('INDEX:', index);
            return (
              <FeaturedSecondaryCard
                key={post.slug}
                post={post}
                featureImage={featureImages[index] || featureImages[0]}
                badgeColor={badgeColors[index]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
