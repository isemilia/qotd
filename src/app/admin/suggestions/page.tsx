import { SuggestionsView } from '@/views/admin/suggestions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Suggestions',
};

const Page = () => {
  return <SuggestionsView />;
};

export default Page;
