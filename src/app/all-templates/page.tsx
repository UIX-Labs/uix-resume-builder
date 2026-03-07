'use client';

import { useGetAllTemplates } from '@entities/template-page/api/template-data';
import { useTemplateFilters } from '@shared/hooks/use-template-filter';
import NotFoundFilter from '@widgets/all-templates/components/Not-found-filter';
import TemplateCardGrid from '@widgets/all-templates/components/template-card-grid';
import TemplateFilter from '@widgets/all-templates/components/template-filters/template-filter';
import HeroSection from '@widgets/all-templates/hero-section';
import { templates } from '@widgets/landing-page/models/constants';
import { useEffect, useState } from 'react';

const LIMIT = 10;

export default function FilterTemplatesPage() {
  const [offset, setOffset] = useState(0);
   const { filters, hasFilters } = useTemplateFilters(); 

  useEffect(() => {
    setOffset(0);
  }, [filters.style, filters.role, filters.layoutType, filters.hasProfilePhoto]);

 const { data, isLoading } = useGetAllTemplates(
    hasFilters ? {
      ...(filters.style.length > 0 && { style: filters.style.join(',') }),
      ...(filters.role.length > 0 && { role: filters.role.join(',') }),
      ...(filters.layoutType.length > 0 && { layoutType: filters.layoutType.join(',') }),
      ...(filters.hasProfilePhoto && { hasProfilePhoto: filters.hasProfilePhoto }), 
      offset,
      limit: LIMIT,
    } : undefined
  );
  // console.log("data",data)
  return (
    <div className="relative">
      <div className="relative rounded-2xl border-2 border-[#D5E5FF] md:m-6 m-2">
        <div className="dotted-bg" />

        <div className="relative">
          <div className="">
            <HeroSection />
          </div>

          <div className="md:pl-16 md:pr-16 md:pt-4 md:pb-4 p-4">
            {/* No results */}
            {!isLoading && (templates?.length ?? 0) === 0 && <NotFoundFilter />}

            <TemplateFilter results={data?.total || 0} />
          </div>

          <div className="p-4 md:pt-4 md:pb-4 md:mt-4">
            <TemplateCardGrid data={data} isLoading={isLoading} offset={offset} setOffset={setOffset} limit={LIMIT} />
          </div>
        </div>
      </div>
    </div>
  );
}
