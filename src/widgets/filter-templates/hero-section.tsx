export default function HeroSection() {
  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center pt-16 pb-10">
        <h1 className="text-5xl font-bold text-[#198447]">
          Your Resume, <span className="text-[#0059ED]">But Better</span>
        </h1>
        <p className="text-black mt-3 max-w-3xl text-lg">
          Choose from free and premium templates, customise with our intuitive drag-and-drop builder, and download your
          resume as a polished PDF in minutes.
        </p>
        <div className="flex gap-4 mt-6">
          <button type="button" className="bg-[#0059ED] text-white px-5 py-2.5 rounded text-sm font-medium">
            Autofill via LinkedIn
          </button>
          <button
            type="button"
            className="border border-gray-300 text-[#0059ED] px-5 py-2.5 rounded text-sm font-medium bg-[#D5E5FF]"
          >
            Upload My Resume
          </button>
        </div>
      </div>
    </div>
  );
}
