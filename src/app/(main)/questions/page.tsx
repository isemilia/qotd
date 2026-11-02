import { QuestionCard } from '@/features/questions/components/question-card';
import { getPreviousQuestions } from '@/server/utils/questions';
import { DynamicPagination } from '@/ui/components/dynamic-pagination';
import { ContentContainer } from '@/ui/primitives/content-container';
import { Text } from '@/ui/primitives/text';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Previous questions',
  description:
    'Browse previous daily questions and read the answers people shared.',
};

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page || 1));

  const { questions, pagination } = await getPreviousQuestions({ page });

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
          'mt-8 grid grid-cols-3 gap-4 max-md:mt-6 max-md:grid-cols-2 max-sm:grid-cols-1'
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

      <DynamicPagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        className={'mt-8'}
      />
    </ContentContainer>
  );
};

export default Page;
