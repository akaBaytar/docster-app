import { auth } from '@clerk/nextjs/server';
import { preloadQuery } from 'convex/nextjs';
import { api } from '../../../../convex/_generated/api';

import Document from '@/components/documents/Document';

import type { Id } from '../../../../convex/_generated/dataModel';

type PageProps = {
  params: Promise<{ id: Id<'documents'> }>;
};

const DocumentPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const { getToken } = await auth();

  const token = (await getToken({ template: 'convex' })) ?? undefined;

  if (!token) throw new Error('Unauthorized.');

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    { id },
    { token }
  );

  return <Document preloadedDocument={preloadedDocument} />;
};

export default DocumentPage;
