import {
  QuestionForm,
  QuestionFormSkeleton,
} from '@/features/admin/questions/components/question-form';
import { AdminQuestionFormValues } from '@/features/admin/questions/model/schema';
import { useApproveAdminSuggestion } from '@/features/admin/suggestions/api/mutations';
import { useGetAdminSuggestionById } from '@/features/admin/suggestions/api/queries';
import { formatDate } from '@/shared/utils/date';
import { ResponsiveModal } from '@/ui/components/responsive-modal';
import { Skeleton } from '@/ui/primitives/skeleton';
import { Text } from '@/ui/primitives/text';
import { Dot } from 'lucide-react';
import { FC } from 'react';

export const ReviewSuggestionModal: FC<{
  isOpen: boolean;
  close: () => void;
  suggestionId?: string | null;
  onReject?: (suggestionId?: string | null) => void;
}> = ({ isOpen, close, suggestionId, onReject }) => {
  const suggestionRequest = useGetAdminSuggestionById(suggestionId);
  const approveRequest = useApproveAdminSuggestion();

  const suggestion = suggestionRequest.data?.data;

  const defaultValues = suggestion
    ? {
        question: suggestion?.suggestedQuestion,
        date: new Date(),
        creditName: suggestion?.creditName || '',
      }
    : undefined;

  const handleApprove = async (data: AdminQuestionFormValues) => {
    if (!suggestion) return;

    await approveRequest.mutateAsync({
      suggestionId: suggestion.id,
      body: {
        suggestedQuestion: data.question,
        date: formatDate(data.date),
        creditName: data.creditName,
      },
    });

    close();
  };

  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={() => {
        close();
      }}
      classNames={{ dialogContent: 'w-full max-w-[678px]! gap-0' }}
    >
      <div className={'space-y-4'}>
        <Text component={'h2'} weight={'medium'} className={'text-[24px]'}>
          Review suggestion
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

            <QuestionForm
              key={suggestionId}
              defaultValues={defaultValues}
              onSubmit={handleApprove}
              onCancel={close}
              helperText={
                'Approving this suggestion will schedule the question for the selected date. You can also credit the person who suggested it by adding their name below'
              }
              submitLabel={'Approve & schedule'}
              actions={
                <Text
                  component={'button'}
                  type={'button'}
                  color={'error'}
                  weight={'medium'}
                  className={'cursor-pointer'}
                  onClick={() => onReject?.(suggestionId)}
                >
                  Reject suggestion
                </Text>
              }
            />
          </>
        )}
      </div>
    </ResponsiveModal>
  );
};
