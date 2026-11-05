import { updateAdminUser } from '@/features/admin/users/api/requests';
import { toast } from '@/ui/primitives/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateAminUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdminUser,
    mutationKey: ['updateAdminUser'],
    onError: (e) => {
      toast.add({
        type: 'error',
        title: "Couldn't update user",
        description:
          e.message || 'Something went wrong. Please try again later',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['adminUsers'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['adminUserById'],
      });

      toast.add({
        type: 'success',
        title: 'User updated successfully',
        description: "The user's information has been saved",
      });
    },
  });
};
