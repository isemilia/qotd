import { FC } from 'react';
import { ResponsiveModal } from '@/ui/components/responsive-modal';
import { Text } from '@/ui/primitives/text';
import { useGetAdminQuestionById } from '@/features/admin/questions/api/queries';
import { Dot } from 'lucide-react';
import { formatLongDate } from '@/shared/utils/date';
import { Button } from '@/ui/primitives/button';
import { useDeleteAdminQuestionById } from '@/features/admin/questions/api/mutations';
import { toast } from '@/ui/primitives/toast';

export const DeleteQuestionModal: FC<{
  isOpen: boolean;
  close: () => void;
  questionId?: string | null;
}> = ({ isOpen, close, questionId }) => {
  const questionRequest = useGetAdminQuestionById(questionId);
  const question = questionRequest.data?.data;

  const deleteRequest = useDeleteAdminQuestionById();

  const formattedDate = formatLongDate(question?.date);

  const handleDelete = async () => {
    if (!question?.id) {
      toast.add({
        type: 'error',
        title: "Couldn't delete question",
      });

      return;
    }

    await deleteRequest.mutateAsync(question.id);
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
          Delete this question?
        </Text>

        <div>
          <Text weight={'medium'} className={'text-[16px]'}>
            {question?.question}
          </Text>

          <Text
            component={'div'}
            className={'mt-3 flex items-center gap-2 [&_p]:m-0'}
          >
            {question?.creditName ? (
              <p>
                Credited to{' '}
                <span className={'font-medium'}>{question.creditName}</span>
              </p>
            ) : (
              <p>No credit</p>
            )}
            <Dot className={'size-3'} />
            <p>
              Scheduled for{' '}
              <span className={'font-medium'}>{formattedDate}</span>
            </p>
          </Text>
        </div>

        <hr className={'border-divider'} />

        <Text className={'text-[12px]'} color={'secondary'}>
          This question is scheduled for a future date and hasn't received any
          answers yet. It will be permanently deleted and cannot be recovered
        </Text>
      </div>

      <div
        className={
          'mt-6 flex items-center justify-end gap-4 max-md:grid max-md:grid-cols-2 max-md:gap-3'
        }
      >
        <Button
          disabled={deleteRequest.isPending}
          onClick={() => close()}
          variant={'outline'}
        >
          Cancel
        </Button>
        <Button
          variant={'destructive'}
          loading={deleteRequest.isPending}
          onClick={handleDelete}
        >
          Delete question
        </Button>
      </div>
    </ResponsiveModal>
  );
};
