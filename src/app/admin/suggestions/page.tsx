import { Metadata } from 'next';
import { SuggestionsView } from '@/views/admin/suggestions';

export const metadata: Metadata = {
  title: 'Scheduled',
};

const Page = () => {
  return <SuggestionsView />;
};

export default Page;
