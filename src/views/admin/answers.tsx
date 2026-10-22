'use client';

import { FC } from 'react';
import { Text } from '@/ui/primitives/text';
import { FilterChipGroup } from '@/ui/components/filter-chip-group';
import { Input } from '@/ui/primitives/input';
import { SearchIcon } from 'lucide-react';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useGetAdminAnswers } from '@/features/admin/answers/api/queries';
import { AnswerStatus } from '@/features/admin/answers/model/types';
import { DataTable } from '@/ui/components/data-table';
import { CopyableText } from '@/ui/components/copyable-text';
import { DynamicPagination } from '@/ui/components/dynamic-pagination';
import { AnswerStatusChip } from '@/features/admin/answers/components/answer-status-chip';

const columns = [
  {
    header: 'UUID',
    accessor: 'uuid',
  },
  {
    header: 'Answer',
    accessor: 'answer',
    className: 'max-w-[200px] truncate',
  },
  {
    header: 'Question',
    accessor: 'question',
    className: 'max-w-[200px] truncate',
  },
  {
    header: 'Author',
    accessor: 'author',
  },
  {
    header: 'Question date',
    accessor: 'questionDate',
  },
  {
    header: 'Status',
    accessor: 'status',
  },
];

export const AnswersView: FC = () => {
  // api states
  const [filter, setFilter] = useQueryState('filter', { defaultValue: 'all' });

  const [_page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const page = Math.max(1, Number(_page || 1));

  const [search, setSearch] = useQueryState('search', { defaultValue: '' });
  const debouncedSearch = useDebounce(search);

  const answersRequest = useGetAdminAnswers({
    page,
    pageSize: 12,
    status: (filter === 'all' ? undefined : filter) as AnswerStatus,
    search: debouncedSearch,
  });

  const answers = answersRequest.data?.data?.answers || [];
  const pagination = answersRequest.data?.data?.pagination;

  return (
    <>
      <div className={'flex-1 h-full flex flex-col'}>
        <Text weight={'medium'} className={'text-[24px]'}>
          All answers
        </Text>
        <Text color={'secondary'} className={'text-[14px] mt-3'}>
          Manage answers submitted by users
        </Text>

        <div className={'mt-6 flex-1 flex flex-col gap-4'}>
          <div className={'flex items-center justify-between gap-4'}>
            <FilterChipGroup
              value={filter}
              options={[
                { label: 'All', value: 'all' },
                { label: 'Published', value: 'published' },
                { label: 'Hidden', value: 'hidden' },
              ]}
              onChange={({ value }) => {
                setFilter(value);
                setPage(1);
              }}
            />

            <Input
              icon={<SearchIcon className={'size-4'} />}
              placeholder={'Search answers'}
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
              rows={answers?.map((item) => {
                return {
                  id: item.id,
                  uuid: (
                    <CopyableText
                      className={'[&_span]:truncate [&_span]:max-w-[50px]'}
                    >
                      {item.id}
                    </CopyableText>
                  ),
                  answer: item.answer,
                  question: item.question.question,
                  author: (
                    <CopyableText>
                      {item.user.email || item.user.id}
                    </CopyableText>
                  ),
                  questionDate: item.question.date,
                  status: <AnswerStatusChip variant={item.status} />,
                };
              })}
            />
          </div>
          <div className={'mt-auto flex items-center justify-end gap-6'}>
            <Text color={'secondary'} className={'text-[14px]'}>
              Showing {answers.length} out of {pagination?.totalRows}
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
