'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface NavigationLink {
  label: string;
  href: string;
}

const FooterNavigation = () => {
  const leftColumnLinks: NavigationLink[] = [
    { label: 'About Us', href: '/about' },
    { label: 'Help', href: '/help' },
    { label: "What's New", href: '/whats-new' },
    { label: 'Check Templates', href: '/templates' },
  ];

  const rightColumnLinks: NavigationLink[] = [
    { label: 'Price', href: '/pricing' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Career', href: '/career' },
    { label: 'Terms of Service', href: '/terms' },
  ];

  const NavigationLinkItem = ({ label, href }: NavigationLink) => (
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

  return (
    <nav className="flex flex-row items-start gap-14">
      <div className="flex flex-col justify-center gap-4">
        {leftColumnLinks.map((link) => (
          <NavigationLinkItem key={link.label} label={link.label} href={link.href} />
        ))}
      </div>

      <div className="flex flex-col justify-center gap-4">
        {rightColumnLinks.map((link) => (
          <NavigationLinkItem key={link.label} label={link.label} href={link.href} />
        ))}
      </div>
    </nav>
  );
};

export default FooterNavigation;
