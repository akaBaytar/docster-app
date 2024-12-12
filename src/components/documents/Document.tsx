'use client';

import Room from '@/components/layout/Room';

import Editor from '@/components/documents/Editor';
import Navbar from '@/components/documents/Navbar';
import Toolbar from '@/components/documents/Toolbar';

import { usePreloadedQuery, type Preloaded } from 'convex/react';
import type { api } from '../../../convex/_generated/api';

type DocumentProps = {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
};

const Document = ({ preloadedDocument }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);

  return (
    <Room>
      <div className='min-h-screen bg-[#FAFBFD]'>
        <div className='flex flex-col gap-2 px-4 pt-2 fixed top-0 left-0 right-0 z-20 bg-[#fafbfd] print:hidden'>
          <Navbar data={document} />
          <Toolbar />
        </div>
        <div className='pt-[120px] print:pt-0'>
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
  );
};

export default Document;
