import { FC } from 'react';
import { Text } from '@/ui/primitives/text';
import { getTimeGap } from '@/shared/utils/get-time-gap';
import { cardColors } from '@/features/answers/model/constants';
import { cn } from '@/shared/utils/cn';
import { AnswerLikeButton } from '@/features/answers/components/answer-like-button';

export type AnswerCardColor =
  'lavender' | 'cornflower' | 'mint' | 'peach' | 'coral' | 'sand';

export type AnswerCardProps = {
  question: string;
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
        'bg-foreground shadow-card py-4 px-5 rounded-[16px] flex flex-col'
      }
    >
      <Text
        className={'flex items-center gap-2.5 text-[12px]'}
        color={'secondary'}
      >
        <span
          className={cn('rounded-full size-2.5 shrink-0', cardClasses.bg)}
        />
        <span className={'truncate w-full'} title={question}>
          {question}
        </span>
      </Text>

      <Text className={'text-[16px] mt-3 flex-1'} weight={'medium'}>
        {answer}
      </Text>

      <div className={'flex items-center justify-between mt-3 text-[12px]'}>
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
