'use client';

import { adminAnswerHideReasonOptions } from '@/features/admin/answers/model/constants';
import {
  HideAdminAnswerForm,
  hideAdminAnswerForm,
} from '@/features/admin/answers/model/schema';
import { ControlledRadioField } from '@/ui/components/controlled-radio-field';
import { ControlledTextarea } from '@/ui/components/controlled-textarea';
import { Button } from '@/ui/primitives/button';
import { Text } from '@/ui/primitives/text';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const HideAnswerForm: FC<{
  onSubmit?: (data: HideAdminAnswerForm) => void;
  isPending?: boolean;
  onCancel?: () => void;
}> = ({ isPending, onSubmit, onCancel }) => {
  const form = useForm({
    defaultValues: { reason: 'irrelevant', otherReason: '' },
    resolver: zodResolver(hideAdminAnswerForm),
  });

  const reason = form.watch('reason');

  useEffect(() => {
    if (reason === 'other') {
      form.setFocus('otherReason');
    }
  }, [reason]);

  const handleSubmit = (data: HideAdminAnswerForm) => {
    onSubmit?.(data);
  };

  return (
    <form>
      <div className={'space-y-4'}>
        <ControlledRadioField
          name={'reason'}
          label={'Reason'}
          options={adminAnswerHideReasonOptions}
          control={form.control}
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
          This answer will no longer be visible to other users. You can review
          its moderation status in the admin panel. If there was a mistake, the
          answer can be restored later
        </Text>
      </div>

      <div
        className={
          'mt-6 flex items-center justify-end gap-4 max-md:grid max-md:grid-cols-2 max-md:gap-3'
        }
      >
        <Button disabled={isPending} onClick={onCancel} variant={'outline'}>
          Cancel
        </Button>
        <Button
          variant={'destructive'}
          loading={isPending}
          onClick={form.handleSubmit(handleSubmit)}
        >
          Hide answer
        </Button>
      </div>
    </form>
  );
};
