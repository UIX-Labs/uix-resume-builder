'use client'
import { useSelectTemplate } from '@shared/hooks/use-select-template';
export default function BlogCreateResume(){
  

    const {handleUseTemplate} = useSelectTemplate();
    return (
          <div className="flex flex-col md:h-[280px] items-center gap-4 pr-8 md:gap-8 bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] rounded-2xl border-4 border-white relative overflow-hidden group mt-10">

            <img src="/images/blog/slug/Avatar.png" alt=""  className='absolute bottom-0 left-0'/>
            <img src="/images/blog/slug/avatar-img.png" alt="" className='absolute bottom-0 right-0'/>

            <div className="text-[46px] mt-2 font-bold">Create your Resume</div>
            <div className="text-[24px] max-w-[486px] text-center">Your resume is an extension of you. Make it truly yours.</div>

            <button className='bg-green-600 text-white px-4 py-2 rounded-lg mb-2'  onClick={() => handleUseTemplate('template1')}>
                Create your Resume</button>


        </div>
    )
}