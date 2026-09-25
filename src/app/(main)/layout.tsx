import { FC, ReactNode } from 'react';
import { Header } from '@/widgets/header/header';
import { Footer } from '@/widgets/footer';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
