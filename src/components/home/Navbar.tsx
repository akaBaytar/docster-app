import Link from 'next/link';
import Image from 'next/image';

import { UserButton, OrganizationSwitcher } from '@clerk/nextjs';

import SearchInput from './SearchInput';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between h-full w-full'>
      <div className='flex gap-3 items-center shrink-0 pe-6'>
        <Link
          href='/'
          className='flex items-center gap-1 bg-amber-500 rounded-full px-2 shadow'>
          <Image
            src='/logo.png'
            alt='Homepage - Docster Logo'
            width={36}
            height={36}
          />
          <h1 className='font-medium text-white hidden md:block'>Docster</h1>
        </Link>
      </div>
      <SearchInput />
      <div className='flex items-center gap-2 ms-6'>
        <OrganizationSwitcher
          afterSelectPersonalUrl='/'
          afterLeaveOrganizationUrl='/'
          afterCreateOrganizationUrl='/'
          afterSelectOrganizationUrl='/'
        />
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
