/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRef, useState } from 'react';

import { SearchIcon, XIcon } from 'lucide-react';

import { Input } from '@/ui/input';
import { Button } from '@/ui/button';

import { useSearchParam } from '@/hooks/use-search-param';

const SearchInput = () => {
  const [value, setValue] = useState('');
  const [search, setSearch] = useSearchParam('search');

  const input = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    input.current?.blur();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClear = () => {
    setValue('');
    setSearch('');
    input.current?.blur();
  };

  return (
    <div className='flex flex-1 items-center justify-center'>
      <form onSubmit={onSubmit} className='relative w-full max-w-[720px]'>
        <Input
          ref={input}
          value={value}
          onChange={onChange}
          placeholder='Search...'
          className='px-10 w-full h-[36px] border-none rounded-full text-sm bg-[#f0f4f8] shadow md:text-base focus-visible:ring-0 focus:bg-white focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)]'
        />
        <Button
          type='submit'
          size='icon'
          variant='ghost'
          className='absolute left-1 top-1/2 p-2 transform -translate-y-1/2 rounded-full hover:bg-[#f0f4f8]'>
          <SearchIcon className='size-4'/>
        </Button>
        {value && (
          <Button
            type='button'
            size='icon'
            variant='destructive'
            onClick={onClear}
            className='absolute right-1 top-1/2 p-2 text-neutral-400 transform -translate-y-1/2 rounded-full hover:text-rose-500'>
            <XIcon className='size-4'/>
          </Button>
        )}
      </form>
    </div>
  );
};

export default SearchInput;
