import { Text } from '@/ui/primitives/text';
import { MessageLinearIcon } from '@/ui/icons/linear/message-linear.icon';
import { Button } from '@/ui/primitives/button';
import { CurrentQuestion } from '@/server/model/types';
import { Footer } from '@/widgets/footer';
import { ContentContainer } from '@/ui/primitives/content-container';
import { CreateAnswerTrigger } from '@/widgets/create-answer-trigger';
import { CurrentAnswers } from '@/features/answers/components/current-answers';

export const HomeView = ({
  currentQuestion,
}: {
  currentQuestion: CurrentQuestion;
}) => {
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
          'pt-[100px] pb-[80px] max-md:pt-[70px] max-lg:pb-[100px] max-md:pb-[70px] bg-home-hero min-h-[600px] max-lg:min-h-auto max-md:min-h-[90vh]'
        }
      >
        <Text
          color={'secondary'}
          weight={'medium'}
          font={'mono'}
          className={'uppercase tracking-[2px] max-lg:text-[14px]'}
        >
          Today's question
        </Text>
        <Text color={'secondary'} className={'mt-2 max-lg:text-[14px]'}>
          {formattedDate}
        </Text>

        <Text
          component={'h1'}
          className={
            'text-[48px] max-lg:text-[40px] max-md:text-[36px] leading-[122%] max-w-[720px] max-sm:whitespace-normal whitespace-pre-wrap mt-5 max-sm:mt-8'
          }
          weight={'semibold'}
        >
          {currentQuestion.question}
        </Text>
        <Text
          color={'secondary'}
          className={
            'flex items-center gap-2 mt-4 max-lg:text-[14px] max-sm:mt-4'
          }
        >
          <MessageLinearIcon className={'size-4'} />
          <span>{peopleAnswered}</span>
        </Text>

        <div className={'flex items-center gap-6 mt-6 max-sm:mt-9'}>
          <CreateAnswerTrigger
            question={{
              id: currentQuestion.id,
              question: currentQuestion.question,
            }}
          >
            <Button>Share your answer</Button>
          </CreateAnswerTrigger>
          <Button variant={'text'}>Suggest a question</Button>
        </div>
      </ContentContainer>

      <ContentContainer className={'mt-10 max-md:pb-15'}>
        <Text weight={'semibold'} className={'text-[32px] max-md:text-[28px]'}>
          Community answers
        </Text>

        <CurrentAnswers />
      </ContentContainer>

      <Footer />
    </>
  );
};
