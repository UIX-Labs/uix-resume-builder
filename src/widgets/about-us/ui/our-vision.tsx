import Image from 'next/image';

export function OurVision() {
  return (
    <section className="w-full mx-auto px-4">
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute top-[118px] right-[250px] w-[206px] h-[206px] hidden lg:block">
          <Image
            src="/images/sphere-dynamic-color.svg"
            alt="Decorative sphere"
            width={206}
            height={206}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-1 items-center w-full max-w-4xl z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-[66px] h-[66px] rounded-[24px] overflow-hidden bg-black flex items-center justify-center">
              <Image src="/images/close.svg" alt="Vision icon" width={50} height={50} />
            </div>
            <p className="text-xl font-normal text-center text-[#0C1118] leading-[1.2em] tracking-[-0.02em] mb-4">
              Based in India
              <br />
             built for the world
            </p>
          </div>

          {/* Divider Line */}
          <div className="w-[3px] h-[103px] md:h-[100px] bg-black"></div>

          <h2 className="text-4xl md:text-6xl lg:text-[80px] font-semibold text-center text-black leading-[0.95em] tracking-[-0.03em] w-[1112px]">
            A resume doesn't change your life, confidence does. We just help you find it.
          </h2>
        </div>
      </div>
    </section>
  );
}

