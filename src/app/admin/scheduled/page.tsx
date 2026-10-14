import { ScheduledView } from '@/views/admin/scheduled';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scheduled',
};

const Page = () => {
  return <ScheduledView />;
};

export default Page;
