import { AnswerStatusChip } from '@/features/admin/answers/components/answer-status-chip';
import { AdminAnswerById } from '@/features/admin/answers/model/schema';
import { formatDate } from '@/shared/utils/date';
import { InfoField } from '@/ui/components/info-field';
import { Text } from '@/ui/primitives/text';
import { FC } from 'react';

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

      {moderation?.moderatedAt ? (
        <div className={'space-y-3'}>
          <div className={'grid grid-cols-2 gap-3'}>
            <InfoField
              label={'Moderated by'}
              value={moderation.moderatedBy?.email}
            />
            <InfoField
              label={'Moderated at'}
              value={formatDate(moderation.moderatedAt, 'short-with-time')}
            />
          </div>
          <InfoField label={'Moderation reason'} value={moderation.reason} />
        </div>
      ) : (
        <Text>This answer hasn't been moderated</Text>
      )}
    </div>
  );
};
