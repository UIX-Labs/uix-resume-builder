'use client';

import { Button } from '@/shared/ui/components/button';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function PricingCTA() {
  const router = useRouter();

  const handleClick = () => {
    trackEvent('pricing_bottom_cta_click', {
      source: 'pricing_page',
    });
    router.push('/auth');
  };

  return (
    <section className="py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#171717] mb-4">
            Ready to Build a Resume That Gets Interviews?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            Join thousands of job seekers who landed their dream jobs with Pika Resume.
          </p>
          <Button
            onClick={handleClick}
            className="w-fit mx-auto bg-[#005FF2] hover:bg-blue-700 text-white font-semibold rounded-xl px-10 py-6 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#005FF2]/20 flex items-center gap-2"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
