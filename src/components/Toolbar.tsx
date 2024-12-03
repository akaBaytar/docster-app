'use client';

import { Undo2Icon } from 'lucide-react';

import { cn } from '@/utils';
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
    ],
  ];

  return (
    <div className='flex items-center gap-0.5 px-2.5 py-0.5 overflow-x-auto min-h-[40px] rounded-[24px] bg-[#f1f4f9]'>
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
