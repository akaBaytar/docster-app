'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

import { cn } from '@/utils';
import { templates } from '@/constants';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/accordion';

const TemplateGallery = () => {
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();

  const create = useMutation(api.documents.create);

  const onClick = (title: string, initialContent: string) => {
    setIsCreating(true);

    create({ title, initialContent })
      .then((id) => router.push(`/documents/${id}`))
      .finally(() => setIsCreating(false));
  };

  return (
    <div className='bg-neutral-50'>
      <div className='max-w-screen-lg mx-auto px-16 pt-16 pb-6 flex flex-col gap-4'>
        <Accordion type='single' collapsible>
          <AccordionItem value='documents'>
            <AccordionTrigger >
              <h3 className='text-lg'>Start a new document</h3>
            </AccordionTrigger>
            <AccordionContent className='-ms-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
              {templates.map((template) => (
                <div
                  key={template.id}
                  className='basis-1/2 ps-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/6'>
                  <div
                    className={cn(
                      'aspect-[3/4] flex flex-col gap-1 mb-5 select-none',
                      isCreating && 'pointer-events-none opacity-50'
                    )}>
                    <button
                      disabled={isCreating}
                      onClick={() => onClick(template.label, '')}
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
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default TemplateGallery;
