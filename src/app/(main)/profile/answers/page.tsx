import { getAnswers } from '@/server/utils/answers';
import { getCurrentUser } from '@/server/utils/session';
import { AnswerCard } from '@/features/answers/components/answer-card';
import { Text } from '@/ui/primitives/text';

const Page = async () => {
  const user = await getCurrentUser();
  const { answers } = await getAnswers({ userId: user?.id });

  if (!answers.length) {
    return (
      <Text className={'text-[16px] mt-4'}>
        &#127811; Your answers will appear here. Start with today's question
      </Text>
    );
  }

  return (
    <div
      className={'grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1'}
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
};

export default Page;
