import { UsersView } from '@/views/admin/users';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users',
};

const Page = () => {
  return <UsersView />;
};

export default Page;
