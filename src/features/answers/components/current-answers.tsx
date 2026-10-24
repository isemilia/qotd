import { FC } from 'react';
import {
  AnswerCard,
  AnswerCardSkeleton,
} from '@/features/answers/components/answer-card';
import { Text } from '@/ui/primitives/text';
import { getCurrentAnswers } from '@/server/utils/answers';
import { CardGrid } from '@/ui/primitives/card-grid';
import { DynamicPagination } from '@/ui/components/dynamic-pagination';

export const CurrentAnswers: FC<{ page: number }> = async ({ page }) => {
  try {
    const { answers, pagination } = await getCurrentAnswers({
      page,
    });

    if (!answers.length) {
      return (
        <Text className={'mt-4 text-[16px]'}>
          &#127811; Nothing here yet. Be the first to share your answer
        </Text>
      );
    }

    return (
      <div>
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
        {pagination.totalPages > 1 ? (
          <DynamicPagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            className={'mt-8'}
          />
        ) : null}
      </div>
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
