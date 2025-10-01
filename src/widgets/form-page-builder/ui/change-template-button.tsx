import Image from 'next/image';
import React from 'react';

const TemplateButton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
  return (
    <div ref={ref} {...props} className="flex items-center gap-1.5 cursor-pointer">
      <div className="w-11 h-11 rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2472EB] to-[#1B345A]"></div>
        <div className="relative w-9 h-9 bg-white rounded-full flex items-center justify-center">
          <Image src="/images/Vector.png" alt="change template" width={24} height={24} />
        </div>
      </div>
      <span className="text-[13px] font-semibold bg-gradient-to-r from-[#246EE1] to-[#1C3965] bg-clip-text text-transparent">
        Change Template
      </span>
    </div>
  );
});

TemplateButton.displayName = 'TemplateButton';

export default TemplateButton;
