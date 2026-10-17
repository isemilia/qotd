import { FC, ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/primitives/table';
import { cn } from '@/shared/utils/cn';

export type RowClickArgs = {
  row: Record<string, ReactNode> & { id: string };
  column: string;
};

export const DataTable: FC<{
  columns: {
    header: ReactNode;
    accessor: string;
    className?: string;
  }[];
  rows: (Record<string, ReactNode> & { id: string })[];
  className?: string;
  onRowClick?: (args: RowClickArgs) => void;
}> = ({ columns, rows, className, onRowClick }) => {
  return (
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
                  'text-primary text-[14px] py-3 px-4 font-semibold first:rounded-tl-[8px] last:rounded-tr-[8px]'
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
                    className={cn('text-[14px] py-3 px-4', column.className)}
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
  );
};
