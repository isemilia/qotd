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
    <div className={'h-full p-3 flex gap-3 flex-1'}>
      <Sidebar />
      <main className={'flex-1 bg-white shadow-card rounded-[12px] p-4'}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
