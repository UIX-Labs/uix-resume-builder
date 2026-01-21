import { cn } from '@shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { Star } from 'lucide-react';
import React from 'react';
import { TESTIMONIALS } from '../constants';

export function FeedbackCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onSelect = React.useCallback((api: any) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const onInit = React.useCallback((api: any) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('reInit', onInit);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="w-full max-w-md flex flex-col gap-6">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="w-[300px] flex -ml-4">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="shrink-0 grow-0 basis-full pl-4">
              <div className="bg-white rounded-xl p-5 shadow-sm h-[170px] flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="size-10">
                    <AvatarImage src={testimonial.image} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">{testimonial.name[0]}</AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="font-semibold text-sm text-gray-900">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>

                <p className="text-[10px] text-gray-600 leading-relaxed mb-4">"{testimonial.quote}"</p>
                <div className="flex gap-0.5 justify-end">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="size-4 fill-blue-600 text-blue-600" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            type="button"
            key={index}
            className={cn(
              'size-2.5 rounded-full transition-all duration-300',
              index === selectedIndex ? 'bg-white w-8' : 'bg-white/30 hover:bg-white/50',
            )}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
