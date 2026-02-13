import { categories } from '@/data/categories';
import { BlogPost } from '@/shared/lib/blog';
import FeaturedPrimaryCard from './feature-primary-card';
import FeaturedSecondaryCard from './feature-secondary';

interface FeaturedSectionProps {
  primaryPost: BlogPost;
  secondaryPosts: BlogPost[];
}

export default function FeaturedSection({ primaryPost, secondaryPosts }: FeaturedSectionProps) {
  const featureImages = ['/images/blog/features/image.png', '/images/blog/features/feature-img.png'];

  function getBadgeColorFromPost(post: BlogPost) {
    const tag = post.frontmatter.tags[0]?.toLowerCase();
    const category = categories.find((cat) => cat.id === tag);
    return category?.color || '#999';
  }

  const primaryBadgeColor = getBadgeColorFromPost(primaryPost);

  return (
    <section className="w-full mx-auto mt-10">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT - BIG CARD */}
        <div className="h-[400px] md:h-full border-white border-4 rounded-xl">
          <FeaturedPrimaryCard post={primaryPost} badgeColor={primaryBadgeColor} />
        </div>

        {/* RIGHT - TWO SMALL CARDS */}
        <div className="flex flex-col gap-8">
          {secondaryPosts.map((post, index) => {
            const badgeColor = getBadgeColorFromPost(post);

            return (
              <FeaturedSecondaryCard
                key={post.slug}
                post={post}
                featureImage={featureImages[index]}
                badgeColor={badgeColor}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
