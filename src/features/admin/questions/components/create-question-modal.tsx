import { FC } from 'react';
import { QuestionForm } from '@/features/admin/questions/components/question-form';
import { ResponsiveModal } from '@/ui/components/responsive-modal';
import { Text } from '@/ui/primitives/text';

export const CreateQuestionModal: FC = () => {
  return (
    <ResponsiveModal
      open={true}
      onOpenChange={() => {}}
      classNames={{ dialogContent: 'w-full max-w-[678px]!' }}
    >
      <Text component={'h2'} weight={'medium'} className={'text-[24px]'}>
        Create question
      </Text>
      <QuestionForm />
    </ResponsiveModal>
  );
};
