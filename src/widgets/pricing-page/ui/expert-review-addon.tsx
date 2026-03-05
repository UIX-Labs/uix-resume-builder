'use client';

import { Button } from '@/shared/ui/components/button';
import { expertReviewBundles } from '@/data/pricing-tiers';
import { cn } from '@shared/lib/cn';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { motion } from 'framer-motion';
import { UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ExpertReviewAddon() {
  const router = useRouter();

  const handleClick = (bundleId: string) => {
    trackEvent('pricing_bundle_click', {
      bundle: bundleId,
      source: 'pricing_page',
    });
    router.push('/expert-review');
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mx-auto mb-4">
            <UserCheck className="w-6 h-6 text-[#00BA34]" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#171717] mb-3">
            Expert Review <span className="text-[#00BA34]">Bundles</span>
          </h2>
          <p className="text-base text-gray-600 max-w-lg mx-auto">
            Get your resume reviewed by professionals from Google, Microsoft, and TikTok. Save more with bundles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6 max-w-3xl mx-auto">
          {expertReviewBundles.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={cn(
                'relative flex flex-col rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:shadow-md hover:border-[#00BA34]',
                bundle.id === 'three-pack' ? 'border-[#00BA34] bg-green-50/30' : 'border-gray-200 bg-white',
              )}
            >
              {bundle.id === 'three-pack' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#00BA34] text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    Best Value
                  </span>
                </div>
              )}

              <h3 className="text-lg font-semibold text-[#171717] mb-1">{bundle.name}</h3>
              <p className="text-xs text-gray-500 mb-4">{bundle.description}</p>

              <div className="mb-4">
                <span className="text-3xl font-bold text-[#171717]">${bundle.price}</span>
                {bundle.savings && (
                  <span className="ml-2 text-sm font-semibold text-[#00BA34]">Save ${bundle.savings}</span>
                )}
                <p className="text-xs text-gray-400 mt-0.5">₹{bundle.inr} in India</p>
              </div>

              <Button
                onClick={() => handleClick(bundle.id)}
                className={cn(
                  'w-full font-semibold rounded-xl py-5 text-sm mt-auto transition-all duration-300',
                  bundle.id === 'three-pack'
                    ? 'bg-[#00BA34] hover:bg-green-600 text-white'
                    : 'bg-white border border-[#00BA34] text-[#00BA34] hover:bg-green-50',
                )}
              >
                Choose {bundle.name}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
