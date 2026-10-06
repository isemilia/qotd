import { getQuestionById } from '@/server/utils/questions';
import { ContentContainer } from '@/ui/primitives/content-container';
import { Text } from '@/ui/primitives/text';
import { ArrowLeft, Calendar } from 'lucide-react';
import { MessageLinearIcon } from '@/ui/icons/linear/message-linear.icon';
import { formatLongDate } from '@/shared/utils/format-long-date';
import Link from 'next/link';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: questionId } = await params;

  const question = await getQuestionById(questionId);

  const date = formatLongDate(question.date);
  const answerCountText =
    question.answerCount === 0
      ? null
      : question.answerCount === 1
        ? '1 answer'
        : `${question.answerCount} answers`;

  return (
    <div className={'bg-single-question-hero'}>
      <ContentContainer className={'py-[70px]'}>
        <Text
          component={Link}
          href={'/questions'}
          color={'secondary'}
          className={'text-[14px] flex items-center gap-2'}
        >
          <ArrowLeft className={'size-4'} />
          Previous questions
        </Text>
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
  );
};

export default Page;
