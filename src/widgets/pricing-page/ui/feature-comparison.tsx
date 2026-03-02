'use client';

import { featureComparisonRows } from '@/data/pricing-tiers';
import { cn } from '@shared/lib/cn';
import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return <Check className="w-5 h-5 text-[#00BA34] mx-auto" />;
  }
  if (value === false) {
    return <Minus className="w-5 h-5 text-gray-300 mx-auto" />;
  }
  return <span className="text-sm font-medium text-gray-700">{value}</span>;
}

function DesktopTable() {
  return (
    <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="bg-[#171717]">
            <th className="text-left px-6 py-4 text-sm font-semibold text-white w-[40%]">Feature</th>
            <th className="text-center px-6 py-4 text-sm font-semibold text-white">Free</th>
            <th className="text-center px-6 py-4 text-sm font-semibold text-[#005FF2] bg-[#171717]">Pro</th>
            <th className="text-center px-6 py-4 text-sm font-semibold text-[#00BA34]">Expert Review</th>
          </tr>
        </thead>
        <tbody>
          {featureComparisonRows.map((row, index) => (
            <tr
              key={row.label}
              className={cn('border-t border-gray-100', index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]')}
            >
              <td className="px-6 py-3.5 text-sm text-gray-700 font-medium">{row.label}</td>
              <td className="px-6 py-3.5 text-center">
                <CellValue value={row.free} />
              </td>
              <td className="px-6 py-3.5 text-center bg-[#005FF2]/[0.02]">
                <CellValue value={row.pro} />
              </td>
              <td className="px-6 py-3.5 text-center">
                <CellValue value={row.expertReview} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MobileCards() {
  const tiers = [
    { name: 'Free', key: 'free' as const, color: '#171717' },
    { name: 'Pro', key: 'pro' as const, color: '#005FF2' },
    { name: 'Expert Review', key: 'expertReview' as const, color: '#00BA34' },
  ];

  return (
    <div className="md:hidden space-y-6">
      {tiers.map((tier) => {
        const rows = featureComparisonRows.filter((row) => row[tier.key] !== false);
        if (rows.length === 0) return null;

        return (
          <div key={tier.key} className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 font-semibold text-white text-sm" style={{ backgroundColor: tier.color }}>
              {tier.name}
            </div>
            <div className="divide-y divide-gray-100">
              {rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between px-5 py-3">
                  <span className="text-sm text-gray-700">{row.label}</span>
                  <span className="text-sm font-medium text-gray-900 flex-shrink-0 ml-4">
                    {row[tier.key] === true ? (
                      <Check className="w-4.5 h-4.5 text-[#00BA34]" />
                    ) : (
                      <span>{row[tier.key]}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FeatureComparison() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#F9FAFB]">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#171717] text-center mb-10 sm:mb-14"
        >
          Compare <span className="text-[#005FF2]">Plans</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <DesktopTable />
          <MobileCards />
        </motion.div>
      </div>
    </section>
  );
}
