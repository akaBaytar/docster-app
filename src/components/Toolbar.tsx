'use client';

import {
  BoldIcon,
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

import { cn } from '@/utils';
import { Separator } from '@/ui/separator';
import { useEditorStore } from '@/store/useEditorStore';

import type { LucideIcon } from 'lucide-react';

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
    <div className='flex items-center gap-0.5 px-2.5 py-0.5 overflow-x-auto min-h-[40px] rounded-[24px] bg-[#f1f4f9] print:hidden'>
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
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
