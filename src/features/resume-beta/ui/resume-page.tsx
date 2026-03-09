'use client';

import { useResumeData } from '@entities/resume';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { useParams } from 'next/navigation';
import { BuilderProviderComponent } from './builder-provider';
import { AnalyzerOverlay } from './analyzer-overlay';
import { DesktopBuilder } from './desktop/desktop-builder';
import { MobileBuilder } from './mobile/mobile-builder';
import { Sidebar } from './sidebar';
import PageContainer from './page-container';

type Params = {
  id: string;
};

function ResumeBetaPage() {
  const params = useParams<Params>();
  const id = params.id;
  const isMobile = useIsMobile();

  const { data: resumeData, isLoading, error } = useResumeData(id);

  return (
    <PageContainer isLoading={isLoading} error={error}>
      <BuilderProviderComponent resumeId={id} resumeData={resumeData}>
        <div className="flex pl-0 md:pl-4">
          {!isMobile && <Sidebar />}

          <div className="relative flex w-full overflow-hidden">
            <AnalyzerOverlay />
            {isMobile ? <MobileBuilder /> : <DesktopBuilder />}
          </div>
        </div>
      </BuilderProviderComponent>
    </PageContainer>
  );
}

export default ResumeBetaPage;
