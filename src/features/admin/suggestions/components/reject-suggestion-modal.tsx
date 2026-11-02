'use client';

import { QuestionFormSkeleton } from '@/features/admin/questions/components/question-form';
import { useRejectAdminSuggestion } from '@/features/admin/suggestions/api/mutations';
import { useGetAdminSuggestionById } from '@/features/admin/suggestions/api/queries';
import { adminRejectionReasons } from '@/features/admin/suggestions/model/constants';
import { RejectAdminSuggestionForm } from '@/features/admin/suggestions/model/schema';
import { formatDate } from '@/shared/utils/date';
import { ResponsiveModal } from '@/ui/components/responsive-modal';
import { Skeleton } from '@/ui/primitives/skeleton';
import { Text } from '@/ui/primitives/text';
import { Dot } from 'lucide-react';
import { FC } from 'react';
import { RejectSuggestionForm } from './reject-suggestion-form';

export const RejectSuggestionModal: FC<{
  isOpen: boolean;
  close: () => void;
  suggestionId?: string | null;
}> = ({ isOpen, close, suggestionId }) => {
  const suggestionRequest = useGetAdminSuggestionById(suggestionId);
  const rejectRequest = useRejectAdminSuggestion();

  const suggestion = suggestionRequest.data?.data;

  const handleReject = async (data: RejectAdminSuggestionForm) => {
    if (!suggestionId || !suggestion) return;

    const reason =
      data.reason === 'other'
        ? data.otherReason || 'No reason provided'
        : adminRejectionReasons[data.reason];

    await rejectRequest.mutateAsync({
      suggestionId: suggestion.id,
      body: {
        reason: reason,
      },
    });

    close();
  };

  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={() => close()}
      classNames={{ dialogContent: 'w-full max-w-[678px]! gap-0' }}
    >
      <div className={'space-y-4'}>
        <Text component={'h2'} weight={'medium'} className={'text-[24px]'}>
          Reject this suggestion?
        </Text>

        {suggestionRequest.isPending ? (
          <>
            <Skeleton className={'h-[54px]'} />
            <hr className={'border-divider'} />
            <QuestionFormSkeleton />
          </>
        ) : (
          <>
            <div>
              <Text weight={'medium'} className={'text-[16px]'}>
                {suggestion?.suggestedQuestion}
              </Text>

              <Text
                component={'div'}
                className={'mt-3 flex items-center gap-2 [&_p]:m-0'}
              >
                {suggestion?.creditName ? (
                  <p>
                    Credited to{' '}
                    <span className={'font-medium'}>
                      {suggestion.creditName}
                    </span>
                  </p>
                ) : (
                  <p>No credit</p>
                )}
                <Dot className={'size-3'} />
                <p>
                  Suggested on{' '}
                  <span className={'font-medium'}>
                    {formatDate(suggestion?.createdAt, 'short')}
                  </span>
                </p>
              </Text>
            </div>

            <hr className={'border-divider'} />

            <RejectSuggestionForm
              isPending={rejectRequest.isPending}
              onSubmit={handleReject}
            />
          </>
        )}
      </div>
    </ResponsiveModal>
  );
};
