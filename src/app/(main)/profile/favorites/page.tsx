import { getCurrentUser } from '@/server/utils/session';
import { AnswersGrid } from '@/features/answers/components/answers-grid';

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <AnswersGrid
      likedByUserId={user?.id}
      emptyStateText={'No favorites yet. Answers you save will appear here'}
    />
  );
};

export default Page;
