'use client';

import HeroSection from '@/widgets/filter-templates/hero-section';
import TemplateCardGrid from '@widgets/filter-templates/components/template-card-grid';
import TemplateFilter from '@widgets/filter-templates/components/template-filters/template-filter';

export default function FilterTemplatesPage() {
  return (
    <div className="relative">
      <div className="relative rounded-2xl border-2 border-[#D5E5FF] m-6">
        <div className="dotted-bg" />

        <div className="relative">
          <div className="">
            <HeroSection />
          </div>

          <div className="p-16">
            <TemplateFilter />
          </div>

          <div className="p-4">
            <TemplateCardGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
