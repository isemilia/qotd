import { FC } from 'react';
import { AnswerCard } from '@/features/answers/components/answer-card';
import { Text } from '@/ui/primitives/text';
import { getCurrentAnswers } from '@/server/utils/answers';

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
      <div
        className={
          'grid grid-cols-3 gap-4 mt-8 max-md:mt-6 max-md:grid-cols-2 max-sm:grid-cols-1'
        }
      >
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
