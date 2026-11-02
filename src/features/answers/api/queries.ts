import { getCurrentAnswers } from '@/features/answers/api/requests';
import { useQuery } from '@tanstack/react-query';

export const useCurrentAnswers = () => {
  return useQuery({
    queryFn: getCurrentAnswers,
    queryKey: ['currentAnswers'],
  });
};
