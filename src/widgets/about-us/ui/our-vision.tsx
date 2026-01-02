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
            <div className="w-[50px] h-[50px] md:w-[66px] md:h-[66px] rounded-[16px] md:rounded-[24px] overflow-hidden bg-black flex items-center justify-center">
              <Image
                src="/images/close.svg"
                alt="Vision icon"
                width={50}
                height={50}
                className="w-[36px] h-[36px] md:w-[50px] md:h-[50px]"
              />
            </div>
            <p className="text-base md:text-xl font-normal text-center text-[#0C1118] leading-[1.2em] tracking-[-0.02em] mb-2 md:mb-4">
              Based in India
              <br />
              built for the world
            </p>
          </div>

          {/* Divider Line */}
          <div className="w-[3px] h-[60px] md:h-[100px] bg-black"></div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-[80px] font-semibold text-center text-black leading-[1.1] md:leading-[0.95em] tracking-[-0.03em] w-full max-w-[320px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1112px] px-2">
            A resume doesn't change your life, confidence does. We just help you find it.
          </h2>
        </div>
      </div>
    </section>
  );
}
