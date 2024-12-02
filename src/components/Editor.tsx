'use client';

import StarterKit from '@tiptap/starter-kit';

import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';

import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

import { useEditor, EditorContent } from '@tiptap/react';

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({ nested: true }),
      Image,
      ImageResize,
      Table,
      TableCell,
      TableHeader,
      TableRow,
    ],

    editorProps: {
      attributes: {
        style: 'padding-inline-start: 56px; padding-inline-end: 56px;',
        class:
          'flex flex-col bg-white py-10 pe-14 cursor-text min-h-[1054px] w-[816px] border border-[#C7C7C7] rounded focus:outline-none print:border-0',
      },
    },

    immediatelyRender: false,
  });

  return (
    <div className='size-full overflow-x-auto px-4 bg-[#F9FBFD] print:p-0 print:bg-white print:overflow-visible'>
      <div className='min-w-max flex justify-center py-4 mx-auto w-[816px] print:p-0 print:w-full print:min-w-0'>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
