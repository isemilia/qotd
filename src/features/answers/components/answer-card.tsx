import { FC } from 'react';
import { Text } from '@/ui/primitives/text';
import { getTimeGap } from '@/shared/utils/get-time-gap';
import { cardColors } from '@/features/answers/model/constants';
import { cn } from '@/shared/utils/cn';
import { AnswerLikeButton } from '@/features/answers/components/answer-like-button';
import Link from 'next/link';
import { Skeleton } from '@/ui/primitives/skeleton';

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
};
export const AnswerCard: FC<AnswerCardProps> = ({
  color = 'cornflower',
  question,
  answer,
  likeCount,
  createdAt,
  isLiked,
  id,
}) => {
  const timestamp = getTimeGap(createdAt);
  const cardClasses = cardColors[color];

  return (
    <div
      className={
        'bg-foreground shadow-card flex flex-col rounded-[16px] px-5 py-4'
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

      <Text className={'mt-3 flex-1 text-[16px]'} weight={'medium'}>
        {answer}
      </Text>

      <div className={'mt-3 flex items-center justify-between text-[12px]'}>
        <Text color={'secondary'}>{timestamp}</Text>
        <AnswerLikeButton
          answerId={id}
          count={likeCount}
          color={color}
          isLiked={isLiked}
        />
      </div>
    </div>
  );
};

export const AnswerCardSkeleton: FC = () => {
  return <Skeleton className={'h-[146px] w-full rounded-[16px]'} />;
};
