'use client';

import Link from 'next/link';

import { AlertTriangleIcon } from 'lucide-react';

import { Button } from '@/ui/button';

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-6'>
      <div className='text-center my-4'>
        <div className='flex justify-center'>
          <div className='bg-rose-100 p-4 rounded-full'>
            <AlertTriangleIcon className='size-10 text-rose-500' />
          </div>
        </div>
        <div className='my-2'>
          <h1 className='text-xl font-semibold text-gray-900'>
            An error occurred.
          </h1>
          <p className='text-xs my-2'>{error.message}</p>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Button onClick={reset} className='font-medium px-6 bg-black text-white rounded-sm'>
          Try Again
        </Button>
        <Button asChild variant='ghost' className='font-medium px-6 bg-neutral-100 flex rounded-sm'>
          <Link href='/'>Go Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
