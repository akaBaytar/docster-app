'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { BsFilePdf } from 'react-icons/bs';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useEditorStore } from '@/store/useEditorStore';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';

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

import Inbox from './Inbox';
import Avatars from './Avatars';
import RemoveDialog from '../layout/RemoveDialog';
import RenameDialog from '../layout/RenameDialog';

import DocumentInput from '@/components/documents/DocumentInput';

import type { Doc } from '../../../convex/_generated/dataModel';

const Navbar = ({ data }: { data: Doc<'documents'> }) => {
  const router = useRouter();

  const { editor } = useEditorStore();

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveAsJSON = () => {
    if (!editor) return;

    const content = editor.getJSON();

    const blob = new Blob([JSON.stringify(content)], {
      type: 'application/json',
    });

    onDownload(blob, `${data.title}.json`);
  };

  const onSaveAsHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();

    const blob = new Blob([content], {
      type: 'text/html',
    });

    onDownload(blob, `${data.title}.html`);
  };

  const onSaveAsText = () => {
    if (!editor) return;

    const content = editor.getText();

    const blob = new Blob([content], {
      type: 'text/plain',
    });

    onDownload(blob, `${data.title}.txt`);
  };

  const mutation = useMutation(api.documents.create);

  const onNewDocument = () => {
    mutation({ title: 'Untitled', initialContent: '' })
      .then((id) => {
        toast.success('Document created successfully.');
        router.push(`/documents/${id}`);
      })
      .catch(() => toast.error('An error occurred.'));
  };

  return (
    <nav className='flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <Link href='/'>
          <div className='w-9 h-9'>
            <Image src='/logo.png' alt='Logo' width={36} height={36} />
          </div>
        </Link>
        <div className='flex flex-col'>
          <DocumentInput id={data._id} title={data.title} />
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
                      <MenubarItem
                        onClick={onSaveAsJSON}
                        className='hover:bg-neutral-100 py-1'>
                        <FileJsonIcon className='size-4 me-2' />
                        JSON
                      </MenubarItem>
                      <MenubarItem
                        onClick={onSaveAsHTML}
                        className='hover:bg-neutral-100 py-1'>
                        <GlobeIcon className='size-4 me-2' />
                        HTML
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => window.print()}
                        className='hover:bg-neutral-100 py-1'>
                        <BsFilePdf className='size-4 me-2' />
                        PDF
                      </MenubarItem>
                      <MenubarItem
                        onClick={onSaveAsText}
                        className='hover:bg-neutral-100 py-1'>
                        <FileTextIcon className='size-4 me-2' />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={onNewDocument}
                    className='rounded hover:bg-neutral-100 py-1'>
                    <FilePlusIcon className='size-4 me-2' />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator className='border-b border-neutral-100 my-1 h-0' />
                  <RenameDialog id={data._id} initialTitle={data.title}>
                    <MenubarItem
                      onSelect={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                      className='rounded hover:bg-neutral-100 py-1'>
                      <FilePenIcon className='size-4 me-2' />
                      Rename
                    </MenubarItem>
                  </RenameDialog>
                  <RemoveDialog id={data._id}>
                    <MenubarItem
                      onSelect={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                      className='rounded hover:bg-neutral-100 py-1'>
                      <TrashIcon className='size-4 me-2' />
                      Remove
                    </MenubarItem>
                  </RemoveDialog>
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
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                    className='rounded hover:bg-neutral-100 py-1 min-w-44'>
                    <Undo2Icon className='size-4 me-2' />
                    Undo
                    <MenubarShortcut className='ms-auto text-xs tracking-widest text-muted-foreground'>
                      ⌘Z
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                    className='rounded hover:bg-neutral-100 py-1 min-w-44'>
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
                      <MenubarItem
                        onClick={() => insertTable({ cols: 2, rows: 2 })}
                        className='hover:bg-neutral-100 py-1'>
                        <Grid2X2Icon className='size-4 me-2' />2 x 2
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ cols: 3, rows: 3 })}
                        className='hover:bg-neutral-100 py-1'>
                        <Grid2X2Icon className='size-4 me-2' />3 x 3
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ cols: 4, rows: 4 })}
                        className='hover:bg-neutral-100 py-1'>
                        <Grid2X2Icon className='size-4 me-2' />4 x 4
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ cols: 5, rows: 5 })}
                        className='hover:bg-neutral-100 py-1'>
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
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                        className='hover:bg-neutral-100 py-1 min-w-44'>
                        <BoldIcon className='size-4 me-2' />
                        Bold
                        <MenubarShortcut className='ms-auto text-xs tracking-widest text-muted-foreground'>
                          ⌘B
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                        className='hover:bg-neutral-100 py-1'>
                        <ItalicIcon className='size-4 me-2' />
                        Italic
                        <MenubarShortcut className='ms-auto text-xs tracking-widest text-muted-foreground'>
                          ⌘ I
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                        className='hover:bg-neutral-100 py-1'>
                        <UnderlineIcon className='size-4 me-2' />
                        Underline
                        <MenubarShortcut className='ms-auto text-xs tracking-widest text-muted-foreground'>
                          ⌘U
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                        className='hover:bg-neutral-100 py-1'>
                        <StrikethroughIcon className='size-4 me-2' />
                        Strikethrough
                        <MenubarShortcut className='ms-auto text-xs tracking-widest text-muted-foreground'>
                          ⌘S
                        </MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                    className='hover:bg-neutral-100 py-1'>
                    <RemoveFormattingIcon className='size-4 me-2' />
                    Remove Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-2 ms-6'>
        <Avatars />
        <Inbox />
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
