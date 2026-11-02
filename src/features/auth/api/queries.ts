import { getMe } from '@/features/auth/api/requests';
import { useQuery } from '@tanstack/react-query';

export const useMe = () => {
  return useQuery({
    queryFn: getMe,
    queryKey: ['me'],
    staleTime: 5 * 60 * 1000,
  });
};
