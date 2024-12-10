'use client';

import Image from 'next/image';

import { ClientSideSuspense } from '@liveblocks/react';
import { useOthers, useSelf } from '@liveblocks/react/suspense';

import { Separator } from '@/ui/separator';
import { AVATAR_SIZE } from '@/constants';

const Avatar = ({ name, src }: { src: string; name: string }) => {
  return (
    <div
      style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
      className='relative flex place-content-center shrink-0 group -ms-2 border-2 border-white rounded-full bg-neutral-400'>
      <div className='opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white text-xs rounded-sm mt-2.5 z-10 bg-gray-950 whitespace-nowrap transition-opacity'>
        {name}
      </div>
      <Image
        src={src}
        alt={name}
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
        className='size-full rounded-full'
      />
    </div>
  );
};

const AvatarStack = () => {
  const users = useOthers();
  const currentUser = useSelf();

  if (users.length === 0) return null;

  return (
    <>
      <div className='flex items-center'>
        {currentUser && (
          <div className='relative ms-2'>
            <Avatar src={currentUser.info.avatar} name='You' />
          </div>
        )}
        <div className='flex '>
          {users.map(({ connectionId, info }) => (
            <Avatar key={connectionId} src={info.avatar} name={info.name} />
          ))}
        </div>
      </div>
      <Separator orientation='vertical' className='h-6 bg-neutral-200' />
    </>
  );
};

const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
};

export default Avatars;
