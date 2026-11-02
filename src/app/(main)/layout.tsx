import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header/header';
import { FC, ReactNode } from 'react';

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
