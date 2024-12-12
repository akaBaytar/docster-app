import { useRef, useState } from 'react';

import { toast } from 'sonner';
import { useStatus } from '@liveblocks/react';
import { BsCloud, BsCloudCheck, BsCloudSlash } from 'react-icons/bs';

import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

import { useDebounce } from '@/hooks/use-debounce';

import type { Id } from '../../../convex/_generated/dataModel';

type DocumentProps = {
  title: string;
  id: Id<'documents'>;
};

const DocumentInput = ({ title, id }: DocumentProps) => {
  const [value, setValue] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const status = useStatus();
  
  const input = useRef<HTMLInputElement>(null);
  
  const mutate = useMutation(api.documents.update);
  
  const isError = status === 'disconnected';
  const isLoading = isPending || status === 'connecting' || status === 'reconnecting';
  
  const debounced = useDebounce((newValue: string) => {
    if (newValue === title) return;

    setIsPending(true);

    mutate({ id, title: newValue })
      .then(() => toast.success('Document title updated successfully.'))
      .catch(() => toast.error('An error occurred.'))
      .finally(() => setIsPending(false));
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setValue(newValue);

    debounced(newValue);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);

    mutate({ id, title: value })
      .then(() => {
        toast.success('Document title updated successfully.');
        setIsEditing(false);
      })
      .catch(() => toast.error('An error occurred.'))
      .finally(() => setIsPending(false));
  };


  return (
    <div className='flex items-center gap-1'>
      {isEditing ? (
        <form onSubmit={onSubmit} className='relative w-fit max-w-[50ch]'>
          <span className='invisible whitespace-pre px-1.5'>
            {value || ' '}
          </span>
          <input
            type='text'
            ref={input}
            value={value}
            onChange={onChange}
            onBlur={() => setIsEditing(false)}
            className='absolute inset-0 text-black px-1.5 bg-transparent truncate'
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => input.current?.focus(), 0);
          }}
          className='font-medium px-1.5 truncate cursor-pointer'>
          {title}
        </span>
      )}
      {isLoading && <BsCloud className='animate-pulse size-4' />}
      {!isError && !isLoading && <BsCloudCheck className='size-4' />}
      {isError && <BsCloudSlash className='size-4 text-muted-foreground' />}
    </div>
  );
};

export default DocumentInput;
