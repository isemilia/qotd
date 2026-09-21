'use client';

import { FC } from 'react';
import { Text } from '@/ui/primitives/text';
import { ControlledTextarea } from '@/ui/components/controlled-textarea';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button } from '@/ui/primitives/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { postAnswerClientSchema } from '@/features/answers/model/schemas';
import { z } from 'zod';
import { useCreateAnswer } from '@/features/answers/api/mutations';
import { ResponsiveModal } from '@/ui/components/responsive-modal';
import { useRouter } from 'next/navigation';

export const CreateAnswer: FC<{
  question: { id: string; question: string };
  isOpen: boolean;
  close: Function;
}> = ({ question, isOpen, close }) => {
  const router = useRouter();
  const submitAnswer = useCreateAnswer();

  const form = useForm({
    defaultValues: {
      answer: '',
    },
    resolver: zodResolver(postAnswerClientSchema),
    mode: 'all',
  });

  const handleSubmit = async (data: z.infer<typeof postAnswerClientSchema>) => {
    await submitAnswer.mutateAsync({
      questionId: question.id,
      answer: data.answer,
    });
    form.reset();
    router.refresh();
    close();
  };

  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={() => {
        if (isOpen) {
          close();
        }
      }}
      classNames={{ dialogContent: 'w-full max-w-[678px]!' }}
    >
      {/*<DialogHeader>*/}
      <Text component={'h2'} weight={'medium'} className={'text-[24px]'}>
        {question.question}
      </Text>
      {/*</DialogHeader>*/}

      <form>
        <ControlledTextarea
          name={'answer'}
          control={form.control}
          label={'Your answer'}
          required
          placeholder={'Enter your answer...'}
          maxLength={200}
        />
        <Text className={'mt-4 text-[12px]'} color={'secondary'}>
          Please keep it respectful. By submitting your answer, you confirm that
          you've read and agree to our{' '}
          <Text
            component={Link}
            href={'#'}
            decoration={'underline'}
            weight={'semibold'}
            color={'inherit'}
          >
            guidelines
          </Text>
        </Text>

        <div
          className={
            'mt-6 flex items-center gap-4 justify-end max-md:grid max-md:grid-cols-2 max-md:gap-3'
          }
        >
          <Button
            disabled={submitAnswer.isPending}
            onClick={() => close()}
            variant={'outline'}
          >
            Cancel
          </Button>
          <Button
            loading={submitAnswer.isPending}
            onClick={form.handleSubmit(handleSubmit)}
          >
            Share your thoughts
          </Button>
        </div>
      </form>
    </ResponsiveModal>
  );
};
