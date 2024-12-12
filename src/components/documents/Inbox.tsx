'use client';

import { BellIcon } from 'lucide-react';
import { ClientSideSuspense } from '@liveblocks/react';
import { useInboxNotifications } from '@liveblocks/react/suspense';
import { InboxNotification, InboxNotificationList } from '@liveblocks/react-ui';

import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size='icon'
            variant='ghost'
            className='relative bg-neutral-100 w-6 h-6 flex items-center justify-center rounded-sm hover:bg-neutral-200'>
            <BellIcon className='size-4' />
            {inboxNotifications.length > 0 && (
              <span className='absolute -top-1 -right-1 flex items-center justify-center size-4 text-xs text-white bg-amber-500 rounded-full'>
                {inboxNotifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-auto p-0'>
          {inboxNotifications.length > 0 ? (
            <InboxNotificationList>
              {inboxNotifications.map((notification) => (
                <InboxNotification
                  key={notification.id}
                  inboxNotification={notification}
                />
              ))}
            </InboxNotificationList>
          ) : (
            <p className='flex items-center justify-center p-2 w-[445.33px] h-[68px] bg-[#f9fbff] text-muted-foreground text-[0.8rem]'>
              No notifications.
            </p>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation='vertical' className='h-6 bg-neutral-200' />
    </>
  );
};

const Inbox = () => {
  return (
    <ClientSideSuspense
      fallback={
        <>
          <Button
            disabled
            size='icon'
            variant='ghost'
            className='relative bg-neutral-100 w-6 h-6 flex items-center justify-center rounded-sm hover:bg-neutral-200'>
            <BellIcon className='size-4' />
          </Button>
          <Separator orientation='vertical' className='h-6 bg-neutral-200' />
        </>
      }>
      <InboxMenu />
    </ClientSideSuspense>
  );
};

export default Inbox;
