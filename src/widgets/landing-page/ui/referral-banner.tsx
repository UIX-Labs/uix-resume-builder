'use client';

import { Button } from '@/shared/ui/components/button';
import { useCachedUser } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, Gift, Infinity, Link, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Pixel-accurate dashboard mockup shown to the right
function DashboardMockup() {
  return (
    <div className="relative w-full max-w-[440px] mx-auto">
      {/* Browser chrome frame */}
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#005FF2]/10">
        {/* Title bar */}
        <div className="bg-[#1a2332] px-4 py-3 flex items-center gap-2 border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <div className="ml-3 flex-1 bg-white/5 rounded-md px-3 py-1 text-xs text-white/30 font-mono">
            pikaresume.com/referral
          </div>
        </div>

        {/* Dashboard content */}
        <div className="bg-[#f3f4f8] p-5 space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Downloads Earned</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-[#005FF2] to-[#00BA34] bg-clip-text text-transparent leading-tight">
                9
              </p>
              <p className="text-[11px] text-gray-400 mt-1">from 3 referrals</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Friends Joined</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-[#005FF2] to-[#00BA34] bg-clip-text text-transparent leading-tight">
                3
              </p>
              <p className="text-[11px] text-gray-400 mt-1">all time</p>
            </div>
          </div>

          {/* Share link card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm font-semibold text-gray-800 mb-0.5">Your Referral Link</p>
            <p className="text-xs text-gray-400 mb-3">Share this link. Every signup earns you 3 downloads.</p>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl border border-gray-200 px-3 py-2.5">
              <Link className="w-3.5 h-3.5 text-[#005FF2] flex-shrink-0" />
              <span className="text-xs text-gray-600 flex-1 truncate font-mono">pikaresume.com/ref/aman2558</span>
              <span className="flex-shrink-0 flex items-center gap-1 bg-[#005FF2] text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                <Copy className="w-3 h-3" />
                Copy
              </span>
            </div>
          </div>

          {/* Mini steps */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm font-semibold text-gray-800 mb-3">How it works</p>
            <div className="space-y-2.5">
              {[
                { num: 1, text: 'Share your referral link with friends' },
                { num: 2, text: 'Friend signs up using your link' },
                { num: 3, text: 'You instantly earn 3 free downloads' },
              ].map((step) => (
                <div key={step.num} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#005FF2] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {step.num}
                  </span>
                  <span className="text-xs text-gray-600">{step.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-6 bg-[#005FF2]/[0.06] blur-[80px] rounded-full -z-10" />
    </div>
  );
}

const features = [
  {
    icon: Gift,
    title: '3 Downloads on Signup',
    description: 'Every new account starts with 3 free resume downloads. No credit card, no strings attached.',
    color: 'text-[#005FF2]',
    bg: 'bg-[#005FF2]/10',
  },
  {
    icon: Users,
    title: 'Earn 3 Per Referral',
    description: 'Share your unique link. When a friend creates an account, you instantly unlock 3 more downloads.',
    color: 'text-[#00BA34]',
    bg: 'bg-[#00BA34]/10',
  },
  {
    icon: Infinity,
    title: 'No Limits, No Expiry',
    description: 'Refer 10 friends, earn 30 downloads. There is no cap and your credits never expire.',
    color: 'text-[#005FF2]',
    bg: 'bg-[#005FF2]/10',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] as const } },
};

export function ReferralBanner() {
  const router = useRouter();
  const user = useCachedUser();

  const handleReferralClick = () => {
    trackEvent('navigation_click', {
      source: 'landing_referral_section',
      destination: user ? 'referral' : 'auth',
    });
    if (user) {
      router.push('/referral');
    } else {
      router.push('/auth');
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0c1118] py-16 sm:py-20 md:py-28">
      {/* Background glows */}
      <div className="pointer-events-none absolute -top-[200px] -left-[150px] w-[500px] h-[500px] rounded-full bg-[#005FF2]/[0.05] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-[200px] -right-[150px] w-[500px] h-[500px] rounded-full bg-[#00BA34]/[0.04] blur-[120px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-[90rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.span
              variants={itemVariants}
              className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold bg-[#005FF2]/10 text-[#005FF2] mb-6"
            >
              <Gift className="w-4 h-4" />
              Refer &amp; Earn
            </motion.span>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.1] mb-4"
            >
              Free Forever. <span className="text-[#005FF2]">One Referral</span> at a Time.
            </motion.h2>

            {/* Sub-heading */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-white/60 mb-10 max-w-xl leading-relaxed"
            >
              Start with 3 free downloads. Every friend you refer unlocks 3 more. No limits, no expiry.
            </motion.p>

            {/* Feature list */}
            <motion.div variants={containerVariants} className="flex flex-col gap-5 mb-10">
              {features.map((feature) => (
                <motion.div key={feature.title} variants={itemVariants} className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${feature.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}
                  >
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-base mb-0.5">{feature.title}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants}>
              <Button
                onClick={handleReferralClick}
                className="w-fit bg-[#005FF2] hover:bg-blue-700 text-white font-semibold rounded-xl px-8 py-6 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#005FF2]/20 flex items-center gap-2"
              >
                Start Referring
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Transparency note */}
            <motion.p variants={itemVariants} className="mt-6 text-xs text-white/25 max-w-md leading-relaxed">
              We are testing how our community grows organically. If referrals take off, the core product stays free.
              Paid plans, if ever introduced, will always have a free tier powered by referrals.
            </motion.p>
          </motion.div>

          {/* Right column - dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
