import { FC } from 'react';
import { QuestionForm } from '@/features/admin/questions/components/question-form';
import { ResponsiveModal } from '@/ui/components/responsive-modal';
import { Text } from '@/ui/primitives/text';
import { AdminQuestionFormValues } from '@/features/admin/questions/model/schema';
import { formatDate } from '@/shared/utils/date';
import { useCreateAdminQuestion } from '@/features/admin/questions/api/mutations';

export const CreateQuestionModal: FC<{
  isOpen: boolean;
  close: () => void;
}> = ({ isOpen, close }) => {
  const createRequest = useCreateAdminQuestion();

  const handleSubmit = async (data: AdminQuestionFormValues) => {
    await createRequest.mutateAsync({
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
        Create question
      </Text>
      <QuestionForm
        onSubmit={handleSubmit}
        onCancel={close}
        isPending={createRequest.isPending}
      />
    </ResponsiveModal>
  );
};
