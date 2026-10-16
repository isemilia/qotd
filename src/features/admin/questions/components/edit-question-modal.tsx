import { FC } from 'react';
import { QuestionForm } from '@/features/admin/questions/components/question-form';
import { ResponsiveModal } from '@/ui/components/responsive-modal';
import { Text } from '@/ui/primitives/text';
import { AdminQuestionFormValues } from '@/features/admin/questions/model/schema';
import { formatDate } from '@/shared/utils/date';
import { useEditAdminQuestion } from '@/features/admin/questions/api/mutations';
import { toast } from '@/ui/primitives/toast';
import { useGetAdminQuestionById } from '@/features/admin/questions/api/queries';
import { Skeleton } from '@/ui/primitives/skeleton';

export const EditQuestionModal: FC<{
  isOpen: boolean;
  close: () => void;
  questionId?: string | null;
}> = ({ isOpen, close, questionId }) => {
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
        Manage question
      </Text>
      {questionRequest.isLoading ? (
        <div>
          <Skeleton className={'h-[164px]'} />
          <div className={'grid grid-cols-2 gap-3 mt-4'}>
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
        />
      )}
    </ResponsiveModal>
  );
};
