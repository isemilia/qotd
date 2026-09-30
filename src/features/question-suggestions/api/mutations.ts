import { useMutation } from '@tanstack/react-query';
import { toast } from '@/ui/primitives/toast';
import { createQuestionSuggestion } from '@/features/question-suggestions/api/requests';

export const useCreateQuestionSuggestion = () => {
  return useMutation({
    mutationFn: createQuestionSuggestion,
    mutationKey: ['createQuestionSuggestion'],
    onError: (e) => {
      toast.add({
        type: 'error',
        title: "Couldn't submit your question",
        description: e.message || 'Something went wrong, please try again',
      });
    },
    onSuccess: () => {
      toast.add({
        type: 'success',
        title: 'Question submitted',
        description: 'Thanks for sharing your idea',
      });
    },
  });
};
