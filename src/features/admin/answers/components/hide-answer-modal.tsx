'use client';

import { FC } from 'react';
import { ResponsiveModal } from '@/ui/components/responsive-modal';
import { Text } from '@/ui/primitives/text';
import { useGetAdminAnswerById } from '@/features/admin/answers/api/queries';
import { Dot } from 'lucide-react';
import { formatDate } from '@/shared/utils/date';
import { HideAnswerForm } from '@/features/admin/answers/components/hide-answer-form';
import { useHideAdminAnswer } from '@/features/admin/answers/api/mutations';
import { HideAdminAnswerForm } from '@/features/admin/answers/model/schema';
import { adminAnswerHideReasons } from '@/features/admin/answers/model/constants';

export const HideAnswerModal: FC<{
  isOpen: boolean;
  close: () => void;
  answerId?: string | null;
}> = ({ isOpen, close, answerId }) => {
  const answerRequest = useGetAdminAnswerById(answerId);
  const answer = answerRequest.data?.data;

  const hideRequest = useHideAdminAnswer();

  const handleHide = async (data: HideAdminAnswerForm) => {
    if (!answerId || !answer) return;

    const reason =
      data.reason === 'other'
        ? data.otherReason || 'No reason provided'
        : adminAnswerHideReasons[data.reason];

    await hideRequest.mutateAsync({
      answerId: answer.id,
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
      classNames={{ dialogContent: 'w-full max-w-[678px]! gap-3' }}
    >
      <div>
        <Text component={'h2'} weight={'medium'} className={'text-[24px]'}>
          Hide this answer?
        </Text>

        <div>
          <Text weight={'medium'} className={'mt-2 text-[16px]'}>
            {answer?.answer}
          </Text>

          <Text
            component={'div'}
            className={'mt-2 flex items-center gap-2 [&_p]:m-0'}
          >
            <p>
              Answered by{' '}
              <span className={'font-medium'}>
                {answer?.user.name} ({answer?.user.email})
              </span>
            </p>

            <Dot className={'size-3'} />
            <p>
              <span className={'font-medium'}>
                {formatDate(answer?.question.date, 'short')}
              </span>
            </p>
          </Text>
        </div>
      </div>

      <hr className={'border-divider'} />

      <HideAnswerForm
        isPending={hideRequest.isPending}
        onSubmit={handleHide}
        onCancel={close}
      />
    </ResponsiveModal>
  );
};
