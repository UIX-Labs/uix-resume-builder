'use client';

import { Button } from '@/shared/ui/components/button';
import { pricingTiers } from '@/data/pricing-tiers';
import { cn } from '@shared/lib/cn';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Minus, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type BillingPeriod = 'monthly' | 'yearly';

export function PricingSection() {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('yearly');

  const handleCTAClick = (tierId: string) => {
    const tier = pricingTiers.find((t) => t.id === tierId);
    if (!tier) return;
    trackEvent('pricing_cta_click', {
      tier: tierId,
      billing_period: billingPeriod,
      source: 'landing_page',
    });
    router.push(tier.ctaHref);
  };

  const getPrice = (tier: (typeof pricingTiers)[number]) => {
    if (tier.price.type === 'one-time') return tier.price.amount;
    return billingPeriod === 'monthly' ? tier.price.monthly : tier.price.yearly;
  };

  const getPriceLabel = (tier: (typeof pricingTiers)[number]) => {
    if (tier.price.type === 'one-time') return 'one-time';
    if (tier.price.type === 'recurring' && tier.price.monthly === 0) return 'forever';
    return billingPeriod === 'monthly' ? '/mo' : '/yr';
  };

  return (
    <section className="py-12 sm:py-16 md:py-24" aria-labelledby="pricing-heading">
      <div className="container mx-auto px-4 sm:px-6 max-w-[90rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2
            id="pricing-heading"
            className="mb-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight"
          >
            Choose Your <span className="text-[#005FF2]">Plan</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
            Start free. Upgrade when you need more.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 mb-10 sm:mb-14">
          <div className="relative flex items-center bg-gray-100 rounded-full p-1">
            <button
              type="button"
              onClick={() => setBillingPeriod('monthly')}
              className={cn(
                'relative z-10 px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300',
                billingPeriod === 'monthly' ? 'text-white' : 'text-gray-600 hover:text-gray-900',
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod('yearly')}
              className={cn(
                'relative z-10 px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300',
                billingPeriod === 'yearly' ? 'text-white' : 'text-gray-600 hover:text-gray-900',
              )}
            >
              Yearly
            </button>
            <motion.div
              layoutId="landing-billing-pill"
              className="absolute top-1 bottom-1 bg-[#005FF2] rounded-full"
              style={{
                left: billingPeriod === 'monthly' ? '4px' : '50%',
                right: billingPeriod === 'monthly' ? '50%' : '4px',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          </div>
          {billingPeriod === 'yearly' && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm font-semibold text-[#00BA34] bg-green-50 px-3 py-1 rounded-full"
            >
              Save 45%
            </motion.span>
          )}
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => {
            const isHighlighted = tier.highlighted;
            const isExpertReview = tier.id === 'expert-review';

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  'relative flex flex-col rounded-2xl border p-6 sm:p-7',
                  isHighlighted
                    ? 'border-[#005FF2] shadow-lg shadow-[#005FF2]/10 bg-white'
                    : 'border-gray-200 bg-white',
                )}
              >
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-[#005FF2] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                      <Sparkles className="w-3.5 h-3.5" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[#171717] mb-0.5">{tier.name}</h3>
                  <p className="text-sm text-gray-500">{tier.tagline}</p>
                </div>

                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`landing-${tier.id}-${billingPeriod}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="text-4xl font-bold text-[#171717]"
                      >
                        ${getPrice(tier)}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-gray-500 text-sm">{getPriceLabel(tier)}</span>
                  </div>
                </div>

                <ul className="flex-1 space-y-2.5 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        className={cn(
                          'w-4 h-4 mt-0.5 flex-shrink-0',
                          isExpertReview ? 'text-[#00BA34]' : 'text-[#005FF2]',
                        )}
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {tier.excluded?.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Minus className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-300" />
                      <span className="text-sm text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleCTAClick(tier.id)}
                  className={cn(
                    'w-full font-semibold rounded-xl py-5 text-sm transition-all duration-300',
                    isHighlighted
                      ? 'bg-[#005FF2] hover:bg-blue-700 text-white'
                      : isExpertReview
                        ? 'bg-[#00BA34] hover:bg-green-600 text-white'
                        : 'bg-[#171717] hover:bg-gray-800 text-white',
                  )}
                >
                  {tier.ctaLabel}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* See full comparison link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <button
            type="button"
            onClick={() => {
              trackEvent('navigation_click', {
                source: 'landing_pricing_section',
                destination: 'pricing',
              });
              router.push('/pricing');
            }}
            className="inline-flex items-center gap-1.5 text-[#005FF2] font-semibold text-sm hover:underline cursor-pointer transition-colors"
          >
            See full pricing details
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
