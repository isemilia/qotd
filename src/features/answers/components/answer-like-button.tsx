'use client';

import { FC, useState } from 'react';
import { cn } from '@/shared/utils/cn';
import { Text } from '@/ui/primitives/text';
import { cardColors } from '@/features/answers/model/constants';
import { HeartFilledIcon } from '@/ui/icons/filled/heart-filled.icon';
import { HeartLinearIcon } from '@/ui/icons/linear/heart-linear.icon';
import { AnswerCardColor } from '@/features/answers/components/answer-card';
import { useToggleAnswerLike } from '@/features/answers/api/mutations';
import { useRouter } from 'next/navigation';
import { useMe } from '@/features/auth/api/queries';
import { toast } from '@/ui/primitives/toast';

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

  const getMe = useMe();
  const isAuthenticated = Boolean(getMe.isSuccess && getMe.data.data.id);

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
