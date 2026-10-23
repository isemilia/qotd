import { Text } from '@/ui/primitives/text';
import { InfoField } from '@/ui/components/info-field';
import { FC } from 'react';
import { AdminAnswerById } from '@/features/admin/answers/model/schema';
import { AnswerStatusChip } from '@/features/admin/answers/components/answer-status-chip';

export const ReviewModerationTab: FC<{
  status?: AdminAnswerById['status'];
  answerId?: AdminAnswerById['id'];
  moderation?: AdminAnswerById['moderation'];
}> = ({ status, answerId, moderation }) => {
  return (
    <div className={'space-y-3'}>
      <Text weight={'medium'} className={'text-[18px]'}>
        Moderation
      </Text>

      <div className={'grid grid-cols-2 gap-3'}>
        <InfoField
          label={'Answer status'}
          value={<AnswerStatusChip variant={status} />}
        />
        <InfoField label={'Answer ID'} value={answerId} />
      </div>

      <hr className={'border-divider'} />

      <Text weight={'medium'} className={'text-[18px]'}>
        Last moderation action
      </Text>

      {moderation ? (
        // todo: add moderation info once the endpoints are ready
        <Text>Coming soon...</Text>
      ) : (
        <Text>This answer hasn't been moderated</Text>
      )}
    </div>
  );
};
