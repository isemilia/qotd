'use client';

import { FC, useState } from 'react';
import { Text } from '@/ui/primitives/text';
import { FilterChipGroup } from '@/ui/components/filter-chip-group';
import { Input } from '@/ui/primitives/input';
import { SearchIcon } from 'lucide-react';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useGetAdminAnswers } from '@/features/admin/answers/api/queries';
import { AnswerStatus } from '@/features/admin/answers/model/types';
import { DataTable, RowClickArgs } from '@/ui/components/data-table';
import { CopyableText } from '@/ui/components/copyable-text';
import { DynamicPagination } from '@/ui/components/dynamic-pagination';
import { AnswerStatusChip } from '@/features/admin/answers/components/answer-status-chip';
import { ReviewAnswerModal } from '@/features/admin/answers/components/review-answer-modal';
import { HideAnswerModal } from '@/features/admin/answers/components/hide-answer-modal';

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
  // modals
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [hideId, setHideId] = useState<string | null>(null);

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

  const handleRowClick = ({ row, column }: RowClickArgs) => {
    if (column === 'uuid' || column === 'author') {
      return;
    }

    setReviewId(row.id);
  };

  const extraColumns =
    filter === 'hidden'
      ? [
          {
            header: 'Reason',
            accessor: 'reason',
            className: 'max-w-[200px] truncate',
          },
          {
            header: 'Moderated by',
            accessor: 'moderatedBy',
          },
        ]
      : [];

  return (
    <>
      <div className={'flex h-full flex-1 flex-col'}>
        <Text weight={'medium'} className={'text-[24px]'}>
          All answers
        </Text>
        <Text color={'secondary'} className={'mt-3 text-[14px]'}>
          Manage answers submitted by users
        </Text>

        <div className={'mt-6 flex flex-1 flex-col gap-4'}>
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
              onRowClick={handleRowClick}
              columns={[...columns, ...extraColumns]}
              rows={answers?.map((item) => {
                return {
                  id: item.id,
                  uuid: (
                    <CopyableText
                      className={'[&_span]:max-w-[50px] [&_span]:truncate'}
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
                  reason: item.moderation.reason,
                  moderatedBy: item.moderation.moderatedBy?.email,
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

      <ReviewAnswerModal
        isOpen={Boolean(reviewId)}
        answerId={reviewId}
        close={() => {
          setReviewId(null);
        }}
        onHide={(answerId) => {
          if (answerId) {
            setHideId(answerId);
            setReviewId(null);
          }
        }}
      />

      <HideAnswerModal
        isOpen={Boolean(hideId)}
        close={() => {
          setHideId(null);
        }}
        answerId={hideId}
      />
    </>
  );
};
