import { useQuery } from '@tanstack/react-query';
import { getCurrentAnswers } from '@/features/answers/api/requests';

export const useCurrentAnswers = () => {
  return useQuery({
    queryFn: getCurrentAnswers,
    queryKey: ['currentAnswers'],
  });
};
