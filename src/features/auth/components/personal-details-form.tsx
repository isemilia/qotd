'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePersonalDetailsClientSchema } from '@/features/auth/model/schemas';
import { ControlledInput } from '@/ui/components/controlled-input';
import { cn } from '@/shared/utils/cn';
import { Button } from '@/ui/primitives/button';
import { PersonalDetailsFormValues } from '@/features/auth/model/types';
import { useChangePersonalDetails } from '@/features/auth/api/mutations';

export const PersonalDetailsForm: FC<{
  className?: string;
  defaultValues?: PersonalDetailsFormValues;
}> = ({ className, defaultValues }) => {
  const form = useForm({
    defaultValues: {
      name: defaultValues?.name || '',
      email: defaultValues?.email || '',
    },
    resolver: zodResolver(changePersonalDetailsClientSchema),
    mode: 'onSubmit',
  });

  const changePersonalDetails = useChangePersonalDetails();

  const handleSubmit = async (data: PersonalDetailsFormValues) => {
    if (form.formState.isDirty) {
      await changePersonalDetails.mutateAsync({ name: data.name });
    }
  };

  return (
    <form className={cn(className, '')}>
      <div className={'space-y-4'}>
        <ControlledInput
          name={'name'}
          label={'Name'}
          variant={'foreground'}
          control={form.control}
        />
        <ControlledInput
          name={'email'}
          label={'Email'}
          variant={'foreground'}
          control={form.control}
          description={'Email address cannot be changed'}
          disabled
        />
      </div>
      <div className={'mt-6 flex items-center gap-4'}>
        <Button
          loading={changePersonalDetails.isPending}
          onClick={form.handleSubmit(handleSubmit)}
        >
          Save changes
        </Button>
        <Button
          disabled={changePersonalDetails.isPending}
          onClick={() => {
            form.reset(defaultValues);
          }}
          variant={'outline'}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
