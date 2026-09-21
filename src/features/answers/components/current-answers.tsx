import { FC } from 'react';
import { getCurrentAnswers } from '@/features/answers/api/requests';
import { AnswerCard } from '@/features/answers/components/answer-card';
import { Text } from '@/ui/primitives/text';

export const CurrentAnswers: FC = async () => {
  try {
    const answers = await getCurrentAnswers();

    if (!answers.data.length) {
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
        {answers.data.map((item) => {
          return (
            <AnswerCard
              key={item.id}
              answer={item.answer}
              question={item.question.question}
              createdAt={item.createdAt}
              likeCount={item.likeCount}
              color={'cornflower'}
            />
          );
        })}
      </div>
    );
  } catch (e) {
    console.error(e);
    return (
      <Text className='mt-4 text-[16px]'>
        We couldn’t load the answers right now.
      </Text>
    );
  }
};
