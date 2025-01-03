'use client';

import { usePaginatedQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

import Navbar from '@/components/home/Navbar';
import DocumentsTable from '@/components/home/DocumentsTable';
import TemplateGallery from '@/components/home/TemplateGallery';

import { useSearchParam } from '@/hooks/use-search-param';

const DocumentsPage = () => {
  const [search] = useSearchParam('search');

  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 6 }
  );

  return (
    <div className='min-h-screen flex flex-col bg-neutral-50'>
      <div className='fixed h-16 top-0 left-0 right-0 p-4 z-10  border-b border-neutral-50'>
        <Navbar />
      </div>
      <div className='mt-16'>
        <TemplateGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
};

export default DocumentsPage;
