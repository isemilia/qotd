import { AnswersView } from '@/views/admin/answers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Answers',
};

const Page = () => {
  return <AnswersView />;
};

export default Page;
