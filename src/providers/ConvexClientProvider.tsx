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
          <div className='flex items-center justify-center min-h-screen bg-amber-500'>
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
