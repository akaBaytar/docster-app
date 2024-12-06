'use client';

import React, { useState } from 'react';

import {
  PlusIcon,
  ListIcon,
  BoldIcon,
  MinusIcon,
  ImageIcon,
  Link2Icon,
  Undo2Icon,
  Redo2Icon,
  UploadIcon,
  SearchIcon,
  ItalicIcon,
  PaletteIcon,
  PrinterIcon,
  ListTodoIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignRightIcon,
  SpellCheckIcon,
  HighlighterIcon,
  ListOrderedIcon,
  AlignCenterIcon,
  ChevronDownIcon,
  AlignJustifyIcon,
  RemoveFormattingIcon,
  MessageSquarePlusIcon,
  AlignVerticalSpaceAroundIcon,
} from 'lucide-react';

import { CompactPicker } from 'react-color';

import { Input } from '@/ui/input';
import { Button } from '@/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/ui/dialog';

import { cn } from '@/utils';
import { Separator } from '@/ui/separator';
import { useEditorStore } from '@/store/useEditorStore';

import type { LucideIcon } from 'lucide-react';
import type { ColorResult } from 'react-color';
import type { Level } from '@tiptap/extension-heading';

type ButtonProps = {
  label?: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
};

const ToolbarButton = ({
  label,
  icon: Icon,
  isActive,
  onClick,
}: ButtonProps) => {
  return (
    <button
      title={label}
      onClick={onClick}
      className={cn(
        'flex items-center justify-center rounded-sm text-sm h-7 min-w-7 hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}>
      <Icon className='size-4' />
    </button>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Verdana', value: 'Verdana' },
    { label: 'Tahoma', value: 'Tahoma' },
    { label: 'Trebuchet MS', value: 'Trebuchet MS' },
    { label: 'Calibri', value: 'Calibri' },
    { label: 'Comic Sans MS', value: 'Comic Sans MS' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Garamond', value: 'Garamond' },
    { label: 'Palatino', value: 'Palatino' },
    { label: 'Impact', value: 'Impact' },
    { label: 'Brush Script MT', value: 'Brush Script MT' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 w-[120px] shrink-0 px-1.5 text-sm overflow-hidden flex items-center justify-between rounded hover:bg-neutral-200/80'>
          <span className='truncate'>
            {editor?.getAttributes('textStyle').fontFamily || 'Arial'}
          </span>
          <ChevronDownIcon className='ms-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-1 bg-[#f1f4f9] w-[128px] rounded'>
        {fonts.map((font) => (
          <button
            key={font.value}
            onClick={() =>
              editor?.chain().focus().setFontFamily(font.value).run()
            }
            style={{ fontFamily: font.value }}
            className={cn(
              'flex items-center gap-2 px-2 py-1 rounded hover:bg-neutral-200/80',
              editor?.getAttributes('textStyle').fontFamily === font.value &&
                'bg-neutral-200/80'
            )}>
            <span className='text-xs'>{font.label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: 'Heading 1', value: 1, fontSize: '32px' },
    { label: 'Heading 2', value: 2, fontSize: '24px' },
    { label: 'Heading 3', value: 3, fontSize: '20px' },
    { label: 'Heading 4', value: 4, fontSize: '18px' },
    { label: 'Heading 5', value: 5, fontSize: '16px' },
    { label: 'Heading 6', value: 6, fontSize: '14px' },
    { label: 'Normal text', value: 0, fontSize: '16px' },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level < 5; level++) {
      if (editor?.isActive('heading', { level })) {
        return `Heading ${level}`;
      }

      return 'Normal text';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 w-[181px] shrink-0 px-1.5 text-sm overflow-hidden flex items-center justify-between rounded hover:bg-neutral-200/80'>
          <span className='truncate'>{getCurrentHeading()}</span>
          <ChevronDownIcon className='ms-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-1 w-[181px] bg-[#f1f4f9] rounded'>
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            style={{ fontSize }}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
            className={cn(
              'flex items-center gap-2 px-2 py-1 rounded hover:bg-neutral-200/80',
              ((value === 0 && !editor?.isActive('heading')) ||
                editor?.isActive('heading', { level: value })) &&
                'bg-neutral-200/80'
            )}>
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes('textStyle').color || '#000000';

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild title='Text Color'>
        <button className='h-7 w-7 shrink-0 px-1.5 text-sm overflow-hidden flex flex-col items-center justify-center gap-0.5 rounded hover:bg-neutral-200/80'>
          <PaletteIcon className='size-4 shrink-0' />
          <div className='h-0.5 w-full' style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5 bg-[#f1f4f9] rounded'>
        <CompactPicker
          color={value}
          onChange={onChange}
          className='rounded bg-[#f1f4f9]'
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes('highlight').color || '#ffffff';

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild title='Highlight Color'>
        <button className='h-7 w-7 shrink-0 px-1.5 text-sm overflow-hidden flex flex-col items-center justify-center gap-0.5 rounded hover:bg-neutral-200/80'>
          <HighlighterIcon className='size-4 shrink-0' />
          <div className='h-0.5 w-full' style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5 bg-[#f1f4f9] rounded'>
        <CompactPicker
          color={value}
          onChange={onChange}
          className='rounded bg-[#f1f4f9]'
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();

  const [link, setLink] = useState(editor?.getAttributes('link').href || '');

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();

    setLink('');
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setLink(editor?.getAttributes('link').href || '');
        }
      }}>
      <DropdownMenuTrigger asChild title='Add Link'>
        <button className='h-7 w-7 shrink-0 px-1.5 text-sm overflow-hidden flex flex-col items-center justify-center gap-0.5 rounded hover:bg-neutral-200/80'>
          <Link2Icon className='size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5 flex items-center gap-2 bg-[#f1f4f9] rounded'>
        <Input
          placeholder='https://www.example.com'
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className='text-sm px-2 py-1 rounded'
        />
        <Button
          size='icon'
          variant='outline'
          onClick={() => onChange(link)}
          className='py-1 px-2 text-sm rounded bg-white'>
          Apply
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();

  const [url, setUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement('input');

    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file) {
        const url = URL.createObjectURL(file);

        onChange(url);
      }
    };

    input.click();
  };

  const onURLSubmit = () => {
    if (url) {
      onChange(url);
      setUrl('');
      setIsOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild title='Add Image'>
          <button className='h-7 w-7 shrink-0 px-1.5 text-sm overflow-hidden flex flex-col items-center justify-center gap-0.5 rounded hover:bg-neutral-200/80'>
            <ImageIcon className='size-4 shrink-0' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='p-2.5 flex flex-col items-center gap-2 bg-[#f1f4f9] rounded'>
          <DropdownMenuItem
            onClick={onUpload}
            className='cursor-pointer w-full'>
            <UploadIcon className='size-4' />
            <span className='text-sm'>Upload</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            className='cursor-pointer w-full'>
            <SearchIcon className='size-4' />
            <span className='text-sm'>Image URL</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-[#f1f4f9] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg'>
          <DialogHeader>
            <DialogTitle>Image URL</DialogTitle>
            <DialogDescription className='text-xs opacity-50'>
              You can paste any image link into this field.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={url}
            placeholder='https://www.example.com'
            className='text-sm px-2 py-1 rounded'
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onURLSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button
              size='icon'
              variant='outline'
              onClick={onURLSubmit}
              className='py-1 px-2 text-sm rounded bg-white w-full'>
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    { label: 'Align Left', value: 'left', icon: AlignLeftIcon },
    { label: 'Align Center', value: 'center', icon: AlignCenterIcon },
    { label: 'Align Right', value: 'right', icon: AlignRightIcon },
    { label: 'Align Justify', value: 'justify', icon: AlignJustifyIcon },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild title='Text Alignment'>
        <button className='h-7 w-7 shrink-0 px-1.5 text-sm overflow-hidden flex flex-col items-center justify-center gap-0.5 rounded hover:bg-neutral-200/80'>
          <AlignLeftIcon className='size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-1 bg-[#f1f4f9] rounded'>
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded hover:bg-neutral-200/80',
              editor?.isActive({ textAlign: value }) && 'bg-neutral-200/80'
            )}>
            <Icon className='size-4' />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: 'Bullet List',
      icon: ListIcon,
      isActive: () => editor?.isActive('bulletList'),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: 'Ordered List',
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive('orderedList'),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild title='Add List'>
        <button className='h-7 w-7 shrink-0 px-1.5 text-sm overflow-hidden flex flex-col items-center justify-center gap-0.5 rounded hover:bg-neutral-200/80'>
          <ListIcon className='size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-1 bg-[#f1f4f9] rounded'>
        {lists.map(({ label, isActive, onClick, icon: Icon }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded hover:bg-neutral-200/80',
              isActive() && 'bg-neutral-200/80'
            )}>
            <Icon className='size-4' />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes('textStyle').fontSize
    ? editor?.getAttributes('textStyle').fontSize.replace('px', '')
    : '16';

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);

    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();

      setInputValue(newSize);
      setFontSize(newSize);
      setIsEditing(false);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onInputBlur = () => updateFontSize(inputValue);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      updateFontSize(inputValue);

      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;

    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;

    if (newSize > 0) updateFontSize(newSize.toString());
  };

  return (
    <div className='flex items-center gap-0.5'>
      <button
        title='Decrease Font Size'
        onClick={decrement}
        className='h-7 w-7 shrink-0 flex items-center justify-center rounded hover:bg-neutral-200/80'>
        <MinusIcon className='size-4' />
      </button>
      {isEditing ? (
        <input
          type='text'
          value={inputValue}
          onChange={onInputChange}
          onBlur={onInputBlur}
          onKeyDown={onKeyDown}
          className='h-7 w-8 text-sm text-center border border-neutral-300 rounded bg-transparent focus-visible:outline-none focus-visible:ring-0'
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className='h-7 w-8 text-sm text-center border border-neutral-300 rounded bg-transparent cursor-text'>
          {currentFontSize}
        </button>
      )}
      <button
        title='Increase Font Size'
        onClick={increment}
        className='h-7 w-7 shrink-0 flex items-center justify-center rounded hover:bg-neutral-200/80'>
        <PlusIcon className='size-4' />
      </button>
    </div>
  );
};

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineHeights = [
    { label: 'Normal', value: 'normal' },
    { label: '1.00', value: '1' },
    { label: '1.25', value: '1.25' },
    { label: '1.50', value: '1.5' },
    { label: '1.75', value: '1.75' },
    { label: '2.00', value: '2' },
    { label: '2.50', value: '2.5' },
    { label: '3.00', value: '3' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild title='Line Height'>
        <button className='h-7 w-7 shrink-0 px-1.5 text-sm overflow-hidden flex flex-col items-center justify-center gap-0.5 rounded hover:bg-neutral-200/80'>
          <AlignVerticalSpaceAroundIcon className='size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-1 bg-[#f1f4f9] rounded'>
        {lineHeights.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded hover:bg-neutral-200/80',
              editor?.getAttributes('paragraph').lineHeight === value &&
                'bg-neutral-200/80'
            )}>
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    isActive?: boolean;
    onClick: () => void;
  }[][] = [
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: 'Spell Check',
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute('spellcheck');

          editor?.view.dom.setAttribute(
            'spellcheck',
            current === 'false' ? 'true' : 'false'
          );
        },
      },
    ],
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        isActive: editor?.isActive('bold'),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        isActive: editor?.isActive('italic'),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        isActive: editor?.isActive('underline'),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: 'Comment',
        icon: MessageSquarePlusIcon,
        isActive: false,
        onClick: () => {},
      },
      {
        label: 'Task list',
        icon: ListTodoIcon,
        isActive: editor?.isActive('taskList'),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: 'Remove formatting',
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className='flex items-center gap-0.5 px-2.5 py-0.5 overflow-x-auto min-h-[40px] rounded-full bg-[#f1f4f9] print:hidden'>
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator
        orientation='vertical'
        className='h-6 w-[1px] bg-neutral-300'
      />
      <FontFamilyButton />
      <Separator
        orientation='vertical'
        className='h-6 w-[1px] bg-neutral-300'
      />
      <HeadingButton />
      <Separator
        orientation='vertical'
        className='h-6 w-[1px] bg-neutral-300'
      />
      <FontSizeButton />
      <Separator
        orientation='vertical'
        className='h-6 w-[1px] bg-neutral-300'
      />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator
        orientation='vertical'
        className='h-6 w-[1px] bg-neutral-300'
      />
      <TextColorButton />
      <HighlightButton />
      <Separator
        orientation='vertical'
        className='h-6 w-[1px] bg-neutral-300'
      />
      <LinkButton />
      <ImageButton />
      <Separator
        orientation='vertical'
        className='h-6 w-[1px] bg-neutral-300'
      />
      <AlignButton />
      <LineHeightButton />
      <ListButton />
      <Separator
        orientation='vertical'
        className='h-6 w-[1px] bg-neutral-300'
      />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
