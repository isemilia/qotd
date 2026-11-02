import { AnswersGrid } from '@/features/answers/components/answers-grid';
import { getCurrentUser } from '@/server/utils/session';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favorites',
  description:
    "Find the answers you've liked and revisit different perspectives",
};

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <AnswersGrid
      likedByUserId={user?.id}
      status={'published'}
      emptyStateText={'No favorites yet. Answers you save will appear here'}
    />
  );
};

export default Page;
