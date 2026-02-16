import { cn } from '@shared/lib/utils';

interface PageHeadingProps {
  title: string;
  className?: string;
}

export default function PageHeading({ title, className }: PageHeadingProps) {
  return (
    <div className="flex text-start w-full px-2 sm:px-0">
      <h1
        className={cn(
          'text-dashboard-text font-semibold text-[58px] md:text-[90px] leading-tight -tracking-[3%] h-[77px] truncate mt-[-17px] md:mt-[-25px] ml-[-10px] mb-1 md:mb-0',
          className,
        )}
      >
        {title}
      </h1>
    </div>
  );
}
