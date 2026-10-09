'use client';

import { FC } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInClientSchema } from '@/features/auth/model/schemas';
import { Text } from '@/ui/primitives/text';
import Link from 'next/link';
import { ControlledInput } from '@/ui/components/controlled-input';
import { Button } from '@/ui/primitives/button';
import { z } from 'zod';
import { InlineLink } from '@/ui/components/inline-link';
import { useSignIn } from '@/features/auth/api/mutations';

export const SignInForm: FC = () => {
  const form = useForm({
    defaultValues: {
      password: '',
      email: '',
    },
    resolver: zodResolver(signInClientSchema),
    mode: 'all',
  });

  const signIn = useSignIn();

  const handleSubmit = async (data: z.infer<typeof signInClientSchema>) => {
    await signIn.mutateAsync({
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });
  };

  return (
    <div>
      <div className={'flex flex-col items-center gap-1.5'}>
        <Link href={'/'}>
          <Image
            src={'/logo.svg'}
            alt={'Logo'}
            width={104}
            height={18}
            className={'w-[130px]'}
          />
        </Link>
        <Text color={'secondary'} className={'text-[14px]'}>
          One question, countless perspectives
        </Text>
      </div>

      <div className={'flex flex-col gap-2 mt-5'}>
        <Text component={'h1'} weight={'semibold'} className={'text-[24px]'}>
          Welcome back
        </Text>
        <Text className={'text-[14px]'}>Ready for today's question?</Text>
      </div>

      <form className={'mt-4 '}>
        <div className={'space-y-4'}>
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
        </div>
        <div className={'mt-6 flex flex-col items-center gap-3'}>
          <Button
            className={' w-full max-w-[354px]'}
            onClick={form.handleSubmit(handleSubmit)}
            loading={signIn.isPending}
          >
            Sign in
          </Button>
          <Text color={'secondary'} className={'text-[14px]'}>
            Don't have an account?{' '}
            <InlineLink href={'/sign-up'}>Sign up</InlineLink>
          </Text>
        </div>
      </form>
    </div>
  );
};
