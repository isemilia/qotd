'use client';

import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ControlledRadioField } from '@/ui/components/controlled-radio-field';
import { ControlledTextarea } from '@/ui/components/controlled-textarea';
import { Text } from '@/ui/primitives/text';
import { Button } from '@/ui/primitives/button';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RejectAdminSuggestionForm,
  rejectAdminSuggestionForm,
} from '@/features/admin/suggestions/model/schema';

export const RejectSuggestionForm: FC = () => {
  const form = useForm({
    defaultValues: {
      reason: 'unsuitable',
      otherReason: '',
    },
    resolver: zodResolver(rejectAdminSuggestionForm),
  });

  const reason = form.watch('reason');

  useEffect(() => {
    if (reason === 'other') {
      form.setFocus('otherReason');
    }
  }, [reason]);

  const handleSubmit = (data: RejectAdminSuggestionForm) => {
    console.log(data);
  };

  return (
    <form>
      <div className={'space-y-4'}>
        <ControlledRadioField
          control={form.control}
          name={'reason'}
          label={'Reason for rejection'}
          options={[
            { label: 'Not a good fit for Commonly', name: 'unsuitable' },
            { label: 'Duplicate question', name: 'duplicate' },
            { label: 'Inappropriate content', name: 'inappropriate' },
            { label: 'Unclear or poorly phrased', name: 'unclear' },
            { label: 'Other', name: 'other' },
          ]}
        />

        {reason === 'other' ? (
          <ControlledTextarea
            name={'otherReason'}
            control={form.control}
            label={'Please specify'}
            placeholder={'Provide additional context...'}
          />
        ) : null}

        <Text className={'text-[12px]'} color={'secondary'}>
          This action cannot be undone. The suggestion will be marked as
          rejected and cannot be approved later
        </Text>
      </div>

      <div
        className={
          'mt-6 flex items-center gap-4 justify-end max-md:grid max-md:grid-cols-2 max-md:gap-3'
        }
      >
        <Button
          // disabled={isPending}
          onClick={() => close()}
          variant={'outline'}
        >
          Cancel
        </Button>
        <Button
          variant={'destructive'}
          // loading={isPending}
          onClick={form.handleSubmit(handleSubmit)}
        >
          Reject suggestion
        </Button>
      </div>
    </form>
  );
};
