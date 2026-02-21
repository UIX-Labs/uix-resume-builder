'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@shared/ui/accordion';
import { items } from './questions';
import { cn } from '@shared/lib/utils'; // Assuming you have a cn utility

function FaqSection() {
  return (
    <div className="w-full px-4 py-10 md:py-20">
      <div className={cn('max-w-6xl mx-auto rounded-[40px] ', 'px-2 py-8 md:px-0 md:py-0')}>
        <h2 className="font-bold text-3xl md:text-5xl text-center mb-8 md:mb-12 text-[#171717]">
          Frequently Asked <span className="text-[#005FF2]">Questions?</span>
        </h2>

        <div className="w-full">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-b border-[#73808D]/30 last:border-0">
                <AccordionTrigger
                  className={cn(
                    'group py-4 text-lg md:text-2xl font-medium text-[#171717] transition-all hover:no-underline text-left',
                    'data-[state=open]:text-[#005FF2] data-[state=open]:font-semibold',
                    '[&[data-state=open]>svg]:text-[#005FF2]',
                    '[&>svg]:h-6 [&>svg]:w-6 md:[&>svg]:h-8 md:[&>svg]:w-8',
                  )}
                >
                  {item.title}
                </AccordionTrigger>

                <AccordionContent className="text-[#171717] text-base md:text-lg pb-6 leading-relaxed md:pr-20">
                  <div className="flex flex-col gap-4">{item.content}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default FaqSection;
