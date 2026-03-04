'use client';

import { Button } from '@/shared/ui/components/button';
import { useCachedUser } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { LinkedInModal } from '@widgets/dashboard/ui/linkedin-integration-card';
import { FileSearch, FileText, Linkedin, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const creationMethods = [
  {
    id: 'scratch',
    icon: FileText,
    title: 'From Scratch',
    description: 'Start with a blank canvas and let our AI craft professional, job-ready content for you.',
    ctaLabel: 'Start Fresh',
    method: 'start_from_scratch',
    action: 'navigate' as const,
    dashboardAction: 'from_scratch',
    accentPosition: '-right-[60px] -top-[60px]',
    accentColor: 'bg-[#005FF2]/10',
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    title: 'From LinkedIn',
    description: 'Import your LinkedIn profile in one click for an instant, polished resume.',
    ctaLabel: 'Import LinkedIn',
    method: 'linkedin_autofill',
    action: 'linkedin_modal' as const,
    dashboardAction: null,
    accentPosition: '-left-[60px] -bottom-[60px]',
    accentColor: 'bg-[#005FF2]/10',
  },
  {
    id: 'upload',
    icon: Upload,
    title: 'From Your Resume',
    description: "Upload your existing PDF and we'll enhance it with stronger, clearer wording.",
    ctaLabel: 'Upload Resume',
    method: 'upload_existing',
    action: 'navigate' as const,
    dashboardAction: 'upload',
    accentPosition: '-right-[60px] -bottom-[60px]',
    accentColor: 'bg-[#005FF2]/10',
  },
  {
    id: 'jd',
    icon: FileSearch,
    title: 'Resume + Job Description',
    description: 'Tailor your resume to match any job posting automatically.',
    ctaLabel: 'Match to JD',
    method: 'upload_resume_jd',
    action: 'jd_navigate' as const,
    dashboardAction: 'tailored_jd',
    accentPosition: '-left-[60px] -top-[60px]',
    accentColor: 'bg-[#00BA34]/10',
  },
];

export function HowItWorksSection() {
  const router = useRouter();
  const user = useCachedUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMethodClick = (method: (typeof creationMethods)[number]) => {
    trackEvent('create_resume_click', {
      source: 'landing_how_it_works',
      method: method.method,
    });

    switch (method.action) {
      case 'linkedin_modal':
        setIsModalOpen(true);
        break;
      case 'jd_navigate':
        if (user) {
          router.push(`/dashboard?action=${method.dashboardAction}`);
        } else {
          localStorage.setItem('openJDModal', 'true');
          router.push('/auth');
        }
        break;
      default:
        // Navigate with action param to auto-trigger the flow on dashboard
        router.push(method.dashboardAction ? `/dashboard?action=${method.dashboardAction}` : '/dashboard');
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-24" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto px-4 sm:px-6 max-w-[90rem]">
        <h2
          id="how-it-works-heading"
          className="mb-8 sm:mb-12 md:mb-16 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight"
        >
          4 Ways to Build Your <span className="text-[#005FF2]">Resume</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {creationMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleMethodClick(method)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleMethodClick(method);
                }
              }}
              className="relative overflow-hidden bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col gap-4 cursor-pointer group"
            >
              {/* Decorative background accent */}
              <div
                className={`absolute ${method.accentPosition} w-[180px] h-[180px] rounded-full blur-[80px] ${method.accentColor}`}
              />

              <div className="relative z-10 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <method.icon className="w-6 h-6 text-[#005FF2]" />
              </div>
              <h3 className="relative z-10 text-xl sm:text-2xl font-semibold text-[#171717]">{method.title}</h3>
              <p className="relative z-10 text-sm sm:text-base text-gray-600 flex-1">{method.description}</p>
              <Button
                tabIndex={-1}
                className="w-full h-12 bg-[#005FF2] text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 relative z-10 group-hover:bg-blue-700"
              >
                <method.icon className="w-4 h-4" />
                {method.ctaLabel}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      <LinkedInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
