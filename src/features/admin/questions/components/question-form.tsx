'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { ControlledTextarea } from '@/ui/components/controlled-textarea';
import { ControlledDatePickerInput } from '@/ui/components/controlled-date-picker-input';

export const QuestionForm: FC = () => {
  const form = useForm({
    defaultValues: {
      question: '',
      date: new Date(),
    },
  });

  return (
    <div>
      <form className={'space-y-4'}>
        <ControlledTextarea
          name={'question'}
          label={'Question'}
          required
          control={form.control}
          maxLength={200}
        />

        <ControlledDatePickerInput name={'date'} control={form.control} />
      </form>
    </div>
  );
};
