'use client';

import { Button } from '@/shared/ui/components/button';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { RESUME_EXAMPLE_CATEGORIES } from '@/data/resume-example-categories';
import { ArrowRight, FileText } from 'lucide-react';

const FEATURED_CATEGORIES = RESUME_EXAMPLE_CATEGORIES.slice(0, 8);

export function ResumeExamplesSection() {
  const router = useRouter();

  const handleBrowseAll = () => {
    trackEvent('navigation_click', {
      source: 'landing_resume_examples',
      destination: 'resume_examples',
    });
    router.push('/resume-examples');
  };

  const handleCategoryClick = (slug: string) => {
    trackEvent('navigation_click', {
      source: 'landing_resume_examples',
      destination: `resume_examples_${slug}`,
    });
    router.push(`/resume-examples/${slug}`);
  };

  return (
    <section className="py-12 sm:py-16 md:py-24" aria-labelledby="resume-examples-heading">
      <div className="container mx-auto px-4 sm:px-6 max-w-[90rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2
            id="resume-examples-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight mb-4"
          >
            Resume Examples
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Browse professional resume examples for every industry and experience level. Get inspired and start building
            yours.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10">
          {FEATURED_CATEGORIES.map((cat, index) => (
            <motion.button
              key={cat.slug}
              type="button"
              onClick={() => handleCategoryClick(cat.slug)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 text-left cursor-pointer hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-[40px] -translate-y-2 translate-x-2 group-hover:bg-blue-100 transition-colors duration-300" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors duration-300">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors duration-300">
                  {cat.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{cat.heroDescription.split('.')[0]}.</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Browse examples</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleBrowseAll}
            className="bg-[#005FF2] hover:bg-[rgb(0,81,213)] text-white font-semibold rounded-xl px-8 py-6 text-lg cursor-pointer"
          >
            Browse All Resume Examples
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
