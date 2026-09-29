'use client';

import { FC } from 'react';
import { ResponsiveModal } from '@/ui/components/responsive-modal';
import { useForm } from 'react-hook-form';
import { Text } from '@/ui/primitives/text';
import { ControlledTextarea } from '@/ui/components/controlled-textarea';
import { ControlledInput } from '@/ui/components/controlled-input';
import Link from 'next/link';
import { Button } from '@/ui/primitives/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { suggestQuestionClientSchema } from '@/features/question-suggestions/model/schemas';
import { z } from 'zod';
import { useCreateQuestionSuggestion } from '@/features/question-suggestions/api/mutations';

export const SuggestQuestion: FC<{ isOpen: boolean; close: Function }> = ({
  isOpen,
  close,
}) => {
  const form = useForm({
    defaultValues: {
      question: '',
      creditName: '',
    },
    resolver: zodResolver(suggestQuestionClientSchema),
  });

  const suggestQuestion = useCreateQuestionSuggestion();

  const handleSubmit = async (
    data: z.infer<typeof suggestQuestionClientSchema>,
  ) => {
    await suggestQuestion.mutateAsync({
      creditName: data.creditName || null,
      question: data.question,
    });

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
      classNames={{
        dialogContent: 'w-full max-w-[678px]!',
      }}
    >
      <div>
        <Text component={'h2'} weight={'medium'} className={'text-[24px]'}>
          Suggest a question
        </Text>
        <Text color={'secondary'} className={'text-[14px] mt-3'}>
          What's something you've always wanted to ask other people? Submit your
          question below and it could become a future question of the day
        </Text>
      </div>
      <form>
        <div className={'space-y-4'}>
          <ControlledTextarea
            name={'question'}
            control={form.control}
            label={'Your question'}
            required
            placeholder={'Enter your question...'}
            maxLength={200}
          />
          <ControlledInput
            name={'creditName'}
            label={'Want to be credited? (Optional)'}
            subtitle={
              'If we feature your question, you can have your name displayed alongside it'
            }
            placeholder={'Enter your name...'}
            control={form.control}
          />

          <Text color={'secondary'} className={'text-[12px]'}>
            Please keep your question respectful and in line with our{' '}
            <Text
              component={Link}
              href={'#'}
              color={'inherit'}
              weight={'semibold'}
            >
              guidelines
            </Text>
          </Text>
        </div>

        <div
          className={
            'mt-6 flex items-center gap-4 justify-end max-md:grid max-md:grid-cols-2 max-md:gap-3'
          }
        >
          <Button
            disabled={suggestQuestion.isPending}
            onClick={() => close()}
            variant={'outline'}
          >
            Cancel
          </Button>
          <Button
            loading={suggestQuestion.isPending}
            onClick={form.handleSubmit(handleSubmit)}
          >
            Submit your question
          </Button>
        </div>
      </form>
    </ResponsiveModal>
  );
};
