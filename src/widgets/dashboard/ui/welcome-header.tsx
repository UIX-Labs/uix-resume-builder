'use client';

import { usePathname } from 'next/navigation';

export default function WelcomeHeader({ userName }: { userName: string }) {
  const pathname = usePathname();
  const isGetAllTemplates = pathname === '/get-all-resumes';

  return (
    <div className="flex items-center gap-3 px-4 -mt-6 md:mt-0">
      <div className="flex flex-col gap-1">
        <h1 className="text-[rgb(23,23,23)] font-semibold text-2xl md:text-4xl leading-tight tracking-tight">
          {isGetAllTemplates ? 'Choose templates that recruiters and ATS love' : `Welcome, ${userName}`}
        </h1>

        <p className="text-[rgb(149,157,168)] font-normal text-base leading-5 tracking-tight">
          create your first custom resume to apply for jobs
        </p>
      </div>
    </div>
  );
}
