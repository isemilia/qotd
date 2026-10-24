import { Text } from '@/ui/primitives/text';
import { MessageLinearIcon } from '@/ui/icons/linear/message-linear.icon';
import { Button } from '@/ui/primitives/button';
import { ContentContainer } from '@/ui/primitives/content-container';
import { CreateAnswerTrigger } from '@/widgets/create-answer-trigger';
import {
  CurrentAnswers,
  CurrentAnswersSkeleton,
} from '@/features/answers/components/current-answers';
import { SuggestQuestionTrigger } from '@/widgets/suggest-question-trigger';
import { FC, Suspense } from 'react';
import { getCurrentQuestion } from '@/server/utils/questions';

export const HomeView: FC<{ page: number }> = async ({ page }) => {
  const currentQuestion = await getCurrentQuestion();

  const formattedDate = new Date(
    `${currentQuestion.date}T00:00:00`,
  ).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }); // 'September 9, 2026';

  const answerCount = currentQuestion.answerCount;
  const peopleAnswered =
    answerCount === 0
      ? 'Be the first one to answer'
      : answerCount === 1
        ? '1 person already answered'
        : `${answerCount} people already answered`;

  return (
    <>
      <ContentContainer
        className={
          'bg-home-hero min-h-[600px] pt-[100px] pb-[80px] max-lg:min-h-auto max-lg:pb-[100px] max-md:min-h-[90vh] max-md:pt-[70px] max-md:pb-[70px]'
        }
      >
        <Text
          color={'secondary'}
          weight={'medium'}
          font={'mono'}
          className={'tracking-[2px] uppercase max-lg:text-[14px]'}
        >
          Today's question
        </Text>
        <Text color={'secondary'} className={'mt-2 max-lg:text-[14px]'}>
          {formattedDate}
        </Text>

        <Text
          component={'h1'}
          className={
            'mt-5 max-w-[720px] text-[48px] leading-[122%] whitespace-pre-wrap max-lg:text-[40px] max-md:text-[36px] max-sm:mt-8 max-sm:whitespace-normal'
          }
          weight={'semibold'}
        >
          {currentQuestion.question}
        </Text>
        <Text
          component={'a'}
          href={'#answers'}
          color={'secondary'}
          className={
            'hover:text-primary mt-4 flex items-center gap-2 max-lg:text-[14px] max-sm:mt-4'
          }
        >
          <MessageLinearIcon className={'size-4'} />
          <span>{peopleAnswered}</span>
        </Text>

        <div className={'mt-6 flex items-center gap-6 max-sm:mt-9'}>
          <CreateAnswerTrigger
            question={{
              id: currentQuestion.id,
              question: currentQuestion.question,
            }}
          >
            <Button>Share your answer</Button>
          </CreateAnswerTrigger>
          <SuggestQuestionTrigger>
            <Button variant={'text'}>Suggest a question</Button>
          </SuggestQuestionTrigger>
        </div>
      </ContentContainer>

      <ContentContainer className={'mt-10 max-md:pb-15'}>
        <Text
          weight={'semibold'}
          className={'text-[32px] max-md:text-[28px]'}
          id={'answers'}
        >
          Community answers
        </Text>

        <Suspense fallback={<CurrentAnswersSkeleton />}>
          <CurrentAnswers page={page} />
        </Suspense>
      </ContentContainer>
    </>
  );
};
