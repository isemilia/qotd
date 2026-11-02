import { Metadata } from 'next';
import { SuggestionCard } from '@/features/admin/suggestions/components/suggestion-card';
import { CardGrid } from '@/ui/primitives/card-grid';
import { getSession } from '@/server/utils/session';
import { getSuggestions } from '@/server/utils/suggestions';
import { Text } from '@/ui/primitives/text';
import { DynamicPagination } from '@/ui/components/dynamic-pagination';

export const metadata: Metadata = {
  title: 'My suggestions',
  description: "View the questions you've suggested to Commonly.",
};

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const sp = await searchParams;

  const session = await getSession();

  const page = Math.max(1, Number(sp.page || 1));

  const { suggestions, pagination } = await getSuggestions({
    page,
    userId: session?.user_id,
  });

  if (!suggestions.length) {
    return (
      <Text className={'mt-4 text-[16px]'}>
        &#127811; You haven't suggested any questions yet
      </Text>
    );
  }

  return (
    <div>
      <CardGrid>
        {suggestions.map((suggestion) => {
          return (
            <SuggestionCard
              key={suggestion.id}
              suggestedQuestion={suggestion.suggestedQuestion}
              status={suggestion.status}
              submittedAt={suggestion.createdAt}
              reason={suggestion.reason}
              scheduledQuestion={suggestion.scheduledQuestion}
            />
          );
        })}
      </CardGrid>

      {pagination.totalPages > 1 ? (
        <DynamicPagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          className={'mt-8'}
        />
      ) : null}
    </div>
  );
};

export default Page;
