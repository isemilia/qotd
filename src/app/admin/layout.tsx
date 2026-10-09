import type { Metadata } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return children;
};

export default Layout;
