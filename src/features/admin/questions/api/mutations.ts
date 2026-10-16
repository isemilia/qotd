import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/ui/primitives/toast';
import { createAdminQuestion } from '@/features/admin/questions/api/requests';

export const useCreateAdminQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdminQuestion,
    mutationKey: ['createAdminQuestion'],
    onError: (e) => {
      toast.add({
        type: 'error',
        title: "Couldn't create question",
        description:
          e.message || 'Something went wrong. Please try again later',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['adminQuestions'],
      });

      toast.add({
        type: 'success',
        title: 'Question scheduled',
        description: 'The question will become active on the selected date',
      });
    },
  });
};
