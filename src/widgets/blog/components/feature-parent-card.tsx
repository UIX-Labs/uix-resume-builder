import FeaturedPrimaryCard from './feature-primary-card';
import FeaturedSecondaryCard from './feature-secondary';

export default function FeaturedSection() {
  return (
    <section className="w-full max-w-[1395px] mx-auto mt-10">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT - BIG CARD */}
        <div className="h-full h-full border-white border-[7px] rounded-xl">
          <FeaturedPrimaryCard />
        </div>

        {/* RIGHT - TWO SMALL CARDS */}
        <div className="flex flex-col gap-8 h-full">
          <FeaturedSecondaryCard />
          <FeaturedSecondaryCard />
        </div>
      </div>
    </section>
  );
}
