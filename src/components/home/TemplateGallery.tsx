'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/ui/carousel';

import { cn } from '@/utils';

import { templates } from '@/constants';

const TemplateGallery = () => {
  const isCreating = false;

  return (
    <div className='bg-[#f1f3f4]'>
      <div className='max-w-screen-lg mx-auto px-16 py-6 flex flex-col gap-4'>
        <h3 className='text-lg'>Start a new document</h3>
        <Carousel>
          <CarouselPrevious className='absolute grid h-8 w-8 rounded-full -left-12 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-neutral-200' />
          <CarouselContent className='-ms-4'>
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className='basis-1/2 ps-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6'>
                <div
                  className={cn(
                    'aspect-[3/4] flex flex-col gap-2.5',
                    isCreating && 'pointer-events-none opacity-50'
                  )}>
                  <button
                    disabled={isCreating}
                    onClick={() => {}}
                    className='flex flex-col items-center justify-center gap-4 size-full rounded bg-white border hover:border-amber-500 hover:bg-amber-50 transition'
                    style={{
                      backgroundImage: `url(${template.imgUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                  <p className='text-xs text-center font-light truncate'>
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className='absolute grid h-8 w-8 rounded-full -right-12 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-neutral-200' />
        </Carousel>
      </div>
    </div>
  );
};

export default TemplateGallery;
