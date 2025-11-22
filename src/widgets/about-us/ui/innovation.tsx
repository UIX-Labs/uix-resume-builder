import Image from 'next/image';
import React from 'react'

// Services data array
const services = [
  {
    id: 1,
    title: 'Practical and clean resume templates',
    icon: '/images/epereince.svg',
  },
  { id: 2, title: 'AI Builder intelligence for corrections', icon: '/images/epereince.svg' },
  { id: 3, title: 'Tailored resume for the Job', icon: '/images/epereince.svg' },
  { id: 4, title: 'Community support for resume review and mentorship', icon: '/images/epereince.svg' },
];

// Company logos data array
const companyLogos = [
  { id: 1, src: '/images/meta-logo.svg', alt: 'Meta' },
  { id: 2, src: '/images/google.svg', alt: 'Google' },
  { id: 3, src: '/images/apple-logo.svg', alt: 'Apple' },
  { id: 4, src: '/images/linkedin.svg', alt: 'LinkedIn' },
  { id: 5, src: '/images/amazon-logo.svg', alt: 'Amazon' }
];

function Innovation() {
  return (
    <div
      className="w-full max-w-[1408px] h-[793px] rounded-[36px] relative overflow-hidden mx-auto bg-[#171717]"
    >
      <div
        className="absolute pointer-events-none left-[-176px] top-[532px] w-[604px] h-[604px] bg-[linear-gradient(139deg,rgba(255,176,138,1)_23%,rgba(233,59,54,1)_40%,rgba(23,23,23,1)_67%)] blur-[100px]"
      />

      <div
        className="absolute pointer-events-none right-[-380px] top-[-203px] w-[604px] h-[604px] bg-[linear-gradient(136deg,rgba(37,122,255,1)_30%,rgba(23,23,23,1)_66%)] blur-[60px] z-0"
      />

      <div className="flex flex-col h-full px-19.5 py-[58px]">
        {/* Top Section - Don't forget */}
        <div className="flex items-center justify-center gap-3 mb-[41px]">
          <div className="w-28 h-[1px] bg-gradient-to-r from-transparent to-white/33" />
          <span
            className="text-white font-semibold whitespace-nowrap font-[Geist,sans-serif] text-[18px] leading-[1.33em] tracking-[-0.0144em]"
          >
            Don't forget
          </span>
          <div className="w-28 h-[1px] bg-gradient-to-l from-transparent to-white/33" />
        </div>

        {/* Middle Section - Two Column Layout */}
        <div className="flex flex-1 gap-[197px]">
          {/* Left Column - Title and Ratings */}
          <div className="flex flex-col w-[652px]">
            {/* Title Section */}
            <h2
              className="text-[#F0F7FF] font-normal mb-[53px] font-[Geist,sans-serif] text-[55.42px] leading-[1.2em] tracking-[-0.03em]"
            >
              Services that
              <br />
              <span className="font-geist text-[80px] font-semibold leading-[120%] tracking-[-2.4px]">
                Supercharge Your
                <br />
                Career
              </span>
            </h2>

            {/* Rating Section */}
            <div className="flex items-center gap-4">
              {/* User avatars */}
              <div className="flex items-center -space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#E5B89C] border-2 border-white" />
                <div className="w-12 h-12 rounded-full bg-[#C4A48B] border-2 border-white" />
                <div className="w-12 h-12 rounded-full bg-[#B8957A] border-2 border-white" />
              </div>

              {/* Stars and text */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Image src="/images/Star.svg" width={23} height={23} alt="" key={i}/>
                  ))}
                </div>
                <p
                  className="text-[#F1F7FF] font-semibold mt-1 font-[Geist,sans-serif] text-[18px] leading-[1.33em] tracking-[-0.0144em]"
                >
                  99+ Happy Users
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Services List */}
          <div className="flex flex-col justify-center gap-[43px] w-[355px]">
            {services.map((service) => (
              <div key={service.id} className="flex items-center gap-[16.75px]">
                <div className="w-[44.95px] h-[44.95px] rounded-full flex-shrink-0">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={45}
                    height={45}
                    className="rounded-full"
                  />
                </div>
                <span
                  className="text-white font-normal font-[Geist,sans-serif] text-[29.32px] leading-[1.43em] tracking-[-0.0036em] z-10"
                >
                  {service.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-9 mt-auto">
          <div className="flex items-center gap-3 w-full justify-center">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-white/33" />
            <span
              className="text-white font-semibold whitespace-nowrap font-[Geist,sans-serif] text-[18px] leading-[1.33em] tracking-[-0.0144em]"
            >
              Where Our Users Got Hired
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-white/33" />
          </div>

          {/* Company Logos */}
          <div className="flex items-center justify-center gap-[38.94px]">
            {companyLogos.map((logo) => (
              <Image 
                key={logo.id}
                src={logo.src} 
                alt={logo.alt} 
                width={59} 
                height={59} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Innovation
