'use client';

import {
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  ListTodoIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

import { cn } from '@/utils';
import { Separator } from '@/ui/separator';
import { useEditorStore } from '@/store/useEditorStore';

import type { LucideIcon } from 'lucide-react';
import type { Level } from '@tiptap/extension-heading';

type ButtonProps = {
  isActive?: boolean;
  icon: LucideIcon;
  onClick?: () => void;
};

const ToolbarButton = ({ icon: Icon, isActive, onClick }: ButtonProps) => {
  return (
    <button
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
        <button className='h-7 w-[172px] shrink-0 px-1.5 text-sm overflow-hidden flex items-center justify-between rounded hover:bg-neutral-200/80'>
          <span className='truncate'>{getCurrentHeading()}</span>
          <ChevronDownIcon className='ms-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-1 w-[172px] bg-[#f1f4f9] rounded'>
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
    <div className='flex items-center gap-0.5 px-2.5 py-0.5 overflow-x-auto min-h-[40px] rounded bg-[#f1f4f9] print:hidden'>
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
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
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
