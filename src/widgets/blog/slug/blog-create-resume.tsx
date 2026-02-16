'use client';

import { useSelectTemplate } from '@shared/hooks/use-select-template';
import { FacebookIcon, LinkedInIcon, TwitterIcon, WhatsappIcon } from '@shared/icons';
import { Star } from 'lucide-react';


export default function BlogCreateResume() {
  const { handleUseTemplate } = useSelectTemplate();
  return (
    <>
      <div
        className="flex flex-col justify-center md:min-h-[298px]
 items-center gap-4 px-4 md:pr-8 md:gap-2 bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] rounded-2xl border-2 border-green-600 relative overflow-hidden group mt-10 p-6 md:p-2 text-center"
      >
        <img
          src="/images/blog/slug/Avatar.png"
          alt=""
          className="absolute bottom-0 -left-6 md:-left-4 h-24 md:h-40 pointer-events-none select-none"
        />

        <img
          src="/images/blog/slug/avatar-img.png"
          alt=""
          className="absolute bottom-0 -right-6 md:-right-4 h-24 md:h-40 pointer-events-none select-none"
        />

        <div className="text-2xl md:text-5xl font-semibold relative z-10">
          Create your <span className="text-green-600">Resume</span>
        </div>

        <div className="text-base md:text-2xl max-w-[486px] text-center relative z-10">
          Your resume is an extension of you. Make it truly yours.
        </div>

        <button
          className="bg-green-600 text-white px-8 py-3 md:py-4 rounded-md mb-2 md:mb-0 mt-2 hover:bg-green-700 transition-colors duration-300 cursor-pointer relative z-10 shadow-lg"
          onClick={() => handleUseTemplate('template1')}
        >
          Create your Resume
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex gap-1 mb-2">
            <Star className="fill-yellow-300 text-yellow-300 w-5 h-5" />
            <Star className="fill-yellow-300 text-yellow-300 w-5 h-5" />
            <Star className="fill-yellow-300 text-yellow-300 w-5 h-5" />
            <Star className="fill-yellow-300 text-yellow-300 w-5 h-5" />
            <div className="relative w-5 h-5">
              <Star className="text-gray-300 absolute inset-0 w-5 h-5" />
              <div className="absolute inset-0 overflow-hidden w-[50%]">
                <Star className="fill-yellow-300 text-yellow-300 w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="text-sm md:text-base">
            Average: 4.75/5 rated by 50+ people in last 7 days,{' '}
            <span className="text-gray-500 cursor-pointer">click to rate this article.</span>
          </div>
        </div>

        <div className="flex gap-4 h-full justify-center items-center">
          <TwitterIcon className="w-6 h-6 text-black" />
          <LinkedInIcon className="w-6 h-6 text-black" />
           <WhatsappIcon className="w-6 h-6 text-black" />
          <FacebookIcon className="w-6 h-6 text-black" />
        </div>
      </div>
    </>
  );
}
