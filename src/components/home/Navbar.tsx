import Link from 'next/link';
import Image from 'next/image';

import { UserButton } from '@clerk/nextjs';

import SearchInput from './SearchInput';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between h-full w-full'>
      <div className='flex gap-3 items-center shrink-0 pe-6'>
        <Link
          href='/'
          className='flex items-center gap-1 bg-amber-500 rounded-full px-2'>
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
      <div className='ms-6 flex items-center justify-center rounded-full w-[36px] h-[36px] bg-amber-500'>
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
