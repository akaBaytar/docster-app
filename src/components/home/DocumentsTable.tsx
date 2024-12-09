import { format } from 'date-fns';
import { SiGoogledocs } from 'react-icons/si';

import {
  Building2Icon,
  CircleUserIcon,
  ExternalLinkIcon,
  Loader2Icon,
  MoreVertical,
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

import type { PaginationStatus } from 'convex/react';
import type { Doc } from '../../../convex/_generated/dataModel';

type TableProps = {
  documents: Doc<'documents'>[] | undefined;
  status: PaginationStatus;
  loadMore: (numItems: number) => void;
};

const DocumentsTable = ({ documents, status, loadMore }: TableProps) => {
  const onClick = (id: string) => {
    window.open(`/documents/${id}`, '_blank');
  };

  return (
    <div className='max-w-screen-lg mx-auto px-12 py-6 flex flex-col gap-6'>
      {documents === undefined ? (
        <div className='flex items-center justify-center'>
          <Loader2Icon className='text-muted-foreground size-6 animate-spin' />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className='border-none hover:bg-transparent'>
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
                <TableCell colSpan={4} className='text-muted-foreground'>
                  No documents found.
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map((doc) => (
                <TableRow
                  key={doc._id}
                  className='cursor-pointer hover:bg-neutral-100 transition-colors duration-200'>
                  <TableCell className='flex items-center gap-1'>
                    <SiGoogledocs className='size-4 fill-amber-500' />
                    {doc.title}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell className='text-muted-foreground hidden md:flex items-center gap-1'>
                    {doc.organizationId ? (
                      <Building2Icon className='size-4' />
                    ) : (
                      <CircleUserIcon className='size-4' />
                    )}
                    {doc.organizationId ? 'Organization' : 'Personal'}
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
                        className='bg-neutral-100 cursor-pointer rounded-sm mt-1.5'>
                        <DropdownMenuItem
                          onClick={() => onClick(doc._id)}
                          className='hover:bg-neutral-200 text-xs px-2 py-1'>
                          <ExternalLinkIcon className='size-4' />
                          Open in a new tab
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      )}
    </div>
  );
};

export default DocumentsTable;
