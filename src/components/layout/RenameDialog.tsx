'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';

import { Input } from '@/ui/input';
import { Button } from '@/ui/button';

import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

import type { Id } from '../../../convex/_generated/dataModel';

type DialogProps = {
  id: Id<'documents'>;
  initialTitle: string;
  children: React.ReactNode;
};

const RenameDialog = ({ id, initialTitle, children }: DialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateDocument = useMutation(api.documents.update);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsUpdating(true);

    updateDocument({ id, title: title.trim() || 'Untitled' })
      .then(() => toast.success('Document updated successfully.'))
      .catch(() => toast.error('An error occurred.'))
      .finally(() => {
        setIsUpdating(false);

        setOpen(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()} className='bg-white'>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className='text-start font-medium'>
              Rename Document
            </DialogTitle>
            <DialogDescription className='text-start text-xs'>
              Enter a new name for your document.
            </DialogDescription>
          </DialogHeader>
          <div className='my-4'>
            <Input
              className='px-2 rounded-sm'
              value={title}
              placeholder='Document Name'
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <DialogFooter className='flex justify-end gap-2'>
            <Button
              type='button'
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              className='bg-black text-white rounded-sm'>
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isUpdating}
              onClick={(e) => e.stopPropagation()}
              className='bg-black text-white rounded-sm'>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
