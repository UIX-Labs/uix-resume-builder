'use client';

import { useSelectTemplate } from '@shared/hooks/use-select-template';
import { LinkedInIcon, WebsiteIcon, YoutubeIcon } from '@shared/icons';
import { Education } from '@shared/icons/education';
import { Star } from 'lucide-react';

export default function BlogCreateResume() {
  const { handleUseTemplate } = useSelectTemplate();
  return (
    <>
      <div className="flex flex-col justify-center md:h-[298px] items-center gap-4 pr-8 md:gap-2 bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] rounded-2xl border-2 border-green-600 relative overflow-hidden group mt-10 p-2">
        <img src="/images/blog/slug/Avatar.png" alt="" className="absolute bottom-0 -left-4  h-12 md:h-50" />
        <img src="/images/blog/slug/avatar-img.png" alt="" className="absolute bottom-0 -right-4  h-12 md:h-50" />

        <div className="text-[46px] font-semibold">
          Create your <span className="text-green-600">Resume</span>
        </div>
        <div className="text-[24px] max-w-[486px] text-center">
          Your resume is an extension of you. Make it truly yours.
        </div>

        <button
          className="bg-green-600 text-white px-8 py-4 rounded-md mb-2 md:mb-0 mt-2"
          onClick={() => handleUseTemplate('template1')}
        >
          Create your Resume
        </button>
      </div>

      <div className="flex justify-between mt-4">
        <div>
          <div className="flex gap-1 mb-2">
            <Star className="fill-yellow-300" />
            <Star className="fill-yellow-300" />
            <Star className="fill-yellow-300" />
            <Star className="fill-yellow-300" />
            <Star className="fill-yellow-300" />
          </div>
          <div>
            Average: 4.75/5 rated by 50+ people in last 7 days,{' '}
            <span className="text-gray-500">click to rate this article.</span>
          </div>
        </div>

        <div className="flex gap-2 h-full justify-center items-center">
          <LinkedInIcon />
          <WebsiteIcon />
          <YoutubeIcon />
          <Education />
        </div>
      </div>
    </>
  );
}
