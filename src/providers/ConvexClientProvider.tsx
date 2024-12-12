'use client';

import type { ReactNode } from 'react';

import { ClerkProvider, useAuth, SignIn } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';

import {
  AuthLoading,
  Authenticated,
  Unauthenticated,
  ConvexReactClient,
} from 'convex/react';
import Loader from '@/components/layout/Loader';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const ConvexClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className='flex flex-col gap-6 items-center justify-center min-h-screen bg-[#f9fbfd]'>
            <div
              style={{ padding: '1rem 2rem' }}
              className='text-center rounded-sm'>
              <h2 style={{ fontSize: '2rem', fontWeight: 500, lineHeight: 2 }}>
                Welcome to{' '}
                <span className='bg-amber-500 rounded-sm px-2 text-white'>
                  Docster
                </span>
              </h2>
              <p className='text-neutral-500'>
                Please log in to create a new document or collaboratively edit
                your existing documents.
              </p>
            </div>
            <SignIn />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <Loader />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexClientProvider;
