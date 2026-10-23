import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/ui/primitives/toast';
import { hideAdminAnswer } from '@/features/admin/answers/api/requests';

export const useHideAdminAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: hideAdminAnswer,
    mutationKey: ['hideAdminAnswer'],
    onError: (e) => {
      toast.add({
        type: 'error',
        title: "Couldn't hide answer",
        description:
          e.message || 'Something went wrong. Please try again later',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['adminAnswers'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['adminAnswerById'],
      });

      toast.add({
        type: 'success',
        title: 'Answer hidden',
        description: 'The answer has been hidden successfully',
      });
    },
  });
};
