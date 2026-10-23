import { FC } from 'react';
import { Text } from '@/ui/primitives/text';
import { Dot } from 'lucide-react';
import { AdminAnswerById } from '@/features/admin/answers/model/schema';
import { AnswerStatusChip } from '@/features/admin/answers/components/answer-status-chip';

export const ReviewAnswerTab: FC<{
  question?: Pick<
    AdminAnswerById['question'],
    'question' | 'creditName' | 'date'
  >;
  answer?: AdminAnswerById['answer'];
  user?: Pick<AdminAnswerById['user'], 'name' | 'email'>;
  status?: AdminAnswerById['status'];
}> = ({ question, answer, user, status }) => {
  return (
    <div>
      <Text weight={'medium'} className={'text-[18px]'}>
        Question
      </Text>

      <div className={'space-y-4'}>
        <div>
          <Text weight={'medium'} className={'text-[14px] mt-2'}>
            {question?.question}
          </Text>

          <Text
            component={'div'}
            className={'flex items-center gap-2 [&_p]:m-0 mt-2'}
          >
            {question?.creditName ? (
              <p>
                Credited to{' '}
                <span className={'font-medium'}>{question.creditName}</span>
              </p>
            ) : (
              <p>No credit</p>
            )}
            <Dot className={'size-3'} />
            <p>
              Asked on <span className={'font-medium'}>{question?.date}</span>
            </p>
          </Text>
        </div>

        <hr className={'border-divider'} />

        <div>
          <Text weight={'medium'} className={'text-[18px]'}>
            Answer
          </Text>
          <Text
            component={'div'}
            className={'bg-muted p-4 rounded-[12px] mt-2'}
          >
            {answer}
          </Text>
          <div className={'mt-3 flex items-center justify-between'}>
            <Text color={'secondary'} className={'text-[12px]'}>
              Submitted by{' '}
              <span className={'font-medium'}>
                {user?.name} ({user?.email})
              </span>
            </Text>

            <AnswerStatusChip variant={status} />
          </div>
        </div>
      </div>
    </div>
  );
};
