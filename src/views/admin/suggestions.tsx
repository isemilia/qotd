'use client';

import { Text } from '@/ui/primitives/text';
import { FilterChipGroup } from '@/ui/components/filter-chip-group';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/ui/primitives/input';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { useGetAdminSuggestions } from '@/features/admin/suggestions/api/queries';
import { SuggestionStatus } from '@/features/admin/suggestions/model/types';
import { DynamicPagination } from '@/ui/components/dynamic-pagination';
import { DataTable } from '@/ui/components/data-table';
import { CopyableText } from '@/ui/components/copyable-text';
import { formatDate } from '@/shared/utils/date';
import { SuggestionStatusChip } from '@/features/admin/suggestions/components/suggestion-status-chip';

const columns = [
  {
    header: 'UUID',
    accessor: 'uuid',
  },
  {
    header: 'Suggested question',
    accessor: 'suggestedQuestion',
    className: 'w-full',
  },
  {
    header: 'Credit name',
    accessor: 'creditName',
  },
  {
    header: 'Created at',
    accessor: 'createdAt',
  },
  {
    header: 'Status',
    accessor: 'status',
  },
];

export const SuggestionsView = () => {
  // api states
  const [filter, setFilter] = useQueryState('filter', { defaultValue: 'all' });

  const [_page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const page = Math.max(1, Number(_page || 1));

  const [search, setSearch] = useQueryState('search', { defaultValue: '' });
  const debouncedSearch = useDebounce(search);

  const suggestionsRequest = useGetAdminSuggestions({
    page,
    pageSize: 12,
    status: (filter === 'all' ? undefined : filter) as SuggestionStatus,
    search: debouncedSearch,
  });

  const suggestions = suggestionsRequest.data?.data?.suggestions || [];
  const pagination = suggestionsRequest.data?.data?.pagination;

  return (
    <>
      <div className={'flex-1 h-full flex flex-col'}>
        <Text weight={'medium'} className={'text-[24px]'}>
          Suggested questions
        </Text>
        <Text color={'secondary'} className={'text-[14px] mt-3'}>
          Manage questions suggested by users
        </Text>

        <div className={'mt-6 flex-1 flex flex-col gap-4'}>
          <div className={'flex items-center justify-between gap-4'}>
            <FilterChipGroup
              value={filter}
              options={[
                { label: 'All', value: 'all' },
                { label: 'Pending', value: 'pending' },
                { label: 'Approved', value: 'approved' },
                { label: 'Rejected', value: 'rejected' },
              ]}
              onChange={({ value }) => {
                setFilter(value);
                setPage(1);
              }}
            />

            <Input
              icon={<SearchIcon className={'size-4'} />}
              placeholder={'Search suggestions'}
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
              // onRowClick={handleRowClick}
              columns={columns}
              rows={suggestions?.map((item) => {
                return {
                  id: item.id,
                  uuid: (
                    <CopyableText
                      className={'[&_span]:truncate [&_span]:max-w-[50px]'}
                    >
                      {item.id}
                    </CopyableText>
                  ),
                  suggestedQuestion: item.suggestedQuestion,
                  creditName: item.creditName || '-',
                  createdAt: formatDate(new Date(item.createdAt), 'short'),
                  status: <SuggestionStatusChip variant={item.status} />,
                };
              })}
            />
          </div>
          <div className={'mt-auto flex items-center justify-end gap-6'}>
            <Text color={'secondary'} className={'text-[14px]'}>
              Showing {suggestions.length} out of {pagination?.totalRows}
            </Text>
            <DynamicPagination
              currentPage={pagination?.page || 1}
              totalPages={pagination?.totalPages || 0}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};
