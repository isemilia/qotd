import { HomeView } from '@/views/home';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page || 1));

  return <HomeView page={page} />;
}
