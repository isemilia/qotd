import { FC } from 'react';
import { Text } from '@/ui/primitives/text';
import { HeartLinearIcon } from '@/ui/icons/linear/heart-linear.icon';
import { getTimeGap } from '@/shared/utils/get-time-gap';
import { cardColors } from '@/features/answers/model/constants';
import { cn } from '@/shared/utils/cn';
import { HeartFilledIcon } from '@/ui/icons/filled/heart-filled.icon';

export type AnswerCardColor =
  'lavender' | 'cornflower' | 'mint' | 'peach' | 'coral' | 'sand';

export type AnswerCardProps = {
  question: string;
  answer: string;
  color?: AnswerCardColor;
  createdAt: string;
  likeCount: number;
  onLikeClick?: () => void;
  isLiked?: boolean;
};
export const AnswerCard: FC<AnswerCardProps> = ({
  color = 'cornflower',
  question,
  answer,
  likeCount,
  createdAt,
  onLikeClick,
  isLiked,
}) => {
  const timestamp = getTimeGap(createdAt);

  const peopleLiked =
    likeCount === 0
      ? ''
      : likeCount === 1
        ? '1 person liked'
        : `${likeCount} people liked`;

  const cardClasses = cardColors[color];

  const LikeIcon = isLiked ? HeartFilledIcon : HeartLinearIcon;

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
        <Text
          component={'div'}
          color={'secondary'}
          className={'flex items-center gap-1.5 leading-none'}
        >
          <span>{peopleLiked}</span>
          <button
            className={cn('cursor-pointer', isLiked && cardClasses.text)}
            onClick={onLikeClick}
          >
            <LikeIcon className={'size-4'} />
          </button>
        </Text>
      </div>
    </div>
  );
};
