import { useMutation } from '@tanstack/react-query';
import { createAccount, signIn } from '@/features/auth/api/requests';
import { toast } from '@/ui/primitives/toast';
import { useRouter } from 'next/navigation';

export const useCreateAccount = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: createAccount,
    mutationKey: ['createAccount'],
    onError: () => {
      toast.add({
        type: 'error',
        title: 'Could not create account',
        description:
          'Something went wrong while creating your account. Please try again later',
      });
    },
    onSuccess: () => {
      toast.add({
        type: 'success',
        title: 'Account created',
        description: 'Welcome! Your account is ready to go',
      });
      router.replace('/');
    },
  });
};

export const useSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signIn,
    mutationKey: ['signIn'],
    onError: () => {
      toast.add({
        type: 'error',
        title: 'Could not sign in',
        description: 'Something went wrong. Please try again later',
      });
    },
    onSuccess: () => {
      toast.add({
        type: 'success',
        title: 'Welcome back!',
        description: 'Signed in successfully',
      });
      router.replace('/');
    },
  });
};
