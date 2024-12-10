import { useRouter } from 'next/navigation';

import { format } from 'date-fns';
import { SiGoogledocs } from 'react-icons/si';

import {
  Building2Icon,
  CircleUserIcon,
  EditIcon,
  ExternalLinkIcon,
  Loader2Icon,
  MoreVertical,
  TrashIcon,
} from 'lucide-react';

import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableHeader,
} from '@/ui/table';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

import { Button } from '@/ui/button';

import RemoveDialog from '../layout/RemoveDialog';
import RenameDialog from '../layout/RenameDialog';

import type { PaginationStatus } from 'convex/react';
import type { Doc } from '../../../convex/_generated/dataModel';

type TableProps = {
  documents: Doc<'documents'>[] | undefined;
  status: PaginationStatus;
  loadMore: (numItems: number) => void;
};

const DocumentsTable = ({ documents, status, loadMore }: TableProps) => {
  const router = useRouter();

  return (
    <div className='max-w-screen-lg mx-auto px-12 py-6 flex flex-col gap-6'>
      {documents === undefined ? (
        <div className='flex items-center justify-center'>
          <Loader2Icon className='text-muted-foreground size-6 animate-spin' />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead className='text-start'>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className='text-start hidden md:table-cell'>
                Shared
              </TableHead>
              <TableHead className='text-start hidden md:table-cell'>
                Created at
              </TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
              <TableRow className='border-none hover:bg-transparent'>
                <TableCell
                  colSpan={4}
                  className='text-xs text-muted-foreground bg-neutral-100'>
                  No documents found.
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map((doc) => (
                <TableRow
                  key={doc._id}
                  onClick={() => router.push(`/documents/${doc._id}`)}
                  className='cursor-pointer hover:bg-neutral-100 transition-colors duration-200'>
                  <TableCell className='font-medium'>
                    <div className='flex items-center gap-2'>
                      <SiGoogledocs className='size-4 fill-amber-500' />
                      {doc.title}
                    </div>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell className='text-muted-foreground hidden md:table-cell'>
                    <div className='flex items-center gap-2'>
                      {doc.organizationId ? (
                        <Building2Icon className='size-4' />
                      ) : (
                        <CircleUserIcon className='size-4' />
                      )}
                      {doc.organizationId ? 'Organization' : 'Personal'}
                    </div>
                  </TableCell>
                  <TableCell className='text-muted-foreground hidden md:table-cell'>
                    {format(new Date(doc._creationTime), 'dd MMM yyyy')}
                  </TableCell>
                  <TableCell className='flex items-center justify-end'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size='icon' variant='ghost'>
                          <MoreVertical className='size-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align='end'
                        alignOffset={5}
                        className='bg-neutral-50 cursor-pointer rounded-sm mt-1.5'>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`/documents/${doc._id}`, '_blank');
                          }}
                          className='hover:bg-white text-xs p-2'>
                          <ExternalLinkIcon className='size-4' />
                          Open in a new tab
                        </DropdownMenuItem>
                        <RenameDialog id={doc._id} initialTitle={doc.title}>
                          <DropdownMenuItem
                            onClick={(e) => e.stopPropagation()}
                            onSelect={(e) => e.preventDefault()}
                            className='hover:bg-white text-xs p-2'>
                            <EditIcon className='size-4' />
                            Rename
                          </DropdownMenuItem>
                        </RenameDialog>
                        <RemoveDialog id={doc._id}>
                          <DropdownMenuItem
                            onClick={(e) => e.stopPropagation()}
                            onSelect={(e) => e.preventDefault()}
                            className='hover:bg-white text-xs p-2'>
                            <TrashIcon className='size-4' />
                            Remove
                          </DropdownMenuItem>
                        </RemoveDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      )}
      <div className='flex items-center justify-center'>
        <Button
          size='sm'
          variant='ghost'
          disabled={status !== 'CanLoadMore'}
          onClick={() => loadMore(5)}
          className='bg-neutral-100 hover:bg-neutral-200 p-2 rounded-sm disabled:bg-transparent transition-colors duration-200 disabled:text-gray-500 disabled:font-light'>
          {status === 'CanLoadMore' ? 'Load More Documents' : 'End of results.'}
        </Button>
      </div>
    </div>
  );
};

export default DocumentsTable;
