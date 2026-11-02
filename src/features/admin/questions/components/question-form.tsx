'use client';

import { useGetUnavailableQuestionDates } from '@/features/admin/questions/api/queries';
import {
  adminQuestionFormSchema,
  AdminQuestionFormValues,
} from '@/features/admin/questions/model/schema';
import { ControlledDatePickerInput } from '@/ui/components/controlled-date-picker-input';
import { ControlledInput } from '@/ui/components/controlled-input';
import { ControlledTextarea } from '@/ui/components/controlled-textarea';
import { Button } from '@/ui/primitives/button';
import { Skeleton } from '@/ui/primitives/skeleton';
import { Text } from '@/ui/primitives/text';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const QuestionForm: FC<{
  defaultValues?: AdminQuestionFormValues;
  onSubmit?: (data: AdminQuestionFormValues) => void;
  onCancel?: () => void;
  isPending?: boolean;
  submitLabel?: string;
  actions?: ReactNode;
  helperText?: string;
}> = ({
  defaultValues,
  onSubmit,
  isPending,
  onCancel,
  submitLabel,
  actions,
  helperText,
}) => {
  const datesRequest = useGetUnavailableQuestionDates();
  const unavailableDates = datesRequest.data?.data?.map(
    (date) => new Date(date),
  );
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const form = useForm({
    defaultValues: defaultValues || {
      question: '',
      date: new Date(),
      creditName: '',
    },
    resolver: zodResolver(adminQuestionFormSchema),
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues]);

  const handleSubmit = (data: AdminQuestionFormValues) => {
    onSubmit?.(data);
  };

  return (
    <div>
      <form>
        <div className={'space-y-4'}>
          <ControlledTextarea
            name={'question'}
            label={'Question'}
            placeholder={'Enter question...'}
            required
            control={form.control}
            maxLength={200}
          />

          <div className={'grid grid-cols-2 gap-3'}>
            <ControlledDatePickerInput
              key={datesRequest.dataUpdatedAt}
              label={'Date'}
              required
              name={'date'}
              control={form.control}
              placeholder={'Select a date...'}
              unavailableDates={unavailableDates}
              minDate={tomorrow}
            />
            <ControlledInput
              label={'Credit name (optional)'}
              name={'creditName'}
              control={form.control}
              placeholder={'Enter credit name...'}
            />
          </div>
        </div>

        <Text className={'mt-4 text-[12px]'} color={'secondary'}>
          {helperText ||
            'The question will be published on the selected date. If someone suggested it, you can credit them by adding their name'}
        </Text>

        <div
          className={
            'mt-6 flex items-center justify-between gap-4 max-md:grid max-md:grid-cols-2 max-md:gap-3'
          }
        >
          <div className={'flex items-center gap-4'}>{actions}</div>
          <div className={'flex items-center gap-4'}>
            <Button disabled={isPending} onClick={onCancel} variant={'outline'}>
              Cancel
            </Button>
            <Button
              loading={isPending}
              onClick={form.handleSubmit(handleSubmit)}
            >
              {submitLabel || 'Submit'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export const QuestionFormSkeleton = () => {
  return (
    <div>
      <Skeleton className={'h-[164px]'} />
      <div className={'mt-4 grid grid-cols-2 gap-3'}>
        <Skeleton className={'h-[74px]'} />
        <Skeleton className={'h-[74px]'} />
      </div>
      <Skeleton className={'mt-4 h-[28px]'} />
      <div className={'mt-6 flex justify-end'}>
        <Skeleton className={'h-[34px] w-[220px]'} />
      </div>
    </div>
  );
};
