import { FC } from 'react';
import {
  AnswerCard,
  AnswerCardSkeleton,
} from '@/features/answers/components/answer-card';
import { Text } from '@/ui/primitives/text';
import { getCurrentAnswers } from '@/server/utils/answers';
import { CardGrid } from '@/ui/primitives/card-grid';

export const CurrentAnswers: FC = async () => {
  try {
    const answers = await getCurrentAnswers();

    if (!answers.length) {
      return (
        <Text className={'text-[16px] mt-4'}>
          &#127811; Nothing here yet. Be the first to share your answer
        </Text>
      );
    }

    return (
      <CardGrid className={'mt-8 max-md:mt-6'}>
        {answers.map((item) => {
          return (
            <AnswerCard
              key={item.id}
              id={item.id}
              answer={item.answer}
              question={item.question}
              createdAt={item.createdAt}
              likeCount={item.likeCount}
              isLiked={item.isLiked}
              color={item.color}
            />
          );
        })}
      </CardGrid>
    );
  } catch (e) {
    console.error(e);
    return (
      <Text className='mt-4 text-[16px]'>
        We couldn't load the answers right now
      </Text>
    );
  }
};

export const CurrentAnswersSkeleton = () => {
  return (
    <CardGrid className={'mt-8 max-md:mt-6'}>
      <AnswerCardSkeleton />
      <AnswerCardSkeleton />
      <AnswerCardSkeleton />
    </CardGrid>
  );
};
