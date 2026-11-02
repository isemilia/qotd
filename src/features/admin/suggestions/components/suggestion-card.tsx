import { FC } from 'react';
import { Text } from '@/ui/primitives/text';
import { SuggestionStatusChip } from '@/features/admin/suggestions/components/suggestion-status-chip';
import { SuggestionStatus } from '@/features/admin/suggestions/model/types';
import { formatDate } from '@/shared/utils/date';
import { Dot } from 'lucide-react';

const normalizeQuestion = (text?: string) => {
  if (!text) return '';

  return text
    .trim()
    .replace(/[?.!]+$/, '')
    .replace(/\s+/g, ' ')
    .toLowerCase();
};

export const SuggestionCard: FC<{
  status: SuggestionStatus;
  reason?: string;
  submittedAt: string;
  suggestedQuestion: string;
  scheduledQuestion?: null | { id: string; question: string; date: string };
}> = ({
  status,
  reason,
  submittedAt,
  suggestedQuestion,
  scheduledQuestion,
}) => {
  const getHelperText = () => {
    switch (status) {
      case 'rejected': {
        return <span>Reason: {reason}</span>;
      }
      case 'approved': {
        const wordingUpdated =
          normalizeQuestion(suggestedQuestion) !==
          normalizeQuestion(scheduledQuestion?.question);

        return (
          <>
            <span>
              Scheduled for:{' '}
              <span className={'font-medium'}>
                {formatDate(scheduledQuestion?.date, 'short')}
              </span>
            </span>
            {wordingUpdated && (
              <>
                <Dot className={'size-3'} />
                <span>Wording updated</span>
              </>
            )}
          </>
        );
      }
      case 'pending':
      default: {
        return <span>Waiting for review</span>;
      }
    }
  };

  return (
    <div
      className={
        'bg-foreground shadow-card flex flex-col gap-3 rounded-[16px] px-5 py-4'
      }
    >
      <div className={'flex items-center justify-between'}>
        <Text color={'secondary'} className={'text-[12px]'}>
          Submitted{' '}
          <span className={'font-medium'}>
            {formatDate(submittedAt, 'short')}
          </span>
        </Text>

        <SuggestionStatusChip variant={status} />
      </div>

      <Text className={'flex-1 text-[16px]'} weight={'medium'}>
        {suggestedQuestion}
      </Text>

      <Text
        color={'secondary'}
        className={'flex items-center gap-1 text-[12px]'}
      >
        {getHelperText()}
      </Text>
    </div>
  );
};
