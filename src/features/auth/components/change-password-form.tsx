'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { ControlledInput } from '@/ui/components/controlled-input';
import { Button } from '@/ui/primitives/button';

export const ChangePasswordForm: FC<{
  className?: string;
}> = ({ className }) => {
  const form = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const handleSubmit = () => {
    console.log('ok');
  };

  return (
    <form className={className}>
      <div>
        <div className={'space-y-4'}>
          <ControlledInput
            name={'currentPassword'}
            label={'Current password'}
            variant={'foreground'}
            control={form.control}
          />
          <div className={'grid grid-cols-2 gap-3'}>
            <ControlledInput
              name={'newPassword'}
              label={'New password'}
              variant={'foreground'}
              control={form.control}
            />
            <ControlledInput
              name={'confirmNewPassword'}
              label={'Confirm new password'}
              variant={'foreground'}
              control={form.control}
            />
          </div>
        </div>

        <div className={'mt-6 flex items-center gap-4'}>
          <Button
            // loading={changePersonalDetails.isPending}
            onClick={form.handleSubmit(handleSubmit)}
          >
            Save changes
          </Button>
          <Button
            // disabled={changePersonalDetails.isPending}
            onClick={() => {
              form.reset();
            }}
            variant={'outline'}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};
