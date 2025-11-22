'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCachedUser } from '@shared/hooks/use-user';
import { TemplatesDialog } from '@widgets/templates-page/ui/templates-dialog';
import { useMutation } from '@tanstack/react-query';
import { createResume, updateResumeTemplate } from '@entities/resume';
import type { Template } from '@entities/template-page/api/template-data';

interface NavigationLink {
  label: string;
  href?: string;
  isTemplateDialog?: boolean;
}

const FooterNavigation = () => {
  const router = useRouter();
  const user = useCachedUser();

  const createResumeMutation = useMutation({
    mutationFn: createResume,
  });

  const updateTemplateMutation = useMutation({
    mutationFn: updateResumeTemplate,
  });

  const handleTemplateSelect = async (template: Template) => {
    if (!user) {
      router.push('/auth');
      return;
    }

    try {
      const data = await createResumeMutation.mutateAsync({
        title: 'New Resume',
        userInfo: {
          userId: user.id,
        },
      });

      await updateTemplateMutation.mutateAsync({
        resumeId: data.id,
        templateId: template.id,
      });

      router.push(`/resume/${data.id}`);
    } catch (error) {
      console.error('Failed to create resume:', error);
    }
  };

  const leftColumnLinks: NavigationLink[] = [
    { label: 'About Us', href: '/about-us' },
    { label: 'Help', href: '/help' },
    { label: "What's New", href: '/whats-new' },
    { label: 'Check Templates', isTemplateDialog: true },
  ];

  const rightColumnLinks: NavigationLink[] = [
    { label: 'Price', href: '/pricing' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Career', href: '/career' },
    { label: 'Terms of Service', href: 'https://uixlabs.co/' },
  ];

  const NavigationLinkItem = ({ label, href, isTemplateDialog }: NavigationLink) => {
    if (isTemplateDialog) {
      return (
        <TemplatesDialog onTemplateSelect={handleTemplateSelect}>
          <button
            type="button"
            className="flex items-center gap-3 group hover:opacity-80 transition-opacity duration-200 cursor-pointer"
          >
            <div className="w-6 h-6 flex items-center justify-center text-gray-600 group-hover:text-blue-600 transition-colors duration-200">
              <ArrowRight />
            </div>
            <span className="group-hover:text-blue-600 text-gray-1000 text-lg font-normal leading-6 tracking-[-0.26px] group-hover:underline decoration-blue-600">
              {label}
            </span>
          </button>
        </TemplatesDialog>
      );
    }

    return (
    <a
      href={href}
      className="flex items-center gap-3 group hover:opacity-80 transition-opacity duration-200"
    >
      <div className="w-6 h-6 flex items-center justify-center text-gray-600 group-hover:text-blue-600 transition-colors duration-200">
        <ArrowRight />
      </div>
      <span className="group-hover:text-blue-600 text-gray-1000 text-lg font-normal leading-6 tracking-[-0.26px] group-hover:underline decoration-blue-600">
        {label}
      </span>
    </a>
  );
  };

  return (
    <nav className="flex flex-row items-start gap-14">
      <div className="flex flex-col justify-center gap-4">
        {leftColumnLinks.map((link) => (
          <NavigationLinkItem key={link.label} {...link} />
        ))}
      </div>

      <div className="flex flex-col justify-center gap-4">
        {rightColumnLinks.map((link) => (
          <NavigationLinkItem key={link.label} {...link} />
        ))}
      </div>
    </nav>
  );
};

export default FooterNavigation;
