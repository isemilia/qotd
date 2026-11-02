'use client';

import { useToggleAnswerLike } from '@/features/answers/api/mutations';
import { AnswerCardColor } from '@/features/answers/components/answer-card';
import { cardColors } from '@/features/answers/model/constants';
import { useAuth } from '@/shared/providers/auth-provider';
import { cn } from '@/shared/utils/cn';
import { HeartFilledIcon } from '@/ui/icons/filled/heart-filled.icon';
import { HeartLinearIcon } from '@/ui/icons/linear/heart-linear.icon';
import { Text } from '@/ui/primitives/text';
import { toast } from '@/ui/primitives/toast';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

export const AnswerLikeButton: FC<{
  count: number;
  color?: AnswerCardColor;
  isLiked?: boolean;
  answerId: string;
}> = ({
  count: initialCount,
  color = 'cornflower',
  isLiked: initialLiked = false,
  answerId,
}) => {
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  const toggleLike = useToggleAnswerLike();

  const [isLiked, setIsLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const peopleLiked =
    count === 0 ? '' : count === 1 ? '1 person liked' : `${count} people liked`;
  const cardClasses = cardColors[color];

  const LikeIcon = isLiked ? HeartFilledIcon : HeartLinearIcon;

  const handleToggleLike = async () => {
    if (!isAuthenticated) {
      toast.add({
        title: "Sign in to like other people's answers",
        type: 'info',
      });
      return;
    }

    try {
      setIsLiked((v) => !v);

      if (initialLiked) {
        setCount((v) => v - 1);
      } else {
        setCount((v) => v + 1);
      }

      await toggleLike.mutateAsync(answerId);
      router.refresh();
    } catch {
      setIsLiked(initialLiked);
      setCount(initialCount);
    }
  };

  return (
    <Text
      component={'div'}
      color={'secondary'}
      className={'flex items-center gap-1.5 leading-none'}
    >
      <span>{peopleLiked}</span>
      <button
        className={cn('cursor-pointer', isLiked && cardClasses.text)}
        onClick={handleToggleLike}
      >
        <LikeIcon className={'size-4'} />
      </button>
    </Text>
  );
};
