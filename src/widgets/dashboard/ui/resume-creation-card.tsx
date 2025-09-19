'use client';

import { ChevronDown, FileText } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ResumeCreationCard() {
  const router =useRouter();
  const resumeCreateHandler = () =>{
    router.push("/form")
  }
  return (
    <div className="min-w-[600px] h-[277px] bg-white rounded-[20px] shadow-sm overflow-hidden mt-4">

      <div className="z-10 m-5 h-[237px] bg-white/10 rounded-2xl border border-dashed border-[rgb(204,212,223)] flex items-center justify-center">

        <div className="flex flex-col items-center gap-2 z-20 rounded-xl p-4">
          <div className="w-[44.07px] h-10 flex items-center justify-center">
            <FileText
              className="w-[29.38px] h-[33.33px] text-black"
              strokeWidth={1.5}
            />
          </div>

          <div className="relative w-full h-[52px] border-2 border-[rgb(199,219,250)] rounded-[15px] p-1 flex items-center">
            <button className="flex items-center justify-center gap-2 bg-[rgb(0,95,242)] text-white rounded-xl px-5 py-3 h-11 shadow-sm transition-all hover:bg-[rgb(0,81,217)]" onClick={resumeCreateHandler}>
              <span
                className="text-[18px] font-semibold leading-[1.333] tracking-[-0.014em] text-center"
                style={{ fontFamily: "Geist" }}
              >
                Create Resume
              </span>
              <ChevronDown className="w-6 h-6" strokeWidth={2} />
            </button>
        
            <div className="absolute inset-0 flex items-center justify-center -z-1">
              <div className="absolute -left-[34px] -top-[60px] flex flex-col gap-2 rotate-[-38deg]">

                <div className="w-[95.07px] h-[99.23px] bg-[rgb(141,48,48)] rounded-[4px] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/template-dashboard.png"
                    alt="Template 1"
                    width={97.7}
                    height={101.91}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute left-[180px] -top-[60px] flex flex-col gap-2 rotate-[38deg]">
                <div className="w-[95.07px] h-[99.23px] bg-[rgb(141,48,48)] rounded-[4px] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/template-dashboard.png"
                    alt="Template 2"
                    width={100.11}
                    height={104.65}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute -left-[34px] -top-[60px] flex flex-col gap-2 rotate-[-20.9deg]">
                <div className="w-[81.58px] h-[95.96px] bg-white rounded-[4px] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/template-dashboard.png"
                    alt="Template 3"
                    width={82.84}
                    height={97.22}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute left-[180px] -top-[60px] flex flex-col gap-2 rotate-[20.9deg]">
                <div className="w-[81.49px] h-[95.92px] bg-[#1FB272] rounded-[4px] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/template-dashboard.png"
                    alt="Template 4"
                    width={87.87}
                    height={102.72}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
