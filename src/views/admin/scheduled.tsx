'use client';

import { Text } from '@/ui/primitives/text';
import { DataTable, RowClickArgs } from '@/ui/components/data-table';
import {
  QuestionStatus,
  QuestionStatusChip,
} from '@/features/admin/questions/components/question-status-chip';
import { useGetAdminQuestions } from '@/features/admin/questions/api/queries';
import { DynamicPagination } from '@/ui/components/dynamic-pagination';
import { FilterChipGroup } from '@/ui/components/filter-chip-group';
import { parseAsInteger, useQueryState } from 'nuqs';
import { Input } from '@/ui/primitives/input';
import { SearchIcon } from 'lucide-react';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { CreateQuestionModal } from '@/features/admin/questions/components/create-question-modal';
import { useState } from 'react';
import { Button } from '@/ui/primitives/button';
import { EditQuestionModal } from '@/features/admin/questions/components/edit-question-modal';

const columns = [
  {
    header: 'UUID',
    accessor: 'uuid',
    className: 'truncate max-w-[80px]',
  },
  {
    header: 'Question',
    accessor: 'question',
  },
  {
    header: 'Credit name',
    accessor: 'creditName',
  },
  {
    header: 'Date',
    accessor: 'date',
  },
  {
    header: 'Status',
    accessor: 'status',
  },
];

export const ScheduledView = () => {
  // modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // api states
  const [filter, setFilter] = useQueryState('filter', { defaultValue: 'all' });

  const [_page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const page = Math.max(1, Number(_page || 1));

  const [search, setSearch] = useQueryState('search', { defaultValue: '' });
  const debouncedSearch = useDebounce(search);

  const questionsRequest = useGetAdminQuestions({
    page,
    pageSize: 12,
    status: (filter === 'all' ? undefined : filter) as QuestionStatus,
    search: debouncedSearch,
  });

  const questions = questionsRequest.data?.data?.questions || [];
  const pagination = questionsRequest.data?.data?.pagination;

  const handleRowClick = ({ row }: RowClickArgs) => {
    setEditId(row.id);
  };

  return (
    <>
      <div className={'flex-1 h-full flex flex-col'}>
        <Text weight={'medium'} className={'text-[24px]'}>
          All questions
        </Text>
        <Text color={'secondary'} className={'text-[14px] mt-3'}>
          Manage scheduled and published questions
        </Text>

        <div className={'mt-6 flex-1 flex flex-col gap-4'}>
          <div className={'flex items-center justify-between gap-4'}>
            <FilterChipGroup
              value={filter}
              options={[
                { label: 'All', value: 'all' },
                { label: 'Previous', value: 'previous' },
                { label: 'Active', value: 'active' },
                { label: 'Next', value: 'next' },
                { label: 'Scheduled', value: 'scheduled' },
              ]}
              onChange={({ value }) => {
                setFilter(value);
                setPage(1);
              }}
            />

            <div className={'flex items-center gap-3'}>
              <Input
                icon={<SearchIcon className={'size-4'} />}
                placeholder={'Search questions'}
                className={'h-[34px] w-[300px]'}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
              <Button
                onClick={() => {
                  setIsCreateOpen(true);
                }}
              >
                Create question
              </Button>
            </div>
          </div>
          <div className={'flex-1'}>
            <DataTable
              onRowClick={handleRowClick}
              columns={columns}
              rows={questions?.map((item) => {
                return {
                  id: item.id,
                  uuid: item.id,
                  question: item.question,
                  creditName: item.creditName || '-',
                  date: item.date,
                  status: (
                    <QuestionStatusChip
                      variant={item.status as QuestionStatus}
                    />
                  ),
                };
              })}
            />
          </div>
          <div className={'mt-auto flex items-center justify-end gap-6'}>
            <Text color={'secondary'} className={'text-[14px]'}>
              Showing {questions.length} out of {pagination?.totalRows}
            </Text>
            <DynamicPagination
              currentPage={pagination?.page || 1}
              totalPages={pagination?.totalPages || 0}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
      <CreateQuestionModal
        isOpen={isCreateOpen}
        close={() => setIsCreateOpen(false)}
      />
      <EditQuestionModal
        isOpen={Boolean(editId)}
        questionId={editId}
        close={() => {
          setEditId(null);
        }}
      />
    </>
  );
};
