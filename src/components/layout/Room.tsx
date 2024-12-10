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
    <LiveblocksProvider authEndpoint='/api/auth' throttle={16}>
      <RoomProvider id={params.id as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default Room;
