import { useMutation } from '@tanstack/react-query';
import { createAccount } from '@/features/auth/api/requests';
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
