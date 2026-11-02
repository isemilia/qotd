import { AnswerStatus } from '@/features/admin/answers/model/types';
import { AnswerLikeButton } from '@/features/answers/components/answer-like-button';
import { cardColors } from '@/features/answers/model/constants';
import { cn } from '@/shared/utils/cn';
import { getTimeGap } from '@/shared/utils/get-time-gap';
import { Skeleton } from '@/ui/primitives/skeleton';
import { Text } from '@/ui/primitives/text';
import { Info } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

export const answerCardColors = [
  'lavender',
  'cornflower',
  'mint',
  'peach',
  'coral',
  'sand',
] as const;

export type AnswerCardColor = (typeof answerCardColors)[number];

export type AnswerCardProps = {
  question: { id: string; question: string; date: string };
  answer: string;
  color?: AnswerCardColor;
  createdAt: string;
  likeCount: number;
  isLiked?: boolean;
  id: string;
  status?: AnswerStatus;
  moderationReason?: string | null;
};
export const AnswerCard: FC<AnswerCardProps> = ({
  color = 'cornflower',
  question,
  answer,
  likeCount,
  createdAt,
  isLiked,
  id,
  status,
  moderationReason,
}) => {
  const timestamp = getTimeGap(createdAt);
  const cardClasses = cardColors[color];

  return (
    <div
      className={
        'bg-foreground shadow-card flex flex-col gap-3 rounded-[16px] px-5 py-4'
      }
    >
      <Text
        component={Link}
        href={`/questions/${question.id}`}
        className={
          'hover:text-primary flex items-center gap-2.5 text-[12px] transition-colors'
        }
        color={'secondary'}
      >
        <span
          className={cn('size-2.5 shrink-0 rounded-full', cardClasses.bg)}
        />
        <span className={'w-full truncate'} title={question.question}>
          {question.question}
        </span>
      </Text>

      <Text className={'flex-1 text-[16px]'} weight={'medium'}>
        {answer}
      </Text>

      <div className={'flex items-center justify-between text-[12px]'}>
        <Text color={'secondary'}>{timestamp}</Text>
        <AnswerLikeButton
          answerId={id}
          count={likeCount}
          color={color}
          isLiked={isLiked}
        />
      </div>

      {status === 'hidden' ? (
        <>
          <hr className={'border-divider'} />
          <div className={'flex gap-2'}>
            <Info className={'text-destructive size-4'} />

            <div className={'space-y-1'}>
              <Text weight={'medium'} className={'text-[14px]'}>
                This answer has been hidden
              </Text>
              {moderationReason ? (
                <Text color={'secondary'} className={'text-[12px]'}>
                  Reason: {moderationReason}
                </Text>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export const AnswerCardSkeleton: FC = () => {
  return <Skeleton className={'h-[146px] w-full rounded-[16px]'} />;
};
