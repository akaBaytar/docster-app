import type { PaginationStatus } from 'convex/react';
import type { Doc } from '../../../convex/_generated/dataModel';

type TableProps = {
  documents: Doc<'documents'>[] | undefined;
  status: PaginationStatus;
  loadMore: (numItems: number) => void;
};

const DocumentsTable = ({ documents, status, loadMore }: TableProps) => {
  return <div>table</div>;
};

export default DocumentsTable;
