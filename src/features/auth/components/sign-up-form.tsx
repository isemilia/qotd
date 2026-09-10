'use client';

import { FC } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpClientSchema } from '@/features/auth/model/schemas';
import { Text } from '@/ui/primitives/text';
import Link from 'next/link';
import { ControlledInput } from '@/ui/components/controlled-input';
import { Button } from '@/ui/primitives/button';
import { z } from 'zod';
import { InlineLink } from '@/ui/components/inline-link';
import { ControlledCheckbox } from '@/ui/components/controlled-checkbox';
import { useCreateAccount } from '@/features/auth/api/mutations';

export const SignUpForm: FC = () => {
  const form = useForm({
    resolver: zodResolver(signUpClientSchema),
    mode: 'all',
  });

  const createAccount = useCreateAccount();

  const handleSubmit = async (data: z.infer<typeof signUpClientSchema>) => {
    await createAccount.mutateAsync({
      name: data.name,
      email: data.email,
      password: data.password,
      termsAndGuidelinesAccepted: data.termsAndGuidelinesAccepted,
    });
  };

  return (
    <div>
      <div className={'flex flex-col items-center gap-1.5'}>
        <Link href={'/'}>
          <Image src={'/logo.svg'} alt={'Logo'} width={77} height={23} />
        </Link>
        <Text color={'secondary'} className={'text-[14px]'}>
          One question, countless perspectives
        </Text>
      </div>

      <div className={'flex flex-col gap-2 mt-5'}>
        <Text component={'h1'} weight={'semibold'} className={'text-[24px]'}>
          Sign up
        </Text>
        <Text className={'text-[14px]'}>
          Create a free account to join the conversation
        </Text>
      </div>

      <form className={'mt-4 '}>
        <div className={'space-y-4'}>
          <ControlledInput
            name={'name'}
            label={'Name'}
            placeholder={'Enter your name...'}
            description={
              "Your name is only visible to you and won't be shown with your answers"
            }
            required
            control={form.control}
          />
          <ControlledInput
            name={'email'}
            label={'Email'}
            placeholder={'Enter your email...'}
            required
            control={form.control}
          />
          <ControlledInput
            type={'password'}
            name={'password'}
            label={'Password'}
            placeholder={'Enter your password...'}
            required
            control={form.control}
          />
          <ControlledInput
            type={'password'}
            name={'confirmPassword'}
            label={'Confirm password'}
            placeholder={'Confirm your password...'}
            required
            control={form.control}
          />
          <ControlledCheckbox
            control={form.control}
            name={'termsAndGuidelinesAccepted'}
            label={
              <>
                I agree to the{' '}
                <InlineLink href={'#'}>Terms of Service</InlineLink> and{' '}
                <InlineLink href={'#'}>Community Guidelines</InlineLink>, and I
                have read the <InlineLink href={'#'}>Privacy Policy</InlineLink>
              </>
            }
          />
        </div>
        <div className={'mt-6 flex flex-col items-center gap-3'}>
          <Button
            className={' w-full max-w-[354px]'}
            onClick={form.handleSubmit(handleSubmit)}
            loading={createAccount.isPending}
          >
            Create account
          </Button>
          <Text color={'secondary'} className={'text-[14px]'}>
            Already have an account?{' '}
            <InlineLink href={'/sign-in'}>Sign in</InlineLink>
          </Text>
        </div>
      </form>
    </div>
  );
};
