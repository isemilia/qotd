'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ControlledTextarea } from '@/ui/components/controlled-textarea';
import { DatePickerInput } from '@/ui/components/controlled-calendar-input';

export const QuestionForm: FC = () => {
  const form = useForm();

  const [date, setDate] = useState<Date | null | undefined>(new Date());

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

        <DatePickerInput label={'Date'} value={date} onChange={setDate} />
      </form>
    </div>
  );
};
