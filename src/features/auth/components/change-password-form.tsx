'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { ControlledInput } from '@/ui/components/controlled-input';
import { Button } from '@/ui/primitives/button';
import { useChangePassword } from '@/features/auth/api/mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordClientSchema } from '@/features/auth/model/schemas';
import { z } from 'zod';
import { toast } from '@/ui/primitives/toast';

export const ChangePasswordForm: FC<{
  className?: string;
}> = ({ className }) => {
  const form = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: zodResolver(changePasswordClientSchema),
  });

  const changePassword = useChangePassword();

  const handleSubmit = async (
    data: z.infer<typeof changePasswordClientSchema>,
  ) => {
    try {
      await changePassword.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      form.reset();
    } catch (e) {
      if (
        e instanceof Error &&
        e.message.includes('Invalid current password')
      ) {
        form.setError('currentPassword', { message: e.message });

        return;
      }

      toast.add({
        type: 'error',
        title: 'Could not change password',
        description: 'Something went wrong. Please try again later',
      });
    }
  };

  return (
    <form className={className}>
      <div>
        <div className={'space-y-4'}>
          <ControlledInput
            type={'password'}
            name={'currentPassword'}
            label={'Current password'}
            placeholder={'Enter current password...'}
            variant={'foreground'}
            control={form.control}
          />
          <div className={'grid grid-cols-2 gap-3'}>
            <ControlledInput
              type={'password'}
              name={'newPassword'}
              label={'New password'}
              placeholder={'Enter new password...'}
              variant={'foreground'}
              control={form.control}
            />
            <ControlledInput
              type={'password'}
              name={'confirmNewPassword'}
              label={'Confirm new password'}
              placeholder={'Confirm new password...'}
              variant={'foreground'}
              control={form.control}
            />
          </div>
        </div>

        <div className={'mt-6 flex items-center gap-4'}>
          <Button
            loading={changePassword.isPending}
            onClick={form.handleSubmit(handleSubmit)}
          >
            Save changes
          </Button>
          <Button
            disabled={changePassword.isPending}
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
