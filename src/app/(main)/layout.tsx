import { FC, ReactNode } from 'react';
import { Header } from '@/widgets/header/header';
import { Footer } from '@/widgets/footer';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={'flex-1'}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
