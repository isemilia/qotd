import { useEditAdminQuestion } from '@/features/admin/questions/api/mutations';
import { useGetAdminQuestionById } from '@/features/admin/questions/api/queries';
import { QuestionForm } from '@/features/admin/questions/components/question-form';
import { AdminQuestionFormValues } from '@/features/admin/questions/model/schema';
import { formatDate, isAfterToday } from '@/shared/utils/date';
import { ResponsiveModal } from '@/ui/components/responsive-modal';
import { Skeleton } from '@/ui/primitives/skeleton';
import { Text } from '@/ui/primitives/text';
import { toast } from '@/ui/primitives/toast';
import { FC } from 'react';

export const EditQuestionModal: FC<{
  isOpen: boolean;
  close: () => void;
  questionId?: string | null;
  onDelete?: (questionId?: string | null) => void;
}> = ({ isOpen, close, questionId, onDelete }) => {
  const questionRequest = useGetAdminQuestionById(questionId);
  const editRequest = useEditAdminQuestion();

  const question = questionRequest.data?.data;
  const defaultValues = question
    ? {
        question: question.question,
        date: new Date(question.date),
        creditName: question.creditName || '',
      }
    : undefined;

  const isFutureQuestion = question?.date
    ? isAfterToday(new Date(question?.date))
    : false;

  const handleSubmit = async (data: AdminQuestionFormValues) => {
    if (!questionId) {
      toast.add({
        type: 'error',
        title: "Couldn't update question",
      });

      return;
    }

    await editRequest.mutateAsync({
      id: questionId,
      question: data.question,
      date: formatDate(data.date),
      creditName: data.creditName || null,
    });

    close();
  };

  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={() => {
        close();
      }}
      classNames={{ dialogContent: 'w-full max-w-[678px]!' }}
    >
      <Text component={'h2'} weight={'medium'} className={'text-[24px]'}>
        Manage scheduled question
      </Text>
      {questionRequest.isLoading ? (
        <div>
          <Skeleton className={'h-[164px]'} />
          <div className={'mt-4 grid grid-cols-2 gap-3'}>
            <Skeleton className={'h-[74px]'} />
            <Skeleton className={'h-[74px]'} />
          </div>
          <Skeleton className={'mt-4 h-[28px]'} />
          <div className={'mt-6 flex justify-end'}>
            <Skeleton className={'h-[34px] w-[220px]'} />
          </div>
        </div>
      ) : (
        <QuestionForm
          key={questionId}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onCancel={close}
          isPending={editRequest.isPending}
          submitLabel={'Save changes'}
          actions={
            isFutureQuestion &&
            onDelete && (
              <Text
                component={'button'}
                type={'button'}
                color={'error'}
                weight={'medium'}
                className={'cursor-pointer'}
                onClick={() => onDelete(questionId)}
              >
                Delete question
              </Text>
            )
          }
        />
      )}
    </ResponsiveModal>
  );
};
