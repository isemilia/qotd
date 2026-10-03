import { ContentContainer } from '@/ui/primitives/content-container';
import { Text } from '@/ui/primitives/text';
import { QuestionCard } from '@/features/questions/components/question-card';
import { getPreviousQuestions } from '@/server/utils/questions';

const Page = async () => {
  const { questions, pagination } = await getPreviousQuestions();

  // {
  //   page,
  //     pageSize,
  // }
  return (
    <ContentContainer className={'mt-10 max-md:pb-15'}>
      <Text
        weight={'semibold'}
        className={'text-[32px] max-md:text-[28px]'}
        id={'answers'}
      >
        Previous questions
      </Text>

      <div
        className={
          'grid grid-cols-3 gap-4 mt-8 max-md:mt-6 max-md:grid-cols-2 max-sm:grid-cols-1'
        }
      >
        {questions.map((item) => {
          return (
            <QuestionCard
              key={item.id}
              question={item.question}
              id={item.id}
              date={item.date}
              answerCount={item.answerCount}
            />
          );
        })}
      </div>
    </ContentContainer>
  );
};

export default Page;
