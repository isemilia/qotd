import { Text } from '@/ui/primitives/text';
import { MessageLinearIcon } from '@/ui/icons/linear/message-linear.icon';
import { Button } from '@/ui/primitives/button';

export default function Home() {
  const date = 'September 9, 2026';
  const question = 'If you had to teach something, \nwhat would you teach?';
  const answerCount = 128;

  return (
    <div className={'bg-home-hero min-h-[600px] px-15 max-md:px-5'}>
      <div className={'content-container pt-[100px]'}>
        <Text
          color={'secondary'}
          weight={'medium'}
          font={'mono'}
          className={'uppercase tracking-[2px] max-lg:text-[14px]'}
        >
          Today's question
        </Text>
        <Text color={'secondary'} className={'mt-2 max-lg:text-[14px]'}>
          {date}
        </Text>

        <Text
          component={'h1'}
          className={
            'text-[48px] max-lg:text-[40px] max-md:text-[36px] leading-[122%] max-w-[720px] max-sm:whitespace-normal whitespace-pre-wrap mt-5'
          }
          weight={'semibold'}
        >
          {question}
        </Text>
        <Text
          color={'secondary'}
          className={'flex items-center gap-2 mt-4 max-lg:text-[14px]'}
        >
          <MessageLinearIcon />
          <span>{answerCount} people already answered</span>
        </Text>

        <div className={'flex items-center gap-6 mt-6'}>
          <Button>Share your answer</Button>
          <Button variant={'text'}>Suggest a question</Button>
        </div>
      </div>
    </div>
  );
}
