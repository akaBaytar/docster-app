'use client';

import { useParams } from 'next/navigation';

import {
  RoomProvider,
  LiveblocksProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';

const Room = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();

  return (
    <LiveblocksProvider
      publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLISHABLE_KEY!}>
      <RoomProvider id={params.id as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default Room;
