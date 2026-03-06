'use client';

import { useGetAllTemplates } from '@entities/template-page/api/template-data';
import NotFoundFilter from '@widgets/all-templates/components/Not-found-filter';
import TemplateCardGrid from '@widgets/all-templates/components/template-card-grid';
import TemplateFilter from '@widgets/all-templates/components/template-filters/template-filter';
import HeroSection from '@widgets/all-templates/hero-section';
import { templates } from '@widgets/landing-page/models/constants';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const LIMIT = 10;

export default function FilterTemplatesPage() {
  const searchParams = useSearchParams();
  const [offset, setOffset] = useState(0);

  const style = searchParams.get('style') || undefined;
  const layoutType = searchParams.get('layoutType') || undefined;
  const role = searchParams.get('role') || undefined;
  const hasProfilePhotoParam = searchParams.get('hasProfilePhoto');
  const hasProfilePhoto = hasProfilePhotoParam === 'true' ? true : hasProfilePhotoParam === 'false' ? false : undefined;

  useEffect(() => {
    setOffset(0);
  }, [style, role, layoutType, hasProfilePhoto]);

  const hasFilters = style || role || layoutType || hasProfilePhoto !== undefined;

  const { data, isLoading } = useGetAllTemplates(
    hasFilters
      ? {
          ...(style && { style }),
          ...(role && { role }),
          ...(layoutType && { layoutType }),
          ...(hasProfilePhoto !== undefined && { hasProfilePhoto }),
          offset,
          limit: LIMIT,
        }
      : undefined,


       
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
