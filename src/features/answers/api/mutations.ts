import { useMutation } from '@tanstack/react-query';
import { toast } from '@/ui/primitives/toast';
import {
  createAnswer,
  toggleAnswerLike,
} from '@/features/answers/api/requests';

export const useCreateAnswer = () => {
  return useMutation({
    mutationFn: createAnswer,
    mutationKey: ['createAnswer'],
    onError: (e) => {
      toast.add({
        type: 'error',
        title: 'Couldn’t post your answer',
        description: e.message || 'Something went wrong',
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

export const useToggleAnswerLike = () => {
  return useMutation({
    mutationFn: toggleAnswerLike,
    mutationKey: ['toggleAnswerLike'],
  });
};
