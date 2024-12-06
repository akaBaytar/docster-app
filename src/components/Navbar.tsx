'use client';

import Image from 'next/image';
import Link from 'next/link';

import { BsFilePdf } from 'react-icons/bs';
import {
  FileIcon,
  GlobeIcon,
  FileJsonIcon,
  FilePlusIcon,
  FileTextIcon,
  FilePenIcon,
  TrashIcon,
  PrinterIcon,
  ChevronRight,
  Undo2Icon,
  Redo2Icon,
  GridIcon,
  Grid2X2Icon,
  TextIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  RemoveFormattingIcon,
} from 'lucide-react';

import {
  Menubar,
  MenubarSub,
  MenubarItem,
  MenubarMenu,
  MenubarContent,
  MenubarTrigger,
  MenubarShortcut,
  MenubarSeparator,
  MenubarSubContent,
  MenubarSubTrigger,
} from '@/ui/menubar';

import DocumentInput from './DocumentInput';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <Link href='/'>
          <Image src='/logo.png' alt='Logo' width={36} height={36} />
        </Link>
        <div className='flex flex-col'>
          <DocumentInput />
          <div className='flex'>
            <Menubar className='border-none bg-transparent shadow-none h-auto p-0'>
              <MenubarMenu>
                <MenubarTrigger className='h-auto text-sm font-normal py-0.5 px-[7px] rounded hover:bg-muted'>
                  File
                </MenubarTrigger>
                <MenubarContent
                  align='start'
                  alignOffset={5}
                  className='rounded bg-white cursor-pointer print:hidden'>
                  <MenubarSub>
                    <MenubarSubTrigger className='rounded hover:bg-neutral-100 py-1 min-w-44'>
                      <span className='flex items-center gap-2'>
                        <FileIcon className='size-4' />
                        Save as
                      </span>
                      <ChevronRight className='size-4 ms-auto' />
                    </MenubarSubTrigger>
                    <MenubarSubContent
                      className='bg-white rounded'
                      alignOffset={-5}>
                      <MenubarItem className='hover:bg-neutral-100 py-1'>
                        <FileJsonIcon className='size-4 me-2' />
                        JSON
                      </MenubarItem>
                      <MenubarItem className='hover:bg-neutral-100 py-1'>
                        <GlobeIcon className='size-4 me-2' />
                        HTML
                      </MenubarItem>
                      <MenubarItem className='hover:bg-neutral-100 py-1'>
                        <BsFilePdf className='size-4 me-2' />
                        PDF
                      </MenubarItem>
                      <MenubarItem className='hover:bg-neutral-100 py-1'>
                        <FileTextIcon className='size-4 me-2' />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem className='rounded hover:bg-neutral-100 py-1'>
                    <FilePlusIcon className='size-4 me-2' />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator className='border-b border-neutral-100 my-1 h-0' />
                  <MenubarItem className='rounded hover:bg-neutral-100 py-1'>
                    <FilePenIcon className='size-4 me-2' />
                    Rename
                  </MenubarItem>
                  <MenubarItem className='rounded hover:bg-neutral-100 py-1'>
                    <TrashIcon className='size-4 me-2' />
                    Remove
                  </MenubarItem>
                  <MenubarSeparator className='border-b border-neutral-100 my-1 h-0' />
                  <MenubarItem
                    onClick={() => window.print()}
                    className='rounded hover:bg-neutral-100 py-1'>
                    <PrinterIcon className='size-4 me-2' />
                    Print
                    <MenubarShortcut className='ms-auto text-xs tracking-widest text-muted-foreground'>
                      ⌘P
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='h-auto text-sm font-normal py-0.5 px-[7px] rounded hover:bg-muted'>
                  Edit
                </MenubarTrigger>
                <MenubarContent
                  align='start'
                  alignOffset={5}
                  className='rounded bg-white cursor-pointer'>
                  <MenubarItem className='rounded hover:bg-neutral-100 py-1 min-w-44'>
                    <Undo2Icon className='size-4 me-2' />
                    Undo
                    <MenubarShortcut className='ms-auto text-xs tracking-widest text-muted-foreground'>
                      ⌘Z
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem className='rounded hover:bg-neutral-100 py-1 min-w-44'>
                    <Redo2Icon className='size-4 me-2' />
                    Redo
                    <MenubarShortcut className='ms-auto text-xs tracking-widest text-muted-foreground'>
                      ⌘Y
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='h-auto text-sm font-normal py-0.5 px-[7px] rounded hover:bg-muted'>
                  Insert
                </MenubarTrigger>
                <MenubarContent
                  align='start'
                  alignOffset={5}
                  className='rounded bg-white cursor-pointer'>
                  <MenubarSub>
                    <MenubarSubTrigger className='rounded hover:bg-neutral-100 py-1 min-w-44'>
                      <span className='flex items-center gap-2'>
                        <GridIcon className='size-4' />
                        Table
                      </span>
                      <ChevronRight className='size-4 ms-auto' />
                    </MenubarSubTrigger>
                    <MenubarSubContent
                      className='bg-white rounded'
                      alignOffset={-5}>
                      <MenubarItem className='hover:bg-neutral-100 py-1'>
                        <Grid2X2Icon className='size-4 me-2' />2 x 2
                      </MenubarItem>
                      <MenubarItem className='hover:bg-neutral-100 py-1'>
                        <Grid2X2Icon className='size-4 me-2' />3 x 3
                      </MenubarItem>
                      <MenubarItem className='hover:bg-neutral-100 py-1'>
                        <Grid2X2Icon className='size-4 me-2' />4 x 4
                      </MenubarItem>
                      <MenubarItem className='hover:bg-neutral-100 py-1'>
                        <Grid2X2Icon className='size-4 me-2' />5 x 5
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='h-auto text-sm font-normal py-0.5 px-[7px] rounded hover:bg-muted'>
                  Format
                </MenubarTrigger>
                <MenubarContent
                  align='start'
                  alignOffset={5}
                  className='rounded bg-white cursor-pointer'>
                  <MenubarSub>
                    <MenubarSubTrigger className='rounded hover:bg-neutral-100 py-1 min-w-44'>
                      <span className='flex items-center gap-2'>
                        <TextIcon className='size-4' />
                        Text
                      </span>
                      <ChevronRight className='size-4 ms-auto' />
                    </MenubarSubTrigger>
                    <MenubarSubContent
                      className='bg-white rounded'
                      alignOffset={-5}>
                      <MenubarItem className='hover:bg-neutral-100 py-1 min-w-44'>
                        <BoldIcon className='size-4 me-2' />
                        Bold
                        <MenubarShortcut className='ms-auto text-xs tracking-widest text-muted-foreground'>
                          ⌘B
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem className='hover:bg-neutral-100 py-1'>
                        <ItalicIcon className='size-4 me-2' />
                        Italic
                        <MenubarShortcut className='ms-auto text-xs tracking-widest text-muted-foreground'>
                          ⌘ I
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem className='hover:bg-neutral-100 py-1'>
                        <UnderlineIcon className='size-4 me-2' />
                        Underline
                        <MenubarShortcut className='ms-auto text-xs tracking-widest text-muted-foreground'>
                          ⌘U
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem className='hover:bg-neutral-100 py-1'>
                        <StrikethroughIcon className='size-4 me-2' />
                        Strikethrough
                        <MenubarShortcut className='ms-auto text-xs tracking-widest text-muted-foreground'>
                          ⌘S
                        </MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem className='hover:bg-neutral-100 py-1'>
                    <RemoveFormattingIcon className='size-4 me-2' />
                    Remove Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
