import { getCurrentUser } from '@/server/utils/session';
import { getAnswers } from '@/server/utils/answers';
import { Text } from '@/ui/primitives/text';
import {
  AnswerCard,
  AnswerCardSkeleton,
} from '@/features/answers/components/answer-card';
import { CardGrid } from '@/ui/primitives/card-grid';
import {
  DynamicPagination,
  DynamicPaginationSkeleton,
} from '@/ui/components/dynamic-pagination';
import { FC } from 'react';

export const MyAnswers: FC<{ page: number }> = async ({ page }) => {
  const user = await getCurrentUser();
  const { answers, pagination } = await getAnswers({ userId: user?.id, page });

  if (!answers.length) {
    return (
      <Text className={'text-[16px] mt-4'}>
        &#127811; Your answers will appear here. Start with today's question
      </Text>
    );
  }

  return (
    <div>
      <CardGrid>
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
};

export const MyAnswersSkeleton = () => {
  return (
    <div>
      <CardGrid className={'mt-8 max-md:mt-6'}>
        <AnswerCardSkeleton />
        <AnswerCardSkeleton />
        <AnswerCardSkeleton />
      </CardGrid>
      <DynamicPaginationSkeleton className={'mt-8 rounded-[8px]'} />
    </div>
  );
};
