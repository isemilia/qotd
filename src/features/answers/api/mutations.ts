import { useMutation } from '@tanstack/react-query';
import { toast } from '@/ui/primitives/toast';
import { createAnswer } from '@/features/answers/api/requests';

export const useCreateAnswer = () => {
  return useMutation({
    mutationFn: createAnswer,
    mutationKey: ['createAnswer'],
    onError: (e) => {
      console.log(e);
      toast.add({
        type: 'error',
        title: 'Couldn’t post your answer',
        description: 'Something went wrong',
      });
    },
    onSuccess: () => {
      toast.add({
        type: 'success',
        title: 'Answer posted',
        description: 'Your answer is now part of the conversation',
      });
    },
  });
};
