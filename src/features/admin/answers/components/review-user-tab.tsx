import { AdminAnswerById } from '@/features/admin/answers/model/schema';
import { formatDate } from '@/shared/utils/date';
import { InfoField } from '@/ui/components/info-field';
import { ProfileFilledIcon } from '@/ui/icons/filled/profile-filled.icon';
import { Text } from '@/ui/primitives/text';
import { FC } from 'react';

export const ReviewUserTab: FC<{ user?: AdminAnswerById['user'] }> = ({
  user,
}) => {
  return (
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
      <Text weight={'medium'} className={'text-[18px]'}>
        Account details
      </Text>

      <div className={'grid grid-cols-2 gap-3'}>
        <InfoField label={'Email'} value={user?.email} />
        <InfoField label={'Account ID'} value={user?.id} />
        <InfoField label={'Role'} value={user?.role} capitalize />
        <InfoField label={'Account status'} value={user?.status} capitalize />
        <InfoField
          label={'Joined'}
          value={formatDate(user?.createdAt, 'long')}
        />
      </div>

      <hr className={'border-divider'} />

      <Text weight={'medium'} className={'text-[18px]'}>
        Activity
      </Text>
      <div className={'grid grid-cols-2 gap-3'}>
        <InfoField label={'Total answers'} value={user?.totalAnswers} />
        <InfoField label={'Hidden answers'} value={user?.hiddenAnswers} />
      </div>
    </div>
  );
};
