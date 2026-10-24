import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/ui/primitives/toast';
import {
  hideAdminAnswer,
  restoreAdminAnswer,
} from '@/features/admin/answers/api/requests';

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

export const useRestoreAdminAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreAdminAnswer,
    mutationKey: ['restoreAdminAnswer'],
    onError: (e) => {
      toast.add({
        type: 'error',
        title: "Couldn't restore answer",
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
        title: 'Answer restored',
        description: 'The answer has been restored successfully',
      });
    },
  });
};
