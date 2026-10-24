import type { Metadata } from 'next';
import { FC, ReactNode } from 'react';
import { Sidebar } from '@/widgets/admin/sidebar';

export const metadata: Metadata = {
  title: {
    default: 'Admin panel',
    template: '%s | Admin panel | Commonly',
  },
  robots: {
    index: false,
    follow: false,
  },
};

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={'flex h-full w-full min-w-0 flex-1 gap-3 p-3'}>
      <Sidebar />
      <main
        className={'shadow-card min-w-0 flex-1 rounded-[12px] bg-white p-4'}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
