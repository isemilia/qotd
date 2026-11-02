import { cn } from '@/shared/utils/cn';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/primitives/table';
import { ReactNode } from 'react';

export type RowClickArgs<R extends object = object> = {
  row: Record<string, ReactNode> & R & { id: string };
  column: string;
};

type DataTableProps<R extends object> = {
  columns: {
    header: ReactNode;
    accessor: string;
    className?: string;
  }[];
  rows: RowClickArgs<R>['row'][];
  className?: string;
  onRowClick?: (args: RowClickArgs<R>) => void;
};

export const DataTable = <R extends object = object>({
  columns,
  rows,
  className,
  onRowClick,
}: DataTableProps<R>) => {
  return (
    <div className={'w-full overflow-x-auto'}>
      <Table className={className}>
        <TableHeader>
          <TableRow
            className={
              'border-table-divider bg-primary-foreground hover:bg-primary-foreground'
            }
          >
            {columns.map((column) => {
              return (
                <TableHead
                  key={column.accessor}
                  className={
                    'text-primary px-4 py-3 text-[14px] font-semibold first:rounded-tl-[8px] last:rounded-tr-[8px]'
                  }
                >
                  {column.header}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row.id} className={'border-table-divider'}>
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={column.accessor}
                      className={cn('px-4 py-3 text-[14px]', column.className)}
                      onClick={() => {
                        onRowClick?.({ row, column: column.accessor });
                      }}
                    >
                      {/* @ts-ignore */}
                      {row[column.accessor]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
