import { Home } from 'lucide-react';
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@shared/ui/breadcrumb';
import { Button } from '@shared/ui/components/button';

interface BreadcrumbProps {
  onBackClick: () => void;
}

export function Breadcrumb({ onBackClick }: BreadcrumbProps) {
  return (
    <ShadcnBreadcrumb className="mb-6">
      <BreadcrumbList className="gap-2">
        <BreadcrumbItem>
          <Button onClick={onBackClick} variant="ghost" size="icon" className="h-auto w-auto p-1 hover:bg-gray-100">
            <Home className="w-5 h-5 text-[#959DA8]" />
          </Button>
        </BreadcrumbItem>

        <BreadcrumbSeparator className="text-[#CCD4DF] [&>svg]:size-5" />

        <BreadcrumbItem>
          <BreadcrumbLink className="text-xs font-semibold text-[#959DA8] hover:text-[#959DA8]">Resume</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator className="text-[#CCD4DF] [&>svg]:size-5" />

        <BreadcrumbItem>
          <BreadcrumbPage className="text-xs font-semibold text-[#0C1118]">Upload Resume</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  );
}
