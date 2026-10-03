import { FC } from 'react';
import { Text } from '@/ui/primitives/text';
import { ChevronRight, Dot } from 'lucide-react';
import Link from 'next/link';
import { formatLongDate } from '@/shared/utils/format-long-date';

export const QuestionCard: FC<{
  question: string;
  date: string;
  answerCount: number;
  id: string;
}> = ({ question, date: _date, answerCount, id }) => {
  const date = formatLongDate(_date);
  const answerCountText =
    answerCount === 0
      ? null
      : answerCount === 1
        ? '1 answer'
        : `${answerCount} answers`;
  const href = `/questions/${id}`;

  return (
    <Link
      href={href}
      className={
        'bg-foreground shadow-card py-4 px-5 rounded-[16px] flex flex-col gap-3 transition-all hover:[&_.chevron]:translate-x-[6px]'
      }
    >
      <Text className={'text-[16px] flex-1'} weight={'medium'}>
        {question}
      </Text>
      <Text
        component={'div'}
        color={'secondary'}
        className={'flex items-center justify-between'}
      >
        <Text
          className={'flex items-center gap-1 text-[12px]'}
          color={'inherit'}
        >
          <span>{date}</span>
          {answerCountText && (
            <>
              <Dot className={'size-3'} />
              <span>{answerCountText}</span>
            </>
          )}
        </Text>
        <ChevronRight className={'chevron transition-transform size-4'} />
      </Text>
    </Link>
  );
};
