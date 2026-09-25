import { ContentContainer } from '@/ui/primitives/content-container';
import { getAnswers } from '@/server/utils/answers';
import { getCurrentUser } from '@/server/utils/session';
import { AnswerCard } from '@/features/answers/components/answer-card';

const Page = async () => {
  const user = await getCurrentUser();
  const answers = await getAnswers({ userId: user?.id });

  return (
    <ContentContainer className={'mt-8 max-md:mt-6 max-md:pb-10'}>
      <div
        className={
          'grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1'
        }
      >
        {answers.map((item) => {
          return (
            <AnswerCard
              key={item.id}
              id={item.id}
              answer={item.answer}
              question={item.question.question}
              createdAt={item.createdAt}
              likeCount={item.likeCount}
              isLiked={item.isLiked}
              color={item.color}
            />
          );
        })}
      </div>
    </ContentContainer>
  );
};

export default Page;
