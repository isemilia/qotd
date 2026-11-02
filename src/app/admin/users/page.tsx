import { Metadata } from 'next';
import { UsersView } from '@/views/admin/users';

export const metadata: Metadata = {
  title: 'Users',
};

const Page = () => {
  return <UsersView />;
};

export default Page;
