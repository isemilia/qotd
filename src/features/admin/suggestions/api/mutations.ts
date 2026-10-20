import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/ui/primitives/toast';
import { approveAdminSuggestion } from '@/features/admin/suggestions/api/requests';

export const useApproveAdminSuggestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveAdminSuggestion,
    mutationKey: ['approveAdminSuggestion'],
    onError: (e) => {
      toast.add({
        type: 'error',
        title: "Couldn't approve suggestion",
        description:
          e.message || 'Something went wrong. Please try again later',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['adminQuestions'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['adminSuggestions'],
      });

      toast.add({
        type: 'success',
        title: 'Suggestion approved',
        description: 'The question has been scheduled for the selected date',
      });
    },
  });
};
