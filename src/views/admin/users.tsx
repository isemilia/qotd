'use client';

import { useGetAdminUsers } from '@/features/admin/users/api/queries';
import { UserDetailsModal } from '@/features/admin/users/components/user-details-modal';
import { UserStatusChip } from '@/features/admin/users/components/user-status-chip';
import { UserStatus } from '@/features/admin/users/model/types';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { formatDate } from '@/shared/utils/date';
import { CopyableText } from '@/ui/components/copyable-text';
import { DataTable, RowClickArgs } from '@/ui/components/data-table';
import { DynamicPagination } from '@/ui/components/dynamic-pagination';
import { FilterChipGroup } from '@/ui/components/filter-chip-group';
import { Input } from '@/ui/primitives/input';
import { Text } from '@/ui/primitives/text';
import { SearchIcon } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useState } from 'react';

const columns = [
  {
    header: 'UUID',
    accessor: 'uuid',
  },
  {
    header: 'Name',
    accessor: 'name',
  },
  {
    header: 'Email',
    accessor: 'email',
  },
  {
    header: 'Role',
    accessor: 'role',
  },
  {
    header: 'Last login',
    accessor: 'lastLoginAt',
  },
  {
    header: 'Joined',
    accessor: 'createdAt',
  },
  {
    header: 'Status',
    accessor: 'status',
  },
];

export const UsersView = () => {
  // modals
  const [detailsId, setDetailsId] = useState<string | null>(null);

  // api states
  const [filter, setFilter] = useQueryState('filter', {
    defaultValue: 'all',
  });

  const [_page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const page = Math.max(1, Number(_page || 1));

  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
  });
  const debouncedSearch = useDebounce(search);

  const usersRequest = useGetAdminUsers({
    page,
    pageSize: 12,
    status: (filter === 'all' ? undefined : filter) as UserStatus,
    search: debouncedSearch,
  });

  const users = usersRequest.data?.data?.users || [];
  const pagination = usersRequest.data?.data?.pagination;

  const handleRowClick = ({ row, column }: RowClickArgs) => {
    if (column === 'uuid') {
      return;
    }

    setDetailsId(row.id);
  };

  return (
    <>
      <div className={'flex h-full flex-1 flex-col'}>
        <Text weight={'medium'} className={'text-[24px]'}>
          Users
        </Text>

        <Text color={'secondary'} className={'mt-3 text-[14px]'}>
          Manage user accounts and permissions
        </Text>

        <div className={'mt-6 flex flex-1 flex-col gap-4'}>
          <div className={'flex items-center justify-between gap-4'}>
            <FilterChipGroup
              value={filter}
              options={[
                { label: 'All', value: 'all' },
                { label: 'Active', value: 'active' },
                { label: 'Deleted', value: 'deleted' },
              ]}
              onChange={({ value }) => {
                setFilter(value);
                setPage(1);
              }}
            />

            <Input
              icon={<SearchIcon className={'size-4'} />}
              placeholder={'Search users'}
              className={'h-[34px] w-[300px]'}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className={'flex-1'}>
            <DataTable
              columns={columns}
              onRowClick={handleRowClick}
              rows={users.map((item) => {
                return {
                  id: item.id,
                  status: <UserStatusChip variant={item.status} />,
                  createdAt: formatDate(item.createdAt, 'short'),
                  lastLoginAt: formatDate(item.lastLoginAt, 'short'),
                  role: item.role,
                  email: item.email || '-',
                  name: item.name,
                  uuid: (
                    <CopyableText
                      className={'[&_span]:max-w-[50px] [&_span]:truncate'}
                    >
                      {item.id}
                    </CopyableText>
                  ),
                };
              })}
            />
          </div>

          <div className={'mt-auto flex items-center justify-end gap-6'}>
            <Text color={'secondary'} className={'text-[14px]'}>
              Showing {users.length} out of {pagination?.totalRows}
            </Text>

            <DynamicPagination
              currentPage={pagination?.page || 1}
              totalPages={pagination?.totalPages || 0}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>

      <UserDetailsModal
        isOpen={Boolean(detailsId)}
        userId={detailsId}
        close={() => setDetailsId(null)}
      />
    </>
  );
};
