'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@shared/ui/accordion';
import { items } from './questions';

function FaqSection() {
  return (
    <div className="max-w-7xl mx-auto mb-10">
      <h1 className=" font-bold text-5xl pt-15 text-center">
        Frequenty Asked <span className=" text-[#005FF2]">Questions?</span>
      </h1>
      <div className="w-full mt-8 max-w-6xl mx-auto px-6 ">
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
              <AccordionContent className="text-[#171717] text-lg pb-4 md:pr-16 ">{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default FaqSection;
