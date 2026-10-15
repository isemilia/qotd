'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { ControlledTextarea } from '@/ui/components/controlled-textarea';

export const QuestionForm: FC = () => {
  const form = useForm();

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
      </form>
    </div>
  );
};
