'use client';

import { FC, ReactNode, useState } from 'react';
import { ResponsiveModal } from '@/ui/components/responsive-modal';
import { Text } from '@/ui/primitives/text';
import { useGetAdminAnswerById } from '@/features/admin/answers/api/queries';
import { MessageLinearIcon } from '@/ui/icons/linear/message-linear.icon';
import { ReviewAnswerTabs } from '@/features/admin/answers/components/review-answer-tabs';
import { Shield, User } from 'lucide-react';
import { ReviewAnswerTab } from '@/features/admin/answers/components/review-answer-tab';
import { Button } from '@/ui/primitives/button';
import { ReviewUserTab } from '@/features/admin/answers/components/review-user-tab';
import { ReviewModerationTab } from '@/features/admin/answers/components/review-moderation-tab';

export const ReviewAnswerModal: FC<{
  isOpen: boolean;
  close: () => void;
  answerId?: string | null;
  onHide?: (answerId?: string | null) => void;
}> = ({ isOpen, close, answerId, onHide }) => {
  const answerRequest = useGetAdminAnswerById(answerId);
  const answer = answerRequest.data?.data;

  const [currentTab, setCurrentTab] = useState('answer');

  const tabs = [
    { label: 'Answer', value: 'answer', icon: MessageLinearIcon },
    { label: 'User', value: 'user', icon: User },
    { label: 'Moderation', value: 'moderation', icon: Shield },
  ];

  const tabContents: Record<string, ReactNode> = {
    answer: (
      <ReviewAnswerTab
        question={answer?.question}
        answer={answer?.answer}
        user={answer?.user}
      />
    ),
    user: <ReviewUserTab user={answer?.user} />,
    moderation: (
      <ReviewModerationTab
        status={answer?.status}
        answerId={answer?.id}
        moderation={answer?.moderation}
      />
    ),
  };

  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={() => close()}
      classNames={{ dialogContent: 'w-full max-w-[678px]! gap-0' }}
    >
      <div>
        <Text component={'h2'} weight={'medium'} className={'text-[24px]'}>
          Review answer
        </Text>

        <div className={'mt-4 grid grid-cols-[140px_1fr] gap-4'}>
          <ReviewAnswerTabs
            tabs={tabs}
            value={currentTab}
            onChange={setCurrentTab}
          />
          <div>{tabContents[currentTab]}</div>
        </div>

        <div
          className={
            'mt-6 flex items-center justify-end gap-4 max-md:grid max-md:grid-cols-2 max-md:gap-3'
          }
        >
          <Button
            // disabled={isPending}
            // onClick={onCancel}
            variant={'outline'}
          >
            Cancel
          </Button>
          {answer?.status === 'published' ? (
            <Button
              variant={'destructive'}
              onClick={() => {
                onHide?.(answerId);
              }}
            >
              Hide answer
            </Button>
          ) : (
            <Button>Restore answer</Button>
          )}
        </div>
      </div>
    </ResponsiveModal>
  );
};
