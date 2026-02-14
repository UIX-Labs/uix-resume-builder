import FaqContent from './faq-content';
function FaqSection() {
  return (
    <div className="max-w-7xl mx-auto">
      {' '}
      <h1 className=" font-bold text-5xl pt-15 text-center">
        Frequenty Asked <span className=" text-[#005FF2]">Questions?</span>
      </h1>
      <div className="w-full mt-8 max-w-6xl mx-auto px-6 pb-8">
        <FaqContent />
      </div>
    </div>
  );
}

export default FaqSection;
