'use client';

import { EditQuestionModal } from '@/features/admin/questions/components/edit-question-modal';
import { useGetAdminSuggestions } from '@/features/admin/suggestions/api/queries';
import { RejectSuggestionModal } from '@/features/admin/suggestions/components/reject-suggestion-modal';
import { ReviewSuggestionModal } from '@/features/admin/suggestions/components/review-suggestion-modal';
import { SuggestionStatusChip } from '@/features/admin/suggestions/components/suggestion-status-chip';
import { SuggestionStatus } from '@/features/admin/suggestions/model/types';
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
    header: 'Suggested question',
    accessor: 'suggestedQuestion',
    className: 'max-w-[400px] truncate',
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
  // modals
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [scheduledId, setScheduledId] = useState<string | null>(null);

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

  const extraColumns =
    filter === 'rejected'
      ? [{ header: 'Reason', accessor: 'reason' }]
      : filter === 'approved'
        ? [{ header: 'Scheduled question', accessor: 'scheduledQuestion' }]
        : [];

  const handleRowClick = ({
    row,
    column,
  }: RowClickArgs<{
    rawStatus: SuggestionStatus;
    scheduledQuestionId?: string | null;
  }>) => {
    if (column === 'uuid') {
      return;
    }

    if (row.rawStatus === 'pending') {
      setReviewId(row.id);
      return;
    }

    if (row.rawStatus === 'approved' && row.scheduledQuestionId) {
      setScheduledId(row.scheduledQuestionId);
      return;
    }
  };

  return (
    <>
      <div className={'flex h-full flex-1 flex-col'}>
        <Text weight={'medium'} className={'text-[24px]'}>
          Suggested questions
        </Text>
        <Text color={'secondary'} className={'mt-3 text-[14px]'}>
          Manage questions suggested by users
        </Text>

        <div className={'mt-6 flex flex-1 flex-col gap-4'}>
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
              onRowClick={handleRowClick}
              columns={[...columns, ...extraColumns]}
              rows={suggestions?.map((item) => {
                return {
                  id: item.id,
                  uuid: (
                    <CopyableText
                      className={'[&_span]:max-w-[50px] [&_span]:truncate'}
                    >
                      {item.id}
                    </CopyableText>
                  ),
                  suggestedQuestion: item.suggestedQuestion,
                  creditName: item.creditName || '-',
                  createdAt: formatDate(new Date(item.createdAt), 'short'),
                  status: <SuggestionStatusChip variant={item.status} />,
                  rawStatus: item.status,
                  reason: item.reason,
                  scheduledQuestion: item.scheduledQuestion
                    ? formatDate(new Date(item.scheduledQuestion.date), 'short')
                    : '-',
                  scheduledQuestionId: item.scheduledQuestion?.id,
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

      <ReviewSuggestionModal
        isOpen={Boolean(reviewId)}
        suggestionId={reviewId}
        close={() => {
          setReviewId(null);
        }}
        onReject={(suggestionId) => {
          if (suggestionId) {
            setRejectId(suggestionId);
            setReviewId(null);
          }
        }}
      />
      <RejectSuggestionModal
        isOpen={Boolean(rejectId)}
        close={() => {
          setRejectId(null);
        }}
        suggestionId={rejectId}
      />
      <EditQuestionModal
        isOpen={Boolean(scheduledId)}
        questionId={scheduledId}
        close={() => {
          setScheduledId(null);
        }}
      />
    </>
  );
};
