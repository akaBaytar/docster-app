'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/ui/alert-dialog';

import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

import type { Id } from '../../../convex/_generated/dataModel';

type DialogProps = {
  id: Id<'documents'>;
  children: React.ReactNode;
};

const RemoveDialog = ({ id, children }: DialogProps) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const router = useRouter();

  const removeDocument = useMutation(api.documents.remove);

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRemoving(true);
    removeDocument({ id })
      .then(() => toast.success('Document removed successfully.'))
      .catch(() => toast.error('An error occurred.'))
      .finally(() => setIsRemoving(false));

    router.push('/');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent
        onClick={(e) => e.stopPropagation()}
        className='bg-white'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-start font-medium'>
            Are you sure you want delete document?
          </AlertDialogTitle>
          <AlertDialogDescription className='text-start text-xs'>
            This action cannot be undone. This will permanently delete your
            document.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex justify-end gap-2'>
          <AlertDialogCancel
            onClick={(e) => e.stopPropagation()}
            className='rounded-sm'>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isRemoving}
            onClick={onClick}
            className='bg-black rounded-sm text-white h-9 mt-2'>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveDialog;
