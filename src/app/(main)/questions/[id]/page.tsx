import { getQuestionById } from '@/server/utils/questions';
import { ContentContainer } from '@/ui/primitives/content-container';
import { Text } from '@/ui/primitives/text';
import { Calendar } from 'lucide-react';
import { MessageLinearIcon } from '@/ui/icons/linear/message-linear.icon';
import { formatLongDate } from '@/shared/utils/format-long-date';
import { getAnswers } from '@/server/utils/answers';
import { AnswerCard } from '@/features/answers/components/answer-card';
import { DynamicPagination } from '@/ui/components/dynamic-pagination';
import { BackLink } from '@/ui/components/back-link';

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page: string }>;
}) => {
  const { id: questionId } = await params;
  const { page: _page } = await searchParams;

  const question = await getQuestionById(questionId);

  const page = Math.max(1, Number(_page || 1));
  const { answers, pagination } = await getAnswers({
    questionId,
    pageSize: 9,
    page,
  });

  const date = formatLongDate(question.date);
  const answerCountText =
    question.answerCount === 0
      ? null
      : question.answerCount === 1
        ? '1 answer'
        : `${question.answerCount} answers`;

  const renderAnswers = () => {
    if (!answers.length) {
      return (
        <Text className={'text-[16px] mt-4'}>
          &#127811; This question went unanswered
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
  };

  return (
    <div>
      <div className={'bg-single-question-hero'}>
        <ContentContainer className={'py-17.5 max-md:py-10'}>
          <BackLink />
          <Text
            component={'h1'}
            className={
              'text-[48px] max-lg:text-[40px] max-md:text-[36px] leading-[122%] max-w-[720px] max-sm:whitespace-normal whitespace-pre-wrap mt-5 max-sm:mt-8'
            }
            weight={'semibold'}
          >
            {question.question}
          </Text>

          <div className={'flex items-center gap-5 mt-5'}>
            <Text
              color={'secondary'}
              className={'text-[14px] flex items-center gap-2'}
            >
              <Calendar className={'size-4'} />
              {date}
            </Text>
            <Text
              color={'secondary'}
              className={'text-[14px] flex items-center gap-2'}
            >
              <MessageLinearIcon className={'size-4'} />
              {answerCountText}
            </Text>
          </div>
        </ContentContainer>
      </div>

      <ContentContainer className={'mt-10 max-md:pb-15'}>
        <Text
          weight={'semibold'}
          className={'text-[32px] max-md:text-[28px]'}
          id={'answers'}
        >
          Community answers
        </Text>
        {renderAnswers()}
        {pagination.totalPages > 1 ? (
          <DynamicPagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            className={'mt-8'}
          />
        ) : null}
      </ContentContainer>
    </div>
  );
};

export default Page;
