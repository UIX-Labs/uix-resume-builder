'use client';

import { Button } from '@/shared/ui/components/button';
import { pricingTiers } from '@/data/pricing-tiers';
import { cn } from '@shared/lib/cn';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type BillingPeriod = 'monthly' | 'yearly';

function BillingToggle({
  period,
  onChange,
}: {
  period: BillingPeriod;
  onChange: (p: BillingPeriod) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-3 mb-10 sm:mb-14">
      <div className="relative flex items-center bg-gray-100 rounded-full p-1">
        <button
          type="button"
          onClick={() => onChange('monthly')}
          className={cn(
            'relative z-10 px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300',
            period === 'monthly' ? 'text-white' : 'text-gray-600 hover:text-gray-900',
          )}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => onChange('yearly')}
          className={cn(
            'relative z-10 px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300',
            period === 'yearly' ? 'text-white' : 'text-gray-600 hover:text-gray-900',
          )}
        >
          Yearly
        </button>
        <motion.div
          layoutId="billing-pill"
          className="absolute top-1 bottom-1 bg-[#005FF2] rounded-full"
          style={{
            left: period === 'monthly' ? '4px' : '50%',
            right: period === 'monthly' ? '50%' : '4px',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </div>
      {period === 'yearly' && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm font-semibold text-[#00BA34] bg-green-50 px-3 py-1 rounded-full"
        >
          Save 45%
        </motion.span>
      )}
    </div>
  );
}

function TierCard({
  tier,
  billingPeriod,
  index,
}: {
  tier: (typeof pricingTiers)[number];
  billingPeriod: BillingPeriod;
  index: number;
}) {
  const router = useRouter();
  const isHighlighted = tier.highlighted;
  const isExpertReview = tier.id === 'expert-review';

  const getPrice = () => {
    if (tier.price.type === 'one-time') {
      return tier.price.amount;
    }
    return billingPeriod === 'monthly' ? tier.price.monthly : tier.price.yearly;
  };

  const getPriceLabel = () => {
    if (tier.price.type === 'one-time') return 'one-time';
    if (tier.price.type === 'recurring' && tier.price.monthly === 0) return 'forever';
    return billingPeriod === 'monthly' ? '/mo' : '/yr';
  };

  const getInrPrice = () => {
    if (tier.price.type === 'one-time') return `₹${tier.price.inr}`;
    if (tier.price.type === 'recurring' && tier.price.monthly === 0) return null;
    const inr = billingPeriod === 'monthly' ? tier.price.inr.monthly : tier.price.inr.yearly;
    return `₹${inr}${billingPeriod === 'monthly' ? '/mo' : '/yr'}`;
  };

  const handleClick = () => {
    trackEvent('pricing_cta_click', {
      tier: tier.id,
      billing_period: billingPeriod,
      source: 'pricing_page',
    });
    router.push(tier.ctaHref);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'relative flex flex-col rounded-2xl border p-6 sm:p-8',
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

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#171717] mb-1">{tier.name}</h3>
        <p className="text-sm text-gray-500">{tier.tagline}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <AnimatePresence mode="wait">
            <motion.span
              key={`${tier.id}-${billingPeriod}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="text-5xl font-bold text-[#171717]"
            >
              ${getPrice()}
            </motion.span>
          </AnimatePresence>
          <span className="text-gray-500 text-base">{getPriceLabel()}</span>
        </div>
        {getInrPrice() && (
          <p className="text-xs text-gray-400 mt-1">{getInrPrice()} in India</p>
        )}
      </div>

      <ul className="flex-1 space-y-3 mb-8">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check
              className={cn(
                'w-4.5 h-4.5 mt-0.5 flex-shrink-0',
                isExpertReview ? 'text-[#00BA34]' : 'text-[#005FF2]',
              )}
            />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
        {tier.excluded?.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Minus className="w-4.5 h-4.5 mt-0.5 flex-shrink-0 text-gray-300" />
            <span className="text-sm text-gray-400">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={handleClick}
        className={cn(
          'w-full font-semibold rounded-xl py-6 text-base transition-all duration-300',
          isHighlighted
            ? 'bg-[#005FF2] hover:bg-blue-700 text-white hover:shadow-lg hover:shadow-[#005FF2]/20'
            : isExpertReview
              ? 'bg-[#00BA34] hover:bg-green-600 text-white hover:shadow-lg hover:shadow-[#00BA34]/20'
              : 'bg-[#171717] hover:bg-gray-800 text-white',
        )}
      >
        {tier.ctaLabel}
      </Button>
    </motion.div>
  );
}

export function PricingHero() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('yearly');

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-[90rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#171717] tracking-tight mb-4">
            Simple, Transparent <span className="text-[#005FF2]">Pricing</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
            Start free. Upgrade when you need more.
          </p>
        </motion.div>

        <BillingToggle period={billingPeriod} onChange={setBillingPeriod} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <TierCard key={tier.id} tier={tier} billingPeriod={billingPeriod} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
