import {
  MyAnswers,
  MyAnswersSkeleton,
} from '@/features/answers/components/my-answers';
import { Suspense } from 'react';

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page || 1));

  return (
    <Suspense fallback={<MyAnswersSkeleton />}>
      <MyAnswers page={page} />
    </Suspense>
  );
};

export default Page;
