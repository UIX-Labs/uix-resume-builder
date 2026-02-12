import { cn } from '@shared/lib/cn';

export function ResumePreviewStack({ className, jdActive = false }: { className?: string; jdActive?: boolean }) {
  return (
    <div className={cn('relative w-[300px] h-[340px] mx-auto md:mx-0', className)}>
      {/* Title Card - Top */}
      <div
        className={cn(
          'absolute top-0 right-0 w-[260px] rounded-xl bg-white p-4 shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-100 z-10 transition-all duration-500 ease-out',
          jdActive ? 'translate-x-0 rotate-0' : 'translate-x-[10px] rotate-[-3deg]',
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-0.5">Title:</p>
            <p className="text-sm text-gray-800 font-medium">Lead Product Designer</p>
          </div>
          <span className="text-base font-semibold" style={{ fontFamily: 'Product Sans, sans-serif' }}>
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </span>
        </div>
      </div>

      {/* Job Description Card - Middle, with blue border */}
      <div
        className={cn(
          'absolute top-[70px] right-0 w-[280px] rounded-xl bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-2 border-blue-500 z-20 transition-all duration-500 ease-out',
          jdActive ? 'translate-x-0 rotate-0 scale-105' : 'translate-x-[5px] rotate-[-1deg]',
        )}
      >
        <p className="text-sm font-bold text-gray-900 mb-2">Job Description:</p>
        <p className="text-xs leading-relaxed text-gray-600">
          Lead end-to-end product design for large scale consumer products. collaborate with product, engineering and
          research teams
        </p>
      </div>

      {/* Keywords Card - Bottom */}
      <div
        className={cn(
          'absolute top-[200px] right-0 w-[260px] rounded-xl bg-white p-4 shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-100 z-10 transition-all duration-500 ease-out delay-75',
          jdActive ? 'translate-x-0 rotate-0' : 'translate-x-[15px] rotate-[2deg]',
        )}
      >
        <p className="text-sm font-bold text-gray-900 mb-2">Keywords:</p>
        <ul className="space-y-1">
          {['Design Strategy', 'Cross-functional Leadership', 'Data-driven Decisions'].map((keyword) => (
            <li key={keyword} className="text-xs text-gray-600 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-blue-500" />
              {keyword}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
