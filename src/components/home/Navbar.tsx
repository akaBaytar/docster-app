import Link from 'next/link';
import Image from 'next/image';

import { User2Icon } from 'lucide-react';

import SearchInput from './SearchInput';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between h-full w-full'>
      <div className='flex gap-3 items-center shrink-0 pe-6'>
        <Link href='/' className='flex items-center gap-1 bg-amber-500 rounded-full px-2'>
          <Image
            src='/logo.png'
            alt='Homepage - Docster Logo'
            width={36}
            height={36}
          />
          <h1 className='font-medium text-white'>Docster</h1>
        </Link>
      </div>
      <SearchInput />
      <User2Icon className='rounded-full bg-amber-500 p-1.5 ms-6 h-[36px] w-[36px]' />
    </nav>
  );
};

export default Navbar;
