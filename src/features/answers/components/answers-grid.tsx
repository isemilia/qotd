import { getAnswers, GetAnswersArgs } from '@/server/utils/answers';
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

export const AnswersGrid: FC<
  { emptyStateText?: string } & GetAnswersArgs
> = async ({ emptyStateText, ...args }) => {
  const { answers, pagination } = await getAnswers({
    ...args,
  });

  if (!answers.length) {
    return (
      <Text className={'text-[16px] mt-4'}>
        &#127811; {emptyStateText || 'No answers here'}
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

export const AnswersGridSkeleton = () => {
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
