'use client';

import { useGetAdminUserById } from '@/features/admin/users/api/queries';
import { formatDate } from '@/shared/utils/date';
import { InfoField } from '@/ui/components/info-field';
import { ResponsiveModal } from '@/ui/components/responsive-modal';
import { ProfileFilledIcon } from '@/ui/icons/filled/profile-filled.icon';
import { Button } from '@/ui/primitives/button';
import { Text } from '@/ui/primitives/text';
import { FC } from 'react';

export const UserDetailsModal: FC<{
  isOpen: boolean;
  close: () => void;
  userId?: string | null;
}> = ({ isOpen, close, userId }) => {
  const userRequest = useGetAdminUserById(userId);
  const user = userRequest.data?.data;

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
          User details
        </Text>

        <div className={'space-y-3'}>
          <div className={'flex items-center gap-3'}>
            <ProfileFilledIcon className={'size-8'} />
            <div>
              <Text className={'text-[14px]'} weight={'semibold'}>
                {user?.name}
              </Text>
              <Text color={'secondary'} className={'text-[12px]'}>
                {user?.email}
              </Text>
            </div>
          </div>

          <Text className={'text-[18px]'} weight={'medium'}>
            Account details
          </Text>

          <div className={'grid grid-cols-3 gap-3'}>
            <InfoField label={'Account ID'} value={user?.id} />
            <InfoField label={'Email'} value={user?.email} />
            <InfoField label={'Role'} value={user?.role} capitalize />
            <InfoField
              label={'Account status'}
              value={user?.status}
              capitalize
            />
            <InfoField
              label={'Joined'}
              value={formatDate(user?.createdAt, 'long')}
            />
          </div>

          <hr className={'border-divider'} />

          <Text className={'text-[18px]'} weight={'medium'}>
            Activity
          </Text>

          <div className={'grid grid-cols-3 gap-3'}>
            <InfoField label={'Total answers'} value={user?.totalAnswers} />
            <InfoField label={'Hidden answers'} value={user?.hiddenAnswers} />
            <InfoField
              label={'Suggested questions'}
              value={user?.suggestedQuestions}
            />
            <InfoField
              label={'Posted an answer'}
              value={formatDate(user?.lastAnswerAt, 'long')}
            />
            <InfoField
              label={'Suggested a question'}
              value={formatDate(user?.lastSuggestionAt, 'long')}
            />
          </div>
        </div>
      </div>

      <div
        className={
          'mt-6 flex items-center justify-end gap-4 max-md:grid max-md:grid-cols-2 max-md:gap-3'
        }
      >
        <Button variant={'outline'}>Cancel</Button>
        <Button>Change role</Button>
      </div>
    </ResponsiveModal>
  );
};
