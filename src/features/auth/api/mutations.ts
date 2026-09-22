import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAccount, logout, signIn } from '@/features/auth/api/requests';
import { toast } from '@/ui/primitives/toast';
import { useRouter } from 'next/navigation';

export const useCreateAccount = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

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
    onSuccess: async () => {
      toast.add({
        type: 'success',
        title: 'Account created',
        description: 'Welcome! Your account is ready to go',
      });
      await queryClient.invalidateQueries({ queryKey: ['me'] });

      router.replace('/');
    },
  });
};

export const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

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
    onSuccess: async () => {
      toast.add({
        type: 'success',
        title: 'Welcome back!',
        description: 'Signed in successfully',
      });
      await queryClient.invalidateQueries({ queryKey: ['me'] });

      router.replace('/');
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    mutationKey: ['logout'],
    onError: () => {
      toast.add({
        type: 'error',
        title: 'Could not logout',
        description: 'Something went wrong. Please try again later',
      });
    },
    onSuccess: () => {
      window.location.href = '/';
    },
  });
};
