'use client';

import StarterKit from '@tiptap/starter-kit';

import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';

import FontSize from '@/extensions/fontSize';
import LineHeight from '@/extensions/lineHeight';

import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';

import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';

import Threads from './Threads';
import Ruler from '@/components/documents/Ruler';

import { useEditor, EditorContent } from '@tiptap/react';
import { useEditorStore } from '@/store/useEditorStore';

import { useStorage } from '@liveblocks/react';
import { useLiveblocksExtension } from '@liveblocks/react-tiptap';

const Editor = () => {
  const { setEditor } = useEditorStore();

  const liveblocks = useLiveblocksExtension();

  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      FontFamily,
      FontSize,
      LineHeight.configure({ types: ['heading', 'paragraph'] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Image,
      ImageResize,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      Color,
      Highlight.configure({ multicolor: true }),
      liveblocks,
    ],

    editorProps: {
      attributes: {
        style: `padding-inline-start: ${leftMargin ?? 56}px; padding-inline-end: ${rightMargin ?? 56}px;`,
        class:
          'flex flex-col bg-white py-10 pe-14 cursor-text min-h-[1054px] w-[816px] border border-[#C7C7C7] rounded focus:outline-none print:border-0',
      },
    },

    onCreate({ editor }) {
      setEditor(editor);
    },

    onUpdate({ editor }) {
      setEditor(editor);
    },

    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },

    onTransaction({ editor }) {
      setEditor(editor);
    },

    onFocus({ editor }) {
      setEditor(editor);
    },

    onBlur({ editor }) {
      setEditor(editor);
    },

    onContentError({ editor }) {
      setEditor(editor);
    },

    onDestroy() {
      setEditor(null);
    },

    immediatelyRender: false,
  });

  return (
    <div className='size-full overflow-x-auto px-4 bg-[#F9FBFD] print:p-0 print:bg-white print:overflow-visible'>
      <Ruler />
      <div className='min-w-max flex justify-center py-4 mx-auto w-[816px] print:p-0 print:w-full print:min-w-0'>
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
