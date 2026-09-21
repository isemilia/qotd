import { Text } from '@/ui/primitives/text';
import { MessageLinearIcon } from '@/ui/icons/linear/message-linear.icon';
import { Button } from '@/ui/primitives/button';
import { CurrentQuestion } from '@/server/model/types';
import {
  AnswerCard,
  AnswerCardProps,
} from '@/features/answers/components/answer-card';
import { Footer } from '@/widgets/footer';
import { ContentContainer } from '@/ui/primitives/content-container';
import { CreateAnswerTrigger } from '@/widgets/create-answer-trigger';

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

  const answers: (AnswerCardProps & { id: string })[] = [
    {
      id: 'a1f7c3d2-8b41-4e6a-9f25-1c73b5d90418',
      question: 'What is something small that made you happy today?',
      answer:
        'I found a really good bakery on my way home and bought a pastry I had never tried before.',
      color: 'lavender',
      createdAt: '2026-09-17T08:42:00Z',
      likeCount: 12,
    },
    {
      id: 'b6d29e41-53fa-47c8-a102-9e64c7f31520',
      question: 'What is something small that made you happy today?',
      answer:
        'My cat decided to sit next to me while I was working. She usually pretends I do not exist.',
      color: 'cornflower',
      createdAt: '2026-09-17T09:15:00Z',
      likeCount: 7,
    },
    {
      id: 'c8e51a73-26bd-4f09-b684-2d91a7e50346',
      question: 'What is something small that made you happy today?',
      answer:
        'The weather was finally cool enough to open all the windows in the morning.',
      color: 'mint',
      createdAt: '2026-09-17T10:03:00Z',
      likeCount: 1,
    },
    {
      id: 'd3a947e2-71cf-45b8-8a16-6c52f9d80437',
      question: 'What is something small that made you happy today?',
      answer:
        'Someone held the door open for me when my hands were full. Tiny thing, but it made my morning.',
      color: 'peach',
      createdAt: '2026-09-17T10:37:00Z',
      likeCount: 18,
    },
    {
      id: 'e5c218f6-94da-4b37-a801-73f62d9ce145',
      question: 'What is something small that made you happy today?',
      answer: 'I finally finished a book I had been reading for months.',
      color: 'coral',
      createdAt: '2026-09-17T11:21:00Z',
      likeCount: 0,
    },
    {
      id: 'f7426b19-38de-4ca5-95e7-821d4a603257',
      question: 'What is something small that made you happy today?',
      answer:
        'I called an old friend I had not spoken to in a while, and it felt like no time had passed.',
      color: 'sand',
      createdAt: '2026-09-17T12:06:00Z',
      likeCount: 23,
    },
  ];

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

        <div
          className={
            'grid grid-cols-3 gap-4 mt-8 max-md:mt-6 max-md:grid-cols-2 max-sm:grid-cols-1'
          }
        >
          {answers.map((item) => {
            return (
              <AnswerCard
                key={item.id}
                answer={item.answer}
                question={item.question}
                createdAt={item.createdAt}
                likeCount={item.likeCount}
                color={item.color}
              />
            );
          })}
        </div>
      </ContentContainer>

      <Footer />
    </>
  );
};
