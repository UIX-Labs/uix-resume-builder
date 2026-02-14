// src/widgets/landing-page/ui/faq-content.tsx
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import { ChevronDown } from 'lucide-react';

const items = [
  {
    id: '1',
    title: 'What makes PikaResume different?',
    content:
      'PikaResume focuses on creating resumes based on job descriptions and making the process easier for the user and we can also fill the info from linkedin',
  },
  {
    id: '2',
    title: 'What is the definition of resume?',
    content:
      'A resume is a document that summarizes your work experience, skills, and education. It is used to apply for jobs and can be used to showcase your qualifications to potential employers.',
  },
  {
    id: '3',
    title: 'How can I customize the components?',
    content: 'Use our CSS variables for global styling...',
  },
  {
    id: '4',
    title: 'How can I customize the components?',
    content: 'Use our CSS variables for global styling...',
  },
  {
    id: '5',
    title: 'How can I customize the components?',
    content: 'Use our CSS variables for global styling ',
  },
];

export default function FaqContent() {
  return (
    <div className="w-full mt-8 max-w-6xl mx-auto px-6">
      <Accordion type="single" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="border-b border-[#73808D] py-2">
            <AccordionTrigger
              className="group text-2xl font-medium text-[#171717] transition-colors hover:no-underline data-[state=open]:text-[#005FF2] 
  [&[data-state=open]>svg]:text-[#005FF2] 
  [&>svg]:h-8 [&>svg]:w-8 [&>svg]:transition-transform [&>svg]:duration-200"
            >
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-[#171717] text-lg pb-4 pr-20">{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
