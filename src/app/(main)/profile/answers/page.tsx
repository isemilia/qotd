import { AnswersGrid } from '@/features/answers/components/answers-grid';
import { getCurrentUser } from '@/server/utils/session';

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const sp = await searchParams;
  const user = await getCurrentUser();

  const page = Math.max(1, Number(sp.page || 1));

  return (
    <AnswersGrid
      page={page}
      userId={user?.id}
      emptyStateText={
        "Your answers will appear here. Start with today's question"
      }
    />
  );
};

export default Page;
