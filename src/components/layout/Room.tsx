'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import { toast } from 'sonner';

import {
  RoomProvider,
  LiveblocksProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';

import Loader from './Loader';

import { getUsers } from '@/actions';

import type { User } from '@/types';

const Room = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const usersList = await getUsers();

        setUsers(usersList);
      } catch {
        toast.error('An error occurred.');
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint='/api/auth'
      resolveUsers={({ userIds }) => {
        return userIds.map((userId) => users.find((user) => user.id === userId) ?? undefined);
      }}
      resolveRoomsInfo={() => []}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()));
        }

        return filteredUsers.map((user) => user.id);
      }}>
      <RoomProvider id={params.id as string}>
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default Room;
